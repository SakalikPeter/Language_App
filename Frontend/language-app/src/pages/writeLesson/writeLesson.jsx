import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../components/Layout/Layout.jsx";
import { fetchSentences } from "../../apis/sentences.jsx";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { WriteCard } from "../../components/WriteCard/WriteCard.jsx";
import { HorizontalLinearStepper } from "../../components/Stepper/Stepper.jsx";
import { LessonSetting } from "../../components/LessonSetting/LessonSetting.jsx";
import { TextChecker } from "../../components/TextChecker/TextChecker.jsx";
import "./writeLesson.css";

const WriteLesson = () => {
	const { selectedItem } = useParams();
	const [sentences, setSentences] = useState(null);
	const [index, setIndex] = useState();
	const [isSetting, setIsSetting] = useState(false);
	const [level, setLevel] = useState("");
	const [vocabulary, setVocabulary] = useState([]);
	const [isQuestion, setIsQuestion] = useState(false);
	const [isNegative, setIsNegative] = useState(false);
	const [summary, setSummary] = useState([]);
	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		if (isSetting) {
			try {
				fetchSentences(
					selectedItem,
					level,
					vocabulary,
					isQuestion,
					isNegative
				)
					.then((response) => {
						setSentences(response);
						setIndex(0);
						setSummary(new Array(response.length).fill(null));
						setAnswers(new Array(response.length).fill(null));
						setIsSetting(false);
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
		}
	}, [isSetting]);

	const checkUserInput = (userInput) => {
		const isAnswerCorrect = TextChecker(sentences[index], userInput);
		setSummary((prevSummary) => {
			const newSummary = [...prevSummary];
			newSummary[index] = isAnswerCorrect;
			return newSummary;
		});
		setAnswers((prevAnswers) => {
			const newAnswers = [...prevAnswers];
			newAnswers[index] = isAnswerCorrect;
			return newAnswers;
		});
	};

	const getVocabulary = (level, vocabulary, isQuestion, isNegative) => {
		setLevel(level);
		setVocabulary(vocabulary);
		setIsQuestion(isQuestion);
		setIsNegative(isNegative);
		setIsSetting(true);
	};

	return (
		<DashboardLayout>
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={isSetting}
			>
				<CircularProgress color="inherit" />
			</Backdrop>

			{sentences === null ? (
				<LessonSetting getVocabulary={getVocabulary} />
			) : (
				<div className="lesson-content">
					<WriteCard
						sentence={sentences[index]}
						index={index}
						total={sentences.length}
						summary={summary}
						checkUserInput={checkUserInput}
						setIndex={setIndex}
						answer={answers[index]}
					/>
					<HorizontalLinearStepper
						answers={answers}
						setIndex={setIndex}
					/>
				</div>
			)}
		</DashboardLayout>
	);
};

export default WriteLesson;
