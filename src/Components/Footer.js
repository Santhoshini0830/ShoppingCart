import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  box: {
    "&.MuiBox-root": {
      textAlign: "center",
      height: 60,
      background: "rgba(0, 0, 0, 0.05)",
      position: "relative",
      paddingTop: "19px",
      marginTop: "10px",
    },
  },
}));

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography variant="body2"></Typography>
      <Typography variant="body1">
        &copy; {currentYear} <strong>ShoppingMart.com</strong>
      </Typography>
    </Box>
  );
};
