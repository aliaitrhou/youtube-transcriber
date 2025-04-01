import os
import sys
import openai
from dotenv import load_dotenv
import pysrt

load_dotenv()

openai.api_key = os.getenv('OPENAI_API_KEY')

input_data = sys.stdin.read()
subs = pysrt.from_string(input_data)

prompt_base = (
    """you are going to be a great translator.
    Given the transcript of a youtube video.
    Your role is  to Translate the following text precisely into {language}.
    Translate from [START] to [END] (excusive):\n[START]\n"""
)


lang = sys.argv[1]


def translate_text(text):
    prompt = prompt_base.format(language=lang)
    prompt += text + "\n[END]"

    response = openai.chat.completions.create(
        model='gpt-4',
        messages=[{"role": "system", "content": prompt}],
    )
    return response.choices[0].message.content


for index, subtitle in enumerate(subs):
    subtitle.text = translate_text(subtitle.text)
    print(subtitle, flush=True)
