import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./conponents/pages/home";
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

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <ProtectRoute />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/company-profile", element: <CompanyProfile /> },
          { path: "/services", element: <Services /> },
          { path: "/profile", element: <Profile /> },
          { path: "/reviews", element: <Reviews /> },
          { path: "/calendar", element: <Calendar /> },
          { path: "/booking", element: <Booking /> },
          { path: "/payments", element: <Payment /> },
          
          { path: "/users", element: <Users /> },
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
    children:[
      {path: "/select-company",element:<SelectCompany/>},
      {path: "/create-company",element:<CreateCompany/>}
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <Toaster position="top-center" />
    </QueryClientProvider>
  </React.StrictMode>
);
