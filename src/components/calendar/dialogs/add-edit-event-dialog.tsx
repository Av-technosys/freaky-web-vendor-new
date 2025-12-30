import { zodResolver } from "@hookform/resolvers/zod";
import { addMinutes, format, set } from "date-fns";
import { type ChangeEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
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
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { COLORS, EVENT_BOOKING_STATUS } from "@/components/calendar/constants";
import { useCalendar } from "@/components/calendar/contexts/calendar-context";
import { useDisclosure } from "@/components/calendar/hooks";
import type { IEvent } from "@/components/calendar/interfaces";
import {
	eventSchema,
	type TEventFormData,
} from "@/components/calendar/schemas";

import { useGetVendorServices } from "@/services/useGetVendorServices";
import { se } from "date-fns/locale";

interface IProps {
	children: ReactNode;
	startDate?: Date;
	startTime?: { hour: number; minute: number };
	event?: IEvent;
}

export function AddEditEventDialog({
	children,
	startDate,
	startTime,
	event,
}: IProps) {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const { addEvent, updateEvent } = useCalendar();
	const { formData, setFormData } = useCalendar();
	const isEditing = !!event;

	const { data } = useGetVendorServices(1, 200);
	const services = data?.data;

	const serviceName = services?.map((se: any) => se.productName);


	const initialDates = useMemo(() => {
		if (!isEditing && !event) {
			if (!startDate) {
				const now = new Date();
				return { startDate: now, endDate: addMinutes(now, 30) };
			}
			const start = startTime
				? set(new Date(startDate), {
					hours: startTime.hour,
					minutes: startTime.minute,
					seconds: 0,
				})
				: new Date(startDate);
			const end = addMinutes(start, 30);
			return { startDate: start, endDate: end };
		}

		return {
			startDate: new Date(event.startDate),
			endDate: new Date(event.endDate),
		};
	}, [startDate, startTime, event, isEditing]);

	const form = useForm<TEventFormData>({
		resolver: zodResolver(eventSchema),
		defaultValues: {
			title: event?.title ?? "",
			description: event?.description ?? "",
			startDate: initialDates.startDate,
			endDate: initialDates.endDate,
			color: event?.color ?? "blue",
		},
	});

	useEffect(() => {
		form.reset({
			title: event?.title ?? "",
			description: event?.description ?? "",
			startDate: initialDates.startDate,
			endDate: initialDates.endDate,
			color: event?.color ?? "blue",
		});
	}, [event, initialDates, form]);

	const onSubmit = (values: TEventFormData) => {
		console.log(JSON.stringify(values))
		try {
			const formattedEvent: IEvent = {
				...values,
				startDate: format(values.startDate, "yyyy-MM-dd'T'HH:mm:ss"),
				endDate: format(values.endDate, "yyyy-MM-dd'T'HH:mm:ss"),
				id: isEditing ? event.id : Math.floor(Math.random() * 1000000),
				user: isEditing
					? event.user
					: {
						id: Math.floor(Math.random() * 1000000).toString(),
						name: "Jeraidi Yassir",
						picturePath: null,
					},
				color: values.color,
			};

			if (isEditing) {
				updateEvent(formattedEvent);
				toast.success("Event updated successfully");
			} else {
				addEvent(formattedEvent);
				toast.success("Event created successfully");
			}

			onClose();
			form.reset();
		} catch (error) {
			console.error(`Error ${isEditing ? "editing" : "adding"} event:`, error);
			toast.error(`Failed to ${isEditing ? "edit" : "add"} event`);
		}
	};


	const [openFrom, setOpenFrom] = useState(false)
	const [openTo, setOpenTo] = useState(false)
	const [dateFrom, setDateFrom] = useState<Date | undefined>(new Date('2025-06-18'))
	const [dateTo, setDateTo] = useState<Date | undefined>(new Date('2025-06-25'))

	function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
		setFormData({
			...formData,
			title: e.target.value
		})
	}
	function handleDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
		setFormData({
			...formData,
			description: e.target.value
		})
	}

	return (
		<Modal open={isOpen} onOpenChange={onToggle} modal={false}>
			<ModalTrigger asChild>{children}</ModalTrigger>
			<ModalContent>
				<ModalHeader>
					<ModalTitle>{isEditing ? "Edit Event" : "Add New Event"}</ModalTitle>
					<ModalDescription>
						{isEditing
							? "Modify your existing event."
							: "Create a new event for your calendar."}
					</ModalDescription>
				</ModalHeader>

				<Form {...form}>
					<form
						id="event-form"
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid gap-4 py-4"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel htmlFor="title" className="required">
										Title
									</FormLabel>
									<FormControl>
										<Input
											id="title"
											placeholder="Enter a title"
											{...field}
											className={fieldState.invalid ? "border-red-500" : ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lowerBound"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel htmlFor="lowerBound" className="required">
										Lower Bound
									</FormLabel>
									<FormControl>
										<Input
											id="lowerBound"
											placeholder="Enter a lower bound"
											{...field}
											className={fieldState.invalid ? "border-red-500" : ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="upperBound"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel htmlFor="upperBound" className="required">
										Upper Bound
									</FormLabel>
									<FormControl>
										<Input
											id="upperBound"
											placeholder="Enter a upper bound"
											{...field}
											className={fieldState.invalid ? "border-red-500" : ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <FormField
							control={form.control}
							name="productPrice"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel htmlFor="productPrice" className="required">
										Product Price
									</FormLabel>
									<FormControl>
										<Input
											id="productPrice"
											placeholder="Enter a product price"
											{...field}
											className={fieldState.invalid ? "border-red-500" : ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/> */}
						<FormField
							control={form.control}
							name="serviceBookingPrice"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel htmlFor="serviceBookingPrice" className="required">
										Service Booking Price
									</FormLabel>
									<FormControl>
										<Input
											id="serviceBookingPrice"
											placeholder="Enter a service booking price"
											{...field}
											className={fieldState.invalid ? "border-red-500" : ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="startDate"
							render={({ field }) => (
								<DateTimePicker form={form} field={field} />
							)}
						/>
						<FormField
							control={form.control}
							name="endDate"
							render={({ field }) => (
								<DateTimePicker form={form} field={field} />
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel className="required">status</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger
												className={`w-full ${fieldState.invalid ? "border-red-500" : ""
													}`}
											>
												<SelectValue placeholder="Select a status" />
											</SelectTrigger>
											<SelectContent>
												{EVENT_BOOKING_STATUS.map((color) => (
													<SelectItem value={color} key={color}>
														<div className="flex items-center gap-2">
															{/* <div
																className={`size-3.5 rounded-full bg-${color}-600 dark:bg-${color}-700`}
															/> */}
															{color}
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="color"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel className="required">Variant</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger
												className={`w-full ${fieldState.invalid ? "border-red-500" : ""
													}`}
											>
												<SelectValue placeholder="Select a variant" />
											</SelectTrigger>
											<SelectContent>
												{COLORS.map((color) => (
													<SelectItem value={color} key={color}>
														<div className="flex items-center gap-2">
															<div
																className={`size-3.5 rounded-full bg-${color}-600 dark:bg-${color}-700`}
															/>
															{color}
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="product"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel className="required">Services Name</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger
												className={`w-full ${fieldState.invalid ? "border-red-500" : ""
													}`}
											>
												<SelectValue placeholder="Select a service" />
											</SelectTrigger>
											<SelectContent>
												{serviceName.map((color) => (
													<SelectItem value={color} key={color}>
														<div className="flex items-center gap-2">
															<div
																className={`size-3.5 rounded-full bg-${color}-600 dark:bg-${color}-700`}
															/>
															{color}
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel className="required">Description</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Enter a description"
											className={fieldState.invalid ? "border-red-500" : ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<ModalFooter className="flex justify-end gap-2">
					<ModalClose asChild>
						<Button type="button" variant="outline">
							Cancel
						</Button>
					</ModalClose>
					<Button form="event-form" type="submit">
						{isEditing ? "Save Changes" : "Create Event"}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>




	);
}
