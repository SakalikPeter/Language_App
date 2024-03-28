import React from "react";
import IconButton from "@mui/material/IconButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import textToSpeech from "../../apis/textToSpeech";

export const handleTextSpeech = async (systemMessage) => {
	// Call API to convert text to speech
	const result = await textToSpeech(systemMessage);

	// Decode base64 audio content to ArrayBuffer
	const arrayBuffer = base64ToArrayBuffer(result);

	// Decode ArrayBuffer to AudioBuffer
	const audioBuffer = await decodeAudioData(arrayBuffer);

	// Play audio
	playAudio(audioBuffer);
};

// Function to convert base64 to ArrayBuffer
const base64ToArrayBuffer = (base64) => {
	const binary = atob(base64);
	const arrayBuffer = new ArrayBuffer(binary.length);
	const view = new Uint8Array(arrayBuffer);
	for (let i = 0; i < binary.length; i++) {
		view[i] = binary.charCodeAt(i);
	}
	return arrayBuffer;
};

// Function to decode ArrayBuffer to AudioBuffer
const decodeAudioData = async (arrayBuffer) => {
	const audioContext = new (window.AudioContext ||
		window.webkitAudioContext)();
	return new Promise((resolve, reject) => {
		audioContext.decodeAudioData(arrayBuffer, resolve, reject);
	});
};

const playAudio = (buffer) => {
	const audioContext = new (window.AudioContext ||
		window.webkitAudioContext)();
	const source = audioContext.createBufferSource();
	source.buffer = buffer;
	source.connect(audioContext.destination);
	source.start();
};

export const TextSpeaker = ({ systemMessage }) => {
	const handleClick = () => {
		handleTextSpeech(systemMessage);
	};

	return (
		<div>
			<IconButton onClick={handleClick} color="primary" size="large">
				<VolumeUpIcon />
			</IconButton>
		</div>
	);
};
