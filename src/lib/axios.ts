import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true, // ✅ always send cookies
});

// Refresh queue
let isRefreshing = false;
let pendingQueue: { resolve: (value: unknown) => void; reject: (value: unknown) => void }[] = [];

const processQueue = (error: unknown) => {
    pendingQueue.forEach((p) => (error ? p.reject(error) : p.resolve(null)));
    pendingQueue = [];
};

// Response interceptor to handle expired JWT
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (
            error.response?.status === 401 &&
            error.response.data.message === "jwt expired" &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingQueue.push({ resolve, reject });
                }).then(() => axiosInstance(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;
            try {
                await axiosInstance.post("/auth/refresh-token", {}, { withCredentials: true });
                processQueue(null);
                return axiosInstance(originalRequest);
            } catch (err) {
                processQueue(err);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
