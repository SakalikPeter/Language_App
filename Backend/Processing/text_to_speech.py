from gtts import gTTS
from io import BytesIO

def transform(
    text: str,
    accent: str,
) -> BytesIO:
    mp3_fp = BytesIO()
    tts = gTTS(
        text=text,
        lang='en',
        tld=accent,
    )
    tts.write_to_fp(mp3_fp)
    mp3_fp.seek(0)
    return mp3_fp

def text_to_speech(
    input_text: dict[str, str],
):
    text = input_text["text"]
    accent = input_text["accent"]
    return transform(
        text=text,
        accent=accent,
    )