import { useQuery } from "@tanstack/react-query"
import { getVendorCalendarFn, getVendorReview, getVendorReviewByIdFn } from "../helper/vnedorReview";

// export const getVendorReviews =  ({
//   page,
//   page_size,
//   vendorId,
//   time,
// }:{
//     page:number,
//     page_size:number,
//     vendorId?:number,
//     time?:string
// }) => {
export const getVendorReviews =  (page:number, page_size:number, vendorId?:number, time?:string) => {
   return useQuery({
        queryKey: ["vendor-reviews", vendorId, page_size , page, time],
        queryFn: () => getVendorReview(page, page_size, vendorId , time),
      });
}


export const getVendorReviewById = (reviewId:number) => {
    return useQuery({
        queryKey: ["vendor-review-by-id", reviewId],
        queryFn: () => getVendorReviewByIdFn(reviewId),
      });
}

export const getVendorCalendar = (selectedDate:Date) => {
    return useQuery({
        queryKey: ["vendor-cal", selectedDate],
        queryFn: () => getVendorCalendarFn(selectedDate),
      });
}