import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
// import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/slices/usersApiSlice";
import { logout } from "../redux/slices/authSlice";

import { SiGoogletasks } from "react-icons/si";

import { useState } from "react";

const Navbar = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const manager = userInfo?.user.role === "manager";
  const admin = userInfo?.user.role === "admin";

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth", // Optional for smooth scrolling
    });
  };

  // const manager = false;

  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative shadow-md ">
      {/* MOBILE */}
      <div className="h-full flex items-center justify-between lg:hidden">
        <Link to="/" className="flex items-center" data-testid="mobile-logo">
          {" "}
          <SiGoogletasks className="w-12 h-12 object-cover text-cyan-700" />
          <div className="text-2xl tracking-wide">TASKY</div>
        </Link>
        <Menu
          userInfo={userInfo}
          handleLogout={handleLogout}
          data-testid="mobile-menu"
          manager={manager}
          admin={admin}
          scrollToBottom={scrollToBottom}
        />
      </div>
      {/* BIGGER SCREENS */}
      <div className="hidden w-full lg:flex items-center gap-20 h-full ">
        {/* LEFT */}

        <Link
          to="/"
          className="flex items-center gap-2"
          data-testid="desktop-logo"
        >
          {" "}
          <SiGoogletasks className="w-12 h-12 object-cover text-cyan-700" />
          <div className="text-2xl tracking-wide">TASKY</div>
        </Link>
        <div className="hidden lg:flex justify-between w-full">
          <Link to="/" className=" hover:underline" data-testid="home-link">
            Home
          </Link>
          {manager || admin ? (
            <>
              <Link
                to="/users"
                className=" hover:underline"
                data-testid="users-link"
              >
                Users
              </Link>
              <Link
                to="/departments"
                className=" hover:underline"
                data-testid="users-link"
              >
                Departments
              </Link>
            </>
          ) : (
            ""
          )}
          {manager || admin ? (
            <Link
              to="/tasks"
              className=" hover:underline"
              data-testid="users-link"
            >
              Tasks
            </Link>
          ) : (
            <Link
              to="/mytasks"
              className=" hover:underline"
              data-testid="users-link"
            >
              My Tasks
            </Link>
          )}
          {!userInfo ? (
            <>
              <Link to="" className=" hover:underline" data-testid="users-link">
                <button onClick={scrollToBottom}>About Us</button>
              </Link>
              <Link to="" className=" hover:underline" data-testid="users-link">
                <button onClick={scrollToBottom}>Contact Us</button>
              </Link>
            </>
          ) : (
            ""
          )}
          {manager || admin ? (
            <Link
              to="/dashboard"
              className=" hover:underline"
              data-testid="users-link"
            >
              Dashboard
            </Link>
          ) : (
            ""
          )}
          {userInfo ? (
            <>
              <p>Welcome {userInfo.user.username}</p>
              <p> {userInfo.user.role}</p>
              <Link
                to="/"
                onClick={handleLogout}
                className=" hover:underline"
                data-testid="logout-link"
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              data-testid="signin-link"
              className=" hover:underline"
            >
              Signin
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
