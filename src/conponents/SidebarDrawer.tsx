import { NavLink, useNavigate } from "react-router-dom";
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
import { toast } from "sonner";

const navItems = [
  { to: "/", label: "Dashboard", Icon: TiconLayoutDashboard },
  { to: "/services", label: "Manage Services", Icon: TiIconTool },
  { to: "/booking", label: "Booking", Icon: TiIconCalendar },
  { to: "/calendar", label: "Calendar", Icon: TiIconCalendar },
  { to: "/reviews", label: "User Reviews", Icon: TiIconStar },
  { to: "/company-profile", label: "Company Profile", Icon: TiIconBriefcase },
  { to: "/profile", label: "Profile", Icon: TiIconUser },
  { to: "/users", label: "Manage Users", Icon: TiIconUsers },
];

export function SidebarDrawer() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("access_token");
    toast.success("Logout successfully...");
    navigate("/login");
  };

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <TiIconMenu2 className=" text-gray-600" />
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
            <ul className="w-full grid gap-1 px-3">
              {navItems.map(({ to, label, Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-150 hover:bg-gray-50 ${
                        isActive
                          ? "bg-linear-to-r from-[#FFE492] to-[#FFBAA4] font-medium"
                          : "text-gray-700"
                      }`
                    }
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <DrawerFooter>
            <Button onClick={logoutHandler} variant={"destructive"}>
              Logout
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
