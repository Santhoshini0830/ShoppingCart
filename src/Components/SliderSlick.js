import React from "react";
import { Box } from "@mui/material";

export const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;

  return (
    <Box
      className={className}
      style={{ ...style, background: "black" }}
      onClick={onClick}
    />
  );
};

export const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;

  return (
    <Box
      className={className}
      style={{
        ...style,
        display: "block",
        marginTop: "-10em",
        background: "black",
      }}
      onClick={onClick}
    />
  );
};
