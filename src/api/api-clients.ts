import axios from "axios";

const API_URL = "https://example.com/api/";

export const $api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});
