import os
import sys
from together import Together
from dotenv import load_dotenv
import pysrt

load_dotenv()

client = Together(
    api_key=os.getenv("TOGETHER_API_KEY"))

input_data = sys.stdin.read()
subs = pysrt.from_string(input_data)

prompt_base = (
    """you are going to be a great translator.
    Here is a part of the transcript of a youtube video.
    Your role is  to Translate the following text precisely into Arabic.
    Translate from [START] to [END]:\n[START]\n"""
)


def translate_text(text):
    prompt = prompt_base
    prompt += text + "\n[END]"
    response = client.chat.completions.create(
        model="meta-llama/Llama-3.3-70B-Instruct-Turbo", max_tokens=3000,
        temperature=0,
        messages=[
            {"role": "user", "content": prompt}],
    )

    translated = response.choices[0].message.content
    if translated.startswith('「'):
        translated = translated[1:]
        if translated.endswith('」'):
            translated = translated[:-1]

    return translated


for index, subtitle in enumerate(subs):
    subtitle.text = translate_text(subtitle.text)
    print(subtitle, flush=True)
