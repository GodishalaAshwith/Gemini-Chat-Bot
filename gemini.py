
from google import genai

client = genai.Client(api_key="AIzaSyDXpeE-cheNVGRdQR7H9U8cN9wF7lUzxtA")
value = input("Enter prompt: ")
response = client.models.generate_content(
    model="gemini-2.0-flash", contents=f"Give answer for this in 10 lines at max, if it can be lower give lower: {value}")
print(response.text)
