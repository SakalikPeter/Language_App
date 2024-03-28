const removeSpecialCharacters = (str) => {
	return str.replace(/[^a-zA-Z ]/g, "");
};

export const TextChecker = (sentence, userInput) => {
	sentence = removeSpecialCharacters(sentence).toLowerCase();
	userInput = removeSpecialCharacters(userInput).toLowerCase();
	return sentence === userInput ? true : false;
};
