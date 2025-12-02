import React, { useState } from "react";
import AppBox from "../../common/Box";
import Text from "../../common/Text";
import { Avatar, IconButton, Skeleton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs from "dayjs";
interface MessageProps {
  SenderName?: string;
  SenderMessage?: string;
  recivedAt?: string;
  isLoading?: boolean;
}
function MessageCard({
  SenderName,
  SenderMessage,
  recivedAt,
  isLoading,
}: MessageProps) {
  const formattedDate = recivedAt
    ? dayjs(recivedAt).format("MMM D, YYYY h:mm A")
    : "";
  console.log({ SenderName, SenderMessage, recivedAt });
  return (
    <>
      <AppBox
        className="message-element"
        width={"450px"}
        height={"190px"}
        border={"1px solid #e4e9ee"}
        borderRadius={"24px"}
        bgcolor={"#f7fafc"}
      >
        <AppBox
          className="message-content"
          padding={4}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
        >
          <AppBox display={"flex"} justifyContent={"space-between"}>
            <AppBox display={"flex"} gap={2} alignItems={"center"}>
              {isLoading ? (
                <>
                  <Skeleton width={40} height={40} variant="circular" />
                  <Skeleton width={150} />
                </>
              ) : (
                <>
                  <Avatar src="https://images.tryspeed.dev/app/default-user.svg" />
                  <Text>{SenderName ? SenderName : "True Message"}</Text>
                </>
              )}
            </AppBox>

            <AppBox>
              {isLoading ? (
                <>
                  <Skeleton width={40} height={40} variant="circular" />
                </>
              ) : (
                <IconButton sx={{ border: "1px solid #e4e9ee" }}>
                  <ClearIcon />
                </IconButton>
              )}
            </AppBox>
          </AppBox>
          <AppBox>
            <AppBox>
              {isLoading ? (
                <>
                  <Skeleton width={300} variant="text" />
                  <Skeleton width={300} variant="text" />
                </>
              ) : (
                <>
                  <Text variant="body1">
                    {SenderMessage ? SenderMessage : "Hello From TrueMessage"}
                  </Text>
                  <Text variant="body1">
                    {formattedDate ? formattedDate : "Dec 2, 2025 1:58 PM"}
                  </Text>
                </>
              )}
            </AppBox>
          </AppBox>
        </AppBox>
      </AppBox>
    </>
  );
}

export default MessageCard;
