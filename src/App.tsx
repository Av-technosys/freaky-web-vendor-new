import { Outlet } from "react-router-dom";
import { Header } from "./conponents";
import { SidebarProvider } from "./components/ui";
import AppSidebar from "./conponents/sidebar";

const App = () => {
  return (
    <div className="min-h-screen flex">
      {/* Fixed Sidebar */}
      <SidebarProvider>
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-3">
            <Outlet />
          </main>
          {/* <Footer /> */}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default App;
