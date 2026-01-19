import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const createExternalBooking = async (bookingData: any) => {
  try {
    const response = await axiosInstance.post(
      `${apiConstant.booking.createExternalBooking}`,
      bookingData,
    );
    return response.data;
  } catch (error) {
    console.error("Error while creating external booking:", error);
    throw error;
  }
};

export const getAllBookings = async ({
  text = "",
  page = 1,
  page_size = 12,
}: any) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.booking.getAllBookings}?text=${text}&page=${page}&page_size=${page_size}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error while fetching bookings:", error);
    throw error;
  }
};

export const getBookingItemDetails = async (bookingId: any) => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.booking.getBookingItemDetailsById}/${bookingId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error while fetching booking item details:", error);
    throw error;
  }
};
