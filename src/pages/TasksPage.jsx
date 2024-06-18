import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../redux/slices/tasksApiSlice";
import { toast } from "react-toastify"; // Assuming you have react-toastify installed
import Task from "../components/Task";
import { useGetAllUsersQuery } from "../redux/slices/usersApiSlice";
import EditTask from "../components/EditTask";
import Modal from "../components/Modal";
import { useGetDepartmentsQuery } from "../redux/slices/departmentsApiSlice";

const TasksPage = () => {
  const [duties, setDuties] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newDate, setNewDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskData, setEditedTaskData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    departmentId: "",
    dueDate: "",
  });
  const [selectedTaskId, setSelectedTaskId] = useState(null); //task selected for editing
  // const [users, setUsers] = useState([]); // State to store fetched users
  const [selectedUserId, setSelectedUserId] = useState(""); // State for selected user ID
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(""); // State for selected user ID
  const [deleteTask] = useDeleteTaskMutation(); // Destructure deleteTask Function
  const [updateTask] = useUpdateTaskMutation(); // Destructure updateTask mutation
  const { data: users } = useGetAllUsersQuery();
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const { data: departments } = useGetDepartmentsQuery();

  const filteredTasks = tasks?.filter((task) => !task.completed); // Filter tasks where completed is false
  console.log(tasks);
  console.log("filtered: ", filteredTasks);

  const [createTask, { isLoading: isCreatingTask }] = useCreateTaskMutation();

  // console.log("SELECTED", department);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return; // Prevent empty duties

    // Validate assignedTo (assuming selectedUserId holds the user ID)
    if (!selectedUserId) {
      alert("Please select a user to assign the task to.");
      return;
    }
    if (!selectedDepartmentId) {
      alert("Please select a department for the task.");
      return;
    }

    try {
      console.log("selectedUserId:", selectedUserId); // Log the selected user ID

      const result = await createTask({
        title: newTaskTitle,
        description: newTaskDescription,
        assignedTo: selectedUserId,
        departmentId: selectedDepartmentId,
        dueDate: newDate, // Add the newDate variable
      });

      // Assuming createTask returns the created task object
      console.log("assignedTo in response:", result.assignedTo); // Log the assignedTo value from the response (optional)

      toast.success("Task created successfully!", {
        position: "toast-position", // Replace with desired position (e.g., "top-right")
      });

      // ... (other actions after successful creation, e.g., update UI)
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task!", {
        position: "toast-position", // Replace with desired position (e.g., "top-right")
      });
    } finally {
      setNewTaskTitle(""); // Clear the input field
      setNewDate("");
      setNewTaskDescription("");
    }
  };

  const handleEditTask = (taskId) => {
    setIsEditing(true);
    setSelectedTaskId(taskId);
    const taskToEdit = filteredTasks.find((task) => task._id === taskId);
    setEditedTaskData({
      title: taskToEdit?.title,
      description: taskToEdit?.description,
      assignedTo: taskToEdit?.assignedTo,
      departmentId: taskToEdit?.department?._id,
      dueDate: taskToEdit?.dueDate,
    });
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setSelectedTaskId(null);
    setEditedTaskData({
      title: "",
      description: "",
      assignedTo: "",
      departmentId: "",
      dueDate: "",
    });
  };

  const handleUpdateTask = async () => {
    console.log("Data sent to backend:", editedTaskData); // Log editedTaskData before sending

    try {
      console.log("EDITTING", editedTaskData);
      const response = await updateTask({
        ...editedTaskData,
        _id: selectedTaskId,
      });
      console.log("edit", editedTaskData);

      console.log("Task updated successfully:", response.data);

      setIsEditing(false);
      setSelectedTaskId(null);
      setEditedTaskData({
        title: "",
        description: "",
        assignedTo: "",
        departmentId: "",
        dueDate: "",
      });
    } catch (error) {
      console.error("Error updating task:", error);
      // Handle update errors (e.g., display error message)
    }
  };

  const handleChange = (event) => {
    setEditedTaskData({
      ...editedTaskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId); // Call the mutation with taskId
        console.log("Task deleted successfully");
        // Optional: Update local state if necessary (might not be needed)
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleToggleCompletion = (taskId, completed) => {
    // Update task completion state in your backend or local storage
    setDuties(
      duties.map((task) => (task.id === taskId ? { ...task, completed } : task))
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Tasks</h1>
      <div className="flex mb-4">
        <form
          onSubmit={handleAddTask}
          className="flex flex-col justify-between w-full"
        >
          <div className="flex flex-col md:flex-row gap-2  justify-between">
            <input
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-1 w-full  "
              type="text"
              placeholder="Task Title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <textarea
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-1 w-full items-center "
              placeholder="Task Description"
              value={newTaskDescription} // Update state variable name
              onChange={(e) => setNewTaskDescription(e.target.value)} // Update state variable setter
            ></textarea>
            <select
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-1 w-full"
              value={selectedDepartmentId}
              onChange={(e) => setSelectedDepartmentId(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments?.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-1 w-full"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Select User</option>
              {/* Allow selection of only user within the selected department  */}
              {selectedDepartmentId &&
                departments
                  ?.find(
                    (department) => department._id === selectedDepartmentId
                  )
                  ?.users?.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
            </select>

            <input
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-1 w-full"
              type="date"
              placeholder="Due Date"
              // Add state variable to store the date
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-56 rounded-md mt-2 bg-cyan-500 py-2 text-center text-white font-bold hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isCreatingTask}
          >
            {isCreatingTask ? "Adding..." : "Add Task"}
          </button>
        </form>
      </div>
      <div className="shadow  rounded-md bg-white overflow-x-auto">
        <table className="w-full min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-3 md:px-6 py-3 border-b border-r border-gray-200 dark:border-gray-700">
                Title
              </th>
              <th className="px-3 md:px-6 py-3 border-b border-r border-gray-200 dark:border-gray-700">
                Department
              </th>
              <th className="px-3 md:px-6 py-3 border-b border-r border-gray-200 dark:border-gray-700">
                Assigned To
              </th>
              <th className="px-3 md:px-6 py-3 border-b border-r border-gray-200 dark:border-gray-700">
                Status
              </th>
              <th className="px-3 md:px-6 py-3 border-b border-r border-gray-200 dark:border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks?.map((task) => (
              <Task
                key={task._id}
                {...task}
                onEdit={() => handleEditTask(task._id)} // Assuming handleEditTask is defined elsewhere
                onDelete={handleDeleteTask} // Assuming handleDeleteTask is defined elsewhere
                onToggleCompletion={handleToggleCompletion} // Function to update task completion
                // status={task.completed ? "Completed" : "In Progress"} // Set status based on completed flag
                users
              />
            ))}
          </tbody>
        </table>
      </div>

      {isEditing && selectedTaskId && (
        <Modal onClose={handleCloseModal}>
          <EditTask
            task={editedTaskData} // Pass edited user data as a prop
            handleChange={handleChange}
            handleUpdateTask={handleUpdateTask} // Pass handleUpdateUser function
          />
        </Modal>
      )}
    </div>
  );
};

export default TasksPage;
