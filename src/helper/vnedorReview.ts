import axiosInstance from "./api";
import { apiConstant } from "./apiConstant";

export const getVendorReview = async (
  page: number,
  page_size: number,
  time: string | undefined
) => {
  let query = `page=${page}&page_size=${page_size}`;

  if (time) {
    query += `&time=${time}`;
  }
  try {
    const response = await axiosInstance.get(
      `${apiConstant.review.getAllReview}?${query}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getVendorReviewByIdFn = async (reviewId: number) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.review.getReviewById}/${reviewId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};

export const getVendorCalendarFn = async (selectedDate: Date) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.review.getCalendar}/?date=${selectedDate}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while sending request:", error);
    throw error;
  }
};
