import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem as ShadcnSidebarMenuItem,
} from "../components/ui/sidebar";
import logo from "../assets/Images/freaky_logo.png";


import { Button, Separator } from "../components/ui";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isShowSidebarItem } from "@/helper/sidebar/isSidebarShowItem";
import { TiIconLogout } from "./icons";
import { SIDEBAR_BOTTOM_ITEMS, SIDEBAR_ITEMS } from "@/const/navigation";
import { tokenStorage } from "@/helper/refreshToken";
import { toast } from "sonner";



function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const logoutHandler = () => {

    tokenStorage.clear()
    toast.success("Logout successfully...");
    navigate("/login");
  };
  return (
    <Sidebar className=" ">
      <div className=" p-2 pr-0 bg-transparent h-full   ">
        <SidebarContent className=" rounded-2xl shadow-2xl h-full  p-1 overflow-y-auto ">
          <SidebarGroup className="w-full h-full overflow-y-auto">
            <div className="flex items-center justify-center p-4 md:p-0 lg:p-4">
              <img src={logo} alt="Freaky Chimp Logo" className="w-32 h-14" />
            </div>
            <Separator />
            <SidebarGroupContent>
              <SidebarMenu className=" space-y-1.5 py-4">
                {SIDEBAR_ITEMS.map((item) => {
                  return (
                    <ProtectedSidebarMenueItem pathName={location.pathname} key={item.title} item={item} />
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
            <Separator className=" my-1.5 mt-auto" />
            <div className=" mb-2">
              <SidebarMenu className=" space-y-1.5">
                {SIDEBAR_BOTTOM_ITEMS.map((item) => (
                  <ProtectedSidebarMenueItem pathName={location.pathname} key={item.title} item={item} />
                ))}

                <Button onClick={logoutHandler} variant={"destructive"}>
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

const ProtectedSidebarMenueItem = ({ pathName, item }: { pathName: string, item: any }) => {
  const isAllowed = isShowSidebarItem(item.url.slice(1));
  if (!isAllowed) return null;
  return (
    <SidebarMenueItem pathName={pathName} item={item} />
  )
}


const SidebarMenueItem = ({ pathName, item }: { pathName: string, item: any }) => {

  return (
    <ShadcnSidebarMenuItem>
      <SidebarMenuButton
        className={`  text-gray-900 font-medium ${pathName === item.url
          ? "bg-linear-to-r from-[#FFE492] to-[#FFBAA4]"
          : ""
          }`}
        asChild
      >
        <Link to={item.url}>
          <item.icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </ShadcnSidebarMenuItem>
  )
}