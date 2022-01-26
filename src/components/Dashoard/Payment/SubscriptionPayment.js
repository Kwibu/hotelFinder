/** @format */

import React, { useState, useEffect, useCallback } from "react";
import paymentSVG from "../../../assets/Illustrations/Group 70.png";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import axios_front from "../../../firebaseInstance";
import "./Payment.css";
import "../../BookingSteps/input.css";
import Button from "../../UI/Button/Button";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";

export default function Payment({ user, subscribeId }) {
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [proccessing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);
  const [userData, setUserData] = useState({});
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  //.....................................................................................

  let TOTAL_PAYMENT = 100000;

  //   console.log(userData);

  const userHandler = useCallback(() => {
    axios_front.get("users.json").then((response) => {
      let userResponses = [];
      for (let i in response.data) {
        userResponses.push(response.data[i]);
      }
      let filteredUser;
      userResponses.filter((userObj) => {
        if (user.uid === userObj.id) {
          filteredUser = {
            userName: userObj.fullName,
            email: userObj.email,
            paymentId: user.uid,
          };
        }
      });
      setUserData(filteredUser);
    });
  }, [user.uid]);

  var nowDay = new Date();
  var priorDate = new Date().setDate(nowDay.getDate() + 30);
  //   console.log(new Date(priorDate));

  useEffect(() => {
    userHandler();
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `http://localhost:5001/hotel-finder-34fbd/us-central1/api/payments/create?total=${
          TOTAL_PAYMENT * 100
        }`,
      });

      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [TOTAL_PAYMENT]);

  console.log("THE SECRET IS >>>", clientSecret);

  //................................................................

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //PaymentIntent = payment confirmation
        setError(null);
        setProcessing(true);
      })
      .then(() => {
        setProcessing(true);
        axios_front
          .post("payments.json", {
            date: new Date().toISOString(),
            paymentTotal: TOTAL_PAYMENT,
            ...userData,
          })
          .then((response) => {
            setSucceeded(true);
            setProcessing(false);
            setError(null);
          })
          .then(() => {
            fetch(
              "http://localhost:5001/hotel-finder-34fbd/us-central1/api/paymentsuccess",
              {
                method: "POST",
                body: JSON.stringify(userData),
                headers: { "Content-Type": "application/json" },
              }
            )
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                setIsLoading(false);
                axios_front
                  .patch(`/Subscription/${subscribeId}.json`, {
                    amount: 10000,
                    endDate: new Date(priorDate),
                    startDate: new Date(),
                    userId: userData.paymentId,
                  })
                  .then(() => {
                    history.push("/dashboard.json");
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          });
      });
  };
  //...............................................................

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  //..................................................

  return (
    <div className="Payment-Create__hotel">
      <div className="payment-title">Payment</div>
      <div className="image-svg-payment">
        <img src={paymentSVG} alt={paymentSVG} />
      </div>
      <div className="advice-payment">
        Inorder to continue managing your application you must have pay money
        for subscription every month shiwell is app thaw will help you to make
        your hotel be visitable by alot of people
      </div>
      <p className="total-upladcar-payment">
        Price is
        <CurrencyFormat
          value={10000}
          displayType={"text"}
          thousandSeparator={true}
          prefix={" RWF "}
        />
      </p>
      <form onSubmit={handleSubmit} action="">
        <div className="control-group">
          <div className="form-control ">
            <label htmlFor="Full Name" className="cardNumber-title">
              Card number
            </label>
            <div className="payment-gateway">
              <CardElement onChange={handleChange} />
            </div>
            <div className="ButtonContainer">
              <Button
                disabled={proccessing || disabled || succeeded}
                btnType="Success"
              >
                {proccessing ? <p>Proccessing</p> : "Pay And Continue"}
              </Button>
              {error && <p>{error} </p>}
            </div>
          </div>
        </div>
      </form>
      <Button btnType="Danger">Cancel</Button>
    </div>
  );
}
