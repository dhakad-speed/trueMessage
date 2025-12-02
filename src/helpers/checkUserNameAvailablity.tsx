import axios from "axios";
import { responseType } from "../types/type";

async function checkUserNameAvailablity(
  username: string
): Promise<responseType> {
  try {
    const response = await axios.get(`/api/check-name?name=${username}`);
    if (!response?.data?.success) {
      return {
        success: false,
        message: response?.data?.message,
        status: response?.status,
      };
    }
    return {
      success: true,
      message: response?.data.message,
      status: 200,
    };
  } catch (error) {
    const isApiError =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data?.message
        : "problem in checking username";
    return {
      success: false,
      message: isApiError,
      status: 400,
    };
  }
}

export default checkUserNameAvailablity;
