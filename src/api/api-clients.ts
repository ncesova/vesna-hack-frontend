import axios from "axios";

const API_URL = "https://8bbd-89-22-233-120.ngrok-free.app/api/v1";

export const $api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
