import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Dashboard from "../layouts/Dashboard";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import AddHouse from "../pages/OwnerDashboard/AddHouse";
import ManageHouses from "../pages/OwnerDashboard/ManageHouses";
import ManageBookings from "../pages/OwnerDashboard/ManageBookings";
import UpdateHouse from "../pages/OwnerDashboard/UpdateHouse";
import Booking from "../pages/RenterDashboard/Booking/Booking";
import PrivateRoute from "./PrivateRoute";

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
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "bookings",
        element: (
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "addHouse",
        element: <AddHouse />,
      },
      {
        path: "manageHouses",
        element: <ManageHouses />,
      },
      {
        path: "manageBookings",
        element: <ManageBookings />,
      },
      {
        path: "update/:id",
        element: <UpdateHouse />,
        loader: ({ params }) =>
          fetch(`house-hunter-server-wheat-three.vercel.app/house/${params.id}`),
      },
    ],
  },
]);

export default Route;
