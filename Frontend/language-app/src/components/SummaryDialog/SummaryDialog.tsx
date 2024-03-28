import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "./SummaryDialog.css";

export const SummaryDialog = ({ summary, isLoading }) => {
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
	const navigate = useNavigate();

	const correctAnswers = summary.filter((answer) => answer === true).length;
	const wrongAnswers = summary.filter((answer) => answer === false).length;
	const noAnswers = summary.filter((answer) => answer === null).length;

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleRepeat = () => {
		setOpen(false);
		navigate(0);
	};

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
	};

	return (
		<React.Fragment>
			<Button
				className="base-button-1"
				disabled={isLoading}
				onClick={handleClickOpen}
			>
				Zhrnutie
			</Button>
			<Dialog
				className="SummaryDialog"
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogContent className="summary-content">
					<DialogTitle className="responsive-dialog-title">
						<p>{"Zhrnutie lekcie"}</p>
					</DialogTitle>
					<DialogContentText className="dialogContentText">
						<p>
							Správné odpovede: {correctAnswers} <br />
							Nesprávné odpovede: {wrongAnswers} <br />
							Bez odpovede: {noAnswers}
						</p>
					</DialogContentText>
				</DialogContent>
				<DialogActions className="summary-dialog-action">
					<Button
						onClick={handleClose}
						autoFocus
						className="base-button-1"
					>
						Zatvoriť
					</Button>
					<Button
						autoFocus
						onClick={handleRepeat}
						className="base-button-1"
					>
						Opakovať
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};
