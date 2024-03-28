import axios from "axios";

export const fetchSentences = async (
	grammar,
	level,
	category,
	sentenceType,
	sentenceMood
) => {
	grammar = `grammar=${grammar}&`;
	level = `level=${level}&`;
	category = `category=${category}&`;
	sentenceType = `sentence_type=${sentenceType}&`;
	sentenceMood = `sentence_mood=${sentenceMood}`;
	const url = `http://127.0.0.1:8000/sentences?${grammar}${level}${category}${sentenceType}${sentenceMood}`;
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

export const fetchLevels = async () => {
	const url = "http://127.0.0.1:8000/levels";
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

export const fetchCategories = async () => {
	const url = "http://127.0.0.1:8000/categories";
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

export const fetchLessons = async () => {
	const url = "http://127.0.0.1:8000/lessons";
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};
