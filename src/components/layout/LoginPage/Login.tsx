"use client";
import React from "react";
// import { useEffect } from "react";
import Text from "../../common/Text";
import Link from "next/link";
import { loginSchema } from "@/src/schemas/configSchema";
import "./Login.scss";
import { useFormik } from "formik";
import { DiagonalDiv } from "../../ui/Diagonal/Constants";
import AppBox from "../../common/Box";
import { config } from "@/config";
import { Container, InputBase, Button, Grid, Paper } from "@mui/material";
import { useRouter } from "next/navigation";

// import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SignIn from "@/src/helpers/Sign";
function Login() {
  // const { status } = useSession();
  const router = useRouter();
  const { vectorImg } = config;
  const initialValues = {
    identifier: "",
    password: "",
  };
  const { handleBlur, handleChange, handleSubmit, handleReset } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const signInUser = await SignIn({
          identifier: values.identifier,
          password: values.password,
        });
        console.log({ signInUser });
        if (signInUser.success) {
          toast.success(signInUser.message);
          router.push("/dashboard");
        } else {
          toast.error(signInUser.message || "Failed to log in");
        }
      } catch (error) {
        toast.success("failed in loggin the user");
        console.error(error);
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
                <Paper
                  sx={{
                    padding: "30px",
                    width: "504px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <AppBox className="social-title" marginBottom={"20px"}>
                    <Text variant="h4" fontWeight={"700"}>
                      Welcome to{" "}
                      <Text variant="h4" component={"span"} fontWeight={"bold"}>
                        Blog.
                      </Text>
                    </Text>
                  </AppBox>
                  <AppBox className="social" component="section">
                    <AppBox display={"flex"} flexDirection={"column"} gap={3}>
                      <AppBox
                        className="form"
                        onSubmit={(e) => {
                          handleSubmit(
                            e as unknown as React.FormEvent<HTMLFormElement>
                          );
                        }}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={2}
                        component={"form"}
                      >
                        <InputBase
                          onReset={handleReset}
                          id="identifier"
                          name="identifier"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter your username or email"
                          className=""
                        />
                        <InputBase
                          onReset={handleReset}
                          onBlur={handleBlur}
                          id="password"
                          name="password"
                          onChange={handleChange}
                          placeholder="Enter your password"
                        />
                        <Button className="btn" type="submit">
                          Sign in
                        </Button>
                      </AppBox>

                      <AppBox
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={1}
                      >
                        <Text variant="body1">Don&apos;t have an Account</Text>
                        <Link
                          href="/register"
                          className="link"
                          style={{
                            fontSize: "15px",
                            color: "#2a67ff",
                          }}
                        >
                          Sign up
                        </Link>
                      </AppBox>
                    </AppBox>
                  </AppBox>
                </Paper>
              </AppBox>
            </AppBox>
          </AppBox>
        </Container>
      </DiagonalDiv>
    </Grid>
  );
}

export default Login;
