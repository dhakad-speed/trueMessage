"use client";
import AppBox from "../../common/Box";
import { SxProps, Theme } from "@mui/material";
import "./diagonal.scss";
interface DiagonalDivTypes {
  children: React.ReactNode;
  mainDivSx?: SxProps<Theme>;
  previewColor?: string;
}
export const DiagonalDiv: React.FC<DiagonalDivTypes> = ({
  children,
  mainDivSx = {} as SxProps<Theme>,
  previewColor = "#fff",
}) => {
  return (
    <>
      <AppBox
        className="vector-diagonal-div"
        sx={{
          ...mainDivSx,
        }}
      />
      <AppBox
        className="vector-diagonal-sub-div"
        sx={{
          backgroundColor: previewColor && `${previewColor} !important`,
        }}
      />
      <AppBox className="overlay-container">{children}</AppBox>
    </>
  );
};
