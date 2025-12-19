import React, { useEffect, useState } from "react";
import { CalendarProvider } from "./contexts/calendar-context";
import { DndProvider } from "./contexts/dnd-context";
import { CalendarHeader } from "./header/calendar-header";
import { CalendarBody } from "./calendar-body";
import { getEvents, getUsers } from "./requests";
import { getVendorCalendar } from "../../services/userGetVendorReview";
import { CalendarSkeleton } from "./skeletons/calendar-skeleton";

// async function getCalendarData() {
// 	return {
// 		events: await getEvents(),
// 		users: await getUsers(),
// 	};
// }

export function Calendar() {

	const [selectedDate, setSelectedDate] = useState(new Date());

	const users = [
		{
			id: "f3b035ac-49f7-4e92-a715-35680bf63175",
			name: "Michael Doe",
			picturePath: null,
		},
		{
			id: "3e36ea6e-78f3-40dd-ab8c-a6c737c3c422",
			name: "Alice Johnson",
			picturePath: null,
		},
		{
			id: "a7aff6bd-a50a-4d6a-ab57-76f76bb27cf5",
			name: "Robert Smith",
			picturePath: null,
		},
		{
			id: "dd503cf9-6c38-43cf-94cc-0d4032e2f77a",
			name: "Emily Davis",
			picturePath: null,
		},
	];
	const monthStartTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1, 0, 0, 1, 0);
	const { data, isPending } = getVendorCalendar(monthStartTime);
	const [eventData, setEventData] = React.useState<any>([]);
	useEffect(() => {
		setEventData(data?.data);
	}, [data])
	if (isPending) {
		<CalendarSkeleton />
	}
	return (
		<div>
			{
				eventData?.length >= 0 ? (
					<CalendarProvider selectedDate={selectedDate} setSelectedDate={setSelectedDate} events={eventData} users={users} view="month">
						<DndProvider showConfirmation={false}>
							<div className="w-full border rounded-xl bg-white">
								<CalendarHeader />
								<CalendarBody />
							</div>
						</DndProvider>
					</CalendarProvider>
				) : (
					<CalendarSkeleton />
				)
			}
		</div>
	);
}
