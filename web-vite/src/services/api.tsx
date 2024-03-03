import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4400",
});

export default api;