import axios from "axios";

const instance = axios.create({
  baseURL: "https://main-project-entri-backend.onrender.com",
});

export default instance;
