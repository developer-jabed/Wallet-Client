/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/service/baseApi";


export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get all users
        getAllUsers: builder.query({
            query: () => ({
                url: "/admin/users",
                method: "GET",
            }),
            providesTags: ["Admin"],
        }),

        // Get users without wallet
        getUsersWithoutWallet: builder.query({
            query: () => ({
                url: "/admin/users-without-wallet",
                method: "GET",
            }),
            providesTags: ["Admin"],
        }),

        // Approve wallet
        approveWallet: builder.mutation({
            query: ({ id }: { id: string }) => ({
                url: `/admin/approve-wallet/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Admin"],
        }),


        getAllWallets: builder.query({
            query: () => ({
                url: "/admin/wallets",
                method: "GET",
            }),
            providesTags: ["Admin"],
        }),

        // Block wallet
        blockWallet: builder.mutation({
            query: ({ id }: { id: string }) => ({
                url: `/admin/block-wallet/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Admin"],
        }),


        // Unblock wallet
        unblockWallet: builder.mutation({
            query: ({ id }: { id: string }) => ({
                url: `/admin/unblock-wallet/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Admin"],
        }),

      

    }),
});

export const {
    useGetAllUsersQuery,
    useGetUsersWithoutWalletQuery,
    useApproveWalletMutation,
    useBlockWalletMutation,
    useUnblockWalletMutation,
    useGetAllWalletsQuery,

} = adminApi;
