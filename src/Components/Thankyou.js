import React from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: "74vh",
  },
  icon: {
    "&.MuiSvgIcon-root": {
      fontSize: "50px",
      color: "green",
    },
  },
}));

export const Thankyou = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <CheckCircleIcon className={classes.icon} />
      <Typography variant="h4" gutterBottom>
        Order Confirmed!!
      </Typography>
      <Typography variant="h6">Thank you</Typography>
    </Box>
  );
};
