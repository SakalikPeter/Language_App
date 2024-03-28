import React, { useState, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import FiberManualRecordIcon from "@mui/icons-material/MicRounded";
import speechToText from "../../apis/speechToText";

export const SpeechRecorder = ({
	isLoading,
	setIsLoading,
	handleUserInput,
}) => {
	const [isRecording, setIsRecording] = useState(false);
	const [recordingColor, setRecordingColor] = React.useState("#A22C29");
	const [hoverColor, setHoverColor] = React.useState("#902923");
	const mediaRecorderRef = useRef(null);

	const handleRecordClick = () => {
		// Execute only in case if there is no loading of speech to text
		if (!isLoading) {
			if (!isRecording) {
				startRecording();
			} else {
				stopRecording();
			}
		}
	};

	const startRecording = () => {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				const mediaRecorder = new MediaRecorder(stream);
				mediaRecorderRef.current = mediaRecorder;

				const chunks = [];

				mediaRecorder.ondataavailable = (event) => {
					if (event.data.size > 0) {
						chunks.push(event.data);
					}
				};

				mediaRecorder.onstop = () => {
					const audioBlob = new Blob(chunks, { type: "audio/wav" });
					transcribeAudio(audioBlob);
				};

				mediaRecorder.start();
				setIsRecording(true);
				setRecordingColor("#2b9348");
				setHoverColor("#1e8449");
			})
			.catch((error) => {
				console.error("Error accessing microphone:", error);
			});
	};

	const stopRecording = () => {
		if (
			mediaRecorderRef.current &&
			mediaRecorderRef.current.state === "recording"
		) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
			setRecordingColor("#A22C29");
			setHoverColor("#902923");
		}
	};

	const transcribeAudio = async (audioBlob) => {
		setIsLoading(true);
		speechToText(audioBlob).then((response) => {
			setIsLoading(false);
			handleUserInput(response);
		});
	};

	return (
		<IconButton
			onClick={handleRecordClick}
			sx={{
				backgroundColor: recordingColor,
				color: "#D6D5C9",
				"&:hover": {
					backgroundColor: hoverColor,
				},
			}}
			size="medium"
		>
			<FiberManualRecordIcon />
		</IconButton>
	);
};
