import Logo from "@/./assets/freakychimplogo.png";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Label,
} from "../components/ui";
import { useUserForgetPasswordUsingOTPMutation } from "../services/useCreateOrLoginUser";

export type otpProps = {
  userEmail: any;
};

const ForgetPasswordUsingOTP = ({ userEmail }: otpProps) => {
  const mutation = useUserForgetPasswordUsingOTPMutation();
  const submitHandler = (event: any) => {
    event.preventDefault();
    const code = event.target.code.value;
    if (!code) {
      alert("Please enter OTP");
    } else {
      const userData = {
        username: event.target.email.value,
        confirm_password: event.target.confirm_password.value,
        code: code,
      };
      mutation.mutate(userData);
    }
  };

  return (
    <>
      <div className="absolute top-1/2 px-6 w-[390px] h-[450px] lg:w-[430px] lg:h-[500px] -translate-y-1/2 md:-right-32 ">
        <Card className="flex flex-col justify-between shadow w-full h-full">
          <CardHeader>
            <CardTitle>
              <div className="w-full mb-2 flex items-center justify-center">
                <img className="w-28 " src={Logo} alt="freeky-logo" />
              </div>
            </CardTitle>
            <CardDescription>
              <p className="text-center text-gray-700">
                Enter your OTP and Confirm Password below to Forget your
                Password
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(event) => submitHandler(event)}>
              <div className="flex flex-col gap-3 ">
                <div className="w-full text-center font-bold">
                  Forget Password
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    readOnly
                    value={userEmail}
                    id="email"
                    type="text"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 items-start">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <InputOTP name="code" maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="flex flex-col gap-2 items-start">
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
                    Forgot Password
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ForgetPasswordUsingOTP;
