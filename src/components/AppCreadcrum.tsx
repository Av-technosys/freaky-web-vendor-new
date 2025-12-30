import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const ROUTE_LABELS: Record<string, string> = {
    vendors: "Vendors",
    products: "Products",
    orders: "Orders",
    bookings: "Bookings",
    reviews: "Reviews",
    dashboard: "Dashboard",
};

const HIDDEN_SEGMENTS = ["edit", "new"];

export function AppBreadcrumb() {
    const location = useLocation();

    const segments = location.pathname
        .split("/")
        .filter(Boolean)
        .filter(seg => !HIDDEN_SEGMENTS.includes(seg));

    const paths = segments.map((seg, index) => ({
        label: ROUTE_LABELS[seg] || formatLabel(seg),
        href: "/" + segments.slice(0, index + 1).join("/"),
        isLast: index === segments.length - 1,
    }));

    if (paths.length <= 1) return null;

    return (
        <>
            <Breadcrumb className=" pl-4 mt-6">
                <BreadcrumbList>
                    <BreadcrumbItem >

                        <BreadcrumbLink asChild>
                            <Link to={"/"}><House size={16} /></Link>
                        </BreadcrumbLink>
                        <BreadcrumbSeparator />

                    </BreadcrumbItem>
                    {paths.map((item) => (
                        <BreadcrumbItem key={item.href}>
                            {item.isLast ? (
                                <BreadcrumbPage>{item.label}</BreadcrumbPage>
                            ) : (
                                <>
                                    <BreadcrumbLink asChild>
                                        <Link to={item.href}>{item.label}</Link>
                                    </BreadcrumbLink>
                                    <BreadcrumbSeparator />
                                </>
                            )}
                        </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </>
    );
}

function formatLabel(segment: string) {
    if (/^\d+$/.test(segment)) return "Details";
    return segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, l => l.toUpperCase());
}
