import axios from "axios";

const speechToText = async (audioBlob) => {
	const url = "http://127.0.0.1:8000/transcribe_audio/";

	const formData = new FormData();
	formData.append("audio", audioBlob, {
		filename: "audio.wav",
		contentType: "audio/wav",
	});
	try {
		const response = await axios.post(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				accept: "application/json",
			},
		});
		return response.data["text"];
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

export default speechToText;
