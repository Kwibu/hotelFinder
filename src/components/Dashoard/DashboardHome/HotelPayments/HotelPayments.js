import React, { useState, useCallback, useEffect } from "react";
import SimpleBar from "simplebar-react";
import "./HotelPayment.css";
import "simplebar/dist/simplebar.min.css";
import axios from "../../../../firebaseInstance";
import HotelPayment from "./HotelPayment";
import CurrencyFormat from "react-currency-format";
import Spinner from "../../../UI/Spinner";
import SideMenuBar from "../SideMenuBar/SideMenuBar";

export default function HotelManagement() {
  const [payments, setPayment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getUsers = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/payments.json")
      .then((response) => {
        let paymentsArray = [];
        for (let i in response.data) {
          paymentsArray.push(response.data[i]);
        }
        setIsLoading(false);
        setPayment(paymentsArray);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const totalPayment = payments.reduce((accumulator, curentValue) => {
    return accumulator + curentValue.paymentTotal;
  }, 0);

  const paymentDOM = payments.map((payement) => {
    return (
      <HotelPayment
        key={payement.paymentId}
        name={payement.userName}
        payment={payement.paymentTotal}
        email={payement.email}
      />
    );
  });
  return (
    <div className="dashboard-containers">
      <div className="navigations-header">
        <div>
          <div className="dashboard-name">Dashboard</div>
          <div>
            <SideMenuBar />
          </div>
        </div>
      </div>
      <div className="HotelModify-container">
        <div className="HotelModify-header">
          <div className="HotelModify-title">Hotels Payements</div>
          <div className="HotelModify-filter">
            <div>
              <p>Total Payements</p>
              {!isLoading && (
                <p>
                  <CurrencyFormat
                    value={totalPayment}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"RWF "}
                  />
                </p>
              )}
              {isLoading && <p>Loading...</p>}
            </div>
          </div>
        </div>
        {error && <p>{error}</p>}
        <SimpleBar style={{ maxHeight: 470 }}>
          <div className="HotelModifys-content-container">
            {paymentDOM && paymentDOM}
            {isLoading && <Spinner />}
            {error && <p>{error}</p>}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}
