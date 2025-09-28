/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/service/baseApi";

export const users = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/user/update-user/${id}`,
        method: "PATCH",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["User"],
    }),
    updateMyProfile: builder.mutation({
      query: (payload) => {
        console.log("Update Payload:", payload); // ✅ log here
        return {
          url: "/user/update-profile",
          method: "PATCH",
          data: payload,
        };
      },
      invalidatesTags: ["User"],
    }),


  }),
});

export const { useUpdateUserMutation, useUpdateMyProfileMutation } = users;
//  cashIn: builder.mutation({
//           query: (payload) => ({
//               url:"/transaction/cash-in",
//               method: "POST",
//               data: payload,
//           }),
//           invalidatesTags: ["Transaction"],
//       }),