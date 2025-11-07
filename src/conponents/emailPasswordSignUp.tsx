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
      <div className="absolute top-1/2     -translate-y-1/2 md:-right-32 ">
        <Card className="w-full flex flex-col p-0 justify-between border-none shadow ">
          <CardHeader className="py-1 px-6 lg:p-6 ">
            <CardTitle>
              <div className="w-full mb-2 flex items-center justify-center">
                <img className="w-28 " src={Logo} alt="freeky-logo" />
              </div>
            </CardTitle>
            <CardDescription>
              <p className="text-center text-gray-700">
                Enter your email below to login to your account
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(event) => submitHandler(event)}>
              <div className="flex flex-col gap-3">
                <div className="w-full text-center font-bold">Sign Up</div>
                <div>
                  <Label htmlFor="email">Email or mobile number</Label>
                  <Input name="email" id="email" type="text" required />
                </div>
                <div>
                  <Label htmlFor="password">Your Password</Label>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    required
                  />
                </div>
                <div>
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
            <div className="w-full gap-2 mt-2 flex items-center justify-between text-[14px]">
              <div>
                <NavLink to="/login">
                  {" "}
                  <u>Already have an account ?</u>
                </NavLink>
              </div>
              <div>
                <u>Other issue with sign Up</u>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default EmailPasswordSignUp;
