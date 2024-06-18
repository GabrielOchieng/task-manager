const Task = ({ _id, title, departmentId, assignedTo, onEdit, onDelete }) => {
  return (
    <tr className="border-b hover:bg-gray-100 ">
      <>
        <td className="px-6 py-4 border-b border-r border-gray-200 dark:border-gray-700 text-center">
          {title}
        </td>
        <td className="px-6 py-4 border-b border-r border-gray-200 dark:border-gray-700 text-center">
          {departmentId?.name}
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
