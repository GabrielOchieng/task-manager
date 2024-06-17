// import React from "react";

// const Departments = ({ departments }) => {
//   if (!departments?.length) {
//     return <p>No departments found.</p>;
//   }

//   return (
//     <ul className="list-none pl-4 divide-y divide-gray-200">
//       {departments.map((department) => (
//         <li key={department._id} className="py-2 hover:bg-gray-100">
//           <div className="flex justify-between items-center">
//             <h3 className="font-bold">{department.name}</h3>
//             {/* Removed button for toggling details */}
//           </div>
//           <div>
//             <p className="font-medium">Users:</p>
//             <ul className="list-disc pl-4">
//               {department.users?.map((user) => (
//                 <li key={user._id}>{user.name}</li>
//               ))}
//               {department.users?.length === 0 && <li>No users assigned.</li>}
//             </ul>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default Departments;

import React from "react";

const Departments = ({ departments, onEditDepartment, editFormRef }) => {
  if (!departments?.length) {
    return <p>No departments found.</p>;
  }

  return (
    <ul className="list-none pl-4 divide-y divide-gray-200">
      {departments.map((department) => (
        <li key={department._id} className="py-2 hover:bg-gray-100">
          <div className="flex justify-between items-center">
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
            <p className="font-medium">Users:</p>
            <ul className="list-disc pl-4">
              {department.users?.map((user) => (
                <li key={user._id}>{user.name}</li>
              ))}
              {department.users?.length === 0 && <li>No users assigned.</li>}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Departments;
