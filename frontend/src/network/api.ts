import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default instance;
