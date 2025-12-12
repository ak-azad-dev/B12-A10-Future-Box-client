import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import Logo from "../../assets/logo.png";
import { LogOut, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const menus = [
    { name: "Home", path: "/" },
    { name: "All Movies", path: "/movies" },
    { name: "My Collection", path: "/my-collection" },
  ];

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You're logged out!");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        <div className="navbar-end hidden md:flex gap-5 items-center">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() =>
              document.getElementById("movie_search_modal").showModal()
            }
            aria-label="Open search"
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

          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((s) => !s)}
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                className="flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1C75FF] p-1"
              >
                {/* Avatar */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full ring-2 ring-primary ring-offset-2 bg-gray-200 text-black font-semibold overflow-hidden">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User avatar"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm">
                      {(user?.displayName || "U").slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>

                <span className="text-white font-medium hidden md:block">
                  {user?.displayName}
                </span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg ring-1 ring-black/5 overflow-hidden z-50">
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setProfileOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <User size={16} /> Profile
                      </div>
                    </Link>
                    <Link
                      to="/movie/add"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setProfileOpen(false)}
                    >
                      Add Movie
                    </Link>
                    <Link
                      to="/collections"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setProfileOpen(false)}
                    >
                      My Collections
                    </Link>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut size={16} /> Logout
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
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
              {menus.map((menu, index) => (
                <li key={index}>
                  <NavLink
                    to={menu.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block w-full px-4 py-3 rounded-md transition-colors ${
                        isActive
                          ? "bg-[#0f4fb3] font-semibold"
                          : "hover:bg-white/5"
                      }`
                    }
                  >
                    {menu.name}
                  </NavLink>
                </li>
              ))}
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

              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-black font-semibold">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "avatar"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>
                          {(user?.displayName || "U").slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        {user?.displayName || user?.email}
                      </div>
                      <div className="text-xs text-gray-300">Member</div>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="block w-full px-4 py-3 rounded-md bg-white/5 text-white text-center font-semibold"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/collections"
                    onClick={() => setOpen(false)}
                    className="block w-full px-4 py-3 rounded-md bg-white/5 text-white text-center font-semibold"
                  >
                    My Collections
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="block w-full px-4 py-3 rounded-md bg-linear-to-r from-[#E63A3A] to-[#F25A3C] text-white text-center font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
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
