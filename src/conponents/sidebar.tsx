import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar";
import logo from "../assets/Images/freaky_logo.png";

import {
  TiconLayoutDashboard,
  TiIconCalendar,
  TiIconLogout,
  TiIconSearch,
  TiIconSettings,
  TiIconTool,
  TiIconUser,
  TiIconUsers,
} from "./icons";
import { Button, Separator } from "../components/ui";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: TiconLayoutDashboard,
  },
  {
    title: "Manage Services",
    url: "/services",
    icon: TiIconTool,
  },
  {
    title: "Booking",
    url: "/booking",
    icon: TiIconCalendar,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: TiIconSearch,
  },
  {
    title: "User Reviews",
    url: "/reviews",
    icon: TiIconSettings,
  },
  {
    title: "Company Profile",
    url: "/company-profile",
    icon: TiIconUser,
  },
];

const item = [
  {
    title: "Profile",
    url: "/profile",
    icon: TiIconUsers,
  },
  {
    title: "Manage Users",
    url: "/users",
    icon: TiIconUsers,
  },
];

function getOpenURL() {
  if (typeof window !== "undefined") {
    return window.location.pathname;
  }
  return "/";
}

function AppSidebar() {
  return (
    <Sidebar className=" ">
      <div className=" p-2 bg-transparent h-full   ">
        <SidebarContent className=" rounded-2xl shadow-2xl h-full  p-1 overflow-y-auto ">
          <SidebarGroup className="w-full h-full overflow-y-auto">
            <div className="flex items-center justify-center p-4">
              <img src={logo} alt="Freaky Chimp Logo" className="w-32 h-14" />
            </div>
            <Separator />
            <SidebarGroupContent>
              <SidebarMenu className=" space-y-1.5 py-4">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={`  ${
                        getOpenURL() === item.url
                          ? "bg-gradient-to-r from-[#FFE492] to-[#FFBAA4]"
                          : ""
                      }`}
                      asChild
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            <Separator className=" my-1.5 mt-auto" />
            <div className="">
              <SidebarMenu>
                {item.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={`  ${
                        getOpenURL() === item.url
                          ? "bg-gradient-to-r from-[#FFE492] to-[#FFBAA4]"
                          : ""
                      }`}
                      asChild
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                <Button variant={"destructive"}>
                  <TiIconLogout /> Logout
                </Button>
              </SidebarMenu>
            </div>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
export default AppSidebar;
