"use client";
import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import AppBox from "@/src/components/common/Box";
import { Avatar, Skeleton, Button } from "@mui/material";
import Text from "@/src/components/common/Text";

function ProfileComponent() {
  const [loading, SetLoading] = useState(false);
  const { data: session, status } = useSession();
  useEffect(() => {
    SetLoading(status === "loading");
  }, [status]);
  return (
    <AppBox
      className="profile"
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
    >
      <AppBox
        className="profile-container"
        sx={{
          marginTop: 20,
          display: "flex",
          gap: "20px",
          border: "1px solid #e4e9ee",
          maxWidth: "400px",
          height: "230px",
          padding: "30px",
        }}
      >
        <AppBox component={"section"} className="profile-section">
          <AppBox
            className="content"
            sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <AppBox className="content-01">
              <AppBox
                className="header-content"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBlock: "20px",
                }}
              >
                <AppBox
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  {" "}
                  {loading ? (
                    <Skeleton width={40} height={40} variant="circular" />
                  ) : (
                    <Avatar
                      src={
                        session?.user?.image ||
                        "https://images.tryspeed.dev/chrome-wallet/default-user.svg"
                      }
                    />
                  )}
                  {loading ? (
                    <Skeleton
                      variant="text"
                      width={334}
                      sx={{ borderRadius: "10px", fontSize: "24px" }}
                    />
                  ) : (
                    <Text
                      variant="h5"
                      sx={{ fontWeight: "500", textTransform: "none" }}
                    >
                      {session?.user?.email}
                    </Text>
                  )}
                </AppBox>
              </AppBox>
            </AppBox>
            <AppBox
              sx={{
                borderColor: "#e4e9ee",
                borderTopWidth: "1px",
                height: "0",
                textAlign: "center",
              }}
            >
              <Text>username : {session?.user?.name}</Text>
            </AppBox>
            <AppBox className="content-02" sx={{ width: "100%" }}>
              <AppBox
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {loading ? (
                  <Skeleton
                    width={65}
                    height={40}
                    variant="rectangular"
                    sx={{ borderRadius: "10px" }}
                  />
                ) : (
                  <Button
                    onClick={() => signOut()}
                    sx={{
                      background: "#f9f9f9",
                      fontSize: "14px",
                      border: "1px solid #e4e9ee",
                      textTransform: "none",
                      color: "#0a193e",
                    }}
                  >
                    Logout
                  </Button>
                )}
              </AppBox>
            </AppBox>
          </AppBox>
        </AppBox>
      </AppBox>
    </AppBox>
  );
}

export default ProfileComponent;
