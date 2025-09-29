
import { axiosInstance } from "@/lib/axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";

interface AxiosBaseQueryArgs {
    url: string;
    method?: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    headers?: AxiosRequestConfig["headers"];
}

export const axiosBaseQuery =
    (): BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> =>
        async ({ url, method, data, params, headers }) => {
            try {
                const result = await axiosInstance({ url, method, data, params, headers });
                return { data: result.data };
            } catch (err) {
                const error = err as AxiosError;
                return {
                    error: {
                        status: error.response?.status,
                        data: error.response?.data || error.message,
                    },
                };
            }
        };
