/** @format */

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const sendGrid = require("@sendgrid/mail");
const bodParser = require("body-parser");
// const nodemailer = require("nodemailer");
const stripe = require("stripe")(
  "sk_test_51IzTnSDRYQok9NIfjrZJPQX8QMWmupYhBSF1rl7dDL5wLR3TFW55IMVdLu0pXhmt53h8IG7JCYOVjmswuoqXTcRV00e3vg4ORK"
);
sendGrid.setApiKey(
  "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"
);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(bodParser.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  response.status(200).send("Hello Swiftmotion");
});

//SEND PAYMENTS
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!!!! for this object", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    // customer: total,
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// APP SEND MESSAGE
app.post("/contact-us", async (req, res) => {
  const messageBody = req.body;
  console.log(messageBody);
  const message = {
    to: `swiftmotion2020@gmail.com`,
    from: "shiwellapp@gmail.com",
    subject: ` ${messageBody.enteredEmailValue} sends  ${messageBody.enteredMessageValue}`,
    text: `${messageBody.enteredMessageValue}`,
    htm: `<strong>${messageBody.enteredMessageValue}</strong>`,
  };

  sendGrid
    .send(message)
    .then((response) => {
      console.log("successfuly sent!!");
      res.json({ message: "Message successfully sent!" });
    })
    .catch((error) => {
      console.log(`${error}`);
      res.json({ message: error });
    });
});

app.post("/paymentsuccess", async (req, res) => {
  const messageBody = req.body;
  console.log(messageBody);
  const message = {
    to: `${messageBody.email}`,
    from: "shiwellapp@gmail.com",
    subject: `Montly payment successfully `,
    text: `Hello ${messageBody.userName}, Thank you for subscribe to Shiwell application your payment will be ended at next month at this date `,
    htm: `<strong>${messageBody.enteredMessageValue}</strong>`,
  };

  sendGrid
    .send(message)
    .then((response) => {
      console.log("successfuly sent!!");
      res.json({ message: "Message successfully sent!" });
    })
    .catch((error) => {
      console.log(`${error}`);
      res.json({ message: error });
    });
});

app.post("/approve-user", async (req, res) => {
  const messageBody = req.body;
  console.log(messageBody);
  const message = {
    to: `${messageBody[0].email}`,
    from: "shiwellapp@gmail.com",
    subject: `Approved User `,
    text: `Hello ${messageBody[0].full_names}, You are welcome to your fauvorite hotel we will wait for your appearance  `,
    htm: `<strong>${messageBody[0].full_names} You are welcome to your fauvorite hotel we will wait for your appearance </strong>`,
  };

  sendGrid
    .send(message)
    .then((response) => {
      console.log("successfuly sent!!");
      res.json({ message: "Message successfully sent!" });
    })
    .catch((error) => {
      console.log(`${error}`);
      res.json({ message: error });
    });
});

exports.api = functions.https.onRequest(app);
