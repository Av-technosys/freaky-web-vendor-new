import Logo from "@/./assets/freakychimplogo.png";
import { NavLink } from "react-router-dom";
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
import { useUserSignUpMutation } from "../services/useCreateOrLoginUser";

export type signUpProps = {
  setOtpPopup: any;
  otpPopup: any;
  setUserEmail: any;
};

const EmailPasswordSignUp = ({
  setOtpPopup,
  otpPopup,
  setUserEmail,
}: signUpProps) => {
  const mutation = useUserSignUpMutation();
  const submitHandler = (event: any) => {
    event.preventDefault();
    const confirmPassword = event.target.confirm_password.value;
    const password = event.target.password.value;
    if (confirmPassword != password) {
      alert("Confirm password not match with password");
    } else {
      const userData = {
        username: event.target.email.value,
        password: password,
        confirmPassword: confirmPassword,
      };
      mutation.mutate(userData);
      setUserEmail(userData.username);
      setOtpPopup(!otpPopup);
    }
  };
  return (
    <>
      <div className="absolute top-1/2 px-6  w-[390px] h-[450px] lg:w-[430px] lg:h-[520px] -translate-y-1/2 md:-right-32 ">
        <Card className=" flex flex-col p-0 justify-start border-none shadow w-full h-full">
          <CardHeader className="px-6 lg:p-4 ">
            <CardTitle>
              <div className="w-full mb-2 flex items-center justify-center">
                <img className="w-28 " src={Logo} alt="freeky-logo" />
              </div>
            </CardTitle>
            <CardDescription>
              <p className="text-center text-gray-700">
                Enter your email and password below to create account
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(event) => submitHandler(event)}>
              <div className="flex flex-col gap-2">
                <div className="w-full text-center font-bold">Sign Up</div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input name="email" id="email" type="text" required />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="password">Your Password</Label>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    required
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <Input
                    name="confirm_password"
                    id="confirm_password"
                    type="password"
                    required
                  />
                </div>
                <div>
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <p className="text-center text-[14px] hidden lg:block text-gray-700">
              {" "}
              By continuing, you agree to the <br /> Terms of use and Privacy
              Policy.
            </p>
            <div className="w-full gap-2 my-2 flex items-center justify-between text-[14px]">
              <div>
                <NavLink to="/login">
                  {" "}
                  <u>Already have an account ?</u>
                </NavLink>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default EmailPasswordSignUp;
