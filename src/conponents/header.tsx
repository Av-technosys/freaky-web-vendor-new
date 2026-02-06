import { useEffect, useState } from "react";
import LinearGradientText from "../components/LinearGradientText";
import { Button, Card, CardContent } from "../components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../components/ui/input-group";
import DropdownSelector from "./dropdownSelector";
import { TiIconBell, TiIconSearch } from "./icons";
import { SidebarDrawer } from "./SidebarDrawer";
import { useGetSearchItems } from "@/services/useGetVendorCompanyDetails";
import NotificationDrawer from "./notificationDrawer";
import { useNavigate } from "react-router-dom";
import { useGetUserDetails } from "@/services/useGetUserDetails";
import { LoaderCircle } from "lucide-react";

const dropdownValuesServices = {
  title: "Services",
  options: [
    {
      label: "Bookings",
      value: "bookings",
    },
    {
      label: "Services",
      value: "services",
    },
  ],
};

export function useDebounce<T>(value: T, delay = 600): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [service, setService] = useState(
    dropdownValuesServices.options[1].value,
  );
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false);
  const [searchText, setSearchText] = useState("");

  const debouncedSearch = useDebounce(searchText, 800);

  const { data: sessionData } = useGetUserDetails();

  const { data: searchData, isPending } = useGetSearchItems({
    service,
    debouncedSearch,
  });

  function handleServiceChange(value: any) {
    setService(value.value);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  return (
    <>
      {
        <NotificationDrawer
          open={openNotificationDrawer}
          setOpen={() => setOpenNotificationDrawer(false)}
        />
      }
      <Card className="w-full sticky top-2 mb-4 py-3 z-10 ">
        <CardContent>
          <div className=" flex items-center justify-between ">
            <div className="flex items-center gap-4">
              <Avatar className=" size-12">
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  <LinearGradientText>
                    Welcome {sessionData?.data?.[0]?.firstName || "Nova"}!
                  </LinearGradientText>
                </div>
                <div className="text-sm text-gray-500">
                  System Administrator
                </div>
              </div>
            </div>
            <div className="w-1/2 flex items-center justify-end gap-4">
              <DropdownSelector
                labelName="hidden"
                className="w-[136px] rounded-xl hidden md:flex"
                values={dropdownValuesServices}
                selectedValue={service}
                onChange={handleServiceChange}
              />{" "}
              {/* Right: Search + Bell */}
              <div className="relative group focus-within:block">
                <InputGroup className="hidden md:flex items-center bg-gray-100 rounded-full   py-2 shadow-sm">
                  <InputGroupAddon>
                    <TiIconSearch className="text-gray-500" />
                  </InputGroupAddon>

                  <InputGroupInput
                    onChange={handleInputChange}
                    value={searchText}
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent  focus:outline-none w-32 focus:w-56 transition-all duration-200"
                  />
                </InputGroup>

                {searchText?.trim() !== "" && (
                  <ul className="absolute hidden group-focus-within:block top-full mt-2 w-full bg-white rounded-xl shadow-lg border z-50 overflow-hidden">
                    {isPending ? (
                      <InputGroupAddon align="inline-end">
                        <LoaderCircle className="animate-spin" />
                      </InputGroupAddon>
                    ) : searchData?.data?.length > 0 ? (
                      searchData.data.map((item: any, index: number) => (
                        <li
                          key={index}
                          onMouseDown={() => {
                            setSearchText("");
                            navigate(`/${service}`);
                          }}
                          className="px-4 py-3 text-sm border border-b-gray-100 cursor-pointer hover:bg-gray-100 transition"
                        >
                          {item.name || item.title}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-3 text-sm text-gray-500">
                        No item found
                      </li>
                    )}
                  </ul>
                )}
              </div>
              <Button
                onClick={() => setOpenNotificationDrawer(true)}
                variant={"outline"}
                className=" rounded-full"
              >
                <TiIconBell />
              </Button>
              <div className="md:hidden">
                <SidebarDrawer />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Header;
