"use client";

import { format } from "date-fns";
import { Calendar, Clock, Phone, Text, User } from "lucide-react";
import type { ReactNode } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCalendar } from "@/components/calendar/contexts/calendar-context";
import { formatTime, parseToLocal } from "@/components/calendar/helpers";
import type { IEvent } from "@/components/calendar/interfaces";

interface IProps {
	event: IEvent;
	children: ReactNode;
}

export function EventDetailsDialog({ event, children }: IProps) {
	const startDate = parseToLocal(event.startDate);
	const endDate = parseToLocal(event.endDate);
	const { use24HourFormat } = useCalendar();



	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{event.title}</DialogTitle>
				</DialogHeader>

				<ScrollArea className="max-h-[80vh]">
					<div className="space-y-4 p-4">
						<div className="flex items-start gap-2">
							<User className="mt-1 size-4 shrink-0 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">Responsible</p>
								<p className="text-sm text-muted-foreground">
									{event?.contactName}
								</p>
							</div>
						</div>
						<div className="flex items-start gap-2">
							<Phone className="mt-1 size-4 shrink-0 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">Contact Number</p>
								<p className="text-sm text-muted-foreground">
									{event?.contactNumber}
								</p>
							</div>
						</div>

						<div className="flex items-start gap-2">
							<Calendar className="mt-1 size-4 shrink-0 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">Start Date</p>
								<p className="text-sm text-muted-foreground">
									{format(startDate, "EEEE dd MMMM")}
									<span className="mx-1">at</span>
									{formatTime(startDate, use24HourFormat)}
								</p>
							</div>
						</div>

						<div className="flex items-start gap-2">
							<Clock className="mt-1 size-4 shrink-0 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">End Date</p>
								<p className="text-sm text-muted-foreground">
									{format(endDate, "EEEE dd MMMM")}
									<span className="mx-1">at</span>
									{formatTime(endDate, use24HourFormat)}
								</p>
							</div>
						</div>

						<div className="flex items-start gap-2">
							<Text className="mt-1 size-4 shrink-0 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">Description</p>
								<p className="text-sm text-muted-foreground">
									{event.description}
								</p>
							</div>
						</div>
					</div>
				</ScrollArea>
				{/* <DialogFooter>
					<div className="flex justify-end gap-2">
						<AddEditEventDialog event={event}>
							<Button variant="outline">Edit</Button>
						</AddEditEventDialog>
						<Button
							variant="destructive"
							onClick={() => {
								deleteEvent(event.id);
							}}
						>
							Delete
						</Button>
					</div>
				</DialogFooter> */}
				<DialogClose />
			</DialogContent>
		</Dialog>
	);
}
