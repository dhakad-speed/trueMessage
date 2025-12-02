"use client";

import Link from "next/link";
import AppBox from "../../common/Box";
import "./Navbar.scss";
import WriteIcon from "../../ui/Icons/WriteIcon/WriteIcon";
import NotificationIcon from "../../ui/Icons/NotificationIcon/NotificationIcon";
import Text from "../../common/Text";
import { Badge, Button, Container } from "@mui/material";

import HomeIcon from "../../common/home/HomeIcon";
import ProfileIcon from "../../common/profile/ProfileIcon";
import { signOut } from "next-auth/react";
import { useContextValues } from "@/src/context/Context";
function Navbar() {
  // const { status } = useSession();
  const status = true;
  const { isNotify, isInvisible } = useContextValues();

  return (
    <AppBox component={"nav"}>
      <Container>
        <AppBox className="nav-content">
          <AppBox className="left">
            <AppBox
              display={"flex"}
              alignItems={"center"}
              className="left-content"
            >
              <Text fontWeight={"900"} color="#fff" variant="h6">
                TrueMessage
              </Text>
            </AppBox>
          </AppBox>
          <AppBox className="right">
            <AppBox className="right-content">
              {status ? (
                <>
                  <Link href="/">
                    <AppBox
                      sx={{
                        textTransform: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "0",
                        color: "white",
                      }}
                    >
                      <HomeIcon />
                      <Text>Home</Text>
                    </AppBox>
                  </Link>
                  <Link href="/write">
                    <AppBox
                      sx={{
                        textTransform: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "0",
                      }}
                    >
                      <WriteIcon />
                      <Text variant="body1">Write</Text>
                    </AppBox>
                  </Link>
                  <Link href={"/messages"}>
                    <Badge
                      variant="dot"
                      invisible={isInvisible}
                      badgeContent={isNotify ? 1 : 0}
                      sx={{
                        textTransform: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "0",
                      }}
                    >
                      <NotificationIcon />
                      <Text variant="body1">Messages</Text>
                    </Badge>
                  </Link>
                  <Link href={"/profile"}>
                    <AppBox
                      sx={{
                        textTransform: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "0",
                      }}
                    >
                      <ProfileIcon />
                      <Text variant="body1">Profile</Text>
                    </AppBox>
                  </Link>
                  <Button
                    onClick={() => signOut()}
                    sx={{
                      background: "#000",
                      color: "#fff",
                      borderRadius: "12px",
                      width: "100px",
                      height: "30px",
                      fontSize: "14px",
                      textTransform: "none",
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    style={{
                      background: "#000",
                      padding: "2px 10px",
                      color: "white",
                      borderRadius: "22px",
                    }}
                    href={"/login"}
                  >
                    Login
                  </Link>
                </>
              )}
            </AppBox>
          </AppBox>
        </AppBox>
      </Container>
    </AppBox>
  );
}

export default Navbar;
