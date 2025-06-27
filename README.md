# Job Recommendation System
JMSS is an AI/ML-powered application designed to Collect job data from various websites and recommend suitable postings based on a user's resume. It also has a frontend to present the data clearly.

## How to Use

We have collected job data from various websites such as LinkedIn, Carreers360, Indeed, etc with the help of various web tools. This can be seen in the ```Company Apply URL``` field of the database, which contains links to various websites where the job has been posted.

We have also found out the the user's strenghts by matching his skills to the ones required in the job, and have also implemented user weaknesses ona a per job basis as well as the user's skill set on a whole. This can be seen in the last 2 columns of the output which displays the job description wise strengths and weaknesses. The weaknesses and room for improvement is also displayed in the skills upskilling section of the website

## Tech Stack & Tools
* Python: The core programming language used for implementing the logic and functionality.
* Scikit-learn: Utilized for machine learning tasks, including analyzing user skills and recommending suitable jobs.
* NLTK (Natural Language Toolkit): Used for natural language processing to extract and analyze information from resumes.
* Pandas: Employed for data manipulation and analysis, ensuring efficient handling of resume data.
* Streamlit: Used to create an interactive and user-friendly web interface for our platform.
* SpaCy: Used for Named Entity Recognition for identifying skills.

## Visuals

Home
![image](https://github.com/user-attachments/assets/e3e53057-7d6b-49a2-bca8-570e9f2e9ee7)

Processed
![image](https://github.com/user-attachments/assets/bcd55e87-aabd-45ac-8dc5-65fa65084536)
