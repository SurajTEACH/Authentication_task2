import axios from "axios";

const API = axios.create({
  baseURL: "https://authentication-task2.onrender.com/api",
  withCredentials: true,
});

export default API;
