import axios from "axios";

// const url = "http://localhost:4000/";

const url = "https://node-notice.onrender.com";

const API = axios.create({ baseURL: url });

export const getScore = () => {
  return API.get("/irregular");
};

export const postScore = (score) => {
  return API.post("/irregular", score);
};
