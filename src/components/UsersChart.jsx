import React from "react";
import { Pie } from "react-chartjs-2"; // Import Pie chart component
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { useGetAllUsersQuery } from "../redux/slices/usersApiSlice";
import Skeleton from "./Skeleton";

ChartJS.register(ArcElement, Legend, Tooltip); // Register required elements

const UserChart = () => {
  const { data: users, isLoading, error } = useGetAllUsersQuery();

  if (isLoading) return <Skeleton />;
  if (error) return <p>Error: {error.message}</p>;

  // User data might not have roles property (check your model)
  const userRoles = users.map((user) => user.role || "N/A"); // Default to "N/A" if no role

  // Count users by role
  const userRoleCounts = userRoles.reduce((acc, role) => {
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  const userRoleLabels = Object.keys(userRoleCounts);
  const userRoleData = Object.values(userRoleCounts);

  const data = {
    labels: userRoleLabels,
    datasets: [
      {
        label: "User Count by Role",
        data: userRoleData,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)", // Adjust colors as needed
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(201, 203, 207, 0.2)", // Add more colors for more roles
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(201, 203, 207, 1)",
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
      <h1 className="font-bold mb-2">Users by Role</h1>
      <Pie options={options} data={data} />
    </>
  );
};

export default UserChart;
