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
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "motion/react";
import {
  useGetVendorInvites,
  useGetVendors,
} from "@/services/useGetVendorInvites";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCreateVendorEmployeeRequest } from "@/services/useCreateVendorEmployeeRequest";
import type { CompanyData, Document, Owner } from "@/types/company";
import {
  useCreateCompanyInformation,
  useUpdateBankAccountInformation,
  useUpdateBusinessAddressInformation,
  useUpdateContactInformation,
  useUpdateOwnershipInformation,
} from "@/services/useCreateOrUpdateCompanyDetails";

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

  const initialOwner: Owner = {
    firstName: "",
    lastName: "",
    ssnNumber: "",
    streetAddressLine1: "",
    streetAddressLine2: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    ownershipPercentage: "",
  };

  const defaultDocuments: Document[] = [
    { id: "1", type: "business_license", files: [], maxFiles: 5 },
    { id: "2", type: "tax_certificate", files: [], maxFiles: 5 },
    { id: "3", type: "ownership_proof", files: [], maxFiles: 5 },
    { id: "4", type: "bank_statement", files: [], maxFiles: 5 },
  ];

  const [companyData, setCompanyData] = useState<CompanyData>({
    businessName: "",
    website: "",
    dbaName: "",
    legalEntityName: "",
    einNumber: "",
    businessType: "",
    incorporationDate: undefined,

    contactName: "",
    primaryEmail: "",
    primaryPhoneNumber: "",
    instagramLink: "",
    youtubeLink: "",
    facebookLink: "",

    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",

    owners: [initialOwner],
    authorizedSignatory: 0,

    accountNumber: "",
    bankName: "",
    payeeName: "",
    routingNumber: "",
    bankType: "",

    documents: defaultDocuments,
  });

  const updateCompanyData = (key: keyof CompanyData, value: any) => {
    setCompanyData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateOwner = (index: number, field: keyof Owner, value: string) => {
    setCompanyData((prev) => {
      const updatedOwners = [...prev.owners];
      updatedOwners[index] = { ...updatedOwners[index], [field]: value };
      return { ...prev, owners: updatedOwners };
    });
  };

  const addOwner = () => {
    if (companyData.owners.length >= 4) return;

    setCompanyData((prev) => ({
      ...prev,
      owners: [...prev.owners, { ...initialOwner }],
    }));
  };

  const removeOwner = (index: number) => {
    if (companyData.owners.length <= 1) return;

    setCompanyData((prev) => {
      const updatedOwners = prev.owners.filter((_, i) => i !== index);

      let newAuthorized = prev.authorizedSignatory;
      if (index === prev.authorizedSignatory) newAuthorized = 0;
      else if (index < prev.authorizedSignatory)
        newAuthorized = prev.authorizedSignatory - 1;

      return {
        ...prev,
        owners: updatedOwners,
        authorizedSignatory: newAuthorized,
      };
    });
  };

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
              companyData={companyData}
              setCompanyData={setCompanyData}
              updateCompanyData={updateCompanyData}
            />
          )}
          {vendorRegisterFormNumber == 1 && (
            <CCompanyDetails
              setVendorRegisterFormNumber={setVendorRegisterFormNumber}
              companyData={companyData}
              setCompanyData={setCompanyData}
              updateCompanyData={updateCompanyData}
            />
          )}
          {vendorRegisterFormNumber == 2 && (
            <CBusinessADdress
              setVendorRegisterFormNumber={setVendorRegisterFormNumber}
              companyData={companyData}
              setCompanyData={setCompanyData}
              updateCompanyData={updateCompanyData}
            />
          )}
          {vendorRegisterFormNumber == 3 && (
            <COwnershipInformation
              setVendorRegisterFormNumber={setVendorRegisterFormNumber}
              companyData={companyData}
              setCompanyData={setCompanyData}
              updateCompanyData={updateCompanyData}
              updateOwner={updateOwner}
              addOwner={addOwner}
              removeOwner={removeOwner}
            />
          )}
          {vendorRegisterFormNumber == 4 && (
            <CBankAccountInformation
              setVendorRegisterFormNumber={setVendorRegisterFormNumber}
              companyData={companyData}
              setCompanyData={setCompanyData}
              updateCompanyData={updateCompanyData}
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
  companyData,
  updateCompanyData,
}: any) => {
  const [open, setOpen] = useState(false);
  const CompanyInformationMutation = useCreateCompanyInformation();
  function handleNext() {
    const companyInformationData = {
      businessName: companyData.businessName || "",
      websiteURL: companyData.website || "",
      DBAname: companyData.dbaName || "",
      legalEntityName: companyData.legalEntityName || "",
      einNumber: companyData.einNumber || "",
      businessType: companyData.businessType || "",
      incorporationDate: companyData.incorporationDate || Date.now(),
    };

    CompanyInformationMutation.mutate(companyInformationData);

    setVendorRegisterFormNumber(1);
  }

  return (
    <motion.div {...createNewVendorVarient}>
      <CompanyInformation
        className=" shadow-none border-none rounded-none"
        data={{
          businessName: companyData.businessName,
          website: companyData.website,
          dbaName: companyData.dbaName,
          legalEntityName: companyData.legalEntityName,
          einNumber: companyData.einNumber,
          businessType: companyData.businessType,
          incorporationDate: companyData.incorporationDate,
        }}
        onUpdate={updateCompanyData}
        readOnly={false}
        open={open}
        setOpen={setOpen}
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

const CCompanyDetails = ({
  setVendorRegisterFormNumber,
  companyData,
  updateCompanyData,
}: any) => {
  const ContactInformationMutation = useUpdateContactInformation();
  function handleNext() {
    const companyContactDetails = {
      primaryContactName: companyData.contactName || "",
      primaryEmail: companyData.primaryEmail || "",
      primaryPhoneNumber: companyData.primaryPhoneNumber || "",
      instagramURL: companyData.instagramLink || "",
      youtubeURL: companyData.youtubeLink || "",
      facebookURL: companyData.facebookLink || "",
    };
    ContactInformationMutation.mutate(companyContactDetails);
    setVendorRegisterFormNumber(2);
  }
  return (
    <motion.div {...createNewVendorVarient}>
      <ContactDetails
        className=" shadow-none border-none rounded-none"
        data={{
          contactName: companyData.contactName,
          primaryEmail: companyData.primaryEmail,
          primaryPhoneNumber: companyData.primaryPhoneNumber,
          instagramLink: companyData.instagramLink,
          youtubeLink: companyData.youtubeLink,
          facebookLink: companyData.facebookLink,
        }}
        onUpdate={updateCompanyData}
      />
      <div className="px-4 flex justify-end w-full">
        <Button onClick={handleNext}>Save & Continue</Button>
      </div>
    </motion.div>
  );
};

const CBusinessADdress = ({
  setVendorRegisterFormNumber,
  companyData,
  updateCompanyData,
}: any) => {
  const BusinessAddressMutation = useUpdateBusinessAddressInformation();
  function handleNext() {
    const companyBusinessAddress = {
      streetAddressLine1: companyData.address1,
      streetAddressLine2: companyData.address2,
      city: companyData.city,
      state: companyData.state,
      country: companyData.country,
      zipcode: companyData.zipCode,
    };
    BusinessAddressMutation.mutate(companyBusinessAddress);
    setVendorRegisterFormNumber(3);
  }
  return (
    <motion.div {...createNewVendorVarient}>
      <BusinessAddress
        className=" shadow-none border-none rounded-none"
        data={{
          address1: companyData.address1,
          address2: companyData.address2,
          country: companyData.country,
          state: companyData.state,
          city: companyData.city,
          zipCode: companyData.zipCode,
        }}
        onUpdate={updateCompanyData}
      />
      <div className="px-4 flex justify-end w-full">
        <Button onClick={handleNext}>Save & Continue</Button>
      </div>
    </motion.div>
  );
};

const COwnershipInformation = ({
  setVendorRegisterFormNumber,
  companyData,
  updateCompanyData,
  updateOwner,
  removeOwner,
  addOwner,
}: any) => {
  const OwnershipInformationMutation = useUpdateOwnershipInformation();
  function handleNext() {
    const companyOwnershipInformation = companyData.owners;
    OwnershipInformationMutation.mutate(companyOwnershipInformation);
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
          owners: companyData.owners,
          authorizedSignatory: companyData.authorizedSignatory,
          businessType: companyData.businessType,
        }}
        onUpdateOwner={updateOwner}
        onUpdateAuthorizedSignatory={(index) =>
          updateCompanyData("authorizedSignatory", index)
        }
        onAddOwner={addOwner}
        onRemoveOwner={removeOwner}
      />
      <div className="px-4 mt-auto flex justify-end w-full">
        <Button onClick={handleNext}>Save & Continue</Button>
      </div>
    </motion.div>
  );
};

const CBankAccountInformation = ({
  setVendorRegisterFormNumber,
  companyData,
  updateCompanyData,
}: any) => {
   const BankAccountMutation = useUpdateBankAccountInformation();
  function handleNext() {
    const companyBankAccountInformation = {
      bankAccountNumber: companyData.accountNumber,
      bankName: companyData.bankName,
      payeeName: companyData.payeeName,
      routingNumber: companyData.routingNumber,
      bankType: companyData.bankType,
    };
    BankAccountMutation.mutate(companyBankAccountInformation);
    setVendorRegisterFormNumber(4);
  }

  return (
    <motion.div {...createNewVendorVarient}>
      <BankAccountInformation
        className=" shadow-none border-none rounded-none"
        data={{
          accountNumber: companyData.accountNumber,
          bankName: companyData.bankName,
          payeeName: companyData.payeeName,
          routingNumber: companyData.routingNumber,
          bankType: companyData.bankType,
        }}
        onUpdate={updateCompanyData}
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
