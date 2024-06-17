import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
