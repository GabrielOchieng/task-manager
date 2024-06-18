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
import { useGetAllUsersQuery } from "../redux/slices/usersApiSlice";
import { useGetTasksQuery } from "../redux/slices/tasksApiSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserTaskBar = () => {
  const {
    data: tasks = [],
    isLoading: tasksLoading,
    error: tasksError,
  } = useGetTasksQuery();
  const {
    data: users = [],
    isLoading: usersLoading,
    error: usersError,
  } = useGetAllUsersQuery();

  if (tasksLoading || usersLoading) return <p>Loading Data...</p>;
  if (tasksError) return <p>Error: {tasksError.message}</p>;
  if (usersError) return <p>Error: {usersError.message}</p>;

  // Group tasks by assigned user (assuming assignedTo is an ObjectId)
  const userTaskCounts = tasks.reduce((acc, task) => {
    const userId = task.assignedTo?.toString(); // Convert ObjectId to string
    acc[userId] = (acc[userId] || 0) + 1;
    return acc;
  }, {});

  console.log(users);
  // Get user names by mapping user IDs to user objects (optional for labels)
  const userNames = users.reduce((acc, user) => {
    acc[user._id.toString()] = user.name || user.username; // Use name or username if available
    return acc;
  }, {});

  const userLabels = Object.keys(userTaskCounts).map(
    (userId) => userNames[userId] || userId
  ); // Use user names or IDs for labels
  const userTaskData = Object.values(userTaskCounts);

  const data = {
    labels: userLabels,
    datasets: [
      {
        label: "Tasks per User",
        data: userTaskData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
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
      <h1 className="font-bold mb-2">Tasks per User</h1>
      <Bar options={options} data={data} />
    </>
  );
};

export default UserTaskBar;
