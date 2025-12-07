import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { useLocation } from "react-router";
import Logo from "../../assets/logo.png";
import { LogOut } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const menus = [
    { name: "Home", path: "/" },
    { name: "All Movies", path: "/movies" },
    { name: "My Collection", path: "/collections" },
  ];

  return (
    <>
      <div className="navbar bg-black/10 backdrop-blur-md shadow-lg shadow-black/20 h-[70px] mx-auto md:px-10 fixed top-0 left-0 w-full z-50 border-b border-white/10">
        <div className="navbar-start flex items-center gap-4">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="btn btn-ghost lg:hidden bg-transparent border-none p-2 text-white hover:bg-transparent hover:border-none hover:shadow-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>

          <Link to="/" className="flex items-center gap-4">
            <img src={Logo} alt="App Logo" className="h-10 w-10" />
            <span className="text-[18px] md:text-[22px] font-bold text-white">
              MovieMasterPro
            </span>
          </Link>
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
                  <NavLink to={menu.path} className="px-1 py-2">
                    {menu.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="navbar-end hidden md:flex gap-5">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() =>
              document.getElementById("movie_search_modal").showModal()
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <Link
            to="/sign-in"
            className="btn text-base font-semibold text-white border-0 flex items-center gap-2.5 rounded-lg px-5 py-2.5 bg-linear-to-r from-[#1C75FF] to-[#4DA1FF] shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
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

      <div
        className={`fixed inset-0 z-40 transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm`}
          onClick={() => setOpen(false)}
        ></div>

        <aside
          className={`fixed left-0 top-0 h-full w-72 bg-[#07070b] text-white transform transition-transform ${
            open ? "translate-x-0" : "-translate-x-full"
          } shadow-xl`}
        >
          <div className="p-4 flex items-center justify-between border-b border-white/5">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3"
            >
              <img src={Logo} alt="Logo" className="h-9 w-9" />
              <span className="font-bold text-lg">MovieMasterPro</span>
            </Link>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="btn btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="p-4">
            <ul className="flex flex-col gap-2">
              {menus.map((menu, index) => {
                const isActive = location.pathname === menu.path;
                return (
                  <li key={index}>
                    <NavLink
                      to={menu.path}
                      onClick={() => setOpen(false)}
                      className={`block w-full px-4 py-3 rounded-md transition-colors ${
                        isActive
                          ? "bg-[#0f4fb3] font-semibold"
                          : "hover:bg-white/5"
                      }`}
                    >
                      {menu.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 border-t border-white/5 pt-4 space-y-3">
              <button
                onClick={() => {
                  document.getElementById("movie_search_modal").showModal();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-md bg-linear-to-r from-[#1C75FF] to-[#4DA1FF] font-semibold"
              >
                Search Movies
              </button>
              <Link
                to="/sign-in"
                onClick={() => setOpen(false)}
                className="block w-full px-4 py-3 rounded-md bg-white/5 text-white text-center font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="block w-full px-4 py-3 rounded-md bg-linear-to-r from-[#E63A3A] to-[#F25A3C] text-white text-center font-semibold"
              >
                Register
              </Link>
            </div>
          </nav>
        </aside>
      </div>

      <dialog
        id="movie_search_modal"
        className="modal modal-bottom sm:modal-middle bg-white/10 backdrop-blur-md"
      >
        <div className="modal-box">
          <h3 className="font-semibold text-xl text-center mb-4">
            Search Movies
          </h3>
          <input
            type="text"
            placeholder="Search for movies..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="modal-action">
            <form method="dialog" className="w-full">
              <button className="btn w-full bg-linear-to-r from-[#4DA1FF] to-[#1C75FF] text-white font-semibold">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
