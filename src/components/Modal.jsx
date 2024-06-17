import React from "react";

const Modal = ({ children, onClose }) => {
  const handleClose = (event) => {
    // Close the modal only if the click originated from outside the modal content
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="relative mx-auto my-auto p-4 w-full max-w-sm rounded-md bg-white shadow-md">
        {children}
        <button
          type="button"
          className=" px-4 py-2 text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
