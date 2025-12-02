"use client";

import { IconButton, IconButtonProps } from "@mui/material";
const BaseIconButton: React.FC<IconButtonProps> = (props) => {
  return <IconButton {...props}>{props.children}</IconButton>;
};

export default BaseIconButton;
