"use client";
import React from "react";
import Text from "@/src/components/common/Text";
import AppBox from "@/src/components/common/Box";
function page() {
  return (
    <AppBox display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <AppBox component={"section"}>
        <AppBox className="content" paddingInline={"10rem"}>
          <AppBox
            display={"flex"}
            justifySelf={"center"}
            flexDirection={"column"}
          >
            <Text
              variant="h1"
              fontSize={48}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              Dive into the World of True Message
            </Text>
            <Text variant="h4" textAlign={"center"}>
              True Message - message app
            </Text>
          </AppBox>
        </AppBox>
      </AppBox>
    </AppBox>
  );
}

export default page;
