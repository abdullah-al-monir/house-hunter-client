import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Dashboard from "../layouts/Dashboard";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Booking from "../pages/Booking/Booking";

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
    ],
  },
]);

export default Route;
