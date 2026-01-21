// import { zodResolver } from "@hookform/resolvers/zod";
import { type ReactNode, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/responsive-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCalendar } from "@/components/calendar/contexts/calendar-context";
import { useDisclosure } from "@/components/calendar/hooks";
import type { IEvent } from "@/components/calendar/interfaces";
import { Plus, Trash2 } from "lucide-react";
import { useGetVendorServices } from "@/services/useGetVendorServices";
import { useCreateExternalBooking } from "@/services/useCreateExternalBooking";

interface IProps {
  children: ReactNode;
}

export function AddEditEventDialog({ children }: IProps) {
  const { data } = useGetVendorServices(1, 100);
  const listOfServices = data?.data;
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { addEvent } = useCalendar();
  const [step, setStep] = useState(1);

  const form = useForm<any>({
    defaultValues: {
      contactName: "",
      contactNumber: "",
      services: [
        {
          serviceId: "",
          startTime: "",
          endTime: "",
          minPerson: 0,
          maxPerson: 0,
          location: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "services",
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      form.reset({
        contactName: "",
        contactNumber: "",
        services: [
          {
            serviceId: "",
            startTime: "",
            endTime: "",
            minPerson: 0,
            maxPerson: 0,
            location: "",
          },
        ],
      });
    }
  }, [isOpen, form]);

  const { mutate: createBooking, isPending } = useCreateExternalBooking();

  const onSubmit = (values: any) => {
    if (step == 1) return;
    try {
      const services = values.services || [];

      // Validation: Check if there is at least one service
      if (services.length === 0) {
        throw new Error("At least one service is required.");
      }

      // Validation: Check if the first service is fully populated (or all services)
      const isServiceValid = (service: any) => {
        return (
          service.serviceId &&
          service.startTime &&
          service.endTime &&
          Number(service.minPerson) >= 0 &&
          Number(service.maxPerson) > 0 &&
          service.location?.trim()
        );
      };

      const invalidServices = services.filter((s: any) => !isServiceValid(s));

      if (invalidServices.length > 0) {
        throw new Error("Please fill in all details for all services.");
      }

      const toLocalISOString = (date: Date) => {
        const offset = date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() - offset).toISOString().slice(0, 19); // "YYYY-MM-DDTHH:mm:ss"
      };

      const formattedEvent: IEvent = {
        ...values,
        services: values.services.map((service: any) => ({
          ...service,
          startTime: toLocalISOString(service.startTime),
          endTime: toLocalISOString(service.endTime),
        })),
      };

      // const formattedEvent: IEvent = { ...values };

      // console.log("Adding event:", formattedEvent);
      // addEvent(formattedEvent); // Removed local addEvent, relying on API? User said "call an API ... which i am already useing in console.log"
      // The prompt implies saving data via API.

      createBooking(formattedEvent, {
        onSuccess: () => {
          toast.success("Event created successfully");
          addEvent(formattedEvent); // Optionally update local state if needed immediately, or refetch
          onClose();
          form.reset();
          setStep(1);
        },
        onError: (error: any) => {
          console.error("Error creating event:", error);
          toast.error(error.message || "Failed to create event");
        },
      });
    } catch (error: any) {
      console.error("Error event:", error);
      toast.error(error.message);
    }
  };
  const nextStep = async () => {
    const isValid = await form.trigger(["contactName", "contactNumber"]);
    if (isValid) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  return (
    <Modal open={isOpen} onOpenChange={onToggle} modal={false}>
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <ModalHeader>
          <ModalTitle>
            {"Add New Event"} - Step {step} of 2
          </ModalTitle>
          <ModalDescription>
            {step === 1
              ? "Enter client contact details."
              : "Enter event details and services."}
          </ModalDescription>
        </ModalHeader>

        <Form {...form}>
          <form
            id="event-form"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(form.getValues());
            }}
            className="grid gap-4 py-4"
          >
            {step === 1 && (
              <div className="grid gap-4">
                <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 text-sm text-yellow-800 mb-2">
                  Note: The contact person's name will be displayed on the
                  invoice.
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactName"
                    rules={{ required: "Contact name is required" }}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className="required">
                          Contact Person Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                            className={
                              fieldState.invalid ? "border-red-500" : ""
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactNumber"
                    rules={{ required: "Contact number is required" }}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel className="required">
                          Contact Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+1 234 567 890"
                            {...field}
                            className={
                              fieldState.invalid ? "border-red-500" : ""
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Services</h3>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="border rounded-lg p-4 bg-gray-50 dark:bg-zinc-900 relative mb-4"
                    >
                      <div className="absolute right-2 top-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => remove(index)}
                          disabled={fields.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* <h4 className="font-medium mb-4">Service #{index + 1}</h4> */}
                      <h4 className="font-medium mb-4">{index + 1}</h4>

                      <div className="grid gap-4">
                        <FormField
                          control={form.control}
                          name={`services.${index}.serviceId`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service</FormLabel>
                              <FormControl>
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Service" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {listOfServices?.map((service: any) => (
                                      <SelectItem
                                        key={service.productId}
                                        value={service.productId.toString()}
                                      >
                                        {service.title}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`services.${index}.startTime`}
                            render={({ field }) => (
                              <DateTimePicker
                                form={form}
                                field={field}
                                label="Start Time"
                              />
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`services.${index}.endTime`}
                            render={({ field }) => (
                              <DateTimePicker
                                form={form}
                                field={field}
                                label="End Time"
                              />
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`services.${index}.minPerson`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Min People</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`services.${index}.maxPerson`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Max People</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name={`services.${index}.location`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="Event Hall A" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-dashed"
                    onClick={() =>
                      append({
                        serviceId: "",
                        startTime: new Date(),
                        endTime: new Date(),
                        minPerson: 0,
                        maxPerson: 0,
                        location: "",
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Another Service
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
        <ModalFooter className="flex justify-between w-full">
          {step === 1 ? (
            <ModalClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </ModalClose>
          ) : (
            <Button type="button" variant="outline" onClick={prevStep}>
              Back
            </Button>
          )}

          <div className="flex gap-2">
            {step === 1 ? (
              <Button type="button" onClick={nextStep}>
                Next Step
              </Button>
            ) : (
              <Button form="event-form" type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Complete Booking"}
              </Button>
            )}
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
