import { SERVERURL } from "../components/products/constants";
const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: `${SERVERURL}/api`,
});

export default axiosInstance;
