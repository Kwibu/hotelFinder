/** @format */

import React from "react";
import NavigationItem from "./WideItem";
import "./NavigationItems.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";

import {
  faHome,
  faFileContract,
  faPhoneVolume,
  faSignInAlt,
  faSignOutAlt,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

export default function WideNav(props) {
  const navigationItemsArray = [
    { link: "/", itemTitle: "Home", icon: faHome, login: "" },
    {
      link: "/aggrements",
      itemTitle: "Aggrements",
      icon: faFileContract,
      login: "",
    },
    {
      link: "/contact-us",
      itemTitle: "Contact Us",
      icon: faPhoneVolume,
      login: "",
    },
    {
      link: "/authenticate",
      itemTitle: "Login",
      icon: faSignInAlt,
      login: true,
    },
    {
      link: "/dashboard",
      itemTitle: "Dashboard",
      icon: faChartLine,
      login: false,
    },
    { link: "/logout", itemTitle: "Logout", icon: faSignOutAlt, login: false },
  ];
  const history = useHistory();

  const element = (item, i) => (
    <NavigationItem key={i} onClose={props.onClose} icon={item.icon}>
      <Link to={item.link}>{item.itemTitle}</Link>
    </NavigationItem>
  );

  const restricted = (item, i) => {
    let template = null;

    if (props.user === null && item.login) {
      template = element(item, i);
    }
    if (props.user !== null && !item.login) {
      if (item.link === "/logout") {
        template = (
          <div
            key={i}
            onClick={() => {
              auth.signOut().then(() => {
                history.push("/login");
              });
            }}
          >
            <NavigationItem onClose={props.onClose} icon={item.icon}>
              {item.itemTitle}
            </NavigationItem>
          </div>
        );
      } else {
        template = element(item, i);
      }
    }
    return template;
  };

  const navigations = () =>
    navigationItemsArray.map((item, i) =>
      item.login !== "" ? restricted(item, i) : element(item, i)
    );

  return <div className="NavigationItemWide">{navigations()}</div>;
}
