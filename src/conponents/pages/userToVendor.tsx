import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleAlert,
  LoaderCircle,
  Search,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import CompanyInformation from "../common/CompanyInformationProps";
import ContactDetails from "../common/ContactDetails";
import BusinessAddress from "../common/BusinessAddress";
import OwnershipInformation from "../common/OwnershipInformation";
import BankAccountInformation from "../common/BankAccountInformation";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SAMPLE_VENDOR } from "@/const/onboardingVendorDetail";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "motion/react";
import {
  useGetVendorInvites,
  useGetVendors,
} from "@/services/useGetVendorInvites";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCreateVendorEmployeeRequest } from "@/services/useCreateVendorEmployeeRequest";

const UserToVendor = () => {
  const [userStepNumber, setUserStepNumber] = React.useState(0);

  return (
    <motion.div className=" bg-linear-to-tr from-orange-200 to-orange-300 h-full min-h-screen w-full flex justify-center items-center">
      {userStepNumber == 0 ? (
        <MainCard setUserStepNumber={setUserStepNumber} />
      ) : null}
      {userStepNumber == 1 && (
        <AcceptRequestFromVendor setUserStepNumber={setUserStepNumber} />
      )}
      {userStepNumber == 2 && (
        <CreateNewVendor setUserStepNumber={setUserStepNumber} />
      )}
      {userStepNumber == 3 && (
        <JoinVendor setUserStepNumber={setUserStepNumber} />
      )}
    </motion.div>
  );
};

export default UserToVendor;

const MainCard = ({ setUserStepNumber }: any) => {
  const { data: VendorInvites } = useGetVendorInvites();

  const varient = {
    initial: {
      opacity: 0.8,
      translateX: 60,
    },

    animate: {
      opacity: 1,
      translateX: 0,
    },

    exit: {
      opacity: 0.9,
      translateX: -60,
    },

    transition: {
      duration: 0.3,
    },
  };
  function onClickHandler(num: number) {
    setUserStepNumber(num);
  }
  return (
    <AnimatePresence initial={false}>
      <motion.div key="modal" {...varient}>
        <CCard>
          <CardHeader>
            <CardTitle>Map user to vendor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="">
              <Label className=" mb-1 text-sm">
                You already have a vendor request join the vendor
              </Label>
              {VendorInvites?.data?.map((vendor: any, index: number) => {
                return (
                  <>
                    <Button
                      onClick={() => onClickHandler(1)}
                      variant={"outline"}
                      size={"lg"}
                      className=" bg-green-700 text-white hover:bg-green-600 hover:text-white h-14 mt-2  flex gap-4 justify-start w-full"
                    >
                      <div key={index} className=" flex gap-2 items-center">
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>
                            {vendor?.businessName}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className=" text-start">
                        <p className=" text-base font-semibold">
                          {" "}
                          {vendor?.businessName}
                        </p>
                        <p>
                          {vendor?.city}, {vendor?.country}
                        </p>
                      </div>
                    </Button>
                  </>
                );
              })}
            </div>
            {/* Create a new vendor */}
            <div className=" mt-6">
              <Label className=" mb-1">
                Create a new company account (join use like a vendor)
              </Label>
              <Button
                onClick={() => onClickHandler(2)}
                variant={"outline"}
                className=" text-base font-medium w-full h-10"
              >
                Create a new vendor
              </Button>
            </div>
            {/* Request a vendor (as an Employee) */}
            <div className=" mt-6">
              <Label className=" mb-1">Request a vendor (as an Employee)</Label>
              <Button
                onClick={() => onClickHandler(3)}
                variant={"outline"}
                className=" text-base font-medium w-full h-10"
              >
                Join as employee to a vendor
              </Button>
            </div>
          </CardContent>
        </CCard>
      </motion.div>
    </AnimatePresence>
  );
};

