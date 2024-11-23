import axios from "axios";

export const APIRoutes = {
ANSWER: "research",
};

const $api = axios.create({
  baseURL: "http://localhost:8000",
});

$api.interceptors.request.use((config: any) => {
  if (config?.url.indexOf("login") === -1) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
  }

  return config;
});

export default $api;