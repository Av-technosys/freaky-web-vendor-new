import React from "react";
window.React = React;
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import "react-markdown-editor-lite/lib/index.css";

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./conponents/pages/dashboard";
import Login from "./conponents/pages/login";
import SignUp from "./conponents/pages/signUp";
import CompanyProfile from "./conponents/pages/companyProfile";
import Services from "./conponents/pages/services";
import Profile from "./conponents/pages/profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Booking, Reviews, Users } from "./conponents/pages";
import Calendar from "./conponents/pages/calendar";
import ForgetPassword from "./conponents/pages/forgetPassword";
import ProtectRoute from "./conponents/protectRoute";
import Payment from "./conponents/pages/payments";
import { Toaster } from "./components/ui";
import SelectCompany from "./conponents/pages/selectCompany";
import CreateCompany from "./conponents/pages/createCompany";
import ManagePaymentBook from "./conponents/pages/managePaymentBook";
import ManageService from "./conponents/pages/manageService";
import UserToVendor from "./conponents/pages/userToVendor";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <ProtectRoute />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "/dashboard", element: <Home /> },
          { path: "/company-profile", element: <CompanyProfile /> },
          { path: "/services", element: <Services /> },
          {
            path: "/services/manage-service/:productId?",
            element: <ManageService />,
          },
          {
            path: "/services/manage-payment-book",
            element: <ManagePaymentBook />,
          },
          { path: "/profile", element: <Profile /> },
          { path: "/reviews", element: <Reviews /> },
          { path: "/calendar", element: <Calendar /> },
          { path: "/bookings", element: <Booking /> },
          { path: "/payments", element: <Payment /> },

          { path: "/manage-users", element: <Users /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    element: <ProtectRoute />,
    children: [
      { path: "/select-company", element: <SelectCompany /> },
      { path: "/create-company", element: <CreateCompany /> },
      {
        path: "/map-vendor",
        element: <UserToVendor />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <Toaster position="top-center" />
    </QueryClientProvider>
  </React.StrictMode>,
);
