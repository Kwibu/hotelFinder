import React from "react";
import classes from ".//Subscribe.module.css";
import paymentPic from "../../assets/Illustrations/Group 70.png";

export default function Subscribe() {
  return (
    <div>
      <p className={classes.headerRenew}>Renew the subscription</p>
      <div className={classes.SubscribeIllustration}>
        <img src={paymentPic} alt={paymentPic} />
      </div>
      <div className={classes.subscriptionSubtitle}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
        blanditiis quo eos, minus nostrum est optio iusto, aliquid magni id,
        earum
      </div>
      <div className={classes.paymentPrice}>
        Only payment is <strong> 10,000 RWF per 30 days</strong>
      </div>
      <form action="">
        <input type="text" />
      </form>
    </div>
  );
}
