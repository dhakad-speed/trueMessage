import VerificationEmailTemplate from "@/emails/VerificationEmailTemplate";
import { render } from "@react-email/render";
import { response } from "./response";
import nodemailer from "nodemailer";

interface sendVerify {
  username: string;
  email: string;
  verifyCode: string;
}
export async function SendVerificationEmail({
  username,
  email,
  verifyCode,
}: sendVerify): Promise<response> {
  try {
    // console.log({ username, email, verifyCode });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: String(process.env.EMAIL_ID),
        pass: String(process.env.PASSWORD),
      },
    });
    const html = await render(
      VerificationEmailTemplate({ username, verifyCode })
    );
    const verificationEmail = await transporter.sendMail({
      from: String(process.env.EMAIL_ID),
      to: email,
      subject: "verification code",
      html: html,
    });
    if (!verificationEmail.response) {
      return {
        success: false,
        message: "verification email failed",
      };
    }
    return {
      success: true,
      message: "verification email sent successfully",
    };
  } catch (error) {
    console.log("error in send verification", error);
    return {
      success: false,
      message: "sending verifcation has been failed",
    };
  }
}
