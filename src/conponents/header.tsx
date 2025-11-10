import LinearGradientText from "../components/LinearGradientText";
import { Button, Card, CardContent } from "../components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../components/ui/input-group";
import { TiIconBell, TiIconSearch } from "./icons";
import { SidebarDrawer } from "./SidebarDrawer";

const Header: React.FC = () => {
  return (
    <Card className="w-full sticky top-2 py-3 z-10 ">
      <CardContent>
        <div className=" flex items-center justify-between ">
          <div className="flex items-center gap-4">
            <Avatar className=" size-12">
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-lg font-semibold text-gray-800">
                <LinearGradientText>Welcome Nova!</LinearGradientText>
              </div>
              <div className="text-sm text-gray-500">System Administrator</div>
            </div>
          </div>

          {/* Right: Search + Bell */}
          <div className="flex items-center gap-3">
            <InputGroup className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-2 shadow-sm w-80">
              <InputGroupAddon>
                <TiIconSearch className="text-gray-500" />
              </InputGroupAddon>
              <InputGroupInput type="text" placeholder="Search ..." />
            </InputGroup>
            <Button variant={"outline"} className=" rounded-full">
              <TiIconBell />
            </Button>

            <div className="md:hidden">
              <SidebarDrawer />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Header;
