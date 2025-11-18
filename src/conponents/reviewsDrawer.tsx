import { useNavigate } from "react-router-dom";
import user from "../assets/testingProfilePicture.jpg";

import { TiIconStarFilled, TiIconX } from "./icons";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Separator,
} from "../components/ui";
import { toast } from "sonner";

export function ReviewsDrawer() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("access_token");
    toast.success("Logout successfully...");
    navigate("/login");
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button className="text-yellow-500" variant="ghost">
          View More
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className=" w-full h-full  overflow-y-scroll">
          <DrawerHeader>
            <DrawerTitle>
              <div className="mb-4 flex items-center justify-between  ">
                <span className="text-xl text-gray-600 font-bold">
                  {" "}
                  Details
                </span>
                <DrawerTrigger asChild>
                  <TiIconX className="text-gray-600" />
                </DrawerTrigger>
              </div>
              <div className="mb-4 w-full flex items-center gap-3 justify-between  ">
                <div className="w-1/3">
                  <div className="h-20 w-20 rounded-full overflow-hidden">
                    <img className="object-cover" src={user} alt="user-Image" />
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-gray-800 text-xl">Leornardo Caprio</p>
                  <p className="text-gray-600 ">Jaipur Rajasthan</p>
                </div>
              </div>
              <Separator />
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription>
            <div className=" w-full px-4 flex flex-col gap-2  items-start ">
              <div className="w-full  flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">User Reviews:</h3>
                  <span>Reviewed on 7 June 2025</span>
                </div>
                <div className=" flex items-center gap-2">
                  <div className="flex gap-1">
                    <TiIconStarFilled size="10" color="gold" />
                    <TiIconStarFilled size="10" color="gold" />
                    <TiIconStarFilled size="10" color="gold" />
                    <TiIconStarFilled size="10" color="gold" />
                    <TiIconStarFilled size="10" color="gold" />
                  </div>
                  <span>4.5/5</span>
                </div>
              </div>
              <div className="w-full">
                <h3 className="text-lg font-bold">Comment:</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Explicabo nesciunt ipsam est praesentium? Labore adipisci iste
                  totam earum nihil exercitationem temporibus praesentium
                  tempora perspiciatis, voluptate non blanditiis eum? Sunt,
                  repellendus.
                </p>
              </div>
              <div className="w-full">
                <h3 className="text-lg font-bold">Photos:</h3>
                <div className="w-full grid grid-cols-3 gap-1">
                  <div className=" w-full flex justify-center items-center">
                    <img src={user} alt="userImage" />
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <img src={user} alt="userImage" />
                  </div>
                  <div className=" w-full flex justify-center items-center">
                    <img src={user} alt="userImage" />
                  </div>
                </div>
              </div>
            </div>
          </DrawerDescription>

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
