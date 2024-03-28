from transformers import AutoProcessor, AutoModelForSpeechSeq2Seq
from fastapi import UploadFile
import soundfile as sf
import io
import numpy as np
from scipy.signal import resample

processor = AutoProcessor.from_pretrained("openai/whisper-medium")
model = AutoModelForSpeechSeq2Seq.from_pretrained("openai/whisper-medium")
SAMPLING_RATE = 16000

def __transcribe(
    data: np.ndarray,
):
    """Transcribe audio data to text using the pre-trained model.

    Args:
        ds (np.ndarray): Audio data.
        sampling_rate (int): Sampling rate of the audio.

    Returns:
        transcription (str): Transcribed text.
    """
    inputs = processor(
        data,
        sampling_rate=SAMPLING_RATE,
        return_tensors="pt",
    )
    generated_ids = model.generate(
        inputs["input_features"],
    )
    transcription = processor.batch_decode(
        generated_ids,
        skip_special_tokens=True,
    )
    return transcription

def __resample_audio(
    audio_arr: np.ndarray,
    samplerate: int,
) -> np.ndarray:
    """Resamples audio data to a standard sampling rate of 16000.

    Args:
        audio_arr (np.ndarray): audio data.
        samplerate (int): Sampling rate of the original audio.

    Returns:
        np.ndarray: Resampled audio data.
    """
    number_of_samples = round(
        len(audio_arr) * float(SAMPLING_RATE) / samplerate
    )
    return resample(
        audio_arr,
        number_of_samples,
    )

def __read_audio(
    audio: UploadFile,
) -> tuple[
    np.ndarray,
    int,
]:
    """Reads audio from an uploaded file and returns the data and sampling rate.

    Args:
        audio (UploadFile): Uploaded audio file.

    Returns:
        tuple:
            np.ndarray: Audio data.
            int: Sampling rate.
    """
    # Ensure the file pointer is at the beginning
    audio.file.seek(0)
    # Read data from the file
    data = audio.file.read()
    # Read dada as bytes
    data = io.BytesIO(data)
    # Read audio data and sampling rate using soundfile library
    audio_data, samplerate = sf.read(data)
    # Check if the audio is stereo
    if len(audio_data.shape) == 2 and audio_data.shape[1] == 2:
        # Convert stereo to mono by averaging the channels
        audio_data = np.mean(audio_data, axis=1)
    return audio_data, samplerate

def __process_transcribe(
    text: str,
) -> str:
    """Process the transcribed text.

    Args:
        text (str): transcribed text

    Returns:
        str: processed text
    """
    # Remove all whitespaces at the beginnig.
    return text.lstrip()

def speech_to_text(
    audio: UploadFile,
) -> str:
    """
    Converts speech from an uploaded audio file to text.

    Args:
        audio (UploadFile): Uploaded audio file.

    Returns:
        str: Converted text.
    """
    audio_arr, samplerate = __read_audio(
        audio=audio,
    )
    audio_resampled = __resample_audio(
        audio_arr=audio_arr,
        samplerate=samplerate,
    )
    text = __transcribe(
        data=audio_resampled,
    )
    text = __process_transcribe(
        text=text[0],
    )
    return text