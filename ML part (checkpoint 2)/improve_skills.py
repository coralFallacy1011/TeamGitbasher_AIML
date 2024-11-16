import google.generativeai as genai
import os
import skills_extraction as skills_extraction

sys_prompt = ("You are an expert at deciding work domain ",
                "Analyze the following prompt given by the user which has a list of skills they know:\n\n",
                "Prompt: {user_prompt}\n\n",
                "Tell job role and provide links to three educative courses of other necessary skills required  in that field along with\n",
                "1. Duration\n",
                "2. Paid or free\n",
                "3. link to resource\n",
                "4. Opportunities\n")

API = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=str(API))
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction=sys_prompt)

file_path = r'senior-front-end-developer-resume-example.pdf'
skills = skills_extraction.skills_extractor(file_path, convert_to_string=True)
prompt = "Skills = ", skills
response = model.generate_content(prompt)

print(response.text)