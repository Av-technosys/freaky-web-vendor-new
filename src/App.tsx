import { Outlet } from "react-router-dom";
import { Header } from "./conponents";
import { SidebarProvider } from "./components/ui";
import AppSidebar from "./conponents/sidebar";
import AppBreadcrumbs from "./components/AppBreadcrumbs";

const App = () => {
  return (
    <div className="min-h-screen flex">
      {/* Fixed Sidebar */}
      <SidebarProvider>
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex-1 bg-[#FAF7EF]  flex flex-col px-2">
          <Header />
          <AppBreadcrumbs />
          <main className="flex-1 mt-4">
            <Outlet />
          </main>
          {/* <Footer /> */}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default App;
