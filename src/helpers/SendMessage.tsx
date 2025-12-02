import { responseType } from "../types/type";
import { useSession } from "next-auth/react";
import axios from "axios";

async function SendMessage({
  to,
  content,
}: {
  to: string;
  content: string;
}): Promise<responseType> {
  try {
    // console.log({ ...values }, "SendMessage Api Function");
    const response = await axios.post("/api/send-message", {
      to,
      content,
    });
    if (response.status !== 200) {
      return {
        success: false,
        message: response?.data?.message,
        status: response.status,
      };
    }
    return Promise.resolve({
      success: true,
      message: response?.data?.message,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    const apiErrorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "problem in registration";
    return Promise.resolve({
      success: false,
      message: apiErrorMessage,
      status: 400,
    });
  }
}

export default SendMessage;
