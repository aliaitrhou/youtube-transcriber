import os
import openai
from dotenv import load_dotenv
import sys

load_dotenv()

openai.api_key = os.getenv('OPENAI_API_KEY')
audio_filename = sys.argv[1]
audio_file_path = os.path.join(os.getcwd(), 'tmp', audio_filename)

audio_file = open(audio_file_path, 'rb')
transcript = openai.audio.transcriptions.create(
    file=audio_file,
    model="whisper-1",
    response_format="srt",
    prompt=(
        'I am a software developer. My name is Ali. '
    )
)
print(transcript)
