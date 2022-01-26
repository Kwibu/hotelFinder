import React, { useEffect, useState, useCallback } from "react";
import SectionBookingTitle from "./SectionBookingTitle";
import PaySVG from "../../assets/Illustrations/Capture.png";
import Button from "../UI/Button/Button";
import CurrencyFormat from "react-currency-format";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import axios_f from "../../firebaseInstance";

export default function CustomerPayment(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [proccessing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);
  const [currency, setCurrency] = useState({});

  const dollarConverter = useCallback(() => {
    axios
      .get(
        "http://data.fixer.io/api/latest?access_key=d72e3baff8b389dc757a721812ff6a1e"
      )

      .then((response) => {
        console.log(response.data.rates);
        let currency;
        for (let i in response.data.rates) {
          currency = {
            dollar: response.data.rates.USD,
            amafranga: response.data.rates.RWF,
            euro: response.data.rates.EUR,
          };
          setCurrency(currency);

          return currency;
        }
      });
  }, []);

  const { roomObject } = props;
  let roomObj = null;
  for (let i in roomObject) {
    roomObj = roomObject[i];
  }
  console.log(roomObj);

  let totalPayment =
    +props.customerInformation.daysBetween *
    +props.customerInformation.roomNeededValue *
    +props.choosenRoomPriceData;

  const { customerInformation } = props;

  const bookingInfoObject = {
    date: new Date().toISOString(),
    book_id: customerInformation.enteredPhoneNumberValue + Math.random(),
    number_of_adult: customerInformation.NumberOfAdultValue,
    number_of_children: customerInformation.NumberOfChildrenValue,
    day_to_stay: customerInformation.daysBetween,
    address: customerInformation.enteredAddressValue,
    country: customerInformation.enteredCountryValue,
    full_names: customerInformation.enteredFullNameValue,
    email: customerInformation.enteredEmailValue,
    phone_number: customerInformation.enteredPhoneNumberValue,
    town: customerInformation.enteredTownValue,
    entering_date: customerInformation.enteringDateValue,
    leaving_date: customerInformation.leavingDateValue,
    room_needed: customerInformation.roomNeededValue,
    total_payment: totalPayment,
    hotel_room_id: roomObj.hotelRoomId,
    hotel_id: roomObj.hotel_id,
    room_type: roomObj.room_type,
  };

  let convertedPayment;
  useEffect(() => {
    const paymentCalculatorHandler = (payement) => {
      const euro = payement / currency.amafranga;
      return currency.dollar * euro;
    };
    if (currency) {
      convertedPayment = Math.round(
        paymentCalculatorHandler(totalPayment) * 100
      );
    }
    console.log(convertedPayment);
    dollarConverter();
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `http://localhost:5001/hotel-finder-34fbd/us-central1/api/payments/create?total=${convertedPayment}`,
      });

      console.log(await response.data);
      setClientSecret(await response.data.clientSecret);
    };
    getClientSecret();
  }, [totalPayment, dollarConverter]);

  console.log("THE SECRET IS >>>", clientSecret);

  // --------------------------------------------------------
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
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        props.nextStep();
      })
      .then(() => {
        axios_f
          .post("/booking.json", bookingInfoObject)
          .then((response) => {
            console.log(response.data);
            if (!response.data) {
              setProcessing(true);
            }
          })
          .catch((error) => {
            setProcessing(false);
            console.log(error.message);
          });
      })
      .catch((error) => {
        setProcessing(false);
        console.log(error.message);
      });
  };
  // ------------------------------------------------------------

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div>
      <SectionBookingTitle numbering="3" title="Payment" />
      <form onSubmit={handleSubmit} action="" className="booking-form">
        <div className="control-group">
          <div className="CustomerInfoImage">
            <img src={PaySVG} alt="payment" />
          </div>
          <div>
            <p className="payment-reservation-information">
              Hello
              <span> {props.customerInformation.enteredFullNameValue} </span>
              Thank you to like to sleep in our hotel you're welcome but to
              complete your reservation you need to pay for which room you
              choose
            </p>
            <p className="total-reservation-payment">
              Total Payment is
              <span>
                {
                  <CurrencyFormat
                    value={totalPayment}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={" RWF "}
                  />
                }
              </span>
            </p>
          </div>
          <div className="form-control ">
            <label htmlFor="Full Name" className="cardNumber-title">
              Card number
            </label>
            <div className="payment-gateway">
              <CardElement onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="ButtonContainer">
          {/* <Button btnType="Success" clicked={previousHandler}>
            Back
          </Button> */}
          <Button
            disabled={proccessing || disabled || succeeded}
            btnType="Success"
          >
            {proccessing ? <p>Proccessing</p> : "Pay Now"}
          </Button>
          {error && <p>{error} </p>}
        </div>
      </form>
    </div>
  );
}
