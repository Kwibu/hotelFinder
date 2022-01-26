/** @format */

import React from "react";
import classes from "./Hero.module.css";
import Button from "../UI/Button/Button";
function Hero(props) {
  return (
    <section className={classes.Hero}>
      <div className={classes.Contents}>
        <p className={classes.Main_Title}>
          Shiwell helps and make easy when you need hotels and ones around you
          to access their in easyway and also helps you make reservations on the
          chosen hotel with cheap amount
        </p>
        <p className={classes.SUbtitle}>
          Do you want hotel to rest in? Click Below
        </p>
        <div>
          <Button clicked={props.clicked} btnType="Success">
            View on map
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
