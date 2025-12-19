"use client";

import { isSameDay, parseISO } from "date-fns";
import { motion } from "framer-motion";
import React from "react";
import { fadeIn , transition} from "./animations";
import { CalendarMonthView } from "./views/month-view/calendar-month-view";
import { CalendarWeekView } from "./views/week-and-day-view/calendar-week-view";
import { CalendarDayView } from "./views/week-and-day-view/calendar-day-view";
import { CalendarYearView } from "./views/year-view/calendar-year-view";
import { AgendaEvents } from "./views/agenda-view/agenda-events";
import { useCalendar } from "./contexts/calendar-context";

export function CalendarBody() {
	const { view, events } = useCalendar();

	const singleDayEvents = events.filter((event) => {
		const startDate = parseISO(event.startDate);
		const endDate = parseISO(event.endDate);
		return isSameDay(startDate, endDate);
	});

	const multiDayEvents = events.filter((event) => {
		const startDate = parseISO(event?.startDate);
		const endDate = parseISO(event?.endDate);
		return !isSameDay(startDate, endDate);
	});

	// console.log("multiDayEvents: ",singleDayEvents)

	return (
		<div className="w-full h-full overflow-scroll relative">
			<motion.div
				key={view}
				initial="initial"
				animate="animate"
				exit="exit"
				variants={fadeIn}
				transition={transition as any}
			>
				{view === "month" && (
					<CalendarMonthView
						singleDayEvents={singleDayEvents}
						multiDayEvents={multiDayEvents}
					/>
				)}
				{view === "week" && (
					<CalendarWeekView
						singleDayEvents={singleDayEvents}
						multiDayEvents={multiDayEvents}
					/>
				)}
				{view === "day" && (
					<CalendarDayView
						singleDayEvents={singleDayEvents}
						multiDayEvents={multiDayEvents}
					/>
				)}
				{view === "year" && (
					<CalendarYearView
						singleDayEvents={singleDayEvents}
						multiDayEvents={multiDayEvents}
					/>
				)}
				{view === "agenda" && (
					<motion.div
						key="agenda"
						initial="initial"
						animate="animate"
						exit="exit"
						variants={fadeIn}
						transition={transition as any}
					>
						<AgendaEvents />
					</motion.div>
				)}
			</motion.div>
		</div>
	);
}
