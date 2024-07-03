import { apiSlice } from "./apiSlice";

const TASKS_URL =
  // "https://task-manager-api-cv0m.onrender.com/tasks";
  "http://localhost:5000/tasks"; // For local development

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET all tasks
    getTasks: builder.query({
      query: () => TASKS_URL,
      providesTags: (result) => (result || result.length ? ["Task"] : []), // Tag tasks
    }),

    // CREATE a new task
    createTask: builder.mutation({
      query: (data) => ({
        url: TASKS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"], // Invalidate tasks on create
    }),
    // UPDATE an existing task
    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (data) => ["Task"], // Invalidate specific task on update
    }),
    // DELETE a task
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `${TASKS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"], // Invalidate tasks on delete
    }),
    // ... other task endpoints (e.g., get user tasks, update task status)
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApiSlice;
