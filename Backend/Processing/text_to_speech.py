from gtts import gTTS
from io import BytesIO


def transform(
    text: str,
    accent: str,
) -> BytesIO:
    """Transform text to audio.

    Args:
        text (str): Text to be transformed
        accent (str): Accent to be used

    Returns:
        BytesIO: Audio file
    """
    mp3_fp = BytesIO()
    tts = gTTS(
        text=text,
        lang="en",
        tld=accent,
    )
    tts.write_to_fp(mp3_fp)
    mp3_fp.seek(0)
    return mp3_fp


def text_to_speech(
    input_text: dict[str, str],
) -> BytesIO:
    """Execute steps to transform text to audio.

    Args:
        input_text (dict[str, str]): Text and accent to transform to audio

    Returns:
        BytesIO: Audio file
    """
    text = input_text["text"]
    accent = input_text["accent"]
    return transform(
        text=text,
        accent=accent,
    )
