import React from "react";
import { Link, NavLink } from "react-router";
import { useLocation } from "react-router";
import Logo from "../../assets/logo.png";
import { LogOut } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();
  const menus = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "All Movies",
      path: "/movies",
    },
    {
      name: "My Collection",
      path: "/collections",
    },
  ];

  return (
    <div className="navbar bg-black/10 backdrop-blur-md shadow-lg shadow-black/20 h-[70px] mx-auto md:px-10 fixed top-0 left-0 w-full z-999 border-b border-white/10">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden bg-transparent border-none p-2 text-[#1C75FF] hover:bg-transparent hover:border-none hover:shadow-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-black rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {menus.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <li
                  key={index}
                  className={`text-white leading-[152%] border-b-2 transition-all duration-300 ${
                    isActive
                      ? "border-[#1C75FF] border-b-3 font-bold"
                      : "border-transparent hover:border-[#1C75FF]"
                  }`}
                >
                  <Link to={menu.path}>{menu.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <a className="flex items-center gap-4" href="/">
          <img src={Logo} alt="App Logo" className="h-10 w-10" />
          <span className="text-[18px] md:text-[24px] font-bold text-white">
            MovieMaster
          </span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal px-1 flex gap-8">
          {menus.map((menu, index) => {
            const isActive = location.pathname === menu.path;
            return (
              <li
                key={index}
                className={`text-white leading-[152%] border-b-2 transition-all duration-300 ${
                  isActive
                    ? "border-[#1C75FF] border-b-3 font-bold"
                    : "border-transparent hover:border-[#1C75FF]"
                }`}
              >
                <Link to={menu.path}>{menu.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navbar-end hidden md:flex gap-5">
        <Link
          to="/sign-in"
          className="btn text-base font-semibold text-white border-0 flex items-center gap-2.5 rounded-lg px-5 py-2.5 bg-linear-to-r from-[#4DA1FF] to-[#1C75FF] shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="btn text-base font-semibold text-white border-0 flex items-center gap-2.5 rounded-lg px-5 py-2.5 bg-linear-to-r from-[#E63A3A] to-[#F25A3C] shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
        >
          Register
        </Link>
      </div>
    </div>
  );
};
