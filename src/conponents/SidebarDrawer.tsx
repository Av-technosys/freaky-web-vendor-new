"use client";
import { NavLink } from "react-router-dom";
import logo from "../assets/Images/freaky_logo.png";

import {
  TiconLayoutDashboard,
  TiIconBriefcase,
  TiIconCalendar,
  TiIconMenu2,
  TiIconStar,
  TiIconTool,
  TiIconUser,
  TiIconUsers,
  TiIconX,
} from "./icons";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui";

export function SidebarDrawer() {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <button className=" rounded-md hover:bg-gray-100">
          <TiIconMenu2 className="w-5 h-5 text-gray-600" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className=" w-full h-full  overflow-y-scroll">
          <DrawerHeader>
            <DrawerTitle>
              <div className=" flex items-center justify-between  ">
                <img src={logo} alt="Freaky Chimp Logo" className="w-32 h-14" />
                <DrawerTrigger asChild>
                  <TiIconX className="text-gray-600" />
                </DrawerTrigger>
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <div className=" w-full flex flex-col  items-start ">
            <ul className="w-full grid gap-1 px-3 ">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center  gap-3 px-3 py-2 rounded-md transition-colors duration-150 hover:bg-gray-50 ${
                      isActive
                        ? "bg-gradient-to-r from-[#FFE492] to-[#FFBAA4] font-medium"
                        : "text-gray-700"
                    }`
                  }
                >
                  <TiconLayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `flex items-center  gap-3 px-3 py-2 rounded-md transition-colors duration-150 hover:bg-gray-50 ${
                      isActive
                        ? "bg-gradient-to-r from-[#FFE492] to-[#FFBAA4] font-medium"
                        : "text-gray-700"
                    }`
                  }
                >
                  <TiIconTool className="h-5 w-5" />
                  <span>Manage Services</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/booking"
                  className={({ isActive }) =>
                    `flex items-center  gap-3 px-3 py-2 rounded-md transition-colors duration-150 hover:bg-gray-50 ${
                      isActive
                        ? "bg-gradient-to-r from-[#FFE492] to-[#FFBAA4] font-medium"
                        : "text-gray-700"
                    }`
                  }
                >
                  <TiIconCalendar className="h-5 w-5" />
                  <span>Booking</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/calendar"
                  className={({ isActive }) =>
                    `flex items-center  gap-3 px-3 py-2 rounded-md transition-colors duration-150 hover:bg-gray-50 ${
                      isActive
                        ? "bg-gradient-to-r from-[#FFE492] to-[#FFBAA4] font-medium"
                        : "text-gray-700"
                    }`
                  }
                >
                  <TiIconCalendar className="h-5 w-5" />
                  <span>Calendar</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reviews"
                  className={({ isActive }) =>
                    `flex items-center  gap-3 px-3 py-2 rounded-md transition-colors duration-150 hover:bg-gray-50 ${
                      isActive
                        ? "bg-gradient-to-r from-[#FFE492] to-[#FFBAA4] font-medium"
                        : "text-gray-700"
                    }`
                  }
                >
                  <TiIconStar className="h-5 w-5" />
                  <span>User Reviews</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/company"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-150 hover:bg-gray-50 ${
                      isActive
                        ? "bg-gradient-to-r from-[#FFE492] to-[#FFBAA4] font-medium"
                        : "text-gray-700"
                    }`
                  }
                >
                  <TiIconBriefcase className="h-5 w-5" />
                  <span>Company Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center  gap-3 px-3 py-2 rounded-md transition-colors duration-150 hover:bg-gray-50 ${
                      isActive
                        ? "bg-gradient-to-r from-[#FFE492] to-[#FFBAA4] font-medium"
                        : "text-gray-700"
                    }`
                  }
                >
                  <TiIconUser className="h-5 w-5" />
                  <span>Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    `flex items-center  gap-3 px-3 py-2 rounded-md transition-colors duration-150 hover:bg-gray-50 ${
                      isActive
                        ? "bg-gradient-to-r from-[#FFE492] to-[#FFBAA4] font-medium"
                        : "text-gray-700"
                    }`
                  }
                >
                  <TiIconUsers className="h-5 w-5" />
                  <span>Manage Users</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <DrawerFooter>
            <Button variant={"destructive"}>Logout</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
