import axios from "axios";

function getBaseURL() {
  console.log('VITE BASE URL ', import.meta.env.BASE_URL)

  const searchParams = new URLSearchParams(window.location.search);
  const API_URL = searchParams.get("api_url");

  const BASE_URL = import.meta.env.VITE_BASE_URL || API_URL

  if (!BASE_URL) {
    throw new Error("Missing API_URL");
  }

  return BASE_URL;
}

const instance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;