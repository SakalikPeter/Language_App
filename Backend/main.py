from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from Processing.speech_to_text import speech_to_text
from Processing.text_to_speech import text_to_speech

# from Processing.sentences import get_sentences
from Processing.sentences_gen import get_sentences
from Data.data import get_all_categories
from Data.data import get_all_lessons

import base64

app = FastAPI()


class Item(BaseModel):
    name: str


# Allow all origins in this example; you might want to restrict this in production
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/transcribe_audio/")
async def convert_speech_to_text(
    audio: UploadFile = File(...),
) -> dict[
    str,
    str,
]:
    """Convert speech to text.

    Args:
        audio (UploadFile, optional): _description_. Defaults to File(...).

    Returns:
        dict[ str, str, ]: _description_
    """
    text = speech_to_text(
        audio=audio,
    )
    return {
        "text": text,
    }


@app.post("/text_to_speech/")
async def convert_text_to_speech(
    input_text: dict[str, str],
) -> dict:
    speech = text_to_speech(input_text=input_text)
    # Read BytesIO content and encode in Base64
    speech_content = base64.b64encode(speech.read()).decode("utf-8")
    return {
        "speech": speech_content,
    }


@app.get("/sentences")
async def get_data(
    grammar: str,
    level: str,
    category: str,
    sentence_type: str,
    sentence_mood: str,
) -> list:
    """
    Retrieve data based on the specified tense.
    :param tense: String parameter specifying the tense (e.g., "past", "present", "future").
    :return: List of items matching the specified tense.
    #"""
    return get_sentences(
        grammar=grammar,
        level=level,
        category=category,
        sentence_type=sentence_type,
        sentence_mood=sentence_mood,
    )


levels = [
    "A (beginner)",
    "B (advanced)",
    "C (expert)",
]


@app.get("/levels")
async def get_levels():
    return levels


@app.get("/categories")
async def get_categories():
    return get_all_categories()


lessons = [
    "Simple Present",
    "Simple Past",
    "Simple Future",
    "Present Continuous",
    "Past Continuous",
]


@app.get("/lessons")
async def get_lessons():
    """
    Retrieve data based on the specified tense.
    :param tense: String parameter specifying the tense (e.g., "past", "present", "future").
    :return: List of items matching the specified tense.
    """
    return get_all_lessons()
