import React, { useState } from "react";
import { useGetAllUsersQuery } from "../redux/slices/usersApiSlice";

const DepartmentForm = ({
  onSubmit,
  newDepartmentName,
  handleUserSelection,
  userSelectionLabel,
  selectedUserIds,
  editFormRef,
  selectedDepartment,
  handleCreateDepartment,
  handleUpdateDepartment,
  isCreating,
  isUpdating,
}) => {
  const [localNewDepartmentName, setLocalNewDepartmentName] =
    useState(newDepartmentName); // Use local state for form
  const { data: users } = useGetAllUsersQuery();

  const handleChange = (e) => {
    setLocalNewDepartmentName(e.target.value);
  };

  return (
    <form
      ref={editFormRef}
      onSubmit={
        selectedDepartment ? handleUpdateDepartment : handleCreateDepartment
      }
      className="mb-4"
    >
      <input
        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-1 w-full"
        type="text"
        placeholder="New Department Name"
        value={newDepartmentName}
        onChange={(e) => setNewDepartmentName(e.target.value)}
      />
      <div className="flex mt-2">
        <select
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-1 w-full mr-2"
          value="" // No default selection needed here
          onChange={handleUserSelection}
        >
          <option value="">Select User</option>
          {users?.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
        <span className="text-gray-500 font-semibold">
          {userSelectionLabel}
        </span>
      </div>
      <button
        type="submit"
        className="w-32 rounded-md mt-2 bg-cyan-500 py-2 text-center text-white font-bold hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={isCreating || isUpdating} // Disable when creating or updating
      >
        {selectedDepartment ? "Update Department" : "Create Department"}
      </button>
    </form>
  );
};

export default DepartmentForm;
