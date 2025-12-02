import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "username should be atleast more than 3 characters")
    .required("please enter your name"),
  email: Yup.string().email().required("please enter your email"),
  password: Yup.string()
    .min(8, "password should be atleast 8 characters")
    .required("please enter your password"),
});
export const loginSchema = Yup.object().shape({
  identifier: Yup.string(),
  password: Yup.string()
    .min(8, "password should be atleast 8 characters")
    .required("please enter your password"),
});

export const usernameQuerySchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers, and underscores allowed"
    )
    .required("please enter username"),
});

export const verifySchema = Yup.object({
  code: Yup.string().length(6, "verification code must be 6 digits"),
});

export const messageSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers, and underscores allowed"
    )
    .required("please enter username"),
  message: Yup.string()
    .max(200, "Your message is too long")
    .required("please enter the message"),
});
