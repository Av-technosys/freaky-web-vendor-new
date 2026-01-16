import type { TEventColor } from "./types";

export interface IUser {
	id: string;
	name: string;
	picturePath: string | null;
}

export interface IEvent {
	id: number;
	startDate: string;
	endDate: string;
	title: string;
	color: TEventColor;
	description: string;
	contactName?: string;
	contactNumber?: string;
	services?: IService[];
	user?: any;
}

export interface IService {
	serviceId: string;
	startTime: Date | string;
	endTime: Date | string;
	minPerson: number;
	maxPerson: number;
	location: string;
}

export interface ICalendarCell {
	day: number;
	currentMonth: boolean;
	date: Date;
}
