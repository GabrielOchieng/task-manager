import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetAllUsersQuery } from "../redux/slices/usersApiSlice"; // Assuming users are fetched from usersApiSlice
import { useGetTasksQuery } from "../redux/slices/tasksApiSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TaskChartComponent = () => {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const {
    data: users = [],
    isLoading: isUsersLoading,
    error: usersError,
  } = useGetAllUsersQuery(); // Fetch all users

  if (isLoading) return <p>Loading Tasks...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Handle potential errors/loading for users data
  if (isUsersLoading) return <p>Loading Users...</p>;
  if (usersError) return <p>Error: {usersError.message}</p>;

  // Group tasks by assigned user (assuming assignedTo is an ObjectId)
  const userTaskCounts = tasks.reduce((acc, task) => {
    if (task.completed) {
      // Only consider completed tasks
      const userId = task?.assignedTo?.toString(); // Convert ObjectId to string
      acc[userId] = (acc[userId] || 0) + 1;
    }
    return acc;
  }, {});

  // Get user names by mapping user IDs to user objects
  const userNames = users.reduce((acc, user) => {
    acc[user._id.toString()] = user.name || user.username; // Use name or username if available
    return acc;
  }, {});

  const userLabels = Object.keys(userTaskCounts);
  const userTaskData = Object.values(userTaskCounts);

  const data = {
    labels: userLabels.map((userId) => userNames[userId] || "Unknown User"), // Map user IDs to names (or default to "Unknown User")
    datasets: [
      {
        label: "Completed Tasks by User",
        data: userTaskData,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <h1 className="font-bold mb-2">Completed Tasks by User</h1>
      <Bar options={options} data={data} />
    </>
  );
};

export default TaskChartComponent;
