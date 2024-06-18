import { apiSlice } from "./apiSlice";

// const USERS_URL = "https://photoweb-api.onrender.com/users";
const USERS_URL = "https://task-manager-api-cv0m.onrender.com/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    // Get all users
    getAllUsers: builder.query({
      query: () => `${USERS_URL}`,
    }),

    // Get a specific user by ID
    getUserById: builder.query({
      query: (id) => `${USERS_URL}/${id}`,
    }),

    // Update an existing user
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data._id}`, // Use ID from data
        method: "PUT",
        body: data, // Include all relevant user data for update
      }),
      invalidatesTags: (result) => (result ? ["User", result.id] : []), // Invalidate user and specific user tag
    }),

    // Delete a user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (id) => (id ? ["User", id] : ["User"]), // Invalidate user and specific user tag (or all users)
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
