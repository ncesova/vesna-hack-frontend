import axios from "axios";

const API_URL = "http://84.201.154.76:5001/api/v1";

export const $api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
