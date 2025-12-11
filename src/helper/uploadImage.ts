import axios from "axios";
import { axiosInstance } from "./api";
import { apiConstant } from "./apiConstant";

export const getImageUrlHandler = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      apiConstant.uploadImage.getS3Url,
      data,
    );
    return response;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};

export const UploadImageHandler = async (url: any, file: any) => {
  try {
    const response = await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    return response;
  } catch (error) {
    console.error("Error while sending request:", error);
  }
};
