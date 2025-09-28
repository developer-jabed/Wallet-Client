import { baseApi } from "@/service/baseApi";

export const wallet = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyWallet: builder.query({
            query: () => ({
                url: "/wallet/me",
                method: "GET",
            }),
            providesTags: ["Wallet"],
        })
    })
})

export const { useGetMyWalletQuery} = wallet;