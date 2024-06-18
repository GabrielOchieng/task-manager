import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { BiX } from "react-icons/bi";

const Menu = ({ userInfo, handleLogout, manager, admin, scrollToBottom }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      {open ? (
        <BiX
          data-testid="close-icon" // Added data-testid for close icon
          className="cursor-pointer w-14 h-14 object-cover"
          onClick={() => setOpen(false)}
        />
      ) : (
        <button
          data-testid="menu-icon" // Added data-testid for menu icon button
          className="cursor-pointer w-14 h-14 object-cover"
          aria-label="Close Menu"
        >
          <IoMenu
            className="cursor-pointer w-14 h-14 object-cover"
            onClick={() => setOpen(true)}
          />
        </button>
      )}

      {open && (
        <div
          data-testid="dropdown-menu" // Added data-testid for dropdown menu
          className="absolute bg-cyan-700 text-white right-0 top-20 w-64 flex flex-col items-start py-4 justify-center gap-4 text-xl z-10 pl-5 rounded-b-md"
        >
          <Link to="/" className="hover:text-black">
            Home
          </Link>

          {manager ||
            (admin && (
              <>
                <Link
                  to="/users"
                  className=" hover:text-black"
                  data-testid="users-link"
                >
                  Users
                </Link>
                <Link
                  to="/departments"
                  className=" hover:text-black"
                  data-testid="users-link"
                >
                  Departments
                </Link>
              </>
            ))}
          {manager || admin ? (
            <Link
              to="/tasks"
              className=" hover:text-black"
              data-testid="users-link"
            >
              Tasks
            </Link>
          ) : (
            <Link
              to="/mytasks"
              className=" hover:text-black"
              data-testid="users-link"
            >
              My Tasks
            </Link>
          )}

          {!userInfo ? (
            <>
              <Link
                to=""
                className=" hover:text-black"
                data-testid="users-link"
              >
                <button onClick={scrollToBottom}>About Us</button>
              </Link>
              <Link
                to=""
                className=" hover:text-black"
                data-testid="users-link"
              >
                <button onClick={scrollToBottom}>Contact Us</button>
              </Link>
            </>
          ) : (
            ""
          )}
          {manager ||
            (admin && (
              <Link
                to="/dashboard"
                className=" hover:text-black"
                data-testid="users-link"
              >
                Dashboard
              </Link>
            ))}
          {userInfo ? (
            <>
              <p>Welcome {userInfo.user.username}</p>
              <p> {userInfo.user.role}</p>
              <Link
                to="/"
                onClick={handleLogout}
                className=" hover:text-black"
                data-testid="logout-link"
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              data-testid="signin-link"
              className=" hover:text-black"
            >
              Signin
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
