import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect, useHistory } from "react-router-dom";
import classes from "./SideMenuBar.module.css";
import { auth } from "../../../../firebase";
import {
  faSignOutAlt,
  faHome,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const items = [
  {
    name: "Back Home ",
    icon: faHome,
    link: "/",
  },
  {
    name: "Messages",
    icon: faEnvelope,
    link: "/dashbooard/message",
  },
  {
    name: "Logout",
    icon: faSignOutAlt,
    link: "/login",
  },
];

export default function SideMenuBar() {
  const history = useHistory();
  const logoutHandler = () => {
    auth
      .signOut()
      .then(() => {
        history.replace("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  let navigationItems;
  const navItems = items.map((item, i) => {
    if (item.name === "Logout") {
      navigationItems = (
        <div key={i} onClick={logoutHandler} className={classes.SignOut}>
          <div className={classes.SideMenu}>
            <FontAwesomeIcon icon={item.icon} /> {item.name}
          </div>
        </div>
      );
    } else
      navigationItems = (
        <div key={i}>
          <Link to={item.link}>
            <div className={classes.SideMenu}>
              <FontAwesomeIcon icon={item.icon} /> {item.name}
            </div>
          </Link>
        </div>
      );
    return navigationItems;
  });
  return <Fragment>{navItems}</Fragment>;
}
