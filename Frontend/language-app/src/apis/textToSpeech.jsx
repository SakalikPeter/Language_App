import axios from "axios";

const textToSpeech = async (text) => {
    const url = 'http://127.0.0.1:8000/text_to_speech/';
    const accent = 'co.uk'; // Replace with the actual accent value
    
    try {
        let response = await axios.post(
            url,
            {
                text: text,
                accent: accent,
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            }
        );
        return response.data['speech'];
      } catch (error) {
        console.error('Error making text-to-speech request:', error.message);
      }
};

export default textToSpeech;