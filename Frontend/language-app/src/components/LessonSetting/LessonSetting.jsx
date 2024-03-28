import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import { fetchLevels } from "../../apis/sentences";
import { fetchCategories } from "../../apis/sentences";
import Popper from "@mui/material/Popper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import "./LessonSetting.css";
import { Divider } from "@mui/material";

export const LessonSetting = ({ getVocabulary }) => {
	const [levels, setLevels] = React.useState([]);
	const [categories, setCategories] = React.useState([]);
	const [sentenceType, setSentenceType] = React.useState("positive sentence");
	const [sentenceMood, setSentenceMood] = React.useState("positive");
	const [isLevelEmpty, setIsLevelEmpty] = React.useState(false);
	const [isCategoryEmpty, setIsCategoryEmpty] = React.useState(false);
	const navigate = useNavigate();

	React.useEffect(() => {
		try {
			fetchLevels()
				.then((response) => {
					setLevels(response);
				})
				.catch((error) => {
					console.error("Error fetching sentences:", error);
				})
				.finally(() => {});
		} catch (error) {
			// Handle any synchronous errors here
		} finally {
			// Code to execute after the try block, regardless of success or failure
		}
		try {
			fetchCategories()
				.then((response) => {
					setCategories(response);
				})
				.catch((error) => {
					console.error("Error fetching sentences:", error);
				})
				.finally(() => {});
		} catch (error) {
			// Handle any synchronous errors here
		} finally {
			// Code to execute after the try block, regardless of success or failure
		}
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());
		const level = formJson.level;
		const vocabulary = formJson.vocabulary;

		if (level && vocabulary) {
			getVocabulary(level, vocabulary, sentenceType, sentenceMood);
		} else {
			setIsLevelEmpty(!level);
			setIsCategoryEmpty(!vocabulary);
		}
	};

	const handleSentenceChange = (event) => {
		setSentenceType(event.target.value);
	};

	const handleMoodChange = (event) => {
		setSentenceMood(event.target.value);
	};

	const handleClose = () => {
		navigate(-1);
	};

	return (
		<React.Fragment>
			<Box className="lesson-setting-wrapper">
				<form className="lesson-setting-form" onSubmit={handleSubmit}>
					<div className="lesson-setting-content">
						<h3 className="title-text">
							Nastavenie urovne a slovicok
						</h3>
						<Autocomplete
							className="autocomplete-search"
							disablePortal
							options={levels}
							renderInput={(params) => (
								<TextField
									error={isLevelEmpty}
									className="TextField"
									{...params}
									label="Úroveň"
									name="level"
								/>
							)}
						/>
						<FormHelperText className="helper-text">
							*Povinné
						</FormHelperText>

						<Autocomplete
							className="autocomplete-search"
							disablePortal
							options={categories}
							getOptionLabel={(option) => option}
							PopperComponent={(params) => (
								<Popper {...params}>{params.children}</Popper>
							)}
							renderInput={(params) => (
								<TextField
									error={isCategoryEmpty}
									className="TextField"
									{...params}
									label="Slovíčka"
									name="vocabulary"
								/>
							)}
						/>
						<FormHelperText className="helper-text">
							*Povinné
						</FormHelperText>

						<FormLabel className="radio-text">Druh vety:</FormLabel>
						<RadioGroup
							className="radio-group"
							value={sentenceType}
							onChange={handleSentenceChange}
						>
							<FormControlLabel
								value="positive sentence"
								control={<Radio />}
								label="Veta"
							/>
							<FormControlLabel
								value="Yes/No question"
								control={<Radio />}
								label="Áno/Nie otázka"
							/>
							<FormControlLabel
								value="'Wh' question"
								control={<Radio />}
								label="'Wh' otázka"
							/>
						</RadioGroup>
						<Divider className="divider" />
						<FormLabel className="radio-text">
							Sposôb vety:
						</FormLabel>
						<RadioGroup
							className="radio-group"
							value={sentenceMood}
							onChange={handleMoodChange}
						>
							<FormControlLabel
								value="positive"
								control={<Radio />}
								label="Pozitívna"
							/>
							<FormControlLabel
								value="negative"
								control={<Radio />}
								label="Negatívna"
							/>
						</RadioGroup>
					</div>
					<div className="lesson-setting-action-wrapper">
						<div className="lesson-setting-action">
							<Button
								className="base-button-1"
								onClick={handleClose}
							>
								Zrušiť
							</Button>
							<Button className="base-button-1" type="submit">
								Štart
							</Button>
						</div>
					</div>
				</form>
			</Box>
		</React.Fragment>
	);
};
