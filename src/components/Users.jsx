import React from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const User = ({ _id, name, email, role, department, onEdit, onDelete }) => {
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

      <td className="px-6 py-4 border-b border-r border-gray-200 dark:border-gray-700 text-center">
        {department?.name}
      </td>

      <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700  ">
        <div className="flex  justify-between">
          <button
            className="text-blue-500 hover:text-blue-700 ml-5"
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
