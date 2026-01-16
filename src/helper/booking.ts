import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const createExternalBooking = async (bookingData: any) => {
    try {
        const response = await axiosInstance.post(
            `${apiConstant.booking.createExternalBooking}`,
            bookingData
        );
        return response.data;
    } catch (error) {
        console.error("Error while creating external booking:", error);
        throw error;
    }
};
