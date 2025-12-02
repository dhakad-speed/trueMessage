import axios from "axios";
import { responseType } from "../types/type";

async function RegisterUsers({
  values,
}: {
  values: object;
}): Promise<responseType> {
  try {
    const response = await axios.post("/api/register", {
      ...values,
    });
    if (response.status !== 200) {
      return { success: false, message: response?.data?.message, status: 400 };
    }
    return {
      success: true,
      message: response?.data?.message,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    const apiErrorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "problem in registration";
    return {
      success: false,
      message: apiErrorMessage,
      status: 400,
    };
  }
}

export default RegisterUsers;
