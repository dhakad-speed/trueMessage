"use client";
import AppBox from "../../common/Box";
import Text from "../../common/Text";
import "./Message.scss";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import MessageCard from "./Message";
import SyncIcon from "@mui/icons-material/Sync";
import { useSession } from "next-auth/react";

interface MessageResponse {
  from: string;
  content: string;
  createdAt: string;
}
function MessageComponent() {
  const { data: session, status } = useSession();
  const [isLoadingMessage, setLoadingMessage] = useState(false);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [refreshMessage, setRefreshMessages] = useState(false);
  const fetchMessages = useCallback(async () => {
    try {
      setLoadingMessage(true);
      const response = await axios.get("/api/get-message");
      if (!response) return;
      const getMessages = Array.isArray(response.data.message)
        ? response.data.message
        : [];
      setMessages(getMessages ? getMessages : "no message found");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMessage(false);
    }
  }, []);

  const handleRefresh = async () => {
    setRefreshMessages(true);
    await fetchMessages();
    setRefreshMessages(false);
  };
  useEffect(() => {
    if (!session) return;

    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status]);
  return (
    <AppBox className="message-component" width={"100%"} display={"flex"}>
      <AppBox width={"100%"}>
        <AppBox width={"100%"}>
          <AppBox
            className="message-headline"
            justifySelf={"center"}
            display={"flex"}
          >
            <AppBox
              paddingBlock={5}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              {" "}
              <Text variant="h3">Your Messaging Hub</Text>
              <Text variant="h6">Check who&apos;s messaging you</Text>
            </AppBox>
          </AppBox>
          <Button
            onClick={handleRefresh}
            sx={{
              boxShadow:
                "0 4px 4px -2px rgba(11,37,75,.12) , 0 0 0 1px rgba(11,37,75,.08)",
              color: "#0a193e",
              display: "flex",
              justifySelf: "center",
              marginBlock: 3,
            }}
          >
            <SyncIcon
              className={refreshMessage ? "spin" : ""}
              sx={{ transition: "transform 0.5s linear" }}
            />
          </Button>

          <Grid
            container
            gap={3}
            sx={{ gridTemplateColumns: "repeat(2,1fr)", display: "grid" }}
            className="msg"
          >
            {messages.map((msg, idx) => (
              <Grid size={6} key={idx}>
                <MessageCard
                  isLoading={isLoadingMessage}
                  SenderName={msg.from}
                  SenderMessage={msg.content}
                  recivedAt={msg.createdAt}
                />
              </Grid>
            ))}
          </Grid>
        </AppBox>
      </AppBox>
    </AppBox>
  );
}
export default MessageComponent;
