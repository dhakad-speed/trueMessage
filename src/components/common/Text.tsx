import { Typography, TypographyProps } from "@mui/material";
import React from "react";

export default function Text({ children, ...props }: TypographyProps) {
  return <Typography {...props}>{children}</Typography>;
}
