import React from "react";
import { Pie } from "react-chartjs-2"; // Import Pie chart component
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { useGetDepartmentsQuery } from "../redux/slices/departmentsApiSlice";
import Skeleton from "./Skeleton";

ChartJS.register(ArcElement, Legend, Tooltip); // Register required elements

const UsersPerDepartmentChart = () => {
  const { data: departments, isLoading, error } = useGetDepartmentsQuery();

  if (isLoading) return <Skeleton />;
  if (error) return <p>Error: {error.message}</p>;

  // Ensure departments data is available before processing
  if (!departments) return null;

  // Extract department names and user counts
  const departmentLabels = departments.map((department) => department.name);
  const userCountsPerDepartment = departments.map(
    (department) => department.users.length
  );

  const data = {
    labels: departmentLabels,
    datasets: [
      {
        label: "Users Per Department",
        data: userCountsPerDepartment,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)", // Adjust colors as needed
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)", // Adjust border colors as needed
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <>
      <h1 className="font-bold mb-2">Users Per Department</h1>
      <Pie options={options} data={data} />
    </>
  );
};

export default UsersPerDepartmentChart;
