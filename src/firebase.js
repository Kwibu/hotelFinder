/** @format */

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBHikYMX6AmLB8sfk_mmR70riYdgt3QqG0",
  authDomain: "hotel-finder-34fbd.firebaseapp.com",
  databaseURL: "https://hotel-finder-34fbd-default-rtdb.firebaseio.com",
  projectId: "hotel-finder-34fbd",
  storageBucket: "hotel-finder-34fbd.appspot.com",
  messagingSenderId: "647007991503",
  appId: "1:647007991503:web:6bd91d92469afe9d6ee9ba",
});
export const auth = app.auth();
export const projectStorage = firebase.storage();
export default app;
