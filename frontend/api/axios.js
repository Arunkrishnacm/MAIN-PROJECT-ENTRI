import axios from "axios";

const instance = axios.create({
  baseURL: "https://main-project-entri-backend.onrender.com",
  withCredentials: true
});

export default instance;
