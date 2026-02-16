import { useState } from "react";
import leftImage from "@/./assets/Rectangle 3.svg";
import rightImage from "@/./assets/Rectangle 2.svg";
import SocialsLogin from "../socialsLogin";
import EmailPasswordLogin from "../emailPasswordLogin";
const Login = () => {
  const [emailPopup, setEmailPopup] = useState(false);

  return (
    <div className="w-full h-screen mx-auto">
      <div className="flex flex-col md:flex-row md:relative w-full h-full">
        <div className="order-2 relative md:order-1 w-full   h-full flex flex-col items-center justify-center md:items-start md:!justify-between">
          <div className=" h-32 sm:h-56 lg:h-72 absolute top-0 left-0">
            <img
              className="h-full object-contain "
              src={leftImage}
              alt="leftUpperImage"
            />
          </div>
          <div className=" h-32 sm:h-56 lg:h-72 absolute bottom-0 left-0">
            <img
              className="h-full object-contain"
              src={rightImage}
              alt="leftDownImage"
            />
          </div>

          {emailPopup == false ? (
            <SocialsLogin
              emailPopup={emailPopup}
              setEmailPopup={setEmailPopup}
            />
          ) : (
            <EmailPasswordLogin />
          )}
        </div>
        <div className="order-1 hidden md:block md:order-2 p-2 md:p-0 w-full h-screen">
          <img
            className="w-full h-full object-cover"
            src={"https://freaky-files.s3.ap-south-1.amazonaws.com/uploads/signInImage.png"}
            alt="mainImage"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
