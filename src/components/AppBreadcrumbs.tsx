import { Link, useLocation } from "react-router-dom";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // adjust path if needed
import { Home } from "lucide-react";

const routeNameMap: Record<string, string> = {
    dashboard: "Dashboard",
    users: "Users",
    settings: "Settings",
    products: "Products",
    orders: "Orders",
};

export default function AppBreadcrumbs() {
    const location = useLocation();

    const pathnames = location.pathname
        .split("/")
        .filter(Boolean);

    if (pathnames.length < 2) {
        return null;
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* Home */}
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/"><Home /></Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {pathnames.map((segment, index) => {
                    const isLast = index === pathnames.length - 1;
                    const to = "/" + pathnames.slice(0, index + 1).join("/");

                    const label =
                        routeNameMap[segment] ??
                        segment.replace(/-/g, " ");

                    return (
                        <div key={to} className="flex items-center">
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage className="capitalize">
                                        {label}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link to={to} className="capitalize">
                                            {label}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
