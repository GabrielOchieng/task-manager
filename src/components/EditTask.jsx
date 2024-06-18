import React, { useState } from "react";
import { useGetAllUsersQuery } from "../redux/slices/usersApiSlice";
import { useGetDepartmentsQuery } from "../redux/slices/departmentsApiSlice";

const EditTask = ({ task, handleChange, handleUpdateTask }) => {
  const { data: users, isLoading, error } = useGetAllUsersQuery();
  const { data: departments } = useGetDepartmentsQuery();

  return (
    <form onSubmit={handleUpdateTask} className="flex flex-col space-y-4">
      <h2 className="text-lg font-bold">Update Task</h2>
      <div className="flex flex-col mb-2">
        <label htmlFor="title" className="mb-1">
          Task Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="description" className="mb-1">
          Task Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
          rows={4}
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="departmentId" className="mb-1">
          Department:
        </label>
        <select
          id="departmentId"
          name="departmentId"
          value={task.departmentId}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select Department</option>
          {departments?.map((department) => (
            <option key={department._id} value={department._id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="assignedTo" className="mb-1">
          Assigned User:
        </label>
        <select
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-1 w-full"
          id="assignedTo"
          name="assignedTo"
          value={task.assignedTo}
          onChange={handleChange}
        >
          <option value="">Select User</option>
          {/* Allow selection of only user within the selected department  */}
          {task.departmentId &&
            departments
              ?.find((department) => department._id === task.departmentId)
              ?.users?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <label htmlFor="dueDate" className="mb-1">
          Due Date:
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Update Task
      </button>
    </form>
  );
};

export default EditTask;
