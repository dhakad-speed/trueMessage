"use client";
import Text from "../../common/Text";
import axios from "axios";
import { responseType } from "@/src/types/type";
import { AxiosError } from "axios";
import { useUserSettings } from "@/src/zustand/userSettings";
import {
  InputBase,
  Container,
  InputLabel,
  TextareaAutosize,
  Button,
  CircularProgress,
  Switch,
  FormControlLabel,
} from "@mui/material";
import AppBox from "../../common/Box";
import "./Write.scss";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { messageSchema } from "@/src/schemas/configSchema";
import SendMessage from "@/src/helpers/SendMessage";
import toast from "react-hot-toast";

function Write() {
  const [username, setUsername] = useState("");
  const [isCheckingUser, setCheckingUser] = useState(false);
  const [userStatus, setUserStatus] = useState("");
  const { isAcceptingMessages, toggleAccepting } = useUserSettings() as {
    isAcceptingMessages: boolean;
    toggleAccepting: () => void;
  };
  const debouncedSearchedUser = useDebounce(username, 500);
  useEffect(() => {
    const searchUser = async () => {
      if (debouncedSearchedUser) {
        setCheckingUser(true);
        setUserStatus("");
        try {
          const searchResponse = await axios.get(
            `/api/check-user?name=${debouncedSearchedUser}`
          );
          if (searchResponse.status !== 200) {
            setUserStatus(searchResponse?.data?.message);
          }
          setUserStatus(searchResponse?.data?.message);
        } catch (error) {
          const axiosError = error as AxiosError<responseType>;
          console.error(axiosError);
        } finally {
          setCheckingUser(false);
        }
      }
    };
    searchUser();
  }, [debouncedSearchedUser]);

  const AcceptUserMessage = async () => {
    toggleAccepting();
    try {
      const response = await axios.post("/api/accept-message", {
        acceptance: !isAcceptingMessages,
      });
      if (response.status !== 200) return;
      toast.success(response.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    name: "",
    message: "",
  };
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: messageSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log({ values }, "write.tsx");

      const senduserMessage = await SendMessage({
        to: values.name,
        content: values.message,
      });
      if (senduserMessage.status !== 200) {
        toast.error(senduserMessage.message);
      }
      if (senduserMessage.status === 200) {
        toast.success(senduserMessage.message);
        resetForm();
        setUserStatus("");
      }
    },
  });
  return (
    <Container sx={{ marginTop: "80px", paddingBottom: "100px" }}>
      <AppBox
        className="content"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <AppBox className="write-headline-element">
          <AppBox
            className="write-headline"
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Text variant="h3" fontWeight={"bold"} color="#041f61">
              Connect With People 🔗
            </Text>
            <Text sx={{ color: "#666" }}>Search & Start a Conversation</Text>
          </AppBox>
        </AppBox>
        <AppBox className="form-section">
          <AppBox
            display={"flex"}
            flexDirection={"column"}
            gap={"30px"}
            component={"form"}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            }}
            className="form"
          >
            <AppBox className="search-box">
              <InputLabel>Find Someone to Message</InputLabel>

              <InputBase
                onReset={handleReset}
                onChange={(e) => {
                  handleChange(e);
                  setUsername(e.target.value);
                }}
                onBlur={handleBlur}
                value={values.name}
                placeholder={
                  touched.name && errors.name
                    ? typeof errors.name === "string"
                      ? errors.name
                      : errors.name || "search for a user..."
                    : "search for a user..."
                }
                name="name"
                className={touched.name && errors.name ? "error-input" : ""}
              />
              {isCheckingUser && (
                <CircularProgress
                  size={14}
                  sx={{
                    marginBlock: "8px",
                    color: "#000",
                    fontWeight: "bolder",
                  }}
                />
              )}
              {!isCheckingUser && userStatus && (
                <Text
                  sx={
                    userStatus === "user founded"
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  {userStatus}
                </Text>
              )}
              <AppBox className="msg-accept">
                <FormControlLabel
                  control={
                    <Switch
                      checked={isAcceptingMessages}
                      onChange={AcceptUserMessage}
                    />
                  }
                  label="Accept Messages"
                />
              </AppBox>
            </AppBox>
            <AppBox className="message-box">
              <AppBox className="message-input">
                {" "}
                <InputLabel>Send a message</InputLabel>
                <TextareaAutosize
                  onReset={handleReset}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  value={values.message}
                  placeholder={
                    touched.message && errors.message
                      ? typeof errors.message === "string"
                        ? errors.message
                        : errors.message || "What do you want to say?…"
                      : "What do you want to say?…"
                  }
                  className={
                    touched.message && errors.message ? "error-input" : ""
                  }
                  name="message"
                  minRows={3}
                />
              </AppBox>
            </AppBox>
            <Button type="submit">Send</Button>
          </AppBox>
        </AppBox>
      </AppBox>
    </Container>
  );
}

export default Write;
