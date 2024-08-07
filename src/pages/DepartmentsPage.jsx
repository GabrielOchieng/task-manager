import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
} from "../redux/slices/departmentsApiSlice"; // Assuming slices for departments
import { toast } from "react-toastify"; // Assuming you have react-toastify installed
import Departments from "../components/Departments";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../redux/slices/usersApiSlice";
import Skeleton from "../components/Skeleton";

const DepartmentsPage = () => {
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [assignedUsers, setAssignedUsers] = useState(""); // State to store assigned user names
  const [selectedUserIds, setSelectedUserIds] = useState([]); // Array for selected user IDs
  const [selectedDepartment, setSelectedDepartment] = useState(null); // State to store selected department for editing
  const { data: departments, isLoading, error } = useGetDepartmentsQuery();
  const [createDepartment, { isLoading: isCreating }] =
    useCreateDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdating }] =
    useUpdateDepartmentMutation();
  const { data: users } = useGetAllUsersQuery();

  const editFormRef = useRef(null);

  const handleCreateDepartment = async (e) => {
    e.preventDefault();
    if (!newDepartmentName.trim()) return; // Prevent empty department creation

    try {
      // Check if any selected user already belongs to a department
      const isUserInDepartment = departments?.some((dept) => {
        for (const userId of selectedUserIds) {
          if (dept.users.find((user) => user._id === userId)) {
            return true; // If any user is found, return true
          }
        }
        return false;
      });

      if (isUserInDepartment) {
        toast.warn(
          "One or more selected users already belong to another department!",
          {}
        );
        return; // Prevent creating department with duplicate user
      }

      const result = await createDepartment({
        name: newDepartmentName,
        users: selectedUserIds, // Assign selected user
      });

      // ... rest of the code for successful creation
      setNewDepartmentName(""); // Clear input field
      setSelectedUserIds([]); // Clear selected users
      toast.success("Department created successfully!", {});
    } catch (error) {
      toast.error("Failed to create department!", {});
    }
  };

  const handleUserSelection = (e) => {
    const userId = e.target.value;
    // Check if user is already selected, deselect if so
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
      return;
    }
    setSelectedUserIds([...selectedUserIds, userId]); // Add user to selection
  };

  const userSelectionLabel =
    selectedUserIds.length === 0
      ? "Add User"
      : `Add More Users (${selectedUserIds.length})`;

  const handleEditDepartment = (department) => {
    setSelectedDepartment(department);
    setNewDepartmentName(department.name); // Pre-populate form with department details
    setSelectedUserIds(department.users.map((user) => user._id)); // Set selected users for editing
  };

  const handleUpdateDepartment = async (e) => {
    e.preventDefault();
    if (!newDepartmentName.trim()) return; // Prevent empty department update

    try {
      // Check if selected user already belongs to another department (excluding the current one)
      const isUserInAnotherDepartment = departments?.some((dept) => {
        if (dept._id !== selectedDepartment._id) {
          // Exclude current department
          for (const userId of selectedUserIds) {
            if (dept.users.find((user) => user._id === userId)) {
              return true; // If any user is found, return true
            }
          }
          return false;
        }
      });

      if (isUserInAnotherDepartment) {
        toast.warn(
          "One or more selected users already belong to another department!",
          {}
        );
        return; // Prevent updating department with duplicate user
      }

      const result = await updateDepartment({
        id: selectedDepartment._id, // Use ID from selected department
        name: newDepartmentName,
        users: selectedUserIds, // Update with the selected user
      });

      // Update local state with updated department details

      setSelectedDepartment(result); // Update selected department state
      setNewDepartmentName(result.name); // Update form with updated name

      toast.success("Department updated successfully!", {});
    } catch (error) {
      toast.error("Failed to update department!", {});
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <h1 className="text-xl font-bold mb-4">Departments</h1>

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
          <span className="text-gray-500 font-semibold w-40 flex items-center">
            {userSelectionLabel}
          </span>
        </div>
        <button
          type="submit"
          className="w-40 rounded-md mt-2 bg-cyan-500 py-2 text-center text-white font-bold hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isCreating || isUpdating} // Disable when creating or updating
        >
          {selectedDepartment ? "Update Department" : "Create Department"}
        </button>
      </form>

      {isLoading ? (
        <Skeleton />
      ) : error ? (
        <p>Error fetching departments: {error.message}</p>
      ) : (
        <div className="">
          <Departments
            departments={departments}
            onEditDepartment={handleEditDepartment}
            editFormRef={editFormRef}
          />
        </div>
      )}
    </div>
  );
};

export default DepartmentsPage;
