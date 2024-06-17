import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/slices/usersApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import FadeLoader from "react-spinners/FadeLoader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await login({
  //       email,
  //       password,
  //     }).unwrap();
  //     dispatch(setCredentials({ ...res }));
  //     console.log(res);
  //     navigate("/");
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await login({
  //       email,
  //       password,
  //       headers, // Include headers object with token (if available)
  //     }).unwrap();

  //     const token = localStorage.setItem("token"); // Assuming local storage
  //     console.log("token", token);
  //     const headers = {
  //       "Content-Type": "application/json", // Assuming JSON data
  //     };

  //     if (token) {
  //       headers.Authorization = `Bearer ${token}`;
  //     }

  //     dispatch(setCredentials({ ...res }));
  //     navigate("/");
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming login function returns a Promise that resolves with the response data
      const res = await login({ email, password });

      // Check for successful login and presence of token in response
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        console.log("token", res.data.token); // Log the token for debugging (optional)
      } else {
        // Handle unsuccessful login (e.g., display error message)
        console.log("login", res.data);
        toast.error(res.data?.message || "Login failed");
        return; // Exit the function if login fails
      }

      const headers = {
        "Content-Type": "application/json", // Assuming JSON data
      };

      console.log("header:", headers);
      // Add Authorization header only if token is present
      if (localStorage.getItem("token")) {
        headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
      }
      console.log("header2:", headers);

      dispatch(setCredentials({ ...res.data }));
      navigate("/");
    } catch (err) {
      console.log("ERROR:", err);
      toast.error("Invalid Email or Password");
    }
  };

  console.log(userInfo?.token);

  return (
    <div className="min-h-screen bg-cyan-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md px-8 py-12 w-[90%] md:w-1/3">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-8">
          Login to view more information
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {isLoading ? (
            <div className="text-center mt-4">
              <FadeLoader
                color={"#3498db"}
                size={80}
                className="mx-auto block"
              />{" "}
            </div>
          ) : (
            <button
              type="submit"
              className="w-full rounded-md bg-cyan-500 py-2 text-center text-white font-bold hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:offset-2 focus:ring-blue-500"
              disabled={!email || !password}
            >
              Login
            </button>
          )}

          <div className="text-center mt-2">
            <p>
              Not Registered?{" "}
              <span>
                {" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                  SignUp
                </Link>{" "}
              </span>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
