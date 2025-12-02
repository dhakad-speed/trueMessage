import { responseType } from "../types/type";
import { signIn } from "next-auth/react";
interface SignInProps {
  identifier: string | undefined;
  password: string | undefined;
}
async function SignIn({
  identifier,
  password,
}: SignInProps): Promise<responseType> {
  try {
    const signInNewUser = await signIn("credentials", {
      identifier: identifier,
      password: password,
      redirect: false,
    });
    if (signInNewUser.error) {
      return {
        success: false,
        message: signInNewUser.error || "Failed to log in",
        status: 400,
      };
    }
    return {
      success: true,
      message: " Login Successfully",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "failed in loggin the user",
      status: 400,
    };
  }
}

export default SignIn;
