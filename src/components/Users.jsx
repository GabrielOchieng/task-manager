import React from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useGetDepartmentsQuery } from "../redux/slices/departmentsApiSlice";

const User = ({ _id, name, email, role, onEdit, onDelete }) => {
  const { data: departments, isLoading, error } = useGetDepartmentsQuery();

  // Function to check if user belongs to a department
  const hasDepartment = (department) => {
    // Check if user ID exists in the department.users array
    return (
      department.users && department.users.some((user) => user._id === _id)
    );
  };

  return (
    <tr>
      <td className="px-6 py-4 border-b border-r border-gray-200 dark:border-gray-700 text-center">
        {name}
      </td>
      <td className="px-6 py-4 border-b border-r border-gray-200 dark:border-gray-700 text-center">
        {email}
      </td>
      <td className="px-6 py-4 border-b border-r border-gray-200 dark:border-gray-700 text-center">
        {role}
      </td>
      <td className="px-6 py-4 border-b border-r border-gray-200 dark:border-gray-700 text-left">
        {departments?.length > 0 && !isLoading && !error && (
          <>
            {departments.map((department) => (
              <span key={department._id}>
                {hasDepartment(department) && department.name}

                {/* Display department name if user belongs */}
                {departments.indexOf(department) !== departments.length - 1 &&
                  "    "}
                {}
                {}
              </span>
            ))}
          </>
        )}
      </td>
      <td className="px-2 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700  ">
        <div className="flex justify-between">
          <button
            className="text-blue-500 hover:text-blue-700 ml-1 md:ml-5"
            onClick={() => onEdit(_id)}
          >
            <MdEdit />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete(_id)}
          >
            <MdDelete />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default User;
