import re  
from ftfy import fix_text  
from sklearn.feature_extraction.text import TfidfVectorizer  
from sklearn.metrics.pairwise import cosine_similarity  
import numpy as np  
import pandas as pd  
import skills_extraction  # Ensure this module is available and properly implemented  
import streamlit as st  

# Load dataset:  
jd_df = pd.read_csv(r'.\data\job_data.csv')  

# Load the extracted resume skills: 
file_path = r'data-scientist-resume-example.pdf'  
skills = ["Python TensorFlow Machine Learning Deep Learning"]  
#skills.append(' '.join(word for word in skills_extraction.skills_extractor(file_path)))  
#user_work_experience = skills_extraction.workd_exp_extractor(file_path)  
user_work_experience = 10

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
    string = ' ' + string + ' '  # pad names for ngrams...  
    string = re.sub(r'[,-./]|\sBD', r'', string)  
    ngrams = zip(*[string[i:] for i in range(n)])  
    return [''.join(ngram) for ngram in ngrams]  

def extract_skilling(jd):  
    skills = list(skills_extraction.extract_skills(jd))  
    skills = list(set([skill.title() for skill in skills]))  
    return ' '.join(skill for skill in skills)  

# Extract skills and Title information  
jd_df['skills'] = jd_df['Processed Job Description'].apply(extract_skilling)  

# Create a DataFrame for weighted key skills  

# Vectorizing skills (including weighted skills)  
vectorizer = TfidfVectorizer(min_df=1, analyzer=ngrams, lowercase=False)  
tfidf = vectorizer.fit_transform(skills + list(jd_df['skills'].values.astype('U')) + list(jd_df['skills'].values.astype('U')))  

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

# Create a DataFrame for jobs where experience is sufficient  
filtered_jobs = jd_df[jd_df['Experience Check']].copy()  

# Apply experience scoring to filtered jobs  
def calculate_experience_score(required_experience, user_experience):  
    if user_experience >= required_experience:  
        return 1  # Full score if user meets or exceeds required experience  
    else:  
        return 0  # No score if user does not meet the experience requirement  

filtered_jobs['Experience Score'] = filtered_jobs['Required Experience'].apply(lambda x: calculate_experience_score(x, user_work_experience))  

# Combine scores: Adjust the combined score calculation  
filtered_jobs['Combined Score'] = (matches[matches.index.isin(filtered_jobs.index)]['Match Confidence'] * 0.7) + (filtered_jobs['Experience Score'] * 0.3)  

# Filter recommended jobs based on match confidence and experience  
recommended_jobs = filtered_jobs[(filtered_jobs['Combined Score'] > 0) &   
                                 (matches[matches.index.isin(filtered_jobs.index)]['Match Confidence'] > 0)]  

# Sort jobs by combined score if there are any recommended jobs left  
if not recommended_jobs.empty:  
    recommended_jobs = recommended_jobs.sort_values(by='Combined Score', ascending=False)  

    # Output the recommended jobs  
    print(recommended_jobs[['Title', 'Processed Job Description', 'skills', 'Required Experience', 'Match Confidence', 'Experience Score', 'Combined Score']].head(50))  
else:  
    print("No suitable jobs found for the given experience level or match confidence is too low.")  

# Output to Streamlit  
st.write("Skills =", skills)  
st.write("Work Experience =", user_work_experience)  
st.write("Recommended Jobs:", recommended_jobs)