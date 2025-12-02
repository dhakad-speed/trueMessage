import axios from "axios";
import { responseType } from "../types/type";

async function verifyUserAccount(
  name: string,
  verifyCode: string
): Promise<responseType> {
  try {
    const verifyUser = await axios.post("/api/verify", {
      name,
      verifyCode,
    });
    if (verifyUser.status !== 200) {
      return {
        success: false,
        message: verifyUser?.data?.message,
        status: verifyUser?.status,
      };
    }
    return {
      success: true,
      message: verifyUser.data?.message,
      status: verifyUser.status,
    };
  } catch (error) {
    const isApiError =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data?.message
        : "verification failed";
    return {
      success: false,
      message: isApiError,
      status: 400,
    };
  }
}

export default verifyUserAccount;
