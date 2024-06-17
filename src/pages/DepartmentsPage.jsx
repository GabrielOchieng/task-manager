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
  const [updateUser] = useUpdateUserMutation();

  const editFormRef = useRef(null);

  console.log(departments);
  const dispatch = useDispatch();

  // const handleCreateDepartment = async (e) => {
  //   e.preventDefault();
  //   if (!newDepartmentName.trim()) return; // Prevent empty department creation

  //   try {
  //     const result = await createDepartment({
  //       name: newDepartmentName,
  //       users: selectedUserIds,
  //     });
  //     console.log("Department created:", result.data); // Optional logging
  //     setNewDepartmentName(""); // Clear input field
  //     setSelectedUserIds([]); // Clear selected users
  //     toast.success("Department created successfully!", {
  //       position: "toast-position", // Replace with desired position (e.g., "top-right")
  //     });
  //   } catch (error) {
  //     console.error("Error creating department:", error);
  //     toast.error("Failed to create department!", {
  //       position: "toast-position", // Replace with desired position (e.g., "top-right")
  //     });
  //   }
  // };

  const handleCreateDepartment = async (e) => {
    e.preventDefault();
    if (!newDepartmentName.trim()) return; // Prevent empty department creation

    try {
      const result = await createDepartment({
        name: newDepartmentName,
        users: selectedUserIds,
      });
      console.log("Department created:", result); // Optional logging

      // Update user documents with the new department ID
      await Promise.all(
        selectedUserIds.map(async (userId) => {
          await updateUser({
            _id: userId,
            department: result?.data,
          });
        })
      );

      setNewDepartmentName(""); // Clear input field
      setSelectedUserIds([]); // Clear selected users
      toast.success("Department created successfully!", {
        position: "toast-position", // Replace with desired position (e.g., "top-right")
      });
    } catch (error) {
      console.error("Error creating department:", error);
      toast.error("Failed to create department!", {
        position: "toast-position", // Replace with desired position (e.g., "top-right")
      });
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

    // Find the assigned user names based on selected user IDs
    const assignedUsers = users
      ?.filter((user) => selectedUserIds.includes(user._id))
      .map((user) => user.name);

    // Update UI to display assigned users
    setAssignedUsers(assignedUsers.join(", "));
  };

  // const handleUpdateDepartment = async (e) => {
  //   e.preventDefault();
  //   if (!newDepartmentName.trim()) return; // Prevent empty department update

  //   try {
  //     const result = await updateDepartment({
  //       id: selectedDepartment._id,
  //       name: newDepartmentName,
  //       users: selectedUserIds,
  //     });
  //     console.log("Department updated:", result.data); // Optional logging
  //     setSelectedDepartment(null); // Clear selected department for editing
  //     setNewDepartmentName(""); // Clear input field
  //     setSelectedUserIds([]); // Clear selected users
  //     toast.success("Department updated successfully!", {
  //       position: "toast-position", // Replace with desired position (e.g., "top-right")
  //     });
  //   } catch (error) {
  //     console.error("Error updating department:", error);
  //     toast.error("Failed to update department!", {
  //       position: "toast-position", // Replace with desired position (e.g., "top-right")
  //     });
  //   }
  // };

  const handleUpdateDepartment = async (e) => {
    e.preventDefault();
    if (!newDepartmentName.trim()) return; // Prevent empty department update

    const departmentData = {
      id: selectedDepartment._id,
      name: newDepartmentName,
      users: selectedUserIds,
    };

    try {
      const result = await updateDepartment(departmentData);
      console.log("Department updated:", result.data); // Optional logging
      setSelectedDepartment(null); // Clear selected department for editing
      setNewDepartmentName(""); // Clear input field
      setSelectedUserIds([]); // Clear selected users
      toast.success("Department updated successfully!", {
        position: "toast-position", // Replace with desired position (e.g., "top-right")
      });

      // Update users data in the database (assuming 'updateUser' mutation updates user data)
      selectedUserIds.forEach(async (userId) => {
        // const userToUpdate = users.find((user) => user._id === userId);
        const userToUpdate = { ...users.find((user) => user._id === userId) };

        if (userToUpdate) {
          // Update the user object with the assigned department
          userToUpdate.department = departmentData.id; // Assuming 'department' field in the user object

          // Call the updateUser mutation to update the user data
          try {
            await updateUser(userToUpdate);
            console.log("User updated:", userToUpdate._id); // Optional logging
          } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Failed to update some users!", {
              position: "toast-position", // Replace with desired position (e.g., "top-right")
            });
          }
        }
      });
    } catch (error) {
      console.error("Error updating department:", error);
      toast.error("Failed to update department!", {
        position: "toast-position", // Replace with desired position (e.g., "top-right")
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
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

      {isLoading ? (
        <p>Loading departments...</p>
      ) : error ? (
        <p>Error fetching departments: {error.message}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
