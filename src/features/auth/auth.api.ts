
import { baseApi } from "@/service/baseApi"



export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
            }),
            invalidatesTags: ["User"], // <- invalidate user cache after login
        }),
        refreshToken: builder.mutation<{ accessToken: string }, { token: string }>({
            query: ({ token }) => ({
                url: "/auth/refresh-token",
                method: "POST",
                body: { token },
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["User"], 
        }),

        resetPassword: builder.mutation({
            query: (data) => ({
                url: "/auth/reset-password",
                method: "POST",
                data: data,
                invalidatesTags: ["User"],
            }),
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/create-user",
                method: "POST",
                data: userInfo,
            }),
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userInfo: builder.query<any, void>({  // 👈 second type parameter is void
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["User"],
        }),


    }),
})

export const {
    useLoginMutation,
    useRefreshTokenMutation,
    useLogoutMutation,
    useResetPasswordMutation,
    useRegisterMutation,
    useUserInfoQuery
} = authApi
