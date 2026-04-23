import { Card, CardContent, CardFooter, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { type CompanyData } from "../../types/company";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { cn } from "@/lib/utils";
import { COUNTRY_LABEL_VALUE } from "@/const/locatoins";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { VITE_GOOGLE_MAPS_API_KEY } from "@/const/env";
import { useState, useEffect } from "react";
import { getAddressValue, googleAddressItems } from "@/utils/addressUtils";
import { useGetVendorDetails } from "@/services/useGetVendorCompanyDetails";
import { useUpdateBusinessAddressInformation } from "@/services/useCreateOrUpdateCompanyDetails";
import { Button } from "@/components/ui";

interface BusinessAddressProps {
  data?: Pick<
    CompanyData,
    "address1" | "address2" | "country" | "state" | "city" | "zipCode"
  >;
  onUpdate?: (key: keyof CompanyData, value: any) => void;
  errors?: any;
  className?: string;
  readOnly?: boolean;
}

const libraries: ("places")[] = ["places"];

const BusinessAddress = ({
  data: controlledData,
  onUpdate,
  errors,
  className,
  readOnly,
}: BusinessAddressProps) => {
  const isControlled = !!onUpdate;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const { data: vendorData, isPending: isApiPending } = useGetVendorDetails();
  const updateAddressMutation = useUpdateBusinessAddressInformation();

  const [localFormData, setLocalFormData] = useState({
    address1: "",
    address2: "",
    country: "united_states",
    state: "",
    city: "",
    zipCode: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    if (!isControlled && vendorData?.data) {
      const data = vendorData.data;
      setLocalFormData({
        address1: data.streetAddressLine1 || "",
        address2: data.streetAddressLine2 || "",
        country: data.country || "united_states",
        state: data.state || "",
        city: data.city || "",
        zipCode: data.zipcode || "",
        latitude: data.latitude || "",
        longitude: data.longitude || "",
      });
    }
  }, [vendorData, isControlled]);

  const formData = isControlled && controlledData ? {
    address1: controlledData.address1 || "",
    address2: controlledData.address2 || "",
    country: controlledData.country || "united_states",
    state: controlledData.state || "",
    city: controlledData.city || "",
    zipCode: controlledData.zipCode || "",
    // Lat/Long might not be in controlledData if not needed for display, 
    // but useful for internal logic if we had it. For now, rely on local or passed data.
  } : localFormData;


  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (auto: google.maps.places.Autocomplete) => {
    setAutocomplete(auto);
  };

  const handleUpdate = (key: string, value: any) => {
    if (isControlled && onUpdate) {
      onUpdate(key as keyof CompanyData, value);
    } else {
      setLocalFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const onPlaceChanged = () => {
    if (!autocomplete) return;

    const place = autocomplete.getPlace();

    if (!place.geometry?.location) return;

    handleUpdate("address1", place.formatted_address);
    handleUpdate(
      "address2",
      getAddressValue(
        place.address_components,
        googleAddressItems.administrative_area_level_2
      )
    );
    handleUpdate("country", "united_states"); // Force US as per profile.tsx
    handleUpdate(
      "state",
      getAddressValue(
        place.address_components,
        googleAddressItems.administrative_area_level_1
      )
    );
    handleUpdate(
      "city",
      getAddressValue(place.address_components, googleAddressItems.locality)
    );
    handleUpdate(
      "zipCode",
      getAddressValue(place.address_components, googleAddressItems.postal_code)
    ); // Note: zipCode vs zipcode casing consistency
    handleUpdate(
      "latitude",
      place.geometry?.location?.lat().toString() || ""
    );
    handleUpdate(
      "longitude",
      place.geometry?.location?.lng().toString() || ""
    );
  };

  const handleSave = () => {
    if (isControlled) return;
    const payload = {
      streetAddressLine1: localFormData.address1,
      streetAddressLine2: localFormData.address2,
      country: localFormData.country,
      state: localFormData.state,
      city: localFormData.city,
      zipcode: localFormData.zipCode,
      latitude: localFormData.latitude,
      longitude: localFormData.longitude,
    };
    updateAddressMutation.mutate(payload);
  };

  const isPending = !isControlled && isApiPending;

  if (isPending) {
    return <div>Loading...</div>;
  }

  // Determine readOnly state
  const isReadOnly = isControlled ? readOnly : (vendorData?.data?.isApproved === true);


  return (
    <Card className={cn(className)}>
      <CardContent>
        <div className="flex justify-between items-center mb-5">
          <CardTitle>Business Address</CardTitle>

        </div>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="address1">Street Address Line 1</Label>
              {isLoaded ? (
                <Autocomplete
                  className="w-full"
                  onLoad={onLoad}
                  onPlaceChanged={onPlaceChanged}
                >
                  <Input
                    name="address1"
                    id="address1"
                    placeholder="Enter Street Address Line 1"
                    type="text"
                    value={formData.address1}
                    onChange={(e) => handleUpdate("address1", e.target.value)}
                    required
                    readOnly={isReadOnly}
                  />
                </Autocomplete>
              ) : (
                <Input
                  name="address1"
                  id="address1"
                  placeholder="Enter Street Address Line 1"
                  type="text"
                  value={formData.address1}
                  onChange={(e) => handleUpdate("address1", e.target.value)}
                  required
                  readOnly={isReadOnly}
                />
              )}
              {errors?.streetAddressLine1 && (
                <p className="text-red-500 text-sm">
                  {errors.streetAddressLine1}
                </p>
              )}
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="address2">Street Address Line 2</Label>
              <Input
                name="address2"
                id="address2"
                placeholder="Enter Street Address Line 2"
                type="text"
                value={formData.address2}
                onChange={(e) => handleUpdate("address2", e.target.value)}
                required
                readOnly={isReadOnly}
              />
              {errors?.streetAddressLine2 && (
                <p className="text-red-500 text-sm">
                  {errors.streetAddressLine2}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="country">Country</Label>

              <Select
                value={formData.country || "united_states"}
                onValueChange={() => { }} // prevents selecting anything else
                disabled={isReadOnly}
              //   disabled   // disables dropdown opening
              >
                <SelectTrigger className="w-full" id="country">
                  <SelectValue placeholder="United States" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="united_states">United States</SelectItem>
                </SelectContent>
              </Select>
              {errors?.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="state">State</Label>

              <Select
                value={formData.state}
                onValueChange={(value) => handleUpdate("state", value)}
                disabled={isReadOnly}
              >
                <SelectTrigger className="w-full" id="state" name="state">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>

                <SelectContent>
                  {COUNTRY_LABEL_VALUE.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="city">City</Label>
              <Input
                name="city"
                id="city"
                placeholder="Enter City"
                type="text"
                value={formData.city}
                onChange={(e) => handleUpdate("city", e.target.value)}
                required
                readOnly={isReadOnly}
              />
              {errors?.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>

            <div className="col-span-1 flex flex-col items-start justify-center gap-3">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                placeholder="Enter Zip Code"
                name="zipCode"
                id="zipCode"
                type="number"
                value={formData.zipCode}
                onChange={(e) => handleUpdate("zipCode", e.target.value)}
                className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                required
                readOnly={isReadOnly}
              />
              {errors?.zipcode && (
                <p className="text-red-500 text-sm">{errors.zipcode}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {!isControlled && (
          <Button onClick={handleSave} className="ml-auto" disabled={updateAddressMutation.isPending}>
            {updateAddressMutation.isPending ? "Saving..." : "Save"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BusinessAddress;
