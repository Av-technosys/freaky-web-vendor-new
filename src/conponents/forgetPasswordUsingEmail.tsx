import Logo from "@/./assets/freakychimplogo.png";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "../components/ui";
import { useUserForgetPasswordMutation } from "../services/useCreateOrLoginUser";

import type { signUpProps } from "./emailPasswordSignUp";

const ForgetPasswordUsingEmail = ({
  setOtpPopup,
  otpPopup,
  setUserEmail,
}: signUpProps) => {
  const mutation = useUserForgetPasswordMutation();
  const submitHandler = (event: any) => {
    event.preventDefault();
    const userData = {
      username: event.target.email.value,
    };
    mutation.mutate(userData);
    setUserEmail(userData.username);
    setOtpPopup(!otpPopup);
  };
  return (
    <>
      <div className="absolute top-1/2 px-6 w-[390px] h-[450px] lg:w-[430px] lg:h-[500px]  -translate-y-1/2 md:-right-32 ">
        <Card className="flex flex-col justify-between !border-none shadow h-full w-full">
          <CardHeader>
            <CardTitle>
              <div className="w-full mb-2 flex items-center justify-center">
                <img className="w-28 " src={Logo} alt="freeky-logo" />
              </div>
            </CardTitle>
            <CardDescription>
              <p className="text-center text-gray-700">
                Enter your email below to send OTP
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(event) => submitHandler(event)}>
              <div className="flex flex-col gap-3 lg:gap-6">
                <div className="w-full text-center font-bold">
                  Forget Password
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input name="email" id="email" type="text" required />
                </div>
                <div>
                  <Button type="submit" className="w-full ">
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <p className="text-center  text-gray-700">
              {" "}
              By continuing, you agree to the <br /> Terms of use and Privacy
              Policy.
            </p>
            <div className="w-full mt-2 gap-3 flex items-center justify-between text-[14px]">
              <div>
                <u>Other issue with Forget Password</u>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ForgetPasswordUsingEmail;
