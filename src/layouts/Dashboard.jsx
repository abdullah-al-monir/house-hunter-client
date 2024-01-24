import { useEffect, useState } from "react";
import logo from "../assets/house-hunter-logo.png";
import { Link, NavLink, useNavigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { enqueueSnackbar } from "notistack";
const Dashboard = () => {
  const { user, setUser } = useAuth();
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const handleVisibility = () => {
      setIsActive(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleVisibility);
    handleVisibility();
    return () => {
      window.removeEventListener("resize", handleVisibility);
    };
  }, []);
  const toggleSidebar = () => {
    setIsActive(!isActive);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    enqueueSnackbar("User logged out successfully", {
      variant: "success",
      autoHideDuration: 1000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
    navigate("/");
    setUser(null);
  };
  const dashboardPages = (
    <>
      <li className="mb-2 text-primary w-full">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          <li className="p-2 bg-darkYellow">Profile Settings</li>
        </NavLink>
      </li>
      {user?.role === "owner" && (
        <>
          <li className=" text-primary mb-2">
            <NavLink
              to="manageHouses"
              className={({ isActive }) =>
                isActive ? "font-bold " : "text-primary"
              }
            >
              <li className="p-2 bg-darkYellow">Manage Houses</li>
            </NavLink>
          </li>
          <li className=" text-primary mb-2">
            <NavLink
              to="addHouse"
              className={({ isActive }) =>
                isActive ? "font-bold " : "text-primary"
              }
            >
              <li className="p-2 bg-darkYellow">Add New House</li>
            </NavLink>
          </li>
          <li className="  mb-2">
            <NavLink
              to="manageBookings"
              className={({ isActive }) =>
                isActive ? "font-bold " : "text-primary"
              }
            >
              <li className="p-2 bg-darkYellow">Manage Bookings</li>
            </NavLink>
          </li>
        </>
      )}
      {user?.role === "renter" && (
        <li className=" text-primary mb-2">
          <NavLink
            to="bookings"
            className={({ isActive }) => (isActive ? "font-bold " : "")}
          >
            <li className="p-2 bg-darkYellow">My Bookings:</li>
          </NavLink>
        </li>
      )}
      <hr className="my-5" />
      <li className=" mb-2 text-primary">
        <NavLink to="/">
          <li className="p-2 border-2 ">Home</li>
        </NavLink>
      </li>
      <li className="mb-2 text-primary">
        <NavLink to="/about">
          <li className="p-2 border-2 ">About Us</li>
        </NavLink>
      </li>
      <li className=" mb-2 text-primary">
        <NavLink to="/contact">
          <li className="p-2 border-2 ">Contact Us</li>
        </NavLink>
      </li>
      <li>
        <button
          onClick={handleLogOut}
          className="font-semibold text-white bg-red-700 hover:bg-red-800 py-2 px-4 w-full rounded-lg  duration-300"
        >
          Log Out
        </button>
      </li>
    </>
  );
  return (
    <div
      className={`flex min-h-screen max-w-screen-xl mx-auto ${
        isActive ? "" : "ml-0"
      }`}
    >
      <div
        className={`fixed h-full w-64 bg-orangeColor text-primary transition-all duration-500 pt-10 ${
          isActive ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5">
          <div className="flex items-center mb-4">
            <img className="h-[72px]" src={logo} alt="" />
            <div className="text-4xl font-extrabold uppercase">
              <span className="tracking-[8.5px]">ouse</span> <br />
              unter
            </div>
          </div>
          <ul className="font-semibold">{dashboardPages}</ul>
        </div>
      </div>

      <div
        className="flex-1 p-5  pt-32 lg:p-10
       lg:pl-80"
      >
        <Outlet />
      </div>

      <div
        className={`${
          isActive ? "bg-transparent" : "bg-orangeColor w-full"
        } left-0 top-0  fixed lg:hidden  flex`}
      >
        <button
          className="left-0 top-0 m-6 p-2 lg:hidden"
          onClick={toggleSidebar}
        >
          {!isActive ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="#023047"
              viewBox="0 0 24 24"
              stroke="#023047"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8h16M4 16h16"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="#023047"
              viewBox="0 0 24 24"
              stroke="#023047"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>

        <Link
          to="/"
          className={`${isActive ? "hidden" : "flex"}  items-center mx-auto`}
        >
          <img className="w-auto h-7" src={logo} alt="" />
          <h2
            className="font-bold text-3xl uppercase stylish"
            style={{
              background: `linear-gradient(90deg, #023047, #219ebc)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            OUSE HUNTER
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
