const axios = require("axios");

// TODO(Arjan): Change SERVERURL on deployment
const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:4000/api/" : "",
});

module.exports = axiosInstance;
