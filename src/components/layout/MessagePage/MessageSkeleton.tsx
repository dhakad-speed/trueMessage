import React from "react";

import AppBox from "../../common/Box";
import { Skeleton } from "@mui/material";
function MessageSkeleton() {
  return (
    <AppBox>
      <AppBox>
        <AppBox display={"flex"} alignItems={"center"} gap={2}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={400} />
        </AppBox>
        <AppBox>
          <Skeleton variant="text" width={450} sx={{ marginLeft: "10px" }} />
          <Skeleton variant="text" width={450} sx={{ marginLeft: "10px" }} />
        </AppBox>
      </AppBox>
    </AppBox>
  );
}

export default MessageSkeleton;
