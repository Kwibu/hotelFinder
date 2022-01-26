/** @format */

import classes from "./Header.module.css";
import React, { useState } from "react";
import BurgerButton from "../UI/BurgerButton";
import { Logo } from "../UI/Logo";
import ToolBar from "../UI/Modal";
import NavigationItems from "../NavigationItems/NaviagtionItems";
import WideNav from "../NavigationItems/WideNav";

function Header(props) {
  const [isShown, setIsShown] = useState(false);

  const isModalShown = () => {
    setIsShown(true);
  };
  const isModalHide = () => {
    setIsShown(false);
  };

  return (
    <div className={classes.Header}>
      {isShown && (
        <ToolBar onClose={isModalHide}>
          <NavigationItems onClose={isModalHide} {...props} />
        </ToolBar>
      )}
      <BurgerButton clicked={() => isModalShown()} />
      <Logo />
      <WideNav {...props} />
    </div>
  );
}
export default Header;
