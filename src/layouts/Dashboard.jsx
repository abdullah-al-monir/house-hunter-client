import { useEffect, useState } from "react";

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
        className={`fixed h-full w-64 bg-gray-800 text-white transition-all duration-500 ${
          isActive ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5">
          <div className="flex items-center mb-4">
            <i className="bx bxl-javascript text-3xl mr-2"></i>
            <div className="text-xl font-bold">CodingLab</div>
          </div>
          <ul></ul>
        </div>
      </div>

      <div className="flex-1 p-10">
        <div className="text-2xl font-semibold text-gray-800 lg:ml-64">
          Home Content
        </div>
      </div>

      <button
        className="left-0 top-0 m-6 p-2 bg-red-800 text-red-500 fixed lg:hidden"
        onClick={toggleSidebar}
      >
        <i className={`bx ${isActive ? "" : ""} text-3xl`}></i>
      </button>
    </div>
  );
};

export default Dashboard;
