import React from "react";

const Skeleton = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="h-10 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="flex space-x-4">
        <div className="h-8 bg-gray-200 rounded-full animate-pulse w-1/2"></div>
        <div className="h-8 bg-gray-200 rounded-full animate-pulse w-1/2"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="flex space-x-4">
        <div className="h-8 bg-gray-200 rounded-full animate-pulse w-1/2"></div>
        <div className="h-8 bg-gray-200 rounded-full animate-pulse w-1/2"></div>
      </div>
    </div>
  );
};

export default Skeleton;
