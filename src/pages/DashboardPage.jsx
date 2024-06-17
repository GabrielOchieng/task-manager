import React from "react";
import { useGetTasksQuery } from "../redux/slices/tasksApiSlice";
import { useGetAllUsersQuery } from "../redux/slices/usersApiSlice";
import TaskChartComponent from "../components/TaskChart";
import UserChart from "../components/UsersChart";
import DepartmentChart from "../components/DepartmentsChart";
import UserTaskBar from "../components/UserTaskBar";

const DashboardPage = () => {
  const { data: users } = useGetAllUsersQuery();
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  console.log(tasks);
  return (
    <div className="w-[95%] mx-auto flex flex-wrap justify-between gap-20 py-8">
      <div className=" w-full  md:w-[45%] h-96 border p-3">
        <TaskChartComponent />
      </div>
      <div className=" w-[full] md:w-[45%] h-80 p-3 ">
        <UserChart />
      </div>
      <div className=" w-full md:w-[45%] h-96 border p-3">
        <DepartmentChart />
      </div>
      <div className=" w-full md:w-[45%] h-96 border p-3">
        <UserTaskBar />
      </div>
    </div>
  );
};

export default DashboardPage;
