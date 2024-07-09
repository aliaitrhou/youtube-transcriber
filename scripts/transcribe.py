import os
import sys
import textwrap
import whisper
model = whisper.load_model("base")
video_id = sys.argv[1]
audio_file_path = os.path.join(os.getcwd(), 'tmp', video_id + '.m4a')
print(audio_file_path)
text = model.transcribe(audio_file_path)

# this function is just a way to convert the plain text to SRT like format.


def text_to_srt(transcription):
    subtitles = []
    words_per_line = 40
    chars_per_second = 50
    paragraphs = transcription.strip().split("\n")
    lines = []
    for paragraph in paragraphs:
        lines.extend(paragraph.split(". "))

    current_time = 0
    for i, line in enumerate(lines):
        words = line.split()
        wrapped_lines = textwrap.wrap(" ".join(words), width=words_per_line)

        for wrapped_line in wrapped_lines:
            duration_seconds = max(1, len(wrapped_line) / chars_per_second)

            start_time = f"00:00:{current_time:02d},000"
            end_time = f"00:00:{current_time + duration_seconds:.3f}"
            subtitle = f"{
                len(subtitles) + 1}\n{start_time} --> {end_time}\n{wrapped_line}\n"
            subtitles.append(subtitle)
            current_time += duration_seconds

    return "".join(subtitles)


srt_text = text_to_srt(text["text"])
print(srt_text, flush=True)
