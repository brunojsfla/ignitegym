import { AppError } from "@utils/AppError";
import axios from "axios";

const IP = "192.168.1.107";

const api = axios.create({
  baseURL: `http://${IP}:3333`,
  timeout: 3000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);

export { api };
