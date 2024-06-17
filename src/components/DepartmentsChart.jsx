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
import { useGetDepartmentsQuery } from "../redux/slices/departmentsApiSlice";
import { useGetAllUsersQuery } from "../redux/slices/usersApiSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DepartmentChart = () => {
  const { data: departments, isLoading, error } = useGetDepartmentsQuery(); // Replace with your department fetching hook
  const { data: users } = useGetAllUsersQuery();

  console.log(departments);

  if (isLoading) return <p>Loading Departments...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Count users by department
  const userDepartmentCounts = departments.reduce((acc, department) => {
    const userCount = users.filter(
      (user) => user.department?.toString() === department._id.toString()
    ).length; // Filter users by department ID
    acc[department.name] = userCount;
    return acc;
  }, {});

  const departmentLabels = Object.keys(userDepartmentCounts);
  const departmentData = Object.values(userDepartmentCounts);

  const data = {
    labels: departmentLabels,
    datasets: [
      {
        label: "User Count by Department",
        data: departmentData,
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
      <h1 className="font-bold mb-2">Users by Department</h1>
      <Bar options={options} data={data} />
    </>
  );
};

export default DepartmentChart;
