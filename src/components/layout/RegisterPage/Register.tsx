"use client";

import "./Register.scss";
import Link from "next/link";
import Text from "../../common/Text";
import AppBox from "../../common/Box";
import { config } from "@/config";
import { DiagonalDiv } from "../../ui/Diagonal/Constants";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDebounce } from "@uidotdev/usehooks";
import checkUserNameAvailablity from "@/src/helpers/checkUserNameAvailablity";
import { CircularProgress } from "@mui/material";
import { responseType } from "@/src/types/type";
import { Grid, Container, InputBase, Button, Paper } from "@mui/material";
import { registerSchema } from "@/src/schemas/configSchema";
import RegisterUsers from "@/src/helpers/RegisterUsers";
import { AxiosError } from "axios";

function Register() {
  const [buttonDisable, SetbuttonDisable] = useState(false);
  const [name, setName] = useState("");
  const [isCheckingUsername, setCheckingUsername] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState("");
  const usernameDebounced = useDebounce(name, 500);

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (usernameDebounced) {
        setCheckingUsername(true);
        setUsernameStatus("");
        try {
          const checkRegisteredUsernames =
            await checkUserNameAvailablity(usernameDebounced);
          setUsernameStatus(checkRegisteredUsernames.message);
        } catch (error) {
          const axiosError = error as AxiosError<responseType>;
          console.error(axiosError);
        } finally {
          setCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [usernameDebounced]);

  const router = useRouter();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const { vectorImg } = config;
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    handleReset,
  } = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const registerNewUser = await RegisterUsers({ values });
      SetbuttonDisable(true);
      setTimeout(() => {
        SetbuttonDisable(false);
      }, 1500);
      if (registerNewUser.status !== 200) {
        toast.error(registerNewUser.message);
      }
      if (registerNewUser.status === 200) {
        toast.success(registerNewUser.message);
        router.replace(`/verify/${name}`);
      }
    },
  });

  return (
    <Grid display={"grid"}>
      <DiagonalDiv
        mainDivSx={{
          backgroundImage: `url(
      ${vectorImg}
    )`,
        }}
        previewColor=""
      >
        <Container sx={{ padding: "0 !important" }}>
          <AppBox className="sign-in-app-root">
            <AppBox component={"main"} className="section-container">
              <AppBox className="backdrop">
                <Grid direction={"column"}>
                  <Paper>
                    <AppBox className="form-title" marginBottom={"20px"}>
                      <Text variant="h4" fontWeight={"700"}>
                        Register your account
                      </Text>
                      <Text sx={{ color: "#666" }}>
                        It&apos;s great to have you here again. Kindly provide
                        your registered email address.
                      </Text>
                    </AppBox>
                    <AppBox
                      className="form"
                      component="form"
                      onSubmit={(e) => {
                        handleSubmit(
                          e as unknown as React.FormEvent<HTMLFormElement>
                        );
                      }}
                    >
                      <AppBox>
                        <InputBase
                          onReset={handleReset}
                          onChange={(e) => {
                            handleChange(e);
                            setName(e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.name}
                          placeholder={
                            touched.name ? errors.name : "Enter your username"
                          }
                          name="name"
                          sx={
                            touched.name && errors.name
                              ? {
                                  border: "1px solid red !important",
                                  color: "red !important",
                                }
                              : {}
                          }
                        />
                        {isCheckingUsername && (
                          <CircularProgress
                            size={14}
                            sx={{
                              marginBlock: "8px",
                              color: "#000",
                              fontWeight: "bolder",
                            }}
                          />
                        )}
                        {!isCheckingUsername && usernameStatus && (
                          <Text
                            sx={
                              usernameStatus === "username is unique"
                                ? { color: "green" }
                                : { color: "red" }
                            }
                          >
                            {usernameStatus}
                          </Text>
                        )}
                      </AppBox>
                      <AppBox>
                        <InputBase
                          onReset={handleReset}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder={
                            touched.email ? errors.email : "Enter your email"
                          }
                          name="email"
                          sx={
                            touched.email && errors.email
                              ? {
                                  border: "1px solid red  !important",
                                  color: "red  !important",
                                }
                              : {}
                          }
                        />
                      </AppBox>
                      <AppBox>
                        <InputBase
                          onReset={handleReset}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          placeholder={
                            touched.password
                              ? errors.password
                              : "Enter your password"
                          }
                          name="password"
                          type="password"
                          sx={
                            touched.password && errors.password
                              ? {
                                  border: "1px solid red !important",
                                  color: "red !important",
                                }
                              : {}
                          }
                        />
                      </AppBox>

                      <Button
                        className="btn"
                        type="submit"
                        sx={
                          buttonDisable
                            ? { background: "rgba(0,0,0,0.04)" }
                            : undefined
                        }
                        disabled={buttonDisable}
                      >
                        Sign up
                      </Button>
                    </AppBox>

                    <AppBox
                      display={"flex"}
                      alignItems={"center"}
                      gap={1}
                      justifyContent={"center"}
                      mt={2}
                    >
                      {" "}
                      <Text variant="body1" sx={{ color: "#848b9e" }}>
                        Do you already have an account?
                      </Text>
                      <Link
                        href="/login"
                        className="link"
                        style={{
                          fontSize: "15px",
                          color: "#2a67ff",
                        }}
                      >
                        Sign In
                      </Link>
                    </AppBox>
                  </Paper>
                </Grid>
              </AppBox>
            </AppBox>
          </AppBox>
        </Container>
      </DiagonalDiv>
    </Grid>
  );
}

export default Register;
