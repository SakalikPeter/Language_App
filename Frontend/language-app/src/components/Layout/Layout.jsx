import React from "react";

import { NavSidebar } from "../NavSidebar/NavSidebar";
import BodyWrapper from "../BodyWrapper/BodyWrapper";

export const DashboardLayout = ({ children }) => {
	return (
		<BodyWrapper>
			<NavSidebar />
			{children}
		</BodyWrapper>
	);
};
