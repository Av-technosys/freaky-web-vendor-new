import { z } from "zod";

export const eventSchema = z.object({
	title: z.string().min(1, "Title is required"),
	lowerBound: z.string().min(1, "Lower bound is required"),
	upperBound: z.string().min(1, "Upper bound is required"),
	// productPrice: z.string().min(1, "Product price is required"),
	serviceBookingPrice: z.string().min(1, "Service booking price is required"),
	status: z.string().min(1, "Status is required"),
	description: z.string().min(1, "Description is required"),
	startDate: z.date("Start date is required"),
	endDate: z.date("End date is required"),
	color: z.enum(["blue", "green", "red", "yellow", "purple", "orange"], "Variant is required"),
});

export type TEventFormData = z.infer<typeof eventSchema>;
