import React from "react";
import { useGetDepartmentsQuery } from "../redux/slices/departmentsApiSlice";

const EditUserForm = ({ user, handleChange, handleUpdateUser }) => {
  const { data: departments } = useGetDepartmentsQuery();

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-lg font-bold">Edit User</h2>
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="role" className="mb-2">
          Role:
        </label>

        <select
          id="role"
          name="role"
          value={user.role}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select Role</option>
          <option value="user">user</option>
          <option value="manager">manager</option>
          {/* <option value="admin">admin</option> */}
        </select>
      </div>

      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={handleUpdateUser}
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditUserForm;
