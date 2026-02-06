import { Calendar } from "@/components/calendar/calendar";
import { CalendarSkeleton } from "@/components/calendar/skeletons/calendar-skeleton";
import { Suspense } from "react";
import withAuthorization from "@/lib/withAuthorization";

function CalendarPage() {
  return (
    <Suspense fallback={<CalendarSkeleton />}>
      <Calendar />
    </Suspense>
  );
}


export default withAuthorization("calendar")(CalendarPage);
