import React, { useState, useEffect } from "react";
import { handleTextSpeech } from "../TextToSpeech/TextToSpeech.jsx";
import { Waveform } from "../Waveform/Waveform.jsx";
import { PreviousItem } from "../PreviousItem/PreviousItem.tsx";
import { NextItem } from "../NextItem/NextItem.tsx";
import { SummaryDialog } from "../SummaryDialog/SummaryDialog.tsx";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TranslateIcon from "@mui/icons-material/Translate";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./WriteCard.css";
import { Box } from "@mui/material";

export const WriteCard = (props) => {
	const [audio, setAudio] = useState(null);
	const [text, setText] = useState("");
	const [bgColor, setBGColor] = useState("");
	const [showPassword, setShowPassword] = React.useState(false);

	useEffect(() => {
		handleTextSpeech(props.sentence).then((response) => {
			setAudio(response);
		});
		setText("");
	}, [props.sentence]);

	useEffect(() => {
		if (props.answer === true) setBGColor("rgb(239, 248, 237)");
		else if (props.answer === false) setBGColor("rgb(254, 235, 235)");
		else setBGColor("");
	}, [props.answer]);

	const handleChange = (event) => {
		setText(event.target.value);
	};

	const handleUserInput = () => {
		props.checkUserInput(text);
	};

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
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

							<Typography className="typography-translate">
								<IconButton
									className="base-button-1"
									sx={{ mr: "2%" }}
									size="medium"
								>
									<CreateIcon />
								</IconButton>
								<Input
									className="user-input"
									fullWidth
									variant="outlined"
									value={text}
									onChange={handleChange}
								/>
							</Typography>
						</CardContent>
					)}
					<CardActions className="card-actions">
						<div>
							<PreviousItem
								index={props.index}
								setIndex={props.setIndex}
								isLoading={false}
							/>

							<Button
								className="base-button-1"
								size="medium"
								onClick={handleUserInput}
							>
								Skontroluj
							</Button>

							<NextItem
								index={props.index}
								maxIndex={props.total}
								setIndex={props.setIndex}
								isLoading={false}
							/>
						</div>
						<div>
							<SummaryDialog
								summary={props.summary}
								isLoading={false}
							/>
						</div>
					</CardActions>
				</Card>
			</div>
		</Box>
	);
};
