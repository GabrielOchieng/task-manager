import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2"; // Import Bar chart component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetTasksQuery } from "../redux/slices/tasksApiSlice";
import Skeleton from "./Skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
); // Register required elements

const TasksCompletedBar = () => {
  const { data: tasks, isLoading, error } = useGetTasksQuery();

  if (isLoading) return <Skeleton />;
  if (error) return <p>Error: {error.message}</p>;

  // Ensure tasks data is available before processing
  if (!tasks) return null;

  // Calculate total tasks per user
  const tasksPerUser = tasks.reduce((acc, task) => {
    const userId = task.assignedTo?.name; // Assuming `assignedTo` has a `name` property
    acc[userId] = (acc[userId] || 0) + 1; // Count total tasks per user
    return acc;
  }, {});

  // Prepare chart data (labels and datasets)
  const userLabels = Object.keys(tasksPerUser);

  const completedTasksPerUser = userLabels.map((userId) => {
    const totalTasks = tasksPerUser[userId];
    const completedTasks = tasks.filter(
      (task) => task.assignedTo?.name === userId && task.completed
    ).length;
    return Math.round((completedTasks / totalTasks) * 100); // Calculate percentage
  });

  const incompleteTasksPerUser = userLabels.map((userId) => {
    const totalTasks = tasksPerUser[userId];
    const completedTasks = tasks.filter(
      (task) => task.assignedTo?.name === userId && task.completed
    ).length;
    return Math.round(((totalTasks - completedTasks) / totalTasks) * 100); // Calculate percentage
  });

  const data = {
    labels: userLabels,
    datasets: [
      {
        label: "Completed Tasks (%)",
        data: completedTasksPerUser,
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Adjust color as needed
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Incomplete Tasks (%)",
        data: incompleteTasksPerUser,
        backgroundColor: "rgba(255, 99, 132, 0.5)", // Adjust color as needed
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 100, // Set max value of y-axis to 100 for percentages
          },
        },
      ],
    },
  };

  return (
    <>
      <h1 className="font-bold mb-2">Tasks Completed Per User (%)</h1>
      <Bar options={options} data={data} />
    </>
  );
};

export default TasksCompletedBar;
