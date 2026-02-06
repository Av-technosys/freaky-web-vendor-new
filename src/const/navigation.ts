import {
    TBrandCashApp,
    TBuildings,
    TCalendarDown,
    TCalendarEvent,
    TiconLayoutDashboard,
    TiIconUser,
    TiIconStar,
    TiIconSubtask,
    TiIconUsers,
} from "@/conponents/icons";

export const SIDEBAR_ITEMS = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: TiconLayoutDashboard,
    },
    {
        title: "Manage Services",
        url: "/services",
        icon: TiIconSubtask,
    },
    {
        title: "Booking",
        url: "/bookings",
        icon: TCalendarDown,
    },
    {
        title: "Calendar",
        url: "/calendar",
        icon: TCalendarEvent,
    },
    {
        title: "User Reviews",
        url: "/reviews",
        icon: TiIconStar,
    },

    {
        title: "Payments",
        url: "/payments",
        icon: TBrandCashApp,
    },

];

export const SIDEBAR_BOTTOM_ITEMS = [
    {
        title: "Company Profile",
        url: "/company-profile",
        icon: TBuildings,
    },
    {
        title: "Manage Users",
        url: "/manage-users",
        icon: TiIconUsers,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: TiIconUser,
    },

];

export const ACCESS_TO_ALL = ["profile"]