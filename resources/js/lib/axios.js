// resources/js/lib/axios.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "",
    withCredentials: true, // Important for Sanctum / session auth
});

export default axiosInstance;
