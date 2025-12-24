import axios, { AxiosInstance } from "axios";
import { env } from "../config/env";

class SwApiHttpClient {
  private static instance: AxiosInstance;

  static getInstance(): AxiosInstance {
    if (!SwApiHttpClient.instance) {
      SwApiHttpClient.instance = axios.create({
        baseURL: env.SWAPI_BASE_URL,
        timeout: 15000,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return SwApiHttpClient.instance;
  }
}

export const swApiHttpClient = SwApiHttpClient.getInstance();
