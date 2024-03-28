import React, { useState, useEffect } from "react";
import { SpeechRecorder } from "../SpeechRecorder/SpeechRecorder.jsx";
import { handleTextSpeech } from "../TextToSpeech/TextToSpeech.jsx";
import { Waveform } from "../Waveform/Waveform.jsx";
import { PreviousItem } from "../PreviousItem/PreviousItem.tsx";
import { NextItem } from "../NextItem/NextItem.tsx";
import { SummaryDialog } from "../SummaryDialog/SummaryDialog.tsx";

import { Box } from "@mui/material";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import TranslateIcon from "@mui/icons-material/Translate";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./SpeechCard.css";

export const SpeechCard = (props) => {
	const [audio, setAudio] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [bgColor, setBGColor] = useState("");
	const [showPassword, setShowPassword] = React.useState(false);
	const [userInput, setUserInput] = React.useState("");

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	useEffect(() => {
		setUserInput("");
		handleTextSpeech(props.sentence).then((response) => {
			setAudio(response);
		});
	}, [props.sentence]);

	useEffect(() => {
		if (props.answer === true) setBGColor("rgb(239, 248, 237)");
		else if (props.answer === false) setBGColor("rgb(254, 235, 235)");
		else setBGColor("");
	}, [props.answer]);

	const handleUserInput = (userInput) => {
		setUserInput(userInput);
	};

	const handleTextArea = (event) => {
		setUserInput(event.target.value);
	};

	const checkUserInput = () => {
		props.checkUserInput(userInput);
	};

	return (
		<Box className="card-generator">
			<div className="card-wrapper">
				<Card sx={{ backgroundColor: bgColor }}>
					{audio && (
						<CardContent className="card-content">
							<Typography
								className="typography-stepper"
								color="text.secondary"
							>
								<p>
									Veta: {props.index + 1}/{props.total}
								</p>
							</Typography>

							<Typography>
								<Waveform audio={audio} />
							</Typography>

							<Typography
								className="typography-translate"
								sx={{ mb: "2%" }}
							>
								<IconButton
									className="base-button-1"
									sx={{ mr: "2%" }}
									size="medium"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
								>
									{showPassword ? (
										<VisibilityOff />
									) : (
										<TranslateIcon />
									)}
								</IconButton>
								<Input
									className="translate-input"
									fullWidth
									disabled
									type={showPassword ? "text" : "password"}
									value={props.sentence}
								/>
							</Typography>

							<Typography className="typography-recording">
								{isLoading ? (
									<CircularProgress
										sx={{
											color: "#A22C29",
										}}
									/>
								) : (
									<SpeechRecorder
										isLoading={isLoading}
										setIsLoading={setIsLoading}
										handleUserInput={handleUserInput}
									/>
								)}
								<TextField
									sx={{ ml: "2%" }}
									maxRows={4}
									className="text-userinput"
									fullWidth
									variant="standard"
									value={userInput}
									onChange={handleTextArea}
								/>
							</Typography>
						</CardContent>
					)}
					<CardActions className="card-actions">
						<div>
							<PreviousItem
								index={props.index}
								setIndex={props.setIndex}
								isLoading={isLoading}
							/>
							<Button
								className="base-button-1"
								size="medium"
								onClick={checkUserInput}
							>
								Skontroluj
							</Button>
							<NextItem
								index={props.index}
								maxIndex={props.total}
								setIndex={props.setIndex}
								isLoading={isLoading}
							/>
						</div>

						<div>
							<SummaryDialog
								summary={props.summary}
								isLoading={isLoading}
							/>
						</div>
					</CardActions>
				</Card>
			</div>
		</Box>
	);
};
