import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://task-manager-api-cv0m.onrender.com",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api", // Optional reducer path for easier identification
  baseQuery,
  tagTypes: ["User", "Department", "Task"], // Tag type for user data
  endpoints: (builder) => ({}),
});
