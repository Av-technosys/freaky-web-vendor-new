import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const getPayments = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConstant.payment.getAllTransactions}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error while fetching payment details:", error);
    throw error;
  }
};
