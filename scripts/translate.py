from transformers import MarianMTModel, MarianTokenizer
import sys
import pysrt

input_data = sys.stdin.read()
subs = pysrt.from_string(input_data)
# if you wanna use Hugging-face (free)
model_name = "Helsinki-NLP/opus-mt-en-ar"


def translate_text(text):
    tokenizer = MarianTokenizer.from_pretrained(
        model_name, direction="rtl", add_prefix_space=True)

    model = MarianMTModel.from_pretrained(model_name)
    inputs = tokenizer(text, return_tensors="pt", truncation=True)
    outputs = model.generate(**inputs)
    response = tokenizer.decode(
        outputs[0], skip_special_tokens=True, clean_up_tokenization_spaces=True)
    return response


for index, subtitle in enumerate(subs):
    subtitle.text = translate_text(subtitle.text)
    print(subtitle, flush=True)
