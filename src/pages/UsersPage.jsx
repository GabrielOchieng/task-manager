import React, { useState, useEffect } from "react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../redux/slices/usersApiSlice";
import User from "../components/Users";
import Modal from "../components/Modal";
import EditUserForm from "../components/EditUserForm";
import Skeleton from "../components/Skeleton";

const UsersPage = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const { data: users, isLoading, error } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation(); // Destructure deleteUser mutation
  const [updateUser] = useUpdateUserMutation(); // Destructure updateUser mutation
  const handleEdit = (userId) => {
    setIsEditing(true);
    setSelectedUserId(userId);
    const userToEdit = users.find((user) => user._id === userId);
    setEditedUserData({
      name: userToEdit.name,
      email: userToEdit.email,
      role: userToEdit.role,
    });
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setSelectedUserId(null);
    setEditedUserData({ name: "", email: "", role: "" });
  };

  const handleUpdateUser = async () => {
    try {
      const response = await updateUser({
        ...editedUserData,
        _id: selectedUserId,
      });
      // Update local state if necessary
      setEmployees(
        employees.map((user) =>
          user._id === selectedUserId ? response.data : user
        )
      );
      setIsEditing(false);
      setSelectedUserId(null);
      setEditedUserData({ name: "", email: "", role: "", department: "" });
    } catch (error) {}
  };

  const handleChange = (event) => {
    setEditedUserData({
      ...editedUserData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await deleteUser(userId);
        // Update local state if necessary (e.g., remove user from employee list)
        setEmployees(employees.filter((user) => user._id !== userId));
      } catch (error) {
        // Handle delete errors (e.g., display error message)
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen overflow-x-scroll">
      <h1 className="text-xl font-bold mb-4">Users</h1>
      {isLoading && <Skeleton />}
      {error && <p className="text-red-500">{error}</p>}
      {users?.length > 0 && (
        <table className="w-full table-auto shadow-md rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-3 md:px-6 py-3 border-b border-r border-gray-200 dark:border-gray-700">
                Name
              </th>
              <th className="px-3 md:px-6 py-3 border-b border-r border-gray-200 dark:border-gray-700">
                Email
              </th>

              <th className="px-3 md:px-6 py-3 border-b border-r border-gray-200 dark:border-gray-700">
                Role
              </th>

              <th className="px-3 md:px-6 py-3 border-b border-r border-gray-200 dark:border-gray-700">
                Department
              </th>

              <th className="px-3 md:px-6 py-3 border-b border-gray-200 dark:border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User
                key={user._id}
                {...user}
                onEdit={() => handleEdit(user._id)}
                onDelete={handleDeleteUser}
              />
            ))}
          </tbody>
        </table>
      )}
      {isEditing && selectedUserId && (
        <Modal onClose={handleCloseModal}>
          <EditUserForm
            user={editedUserData} // Pass edited user data as a prop
            handleChange={handleChange}
            handleUpdateUser={handleUpdateUser} // Pass handleUpdateUser function
          />
        </Modal>
      )}
    </div>
  );
};

export default UsersPage;
