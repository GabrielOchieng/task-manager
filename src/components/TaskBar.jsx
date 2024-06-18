import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
); // Register required elements

const TasksBar = () => {
  const { data: tasks, isLoading, error } = useGetTasksQuery();

  if (isLoading) return <p>Loading Tasks...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Calculate total tasks (avoid division by zero)
  const totalTasks = tasks?.length || 0;

  // Calculate percentages
  const completeTasksPercentage = Math.round(
    ((tasks?.filter((task) => task.completed).length || 0) / totalTasks) * 100
  );
  const incompleteTasksPercentage = 100 - completeTasksPercentage;

  const data = {
    labels: ["Completed", "Incomplete"],
    datasets: [
      {
        label: "Task Completion Status (out of 100%)",
        data: [completeTasksPercentage, incompleteTasksPercentage],
        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
        // Add data labels with percentages
        datalabels: {
          formatter: (value, context) => `${value}%`,
        },
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
      <h1 className="font-bold mb-2">Tasks Completion Status (out of 100%)</h1>
      <Bar options={options} data={data} />
    </>
  );
};

export default TasksBar;
