import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./CardGenerator.css";

export const CardGenerator = ({ items, onListItemClick }) => {
	useEffect(() => {
		renderCardItems();
	}, [items]);

	const renderCardItems = () => {
		return items.map((item, index) => (
			<React.Fragment key={index}>
				<div className="CardContainer">
					<Card>
						<CardContent className="CardContent">
							<Typography
								sx={{ fontSize: 14 }}
								color="text.secondary"
								gutterBottom
							>
								{item.category}
							</Typography>
							<Typography variant="h5" component="div">
								{item.name}
							</Typography>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								{item.subcategory}
							</Typography>
							<Typography variant="body2">
								{item.description}
							</Typography>
						</CardContent>
						<CardActions className="CardActions">
							<Button
								className="base-button-1"
								size="small"
								onClick={(event) =>
									handleListItemClick(event, item)
								}
							>
								Začať Lekciu
							</Button>
						</CardActions>
					</Card>
				</div>
			</React.Fragment>
		));
	};

	const handleListItemClick = (event, item) => {
		const data = {
			isSelected: true,
			item: item,
		};

		// Call the callback function passed from the parent component
		onListItemClick(data);
	};

	return <Box className="CardGenerator">{renderCardItems()}</Box>;
};
