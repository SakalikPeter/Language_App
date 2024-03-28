import React, { useState, useRef, useEffect } from "react";

import "../styles/communication.css";
import { handleTextSpeech } from "../TextSpeaker";

import { SpeechRecorder } from "./SpeechRecorder";
import { TextSpeaker } from "../TextSpeaker";

import { Dialog, DialogContent, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

export const Chat = (props) => {
	const [messages, setMessages] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
	const [showPopup, setShowPopup] = useState(false);
	const [conversationCompleted, setConversationCompleted] = useState(false);
	const [questions, setSentences] = useState([]);
	const inputRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);

	// Effect called only once when the component is called.
	useEffect(() => {
		setSentences(props.sentences);
		setCurrentQuestionIndex(0);
	}, []);

	// Effect called when the index of question has changed.
	useEffect(() => {
		handleQuestion();
	}, [currentQuestionIndex]);

	// Effect that scroll to bottom when the messages has changed.
	useEffect(() => {
		inputRef.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleAnswer = (userAnswer) => {
		// Init function variables
		const systemQuestion = questions[currentQuestionIndex];
		const isAnswerCorrect =
			userAnswer.toLowerCase() === systemQuestion.toLowerCase();
		// Find the last message from sender 'user'
		const lastUserMessageIndex = messages.length - 1;
		// Check if the last user message was correct or False
		const shouldReplaceLastUserAnswer =
			lastUserMessageIndex !== undefined &&
			messages[lastUserMessageIndex].correct === false &&
			messages[lastUserMessageIndex].sender === "user";
		// Replace text with userAnswer if needed
		const updatedMessages = [...messages];

		if (shouldReplaceLastUserAnswer) {
			updatedMessages[lastUserMessageIndex].text = userAnswer;
			updatedMessages[lastUserMessageIndex].correct = isAnswerCorrect;

			if (isAnswerCorrect) {
				setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
			}
		} else {
			const isAnswerCorrect =
				userAnswer.toLowerCase() === systemQuestion.toLowerCase();
			updatedMessages.push({
				text: userAnswer,
				sender: "user",
				correct: isAnswerCorrect,
			});

			if (isAnswerCorrect) {
				setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
			}
		}

		setMessages(updatedMessages);

		if (currentQuestionIndex === questions.length - 1 && isAnswerCorrect) {
			// Show the pop-up when all questions are answered
			handleOpenPopup();
			setConversationCompleted(true);
		}
	};

	// Handle the change of question
	const handleQuestion = () => {
		// Check:
		//    The questions need to be loaded therefore length > 0
		//    The question can't be change if the answer is loading.
		if (questions.length > 0 && !isLoading) {
			const systemMessage = {
				text: questions[currentQuestionIndex],
				sender: "system",
			};
			setMessages([...messages, systemMessage]);
			handleTextSpeech(questions[currentQuestionIndex]);
		}
	};

	const handleStartAgain = () => {
		setMessages([]);
		setCurrentQuestionIndex(0);
		setConversationCompleted(false);
		setShowPopup(false);
	};

	const handleRenderAnotherQuestion = () => {
		// Check if current question is not the last one.
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
		}
		if (currentQuestionIndex === questions.length - 1) {
			// In case the current question is the last one then
			// show the pop-up window.
			handleOpenPopup();
			setConversationCompleted(true);
		}
	};

	const handleRenderPreviousQuestion = () => {
		if (!isLoading) {
			if (currentQuestionIndex > 0) {
				// Get the index of previous question.
				const prevIndex = currentQuestionIndex - 1;
				// Get the text of previous question.
				const questionText = questions[prevIndex];
				// Find the index of message with same text.
				const messagesIndex = messages.findIndex(
					(message) => message.text === questionText
				);
				// Remove all messages after this item with text.
				const newMessages = messages.slice(0, messagesIndex);

				// Set variables.
				setMessages(newMessages);
				setCurrentQuestionIndex(
					(currentQuestionIndex) => currentQuestionIndex - 1
				);
			}
		} else {
		}
	};

	const handleOpenPopup = () => {
		setShowPopup(true);
	};

	const handleClosePopup = () => {
		setShowPopup(false);
	};

	const handleIsLoading = (state) => {
		if (state) {
			const lastUserMessageIndex = messages.length - 1;
			const shouldReplaceLastUserAnswer =
				lastUserMessageIndex !== undefined &&
				messages[lastUserMessageIndex].correct === false &&
				messages[lastUserMessageIndex].sender === "user";

			// Add loader to communication.
			const loader = {
				text: <CircularProgress />,
				sender: "loader",
				correct: true,
			};
			if (shouldReplaceLastUserAnswer) {
				console.log("i am heere");
				const updatedMessages = [...messages];
				updatedMessages[lastUserMessageIndex] = loader;
				setMessages(updatedMessages);
			} else {
				setMessages([...messages, loader]);
			}
		} else {
			// Remove loaders from communication.
			const updatedMessages = messages.filter(
				(message) => message.sender !== "loader"
			);
			setMessages(updatedMessages);
		}
		setIsLoading(state);
	};

	const renderMessages = () => {
		return messages.map((message, index) => (
			<div
				key={index}
				className={`message ${message.sender}`}
				style={{
					backgroundColor:
						message.sender === "user"
							? message.correct
								? "green"
								: "red"
							: "",
				}}
			>
				{message.text}
			</div>
		));
	};

	return (
		<div className="chat-container communication-container">
			<div className="chat-messages">
				{renderMessages()}
				<div ref={inputRef}></div>
			</div>
			<div className="chat-input">
				<IconButton
					onClick={handleRenderPreviousQuestion}
					color="primary"
					size="large"
				>
					<ArrowBackIosIcon />
				</IconButton>
				<TextSpeaker systemMessage={questions[currentQuestionIndex]} />
				<SpeechRecorder
					isLoading={isLoading}
					setIsLoading={handleIsLoading}
					sendDataToParent={handleAnswer}
				/>
				<IconButton
					onClick={handleRenderAnotherQuestion}
					color="primary"
					size="large"
				>
					<ArrowForwardIosIcon />
				</IconButton>
			</div>

			<Dialog open={showPopup} onClose={handleClosePopup}>
				<DialogContent>
					{conversationCompleted ? (
						<>
							<p>You've answered all the questions. Thank you!</p>
							<Button
								variant="outlined"
								onClick={handleStartAgain}
							>
								Start Again
							</Button>
						</>
					) : null}
				</DialogContent>
			</Dialog>
		</div>
	);
};
