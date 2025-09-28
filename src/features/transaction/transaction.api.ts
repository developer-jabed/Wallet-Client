// service/transaction.ts
import { baseApi } from "@/service/baseApi";

export const transaction = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Admin: fetch all transactions with pagination and search
        getAllTransactions: builder.query({
            query: ({ page = 1, limit = 10, search = "" }) => ({
                url: `/transaction/all-transaction?page=${page}&limit=${limit}&search=${search}`,
                method: "GET",
            }),
            providesTags: ["Transaction"],
        }),

        // Agent/User: fetch their own transactions
        getMyTransactions: builder.query({
            query: () => ({
                url: `/transaction/me`,
                method: "GET",
            }),
            providesTags: ["Transaction"],
        }),
  
        cashIn: builder.mutation({
            query: (payload) => ({
                url:"/transaction/cash-in",
                method: "POST",
                data: payload,
            }),
            invalidatesTags: ["Transaction"],
        }),
        cashout: builder.mutation({
            query: (payload) => ({
                url:"/transaction/cash-out",
                method: "POST",
                data: payload,
            }),
            invalidatesTags: ["Transaction"],
        }),
        
    }),
});

export const { useGetAllTransactionsQuery, useGetMyTransactionsQuery, useCashInMutation, useCashoutMutation } = transaction;
