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
import {
  useUserOtpSignUpMutation,
  useUserResendOtpMutation,
} from "../services/useCreateOrLoginUser";
import { toast } from "sonner";


export type otpProps = {
  userEmail: any;
  setOtpPopup: any;
  otpPopup: any;
};

const OtpSignUp = ({ userEmail, setOtpPopup, otpPopup }: otpProps) => {
  const mutation = useUserOtpSignUpMutation();
  const resendOtpMutation = useUserResendOtpMutation();


  const submitHandler = (event: any) => {
    event.preventDefault();
    const code = event.target.code.value;
    if (!code) {
      toast.warning("Please enter OTP");
    } else {
      const userData = {
        email: event.target.email.value,
        code: code,
      };
      mutation.mutate(userData);
    }
  };

  const resendHandler = () => {
    resendOtpMutation.mutate(userEmail);
  };

  return (
    <>
      <div className="absolute top-1/2 px-6  w-[390px] h-[450px] lg:w-[430px] lg:h-[500px] -translate-y-1/2 md:-right-32 ">
        <Card className="flex flex-col justify-between shadow w-full h-full">
          <CardHeader>
            <CardTitle>
              <div className="w-full mb-2 flex items-center justify-center">
                <img className="w-28 " src={Logo} alt="freeky-logo" />
              </div>
            </CardTitle>
            <CardDescription>
              <p className="text-center text-gray-700">
                Enter your email below to Sign Up
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(event) => submitHandler(event)}>
              <div className="flex flex-col gap-3 ">
                <div className="w-full text-center font-bold">Sign Up</div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    readOnly
                    value={userEmail}
                    id="email"
                    type="text"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
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
                <div className="flex flex-col gap-2 mt-3">
                  <Button
                    type="button"
                    onClick={resendHandler}
                    disabled={resendOtpMutation.isPending}
                    variant={"outline"}
                    className="w-full"
                  >
                    {resendOtpMutation.isPending
                      ? "Resending..."
                      : "Resend OTP"}
                  </Button>
                  <Button type="submit" className="w-full">
                    Verify OTP
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setOtpPopup(!otpPopup)}
                    className="text-gray-600 "
                    variant="outline"
                  >
                    Back
                  </Button>
                </div>
                <p className="text-center text-[11px] text-gray-700">
                  {" "}
                  By continuing, you agree to the <br /> Terms of use and
                  Privacy Policy.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OtpSignUp;
