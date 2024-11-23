import axios from "axios";

export const APIRoutes = {
RESEARCH: "api/research",
};

const $api = axios.create({
  baseURL: "http://localhost:4000",
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