import re  
from ftfy import fix_text  
from sklearn.feature_extraction.text import TfidfVectorizer  
from sklearn.metrics.pairwise import cosine_similarity  
import numpy as np
import pandas as pd
import nltk
from nltk.corpus import stopwords  
import skills_extraction 
import streamlit as st

# Load dataset:
jd_df = pd.read_csv(r'.\data\job_data.csv')
# Key skills with weights for different job titles  
job_skill_weights = {  
    "Data Scientist": {'Python':1, 'Ai':2, 'Sql':1.5, 'Engineering':1, 'AWS':2.5, 'Opencv':2, 'Tensorflow':3, 'Pytorch':3, 'Keras':3, 'Scripting':1, 'Sklearn':2, 'Pandas':3, 'Numpy':3},  
    "Frontend": {'Html':1, 'React':3, 'Typescript':3, 'Java':2, 'Git':1, 'Javascript':2, 'Css':2, 'Rest':3},
    "Backend": {'Java':2, 'Sql':2, 'Linux':1, 'Api':2, 'Git':2, 'Cloud':2, 'Azure':3, 'Aws':3, 'Python':1},
    "Devops": {'Python':2, 'Cloud':2, 'Azure':3, 'Shell':2, 'Aws':3, 'Linux':1, 'Mongodb':2, 'Postgres':2, 'Mysql':1, 'Git':2},
    "Cloud": {'Azure':3, 'Cloud':3, 'Aws':3, 'Mongodb':2, 'Postgres':2, 'Mysql':1, 'Api':3, 'Java':2, 'C':1, 'Html':1, 'Javascript':2, 'Css':1, 'Typescript':1, 'Rest':2, 'Shell':3},
    "Application Developer": {'Java':2, 'Mongodb':2, 'Flutter':3, 'Python':1, 'Nosql':1, 'React':3, 'Sql':2, 'Git':2, 'Javascript':2, 'Dart':3, 'Aws':1, 'Css':1, 'Api':2, 'Mysql':1}
}

# Load the extracted resume skills:  
file_path = r'resume.pdf'
skills = []  
skills.append(' '.join(word for word in skills_extraction.skills_extractor(file_path)))
user_work_experience = skills_extraction.workd_exp_extractor(file_path)
if user_work_experience == 0 : user_work_experience = 10

def ngrams(string, n=3):  
    string = fix_text(string)  # fix text  
    string = string.encode("ascii", errors="ignore").decode()  # remove non-ascii chars  
    string = string.lower()  
    chars_to_remove = [")", "(", ".", "|", "[", "]", "{", "}", "'"]  
    rx = '[' + re.escape(''.join(chars_to_remove)) + ']'  
    string = re.sub(rx, '', string)  
    string = string.replace('&', 'and')  
    string = string.replace(',', ' ')  
    string = string.replace('-', ' ')  
    string = string.title()  # normalize case - capital at start of each word  
    string = re.sub(' +', ' ', string).strip()  # get rid of multiple spaces and replace with a single  
    string = ' ' + string + ' '  # pad names for ngrams
    string = re.sub(r'[,-./]|\sBD', r'', string)  
    ngrams = zip(*[string[i:] for i in range(n)])  
    return [''.join(ngram) for ngram in ngrams]  

# My code
def extract_skilling(jd):
    skills = list(skills_extraction.extract_skills(jd))
    skills = list(set([skill.title() for skill in skills]))
    return ' '.join(skill for skill in skills)

def get_weighted_skills(title):  
    key_skills = job_skill_weights.get(title, {})  
    weighted_skills = []  
    for skill, weight in key_skills.items():  
        weighted_skills.extend([skill] * weight)  # duplicate skills according to weight  
    return ' '.join(weighted_skills)  


jd_df['skills'] = jd_df['Description'].apply(extract_skilling)
vectorizer = TfidfVectorizer(min_df=1, analyzer=ngrams, lowercase=False)
tfidf = vectorizer.fit_transform(skills + list(jd_df['skills'].values.astype('U')))  

# Splitting the TF-IDF matrix back into skills and job descriptions  
skills_tfidf = tfidf[0:1, :]
jd_tfidf = tfidf[1:, :]

# Calculate cosine similarity  
cosine_similarities = cosine_similarity(skills_tfidf, jd_tfidf)

# Convert cosine similarities into a DataFrame to match with job descriptions  
matches = pd.DataFrame(cosine_similarities.T, columns=['Match Confidence'])  
jd_df['Match Confidence'] = matches['Match Confidence']

# Filter out jobs if user experience is less than required experience  
jd_df['Experience Check'] = jd_df['Required Experience'] <= user_work_experience  

filtered_jobs = jd_df[jd_df['Experience Check']].copy()  

# Apply experience scoring to filtered jobs  
def calculate_experience_score(required_experience, user_experience):  
    if user_experience >= required_experience:  
        return 1   
    else:  
        return 0 

filtered_jobs['Experience Score'] = filtered_jobs['Required Experience'].apply(lambda x: calculate_experience_score(x, user_work_experience))  

filtered_jobs['Combined Score'] = (matches[matches.index.isin(filtered_jobs.index)]['Match Confidence'] * 0.7) + (filtered_jobs['Experience Score'] * 0.03)  
# Normalizing the combined scores
filtered_jobs['Combined Score'] = (filtered_jobs['Combined Score'] - filtered_jobs['Combined Score'].min()) / (filtered_jobs['Combined Score'].max() - filtered_jobs['Combined Score'].min())

recommended_jobs = filtered_jobs[(filtered_jobs['Combined Score'] > 0) &   
                                 (matches[matches.index.isin(filtered_jobs.index)]['Match Confidence'] > 0)]  

recommended_jobs.to_csv(r'.\data\job_recommendations.csv', index=False, header = True)

if not recommended_jobs.empty:  
    recommended_jobs = recommended_jobs.sort_values(by='Combined Score', ascending=False)  
    # Output the recommended jobs  
    print(recommended_jobs[['Title','Processed Job Description', 'skills','Required Experience', 'Match Confidence', 'Experience Score', 'Combined Score']])  
else:  
    print("No suitable jobs found for the given experience level or match confidence is too low.")

st.write("Skills = ",skills)
st.write("work experience = ",user_work_experience)
recommended_jobs
