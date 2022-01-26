/** @format */

import axios from "axios";
const instance = axios.create({
  baseURL: "https://hotel-finder-34fbd-default-rtdb.firebaseio.com/",
});
export default instance;
