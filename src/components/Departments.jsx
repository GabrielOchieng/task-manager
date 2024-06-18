import React from "react";
import { Link } from "react-router-dom";

const Departments = ({ departments, onEditDepartment, editFormRef }) => {
  if (!departments?.length) {
    return <p>No departments found.</p>;
  }

  return (
    <div>
      <ul className="list-none mt-5  flex flex-wrap gap-4 justify-between ">
        {departments.map((department) => (
          <li
            key={department._id}
            className="p-4 hover:bg-gray-100 border border-gray-200 rounded-md w-full sm:w-[45%] md:w-[30%] flex flex-col gap-5"
          >
            <div className="flex justify-between items-center ">
              <h3 className="font-bold">{department.name}</h3>
              <button
                className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 px-2"
                onClick={() => {
                  onEditDepartment(department);
                  editFormRef.current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Edit
              </button>
            </div>
            <div>
              <Link
                to={`/departments/${department._id}`}
                className="text-cyan-500 hover:underline"
              >
                View more
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Departments;
