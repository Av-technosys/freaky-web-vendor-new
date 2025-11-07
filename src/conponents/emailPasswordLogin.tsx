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
import { useUserLoginMutation } from "../services/useCreateOrLoginUser";

const EmailPasswordLogin = () => {
  const mutation = useUserLoginMutation();
  const submitHandler = (event: any) => {
    event.preventDefault();
    const userData = {
      username: event.target.email.value,
      password: event.target.password.value,
    };
    mutation.mutate(userData);
  };
  return (
    <>
      <div className="absolute top-1/2 px-6  -translate-y-1/2 md:-right-32 ">
        <Card className="flex flex-col justify-between !border-none shadow">
          <CardHeader>
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
              <div className="flex flex-col gap-3 lg:gap-6">
                <div className="w-full text-center font-bold">Sign In</div>
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
                  <Button type="submit" className="w-full ">
                    Log in
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
                <u>Other issue with sign in</u>
              </div>
              <div>
                <u>Forget Your Password</u>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default EmailPasswordLogin;
