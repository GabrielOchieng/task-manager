// import React from "react";

// const Task = ({
//   _id,
//   title,
//   status,
//   assignedTo,
//   onEdit,
//   onDelete,
//   onToggleCompletion,
// }) => {
//   const handleCheckboxChange = (e) => onToggleCompletion(_id, e.target.checked);

//   return (
//     <tr className="border-b hover:bg-gray-100">
//       <td className="text-left px-4 py-2 flex items-center">
//         {title}
//         {/* Display status based on the prop */}
//         {status === "Completed" && (
//           <span className="ml-2 text-green-500">Completed</span>
//         )}
//         {status === "In Progress" && (
//           <span className="ml-2 text-yellow-500">In Progress</span>
//         )}
//       </td>
//       <td className="text-left px-4 py-2">{assignedTo?.name}</td>
//       <td className="text-left px-4 py-2">{status}</td>
//       {/* Display status directly if not using conditional rendering */}
//       <td className="text-right px-4 py-2">
//         <button
//           onClick={() => onEdit(_id)}
//           className="px-3 py-2 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-700"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(_id)}
//           className="px-3 py-2 rounded-md text-sm bg-red-500 text-white hover:bg-red-700"
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   );
// };

// export default Task;

import React, { useState } from "react";
import { useGetAllUsersQuery } from "../redux/slices/usersApiSlice";

const Task = ({
  _id,
  title,
  description,
  status,
  assignedTo,
  dueDate,
  onEdit,
  onDelete,
  completed,
  onToggleCompletion,
}) => {
  return (
    <tr className="border-b hover:bg-gray-100 ">
      <>
        <td className="px-6 py-4 border-b border-r border-gray-200 dark:border-gray-700 text-center">
          {title}
        </td>
        <td className="px-6 py-4 border-b border-r border-gray-200 dark:border-gray-700 text-center">
          {assignedTo?.name}
        </td>
        <td className="px-6 py-4 border-b border-r border-gray-200 dark:border-gray-700 text-center">
          Incomplete
        </td>

        <td className="px-3 py-4 border-b border-r border-gray-200 dark:border-gray-700 text-center ">
          <button
            onClick={() => onEdit(_id)}
            className="px-3 py-2 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-700 mx-3 mb-3 w-16"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="px-3 py-2 rounded-md text-sm bg-red-500 text-white hover:bg-red-700 w-16"
          >
            Delete
          </button>
        </td>
      </>
    </tr>
  );
};

export default Task;
