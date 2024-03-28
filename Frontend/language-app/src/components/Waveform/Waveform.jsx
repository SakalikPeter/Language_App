import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import WaveSurfer from "wavesurfer.js";

import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import "./Waveform.css";

export const Waveform = ({ audio }) => {
	const containerRef = useRef();
	const waveSurferRef = useRef({
		isPlaying: () => false,
	});
	const [isPlaying, toggleIsPlaying] = useState(false);
	const [audioRate, setAudioRate] = useState(1);
	const [speedText, setSpeedText] = useState("Rýchlost: Normálna");

	useEffect(() => {
		const waveSurfer = WaveSurfer.create({
			container: containerRef.current,
			audioRate: audioRate,
			responsive: true,
			barWidth: 0,
			barHeight: 2,
			cursorWidth: 2,
			progressColor: "#D6D5C9",
			waveColor: "#B9BAA3",
		});
		waveSurfer.loadBlob(audio);
		waveSurfer.on("ready", () => {
			waveSurferRef.current = waveSurfer;
		});
		waveSurfer.on("finish", () => {
			toggleIsPlaying(false);
		});
		return () => {
			waveSurfer.destroy();
		};
	}, [audio, audioRate]);

	const handlePlayPause = () => {
		waveSurferRef.current.playPause();
		toggleIsPlaying(waveSurferRef.current.isPlaying());
	};

	const handleAudioRate = () => {
		setAudioRate(audioRate === 1 ? 0.8 : 1);
		setSpeedText(
			audioRate === 1 ? "Rýchlost: Pomalšia" : "Rýchlost: Normálna"
		);
	};

	return (
		<div className="waveform-wrapper">
			<div ref={containerRef} className="waveform" />

			<div className="button-wrapper">
				<div className="sound-button">
					{isPlaying ? (
						<IconButton
							className="base-button-1"
							onClick={handlePlayPause}
							color="primary"
							size="large"
						>
							<PauseCircleIcon fontSize="inherit" />
						</IconButton>
					) : (
						<IconButton
							className="base-button-1"
							onClick={handlePlayPause}
							color="primary"
							size="large"
						>
							<PlayCircleIcon fontSize="inherit" />
						</IconButton>
					)}
				</div>
				<div className="speed-button">
					<Button className="base-button-1" onClick={handleAudioRate}>
						{speedText}
					</Button>
				</div>
			</div>
		</div>
	);
};

Waveform.propTypes = {
	audio: PropTypes.object.isRequired,
};
