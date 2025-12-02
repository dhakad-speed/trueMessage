import React from "react";
import { Box, BoxProps } from "@mui/material";
export default function AppBox({ children, ...props }: BoxProps) {
  return <Box {...props}>{children}</Box>;
}
