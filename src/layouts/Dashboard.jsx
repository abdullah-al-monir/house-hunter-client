import { useEffect, useState } from "react";
import logo from "../assets/house-hunter-logo.png";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [isActive, setIsActive] = useState(true);
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
            <img className="h-20" src={logo} alt="" />
            <div className="text-3xl font-extrabold uppercase">
              ouse <br />
              unter
            </div>
          </div>
          <ul></ul>
        </div>
      </div>

      <div className="flex-1 p-10">
        <div className="text-2xl font-semibold text-gray-800 lg:ml-64">
          Home Content
        </div>
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
