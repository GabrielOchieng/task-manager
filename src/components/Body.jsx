import taskg from "/taskg.jpeg";
import googleplay from "/googleplay.jpg";
import appstore from "/appstore.png";
import { Link } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row h-[550px] md:h-[600px] items-start md:items-center gap-10 px-3 py-5 bg-cyan-200">
        <div className="w-full md:w-1/2 pl-0 md:pl-10 flex flex-col gap-6 justify-center items-start">
          <h1 className="font-bold text-3xl md:text-6xl text-cyan-700">
            Assign Tasks Efficiently
          </h1>
          <hr className="border border-cyan-700 w-32 md:w-48 h-2 bg-cyan-700 ml-[-20px]" />
          <p className="md:text-xl text-gray-500">
            Manage your team's workload effectively. Delegate tasks based on
            skills and expertise to ensure smooth project execution.
          </p>
          <div className="flex gap-2">
            <Link to="/users">
              <img src={appstore} alt="App Store" className="cursor-pointer" />
            </Link>
            <Link to="/users">
              <img
                src={googleplay}
                alt="Google Play"
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>
        <div>
          <img
            src={taskg}
            alt="Task Management Illustration"
            className="h-60 md:h-72 w-72 md:w-96 rounded object-cover"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 bg-cyan-300 h-[2px] w-[80%] mx-auto" />
    </div>
  );
};

export default Body;
