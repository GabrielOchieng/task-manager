import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To access URL parameters
import { useGetTasksQuery } from "../redux/slices/tasksApiSlice";
import axios from "axios";
import moment from "moment"; // Import Moment.js
import Skeleton from "../components/Skeleton";

const DepartmentDetails = () => {
  const { departmentId } = useParams(); // Get department ID from URL params
  const [department, setDepartment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: tasks } = useGetTasksQuery();

  const prefilteredTasks = tasks?.filter((task) => !task.completed); // Filter tasks where completed is false

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const departmentResponse = await axios.get(
          `https://task-manager-api-cv0m.onrender.com/departments/${departmentId}`
        ); // Get department details
        setDepartment(departmentResponse.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [departmentId]);

  const filteredTasks = prefilteredTasks?.filter(
    (task) => task.departmentId === departmentId
  ); // Filter tasks

  if (isLoading) return <Skeleton />;
  if (error)
    return (
      <p className="text-center p-4 text-red-500">Error: {error.message}</p>
    );

  if (!department)
    return <p className="text-center p-4">Department not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h2 className="text-2xl font-bold">{department.name}</h2>

      {filteredTasks?.length > 0 && (
        <div className="mt-4  p-4 overflow-x-auto">
          <h3 className="text-xl font-bold mb-2 underline">Tasks</h3>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-200 text-left">
                  Title
                </th>
                <th className="px-4 py-2 border border-gray-200 text-left">
                  Due Date
                </th>
                <th className="px-4 py-2 border border-gray-200 text-left">
                  Assigned To
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task._id} className="border border-gray-200">
                  <td className="px-4 py-2">{task.title}</td>
                  <td className="px-4 py-2">
                    {moment(task.dueDate).format("DD-MM-YYYY")}
                  </td>
                  <td className="px-4 py-2">{task.assignedTo.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Display message when no tasks found */}
      {filteredTasks?.length === 0 && ( // Check if filteredTasks is empty
        <div className="mt-4 p-4  text-gray-500">
          No tasks assigned in this department.
        </div>
      )}

      {/* Display users assigned to the department (if applicable) */}
      {department.users?.length > 0 && (
        <div className="mt-4  p-4">
          <h3 className="text-xl font-bold mb-2 underline">Users</h3>
          <ul className="list-decimal pl-4">
            {department.users.map((user) => (
              <li key={user._id} className="mb-2">
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display message when no users found */}
      {!department.users?.length && ( // Check if users is empty
        <div className="mt-4 p-4 text-gray-500">
          No users in this department.
        </div>
      )}
    </div>
  );
};

export default DepartmentDetails;
