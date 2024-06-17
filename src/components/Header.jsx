import React from "react";
import task from "/task.jpeg";

const Header = () => {
  return (
    <div
      className="flex flex-col md:flex-row py-10 gap-20 justify-between bg-cyan-100"
      data-testid="header"
    >
      <div className="w-full md:w-[60%] pl-6 flex flex-col gap-6 justify-center items-start">
        {/* Company Logo (Optional) */}
        {/* <img src="/company_logo.png" alt="{companyName} Logo" className="w-24 h-auto mb-4" /> */}

        <h1
          className="font-bold text-3xl sm:text-5xl md:text-6xl"
          data-testid="header-title"
        >
          TRIPPY's Task Management System
        </h1>
        <p className="text-xl leading-loose" data-testid="header-description">
          Boost your team's productivity and streamline your workflow with our
          intuitive task management platform.
        </p>
      </div>
      <div className="pl-6">
        <img
          src={task}
          alt="Task Management Illustration"
          className="w-[80%] rounded-md h-80 object-cover"
          data-testid="photo-image"
        />
      </div>
    </div>
  );
};

export default Header;
