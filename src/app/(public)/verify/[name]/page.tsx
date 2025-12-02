"use client";
import "./style.scss";
import {
  Container,
  Grid,
  InputBase,
  Button,
  Paper,
  InputLabel,
} from "@mui/material";
import Text from "@/src/components/common/Text";
import AppBox from "@/src/components/common/Box";
import { DiagonalDiv } from "@/src/components/ui/Diagonal/Constants";
import { config } from "@/config";
import { useFormik } from "formik";
import { verifySchema } from "@/src/schemas/configSchema";
import verifyUserAccount from "@/src/helpers/verifyUserAccount";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
function VerifyUser() {
  const params = useParams();
  const router = useRouter();
  const { vectorImg } = config;
  const initialValues = {
    code: "",
  };
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues,
      validationSchema: verifySchema,
      onSubmit: async (values) => {
        const name = typeof params.name === "string" ? params.name : "";
        const verifyApi = await verifyUserAccount(name, values.code);
        if (verifyApi.status !== 200) {
          toast.error(verifyApi.message);
        }
        toast.success(verifyApi.message);
        if (verifyApi.status === 405) {
          router.push("/register");
        } else {
          router.push("/login");
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
          <AppBox className="verify-app-root">
            <AppBox component={"main"} className="section-container">
              <AppBox className="backdrop">
                <Grid direction={"column"}>
                  <Paper>
                    <AppBox
                      className="form-title"
                      textAlign={"center"}
                      marginBottom={"20px"}
                    >
                      <Text
                        variant="h3"
                        fontWeight={"700"}
                        sx={{ fontSize: "40px" }}
                      >
                        Verify your account🔒
                      </Text>
                      <Text variant="body1" sx={{ color: "#0a193e" }}>
                        Enter the verification code sent to your email
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
                        <InputLabel variant="standard" sx={{ mb: 1 }}>
                          Enter your verification code
                        </InputLabel>
                        <InputBase
                          name="code"
                          value={values.code}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={
                            touched.code && errors.code
                              ? {
                                  border: "1px solid red !important",
                                  color: "red !important",
                                }
                              : {}
                          }
                        />
                      </AppBox>

                      <Button className="btn" type="submit">
                        Sign up
                      </Button>
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

export default VerifyUser;
