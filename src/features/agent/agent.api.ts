import { baseApi } from "@/service/baseApi";

export const agent = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        agentTransaction: builder.query ({
            query: () => ({
                url: "/transaction/me",
                method: "GET",
            }),
            providesTags: ["Transaction"]
        })
    })
})

export const { useAgentTransactionQuery} = agent;