import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./home/home";
import SpeechLesson from "./speechLesson/speechLesson";
import WriteLesson from "./writeLesson/writeLesson";
import ItemList from "./itemList/itemList";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/home" element={<HomePage />} />
				<Route
					path="/speech/:selectedItem"
					element={<SpeechLesson />}
				/>
				<Route path="/speech" element={<ItemList title="speech" />} />
				<Route
					path="/write/:selectedItem"
					element={<WriteLesson title="write" />}
				/>
				<Route path="/write" element={<ItemList title="write" />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
