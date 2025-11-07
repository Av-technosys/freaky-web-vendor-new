import Logo from "@/./assets/freakychimplogo.png";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui";
import {
  TiIconBrandAppleFilled,
  TiIconBrandFacebookFilled,
  TiIconBrandGoogleFilled,
} from "./icons";

export type loginProps = {
  setEmailPopup: any;
  emailPopup: any;
};

const SocialsLogin = ({ setEmailPopup, emailPopup }: loginProps) => {
  return (
    <div className="absolute w-[390px] h-[450px] lg:w-[430px] lg:h-[500px] top-1/2  px-6 -translate-y-1/2 md:-right-32">
      <Card className=" flex flex-col justify-between items-center !border-none shadow-md w-full h-full">
        <CardHeader className="w-full">
          <CardTitle>
            <div className="w-full mb-2 flex items-center justify-center">
              <img className="w-28" src={Logo} alt="freeky-logo" />
            </div>
          </CardTitle>
          <CardDescription>
            <p className="text-center text-gray-700">
              Continue with one of the following methods
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full">
          <form>
            <div className="flex flex-col gap-3 lg:gap-5">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <TiIconBrandGoogleFilled size={22} color="black" />
                Continue with Google
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <TiIconBrandFacebookFilled size={22} color="black" />
                Continue with Facebook
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <TiIconBrandAppleFilled size={22} color="black" />
                Continue with Apple
              </Button>

              <div className="w-full flex items-center justify-center gap-2">
                <div className="flex-1 border-t border-gray-300" />
                <span className="text-sm text-gray-500">or</span>
                <div className="flex-1 border-t border-gray-300" />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 w-full">
          <Button
            onClick={() => setEmailPopup(!emailPopup)}
            type="button"
            className="w-full"
          >
            Sign in with Email
          </Button>
          <p className="text-center  text-gray-600 leading-tight">
            By signing up, you agree to our <br />
            <span className="underline">Terms & Conditions</span> and{" "}
            <span className="underline">Privacy Policy</span>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SocialsLogin;
