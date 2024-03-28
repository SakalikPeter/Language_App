/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { Navigation } from "react-minimal-side-navigation";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "awesome-react-icons";
import React from "react";
import AutoStories from "@mui/icons-material/AutoStories";
import VoiceChatIcon from "@mui/icons-material/VoiceChat";
import Create from "@mui/icons-material/Create";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import "./NavSidebar.css";

export const NavSidebar = () => {
	const history = useNavigate();
	const location = useLocation();

	return (
		<React.Fragment>
			<div>
				<Navigation
					activeItemId={location.pathname}
					onSelect={({ itemId }) => {
						history(itemId);
					}}
					items={[
						{
							title: "Domov",
							itemId: "/home",
							// Optional
							elemBefore: () => <Icon name="coffee" />,
						},
						{
							title: "Lekcie",
							elemBefore: () => <AutoStories />,
							subNav: [
								{
									title: "Rozprávanie",
									itemId: "/speech",
									// Optional
									elemBefore: () => <VoiceChatIcon />,
								},
								{
									title: "Písanie",
									itemId: "/write",
									// Optional
									elemBefore: () => <Create />,
								},
							],
						},
					]}
				/>

				{/* <div className="absolute bottom-0 w-full my-8">
          <Navigation
            activeItemId={location.pathname}
            items={[
              {
                title: "Settings",
                itemId: "/settings",
                elemBefore: () => <Icon name="activity" />
              }
            ]}
            onSelect={({ itemId }) => {
              history.push(itemId);
            }}
          />
        </div> */}
			</div>
		</React.Fragment>
	);
};
