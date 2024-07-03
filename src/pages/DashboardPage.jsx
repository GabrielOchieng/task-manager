import React from "react";
import { useGetTasksQuery } from "../redux/slices/tasksApiSlice";
import { useGetAllUsersQuery } from "../redux/slices/usersApiSlice";
import UserChart from "../components/UsersChart";
import UsersPerDepartmentChart from "../components/UsersDepartMentBar";
import TasksBar from "../components/TaskBar";
import TasksCompletedBar from "../components/TasksCompletedBar";

const DashboardPage = () => {
  return (
    <div className="w-[95%] mx-auto flex flex-wrap justify-between gap-20 py-8">
      <div className="  w-full mx-auto md:w-[45%] h-80  p-3">
        <TasksBar />
      </div>
      <div className=" w-full mx-auto md:w-[45%] h-80 p-3 ">
        <UserChart />
      </div>

      <div className=" w-full mx-auto md:w-[45%] h-80  p-3">
        <TasksCompletedBar />
      </div>
      <div className=" w-full mx-auto md:w-[45%] h-80 p-3">
        <UsersPerDepartmentChart />
      </div>
    </div>
  );
};

export default DashboardPage;
