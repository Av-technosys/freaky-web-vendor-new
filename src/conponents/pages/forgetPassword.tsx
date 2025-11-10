import { useState } from "react";
import leftImage from "@/./assets/Rectangle 3.svg";
import rightImage from "@/./assets/Rectangle 2.svg";
import mainImage from "@/./assets/signInImage.png";
import ForgetPasswordUsingEmail from "../forgetPasswordUsingEmail";
import ForgetPasswordUsingOTP from "../forgetPasswordUsingOTP";
const ForgetPassword = () => {
  const [otpPopup, setOtpPopup] = useState(false);
  const [userEmail, setUserEmail] = useState("");

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

          {otpPopup == false ? (
            <ForgetPasswordUsingEmail
              otpPopup={otpPopup}
              setOtpPopup={setOtpPopup}
              setUserEmail={setUserEmail}
            />
          ) : (
            <ForgetPasswordUsingOTP userEmail={userEmail} />
          )}
        </div>
        <div className="order-1 hidden md:block md:order-2 p-2 md:p-0 w-full h-screen">
          <img
            className="w-full h-full object-cover"
            src={mainImage}
            alt="mainImage"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
