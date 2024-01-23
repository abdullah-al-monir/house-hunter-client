import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Dashboard from "../layouts/Dashboard";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Booking from "../pages/Booking/Booking";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import AddHouse from "../pages/OwnerDashboard/AddHouse";
import ManageHouses from "../pages/OwnerDashboard/ManageHouses";
import ManageBookings from "../pages/OwnerDashboard/ManageBookings";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/bookings",
        element: <Booking />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/addHouse",
        element: <AddHouse />,
      },
      {
        path: "/dashboard/manageHouses",
        element: <ManageHouses />,
      },
      {
        path: "/dashboard/manageBookings",
        element: <ManageBookings />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

export default Route;
