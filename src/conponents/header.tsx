import { TiIconBell, TiIconSearch } from "./icons";
import { SidebarDrawer } from "./SidebarDrawer";

const Header: React.FC = () => {
  return (
    <header className="w-full sticky top-0 z-10 bg-[#ffffff] px-3  py-4 ">
      <div className="bg-white rounded-lg  shadow-md px-4 py-4 flex items-center justify-between ">
        {/* Left: Avatar + Welcome text */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FFC107] to-[#FF5722] flex items-center justify-center text-white font-bold text-lg">
            N
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-800">
              <h1 className="bg-gradient-to-r from-[#FFC107] to-[#FF5722] bg-clip-text text-transparent">
                Welcome Nova!
              </h1>
            </div>
            <div className="text-sm text-gray-500">System Administrator</div>
          </div>
        </div>

        {/* Right: Search + Bell */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-2 shadow-sm w-80">
            <TiIconSearch className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search ..."
              className=" bg-transparent outline-none w-full text-sm text-gray-700"
            />
          </div>

          <button
            type="button"
            className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-gray-600"
            aria-label="Notifications"
          >
            <TiIconBell className="w-5 h-5" />
          </button>
          <div className="md:hidden">
            <SidebarDrawer />
          </div>
        </div>
      </div>
      {/* <div className="md:hidden flex items-center  bg-gray-100 rounded-full px-3 py-2 shadow-md w-full mt-2">
        <TiIconSearch className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search ..."
          className=" bg-transparent outline-none w-full text-sm text-gray-700"
        />
      </div> */}
    </header>
  );
};

export default Header;
