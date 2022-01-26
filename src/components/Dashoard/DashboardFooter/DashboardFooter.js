/** @format */

import React, { Fragment, useState } from "react";
import "../Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faHome,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useHistory } from "react-router-dom";
import { auth } from "../../../firebase";
import Confirm from "../../UI/Confirmation";
import Alert from "../../UI/Messages/Alert";

export default function DashboardFooter() {
  const [isShown, setIsShown] = useState(false);
  const history = useHistory();

  const buttonArray = [
    {
      name: "Dashboard",
      icon: faChartLine,
      color: "#767676",
      link: "/dashboard",
    },
    { name: "Home", icon: faHome, color: "#767676", link: "/" },

    { name: "Logout", icon: faSignOutAlt, color: "#767676", link: "" },
  ];

  const onOpenModal = () => {
    setIsShown(true);
  };
  const onCloseHandler = () => {
    setIsShown(false);
  };

  const logoutButtonClickedHandler = () => {
    auth.signOut().then(() => {
      history.replace("/login");
    });
    setIsShown(false);
  };

  const footer = buttonArray.map((button, i) => {
    let buttonFooter;
    if (button.name === "Logout") {
      buttonFooter = (
        <div key={i} className="button-footer" onClick={onOpenModal}>
          <p style={{ color: button.color, fontSize: "20px" }}>
            <FontAwesomeIcon icon={button.icon} />
          </p>
          <p style={{ color: button.color }}>{button.name}</p>
        </div>
      );
    } else {
      buttonFooter = (
        <div key={i} className="button-footer">
          <NavLink activeClassName="active" to={button.link}>
            <p style={{ color: button.color, fontSize: "20px" }}>
              <FontAwesomeIcon icon={button.icon} />
            </p>
            <p style={{ color: button.color }}>{button.name}</p>
          </NavLink>
        </div>
      );
    }
    return buttonFooter;
  });

  return (
    <Fragment>
      {isShown && (
        <Confirm onClose={onCloseHandler}>
          <Alert
            confirmClicked={logoutButtonClickedHandler}
            cancelClicked={onCloseHandler}
            message="Do you really want to logout?"
            buttonName="Yes"
          />
        </Confirm>
      )}
      <div className="button-footer-container">{footer}</div>
    </Fragment>
  );
}
