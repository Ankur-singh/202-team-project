// Create a base axios request with default config and interceptors

import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

export const axiosRequest: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 10000,
});

axiosRequest.interceptors.request.use((config) => {
  console.log("config", config);
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
