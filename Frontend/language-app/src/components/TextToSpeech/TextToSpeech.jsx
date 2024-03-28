import textToSpeech from "../../apis/textToSpeech";

export const handleTextSpeech = async (systemMessage) => {
	// Call API to convert text to speech
	const result = await textToSpeech(systemMessage);

	// Decode the Base64 string to binary data
	const binaryData = atob(result);

	// Convert the binary data to an array buffer
	const arrayBuffer = new ArrayBuffer(binaryData.length);
	const view = new Uint8Array(arrayBuffer);
	for (let i = 0; i < binaryData.length; i++) {
		view[i] = binaryData.charCodeAt(i);
	}

	return new Blob([arrayBuffer], { type: "audio/wav" });
};
