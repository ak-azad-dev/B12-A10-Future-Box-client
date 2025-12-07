import { Outlet } from "react-router";
import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        className="px-5 md:px-0"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
}

export default App;
