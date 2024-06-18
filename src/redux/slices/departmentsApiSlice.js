import { apiSlice } from "./apiSlice";

const DEPARTMENTS_URL =
  "https://task-manager-api-cv0m.onrender.com/departments";

export const departmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET all departments
    getDepartments: builder.query({
      query: () => DEPARTMENTS_URL,
      providesTags: (result) =>
        result || result?.length ? ["Department"] : [], // Tag departments
    }),
    // CREATE a new department
    createDepartment: builder.mutation({
      query: (data) => ({
        url: DEPARTMENTS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Department"], // Invalidate departments on create
    }),
    // UPDATE an existing department
    updateDepartment: builder.mutation({
      query: (data) => ({
        url: `${DEPARTMENTS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (data) => ["Department"], // Invalidate specific department on update
    }),
    // DELETE a department
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `${DEPARTMENTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"], // Invalidate departments on delete
    }),
    // ... other department endpoints (e.g., add/remove employee from department)
  }),
});

export const {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentsApiSlice;
