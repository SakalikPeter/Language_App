import * as React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { Grid, IconButton } from "@mui/material";

import "./Stepper.css";

export const HorizontalLinearStepper = ({ answers, setIndex }) => {
	const steps = Array.from(
		{ length: answers.length },
		(_, index) => index + 1
	);

	const handleButtonClick = (key) => {
		setIndex(key);
	};

	const renderIcon = (value) => {
		switch (value) {
			case true:
				return <CheckIcon sx={{ color: "green" }} />;
			case false:
				return <CloseIcon sx={{ color: "red" }} />;
			case null:
				return <DoNotDisturbIcon sx={{ color: "gray" }} />;
			default:
				return null;
		}
	};

	// Function to render rows of icon buttons
	const renderRows = () => {
		const rows = [];
		for (let i = 0; i < answers.length; i += 10) {
			const rowValues = answers.slice(i, i + 10);
			const row = (
				<Grid className="stepper-grid" container spacing={3} key={i}>
					{rowValues.map((value, index) => (
						<Grid item key={index}>
							<IconButton
								className="base-button-1"
								color="primary"
								onClick={() => handleButtonClick(i + index)}
							>
								{renderIcon(value)}
							</IconButton>
							<div style={{ textAlign: "center" }}>
								{i + index + 1}
							</div>
						</Grid>
					))}
				</Grid>
			);
			rows.push(row);
		}
		return rows;
	};

	return <div>{renderRows()}</div>;
};
