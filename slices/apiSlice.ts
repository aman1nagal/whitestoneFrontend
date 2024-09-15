import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import socket from "@/slices/socket"; // Import the socket instance

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders(headers) {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["login", "tasks"],
  endpoints: (builder) => ({
    viewTasks: builder.query({
      query: () => "tasks", // Your API endpoint to fetch tasks
      providesTags: ["tasks"],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // Wait for the cache to load before listening to socket events
          await cacheDataLoaded;

          // Listen for 'task-created' event and update the cache
          socket.on("task-created", (newTask) => {
            updateCachedData((draft) => {
              draft.push(newTask);
            });
          });

          // Listen for 'task-updated' event and update the cache
          socket.on("task-updated", (updatedTask) => {
            updateCachedData((draft) => {
              const index = draft.findIndex((task) => task._id === updatedTask._id);
              if (index !== -1) {
                draft[index] = updatedTask;
              }
            });
          });

          // Listen for 'task-deleted' event and update the cache
          socket.on("task-deleted", (deletedTaskId) => {
            updateCachedData((draft) => {
              return draft.filter((task) => task._id !== deletedTaskId);
            });
          });

        } catch (error) {
          console.error("Socket connection error", error);
        }

        // Cleanup listeners when the cache is no longer active
        await cacheEntryRemoved;
        socket.off("task-created");
        socket.off("task-updated");
        socket.off("task-deleted");
      },
    }),

    createTask: builder.mutation({
      query: (taskData) => ({
        url: "tasks",
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["tasks"],
    }),
    taskById: builder.query<any, any>({
      query: (params) => ({
        method: 'GET',
        url: `tasks/${params.id}`,
      }),
      providesTags: ['tasks'],
    }),

    updateTask: builder.mutation({
      query: ({ taskId, taskData }) => ({
        url: `tasks/${taskId}`,
        method: "PUT",
        body: taskData,
      }),
      invalidatesTags: ["tasks"],
    }),

    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const {
  useViewTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useTaskByIdQuery
} = apiSlice;