const AcceptRequestFromVendor = ({ setUserStepNumber }: any) => {
  const varients = {
    initial: { opacity: 0.8, scale: 0.98, translateX: 60 },
    animate: { opacity: 1, scale: 1, translateX: 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  };
  return (
    <motion.div {...varients}>
      <CCard>
        <CardHeader>
          <CardTitle>Accept request from vendor</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className=" w-full mt-6">
            <Check />
            Accept
          </Button>
        </CardContent>
        <CardFooter className=" mt-6">
          <Button onClick={() => setUserStepNumber(0)} variant={"outline"}>
            <ArrowLeft />
            Back
          </Button>
        </CardFooter>
      </CCard>
    </motion.div>
  );
};

const CreateNewVendor = ({ setUserStepNumber }: any) => {
  const [vendorRegisterFormNumber, setVendorRegisterFormNumber] =
    React.useState(0);
  const varients = {
    initial: { opacity: 0.8, scale: 0.98, translateX: 60 },
    animate: { opacity: 1, scale: 1, translateX: 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  };
  return (
    <motion.div {...varients}>
      <CCard className=" min-h-96 overflow-hidden w-full max-w-4xl ">
        <CardHeader className="">
          <CardTitle>Crate new vendor</CardTitle>
        </CardHeader>
        {/* <CardContent> 
          {Array(5).fill(0).map((_, index) => {
            return <Button onClick={() => setVendorRegisterFormNumber(index)} variant={index == vendorRegisterFormNumber ? "default" : "outline"} className=' rounded-full ml-3 my-3' key={index}>{index + 1}</Button>
          })}
        </CardContent> */}
        <div className=" min-h-96 h-full">
          {vendorRegisterFormNumber == 0 && (
            <CCompanyInfo
              setUserStepNumber={setUserStepNumber}
              setVendorRegisterFormNumber={setVendorRegisterFormNumber}
            />
          )}
          {vendorRegisterFormNumber == 1 && (
            <CCompanyDetails
              setVendorRegisterFormNumber={setVendorRegisterFormNumber}
            />
          )}
          {vendorRegisterFormNumber == 2 && (
            <CBusinessADdress
              setVendorRegisterFormNumber={setVendorRegisterFormNumber}
            />
          )}
          {vendorRegisterFormNumber == 3 && (
            <COwnershipInformation
              setVendorRegisterFormNumber={setVendorRegisterFormNumber}
            />
          )}
          {vendorRegisterFormNumber == 4 && (
            <CBankAccountInformation
              setVendorRegisterFormNumber={setVendorRegisterFormNumber}
            />
          )}
        </div>
      </CCard>
    </motion.div>
  );
};

const createNewVendorVarient = {
  initial: {
    opacity: 0.8,
    translateX: 60,
  },

  animate: {
    opacity: 1,
    translateX: 0,
  },

  transition: {
    duration: 0.3,
  },
};

export function useDebounce<T>(value: T, delay = 600): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const JoinVendor = ({ setUserStepNumber }: any) => {
  const [searchText, setSearchText] = React.useState("");

  // debounce search text
  const debouncedSearch = useDebounce(searchText, 800);

  // react-query hook
  const {
    data: Vendors,
    isLoading,
    isFetching,
  } = useGetVendors(debouncedSearch);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  function handleBackClick() {
    setUserStepNumber(0);
  }

  const vendorsList = Vendors?.data ?? [];

  return (
    <motion.div {...createNewVendorVarient}>
      <CCard className="w-full  max-w-2xl">
        <CardHeader>
          <CardTitle>Request vendor for employee</CardTitle>
        </CardHeader>

        <CardContent>
          <InputGroup className="mt-2 h-10 w-full">
            <InputGroupInput
              value={searchText}
              onChange={handleInputChange}
              placeholder="Search vendor name"
            />

            <InputGroupAddon>
              <Search />
            </InputGroupAddon>

            {(isLoading || isFetching) && (
              <InputGroupAddon align="inline-end">
                <LoaderCircle className="animate-spin" />
              </InputGroupAddon>
            )}
          </InputGroup>

          <div className="mt-3">
            <ScrollArea className="h-80">
              <h4 className="my-3 text-sm font-medium">Vendors</h4>

              {!isLoading &&
                !isFetching &&
                vendorsList.length === 0 &&
                debouncedSearch.trim() !== "" && (
                  <p className="text-sm text-muted-foreground">
                    No vendors found
                  </p>
                )}

              {vendorsList.map((vendor: any, idx: number) => (
                <VendorCard
                  key={vendor.vendorId ?? idx}
                  vendor={vendor}
                  index={idx}
                />
              ))}
            </ScrollArea>
          </div>
        </CardContent>

        <CardFooter className="mt-3">
          <Button variant="outline" onClick={handleBackClick}>
            <ArrowLeft /> Back
          </Button>
        </CardFooter>
      </CCard>
    </motion.div>
  );
};

function VendorCard({ vendor, index }: any) {
  const [openPopup, setOpenPopup] = useState(false);
  const requestMutation = useCreateVendorEmployeeRequest();

  return (
    <>
      {openPopup && (
        <>
          <Dialog open={openPopup}>
            <form>
              <DialogContent className="sm:max-w-sm  [&>button]:hidden">
                <div className="w-full flex items-center justify-center gap-3">
                  <Button onClick={() => setOpenPopup(false)} variant="outline">
                    Cancel
                  </Button>
                  <Button
                    disabled={requestMutation.isPending}
                    onClick={() =>
                      requestMutation.mutate(vendor?.vendorId, {
                        onSuccess: () => {
                          setOpenPopup(false);
                        },
                      })
                    }
                  >
                    Request
                  </Button>
                </div>
              </DialogContent>
            </form>
          </Dialog>
        </>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className=" flex gap-3  group p-2 border-b items-center last:border-b-0"
      >
        {/* <motion.div className=' flex gap-3 group p-2 border-b items-center last:border-b-0'> */}
        <Avatar>
          <AvatarImage src={vendor?.logo_url} alt="shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p className=" font-semibold text-sm">{vendor?.legalEntityName}</p>
          <p className=" font-normal text-sm">
            <span>
              {vendor?.city} {vendor?.state}
            </span>
          </p>
        </div>
        <div className=" ml-auto  my-auto group-hover:block hidden duration-200  mr-2">
          <button className="cursor-pointer" onClick={() => setOpenPopup(true)}>
            <ArrowRight size={20} />
          </button>
        </div>
      </motion.div>
    </>
  );
}

const CCompanyInfo = ({
  setVendorRegisterFormNumber,
  setUserStepNumber,
}: any) => {
  function handleNext() {
    setVendorRegisterFormNumber(1);
  }
  return (
    <motion.div {...createNewVendorVarient}>
      <CompanyInformation
        className=" shadow-none border-none rounded-none"
        data={{
          businessName: "",
          website: "",
          dbaName: "",
          legalEntityName: "",
          einNumber: "",
          businessType: "",
          incorporationDate: new Date(),
        }}
        onUpdate={() => {}}
        open={false}
        setOpen={() => {}}
      />
      <CardFooter className=" flex justify-between w-full">
        <Button onClick={() => setUserStepNumber(0)} variant={"outline"}>
          {" "}
          <ArrowLeft /> Back
        </Button>
        <Button onClick={handleNext}>Save & Continue</Button>
      </CardFooter>
    </motion.div>
  );
};

const CCompanyDetails = ({ setVendorRegisterFormNumber }: any) => {
  function handleNext() {
    setVendorRegisterFormNumber(2);
  }
  return (
    <motion.div {...createNewVendorVarient}>
      <ContactDetails
        className=" shadow-none border-none rounded-none"
        data={{
          contactName: "",
          primaryEmail: "",
          primaryPhoneNumber: "",
          instagramLink: "",
          youtubeLink: "",
          facebookLink: "",
        }}
        onUpdate={() => {}}
      />
      <div className="px-4 flex justify-end w-full">
        <Button onClick={handleNext}>Save & Continue</Button>
      </div>
    </motion.div>
  );
};

const CBusinessADdress = ({ setVendorRegisterFormNumber }: any) => {
  function handleNext() {
    setVendorRegisterFormNumber(3);
  }
  return (
    <motion.div {...createNewVendorVarient}>
      <BusinessAddress
        className=" shadow-none border-none rounded-none"
        data={{
          address1: "",
          address2: "",
          country: "",
          state: "",
          city: "",
          zipCode: "",
        }}
        onUpdate={() => {}}
      />
      <div className="px-4 flex justify-end w-full">
        <Button onClick={handleNext}>Save & Continue</Button>
      </div>
    </motion.div>
  );
};

const COwnershipInformation = ({ setVendorRegisterFormNumber }: any) => {
  function handleNext() {
    setVendorRegisterFormNumber(4);
  }

  return (
    <motion.div
      className=" min-h-96 flex flex-col justify-between h-full"
      {...createNewVendorVarient}
    >
      <OwnershipInformation
        className=" shadow-none border-none rounded-none"
        data={{
          owners: [],
          authorizedSignatory: 0,
          businessType: "",
        }}
        onUpdateOwner={() => {}}
        // onUpdateAuthorizedSignatory={(index) =>
        //   updateCompanyData("authorizedSignatory", index)
        // }
        onUpdateAuthorizedSignatory={() => {}}
        onAddOwner={() => {}}
        onRemoveOwner={() => {}}
      />
      <div className="px-4 mt-auto flex justify-end w-full">
        <Button onClick={handleNext}>Save & Continue</Button>
      </div>
    </motion.div>
  );
};

const CBankAccountInformation = ({ setVendorRegisterFormNumber }: any) => {
  function handleNext() {
    setVendorRegisterFormNumber(4);
  }

  return (
    <motion.div {...createNewVendorVarient}>
      <BankAccountInformation
        className=" shadow-none border-none rounded-none"
        data={{
          accountNumber: "",
          bankName: "",
          payeeName: "",
          routingNumber: "",
          bankType: "",
        }}
        onUpdate={() => {}}
        onPrevious={() => {}}
        onSave={() => {}}
      />

      <div className="px-4 flex justify-end w-full">
        <Button onClick={handleNext}>Make Admin Request</Button>
      </div>
    </motion.div>
  );
};

const CCard = ({ children, className }: any) => {
  return <Card className={cn("min-w-md px-0", className)}>{children}</Card>;
};
