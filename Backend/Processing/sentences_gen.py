from transformers import (
    pipeline,
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig
)
import torch
from Data.data import get_words_by_category

device = "cuda:0" if torch.cuda.is_available() else "cpu"
model_name = "mistralai/Mistral-7B-Instruct-v0.2"
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
)
tokenizer = AutoTokenizer.from_pretrained(
    model_name
)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    load_in_4bit=True,
    quantization_config=bnb_config,
    # torch_dtype=torch.bfloat16,
    device_map="auto",
    trust_remote_code=True,
)
pipe = pipeline(
    "text-generation", 
    model=model, 
    tokenizer = tokenizer, 
    # torch_dtype=torch.bfloat16, 
    device_map="auto",
    return_full_text=False,
)

def __create_prompt(
    grammar: str,
    level: str,
    words: str,
    sentence_type: str,
    sentence_mood: str
):
    return f"""
[INST] Generate 10 {sentence_mood} {grammar} {sentence_type} for {level} level english speaker.
C level sentences are the most complex.
A level sentences are the most basic.
B level sentences are in the middle between C and A level.
Focus to include these words in random order: {words}.[/INST]
"""

def __generate_sentences(
    prompt: str,
):
    sequences = pipe(
        prompt,
        do_sample=True,
        max_new_tokens=512, 
        temperature=0.7,
        top_p=0.9,
        num_return_sequences=1,
    )
    return sequences[0]['generated_text']

def __proces_sentences(
    input_text: str,
) -> list[str]:
    print(input_text)
    sentences = []
    # Remove numbers from the text
    lines = input_text.split("\n")
    lines = [line for line in lines if line]
    # Take the second part after splitting each line by the first white space
    # just first 10 lines in case of it will gen some bullshit
    for line in lines[:10]:
        sentences.append(line.split(" ", 1)[1])

    return sentences

def get_sentences(
    grammar: str,
    level: str,
    category: str,
    sentence_type: str,
    sentence_mood: str,
):
    words = get_words_by_category(
        category=category,
    )
    prompt = __create_prompt(
        grammar=grammar,
        level=level,
        words=words,
        sentence_type=sentence_type,
        sentence_mood=sentence_mood,
    )
    sentences = __generate_sentences(
        prompt=prompt,
    )
    sentences = __proces_sentences(
        input_text=sentences,
    )
    return sentences