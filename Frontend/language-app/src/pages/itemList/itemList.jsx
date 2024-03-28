import React from "react";
import { DashboardLayout } from "../../components/Layout/Layout";
import { CardGenerator } from "../../components/CardGenerator/CardGenerator";
import { useNavigate } from "react-router-dom";
import { SearchField } from "../../components/SearchField/SearchField";
import { fetchLessons } from "../../apis/sentences";
import "./ItemList.css";

const ItemList = ({ title }) => {
	const navigate = useNavigate();
	const [items, setItems] = React.useState([]);
	const [categories, setCategories] = React.useState([]);
	const [filteredItems, setFilteredItems] = React.useState([]);

	React.useEffect(() => {
		try {
			fetchLessons()
				.then((response) => {
					setItems(response);
					setCategories([
						...new Set(response.map((element) => element.category)),
					]);
					setFilteredItems(response);
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

	const filterCategory = (category) => {
		if (category === "") {
			setFilteredItems(items.map((item) => item));
		} else {
			setFilteredItems(
				items.filter((item) => item.category === category)
			);
		}
	};

	return (
		<DashboardLayout>
			<div className="item-list-wrapper">
				<SearchField
					categories={categories}
					filterCategory={filterCategory}
				/>
				<CardGenerator
					items={filteredItems}
					onListItemClick={(data) =>
						navigate(`/${title}/${data.item.name}`)
					}
				/>
			</div>
		</DashboardLayout>
	);
};

export default ItemList;
