import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { apiSlice } from "../apiSlice";

export const prepareHeaders: FetchBaseQueryArgs["prepareHeaders"] = (
  headers
) => {
  headers.set("accept", '*/*');
  return headers;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, { userName: string; password: string, rememberMe: boolean }>({
      query: (body) => ({
        method: "POST",
        url: "auth/login",
        body,
      }),
      invalidatesTags: ["login"],
    }),
    signUp: builder.mutation<any, { userName: string; password: string, email: string }>({
      query: (body) => ({
        method: "POST",
        url: "auth/signup",
        body,
      }),
      invalidatesTags: ["login"],
    }),
    
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;