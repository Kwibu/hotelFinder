import React, { Fragment, useCallback, useEffect, useState } from "react";
import Modal from "../components/UI/ViewsModal";
import Payment from "../components/Dashoard/Payment/SubscriptionPayment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "../firebaseInstance";
const promise = loadStripe(
  "pk_test_51IzTnSDRYQok9NIfaDcp3gdGSx43hH6urrnlNTo1P8Hv4TiW4OxWuE5kQ6UhYXw0X40JbKwsKKojcHdovDXTcuXH00dcYoEVaz"
);

const withErrorSubscription = (WrappedComponent) => {
  return (props) => {
    const [subscriptionDays, setSubscription] = useState(1);
    const [subsId, setSubId] = useState("");

    const subscriptionFromDB = useCallback(async () => {
      const response = await axios.get("/Subscription.json");
      const data = await response.data;
      let filteredData = {};
      if (props.user) {
        for (let i in data) {
          if (data[i].userId === props.user.uid) {
            setSubId(i);
            filteredData = {
              ...data[i],
              toDay: new Date().toString(),
            };
          }
        }
      }

      if (filteredData !== undefined) {
        console.log(filteredData);
      }

      let timeInMilisec =
        new Date(filteredData.endDate).getTime() -
        new Date(filteredData.toDay).getTime();
      let daysBetweenDates = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
      console.log(daysBetweenDates);

      setSubscription(daysBetweenDates);
    }, [props.user]);

    useEffect(() => {
      subscriptionFromDB();
    }, [subscriptionFromDB]);

    console.log(subscriptionDays);
    console.log(subsId);

    return (
      <Fragment>
        {subscriptionDays <= 0 && (
          <Modal>
            <Elements stripe={promise}>
              <Payment {...props} subscribeId={subsId} />
            </Elements>
          </Modal>
        )}
        <WrappedComponent {...props} />;
      </Fragment>
    );
  };
};

export default withErrorSubscription;
