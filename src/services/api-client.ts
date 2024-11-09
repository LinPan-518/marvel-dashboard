import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { EnvVariables } from "./variables";
import md5 from "md5";

const publicKey = EnvVariables.VITE_PUBLIC_API_KEY;
const privateKey = EnvVariables.VITE_PRIVATE_API_KEY;

const generateHash = (timeStamp: number) => {
  return md5(timeStamp + privateKey + publicKey);
};

const catchErrorCodes = [
  { code: "401", path: "/error_401_no_accounts" },
  { code: "403", path: "/error_403" },
  { code: "404", path: "/error_404" },
  { code: "409", path: "/error_409" },
  { code: "429", path: "/error_409" },
];

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: EnvVariables.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    // Ensure params exists and add default parameters
    if (!config.params) {
      config.params = {};
    }
    const timeStamp = new Date().getTime();
    config.params.apikey = EnvVariables.VITE_PUBLIC_API_KEY;
    config.params.ts = timeStamp;
    config.params.hash = generateHash(timeStamp);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const statusCode = error.response.status?.toString();
      console.log(statusCode);
      // Handle specific status codes
      const errorPage = catchErrorCodes.find((e) => e.code === statusCode);
      if (errorPage) {
        window.location.href = errorPage.path;
      } else {
        // Handle other status codes if needed
        const errorMessage = (error.response?.data as { message: string }).message;
        console.error(`Error ${statusCode}: ${errorMessage}`);
      }
    } else if (error.request) {
      // No response was received
      console.error("Network error:", error.message);
    } else {
      // Other errors (e.g., config issues)
      console.error("Error:", error.message);
    }

    // Reject the error to handle it in the SWR hook if needed
    return Promise.reject(error);
  }
);

export default axiosInstance;
