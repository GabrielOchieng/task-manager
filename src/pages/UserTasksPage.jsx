import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUpdateTaskMutation } from "../redux/slices/tasksApiSlice";

function UserTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateTask] = useUpdateTaskMutation(); // Destructure updateTask mutation

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo.user._id; // Assuming user ID is stored in auth state

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:5000/tasks/${userId}/tasks`
        ); // Get user tasks
        if (!response.ok) {
          throw new Error(`Error fetching tasks: ${response.statusText}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  // const handleMarkDone = async (taskId) => {
  //   // Simulate updating task status on server (replace with your actual API call)
  //   if (window.confirm("Are you sure you have completed this task?")) {
  //     setTasks((prevTasks) =>
  //       prevTasks.map((task) =>
  //         task._id === taskId
  //           ? { ...task, completed: true, inProgress: false }
  //           : task
  //       )
  //     );
  //   }
  // };

  const handleMarkDone = async (taskId) => {
    if (window.confirm("Are you sure you have completed this task?")) {
      try {
        // Call the API to update task on the backend
        const response = await updateTask({
          _id: taskId,
          completed: true,
          inProgress: false,
        });
        console.log("Task updated successfully:", response.data);

        // If successful, update the local state to reflect the change
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId
              ? { ...task, completed: true, inProgress: false }
              : task
          )
        );
      } catch (error) {
        console.error("Error updating task:", error);
        // Handle update errors (e.g., display error message)
      }
    }
  };

  const handleMarkInProgress = async (taskId) => {
    // Simulate updating task status on server (replace with your actual API call)

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: false, inProgress: true }
          : task
      )
    );

    // Send an actual update request to your backend API if applicable
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1>Your Tasks</h1>
      {isLoading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {tasks.length > 0 ? (
        <ul className="list-none">
          {tasks.map((task) => (
            <li key={task._id} className="my-4 border-b border-gray-200 py-4">
              <div className="flex justify-between items-center">
                <span
                  className={`text-lg font-medium ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </span>
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-2 rounded-md text-white ${
                      task.completed
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-700"
                    }`}
                    onClick={() => handleMarkDone(task._id)}
                    disabled={task.completed}
                  >
                    Done
                  </button>
                  <button
                    className={`px-3 py-2 rounded-md text-white ${
                      task.completed
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700"
                    }`}
                    onClick={() => handleMarkInProgress(task._id)}
                    disabled={task.completed}
                  >
                    In Progress
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no tasks.</p>
      )}
    </div>
  );
}

export default UserTasksPage;
