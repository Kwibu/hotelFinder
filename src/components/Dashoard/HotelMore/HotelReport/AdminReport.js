import React, { Fragment, useCallback, useEffect, useState } from "react";
import axios from "../../../../firebaseInstance";
import Spinner from "../../../UI/Spinner";
import ReportCard from "./ReportCard";
import "./ReportCard.css";

export default function AdminReport() {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hotelPayments = useCallback(() => {
    setIsLoading(true);
    axios
      .get("payments.json")
      .then((response) => {
        const paymentsArray = [];
        for (let i in response.data) {
          paymentsArray.push(response.data[i]);
        }
        setIsLoading(false);
        setPayments(paymentsArray);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    hotelPayments();
  }, [hotelPayments]);

  const dateToDaysHandler = (date) => new Date(date).getDay();
  const getMonth = (date) => new Date(date).getMonth();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDay();

  const getDaysData = payments
    .filter((payment) => dateToDaysHandler(payment.createDate) === currentDay)
    .reduce((accumulator, days) => {
      return accumulator + days.paymentTotal;
    }, 0);
  const getMonthData = payments
    .filter((payment) => getMonth(payment.createDate) === currentMonth - 1)
    .reduce((accumulator, days) => {
      return accumulator + days.paymentTotal;
    }, 0);

  const allTotalPayements = payments.reduce((accumulator, days) => {
    return accumulator + days.paymentTotal;
  }, 0);

  return (
    <Fragment>
      <div className="report-header">Payment Report for Hotels Creations</div>

      {!isLoading && (
        <div className="card-management-container">
          <ReportCard
            days="Total Number of Hotels"
            totalNumber={payments.length}
          />
          <ReportCard days="To Days Incomes" totalPayement={getDaysData} />
          <ReportCard
            days="Previous Month Incomes"
            totalPayement={getMonthData}
          />
          <ReportCard
            days="Total Payment for All users"
            totalPayement={allTotalPayements}
          />
        </div>
      )}
      {isLoading && <Spinner />}
      {error && <p>{error}</p>}
    </Fragment>
  );
}
