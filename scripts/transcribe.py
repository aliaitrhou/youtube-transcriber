import os
import openai
import sys
from dotenv import load_dotenv
load_dotenv()

os.getenv('OPENAI_API_KEY')

audio_filename = sys.argv[1]
audio_file_path = os.path.join(os.getcwd(), 'tmp', audio_filename) + ".m4a"

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
