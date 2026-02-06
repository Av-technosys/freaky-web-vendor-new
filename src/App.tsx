import { Outlet } from "react-router-dom";
import { Header } from "./conponents";
import { SidebarProvider } from "./components/ui";
import AppSidebar from "./conponents/sidebar";
import AppBreadcrumbs from "./components/AppBreadcrumbs";

const App = () => {
  return (
    <div className="min-h-screen bg-[#FAF7EF] flex">
      {/* Fixed Sidebar */}
      <SidebarProvider className="">
        <AppSidebar />
      </SidebarProvider>

      {/* Main Content Area */}
      <div className="flex-1  w-full flex flex-col px-2">
        <Header />
        <AppBreadcrumbs />
        <main className="flex-1">
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default App;
