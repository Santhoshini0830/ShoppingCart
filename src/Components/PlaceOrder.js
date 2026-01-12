import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { checkOut, snackBar } from "../redux/actions/ProductActions";
import { useCartContext } from "./CartContext";

const useStyles = makeStyles(() => ({
  button: {
    "&.MuiButton-root": {
      width: "120%",
      backgroundColor: "black",
      "&:hover": {
        backgroundColor: "#424242",
      },
    },
  },
  typography: {
    "&.MuiTypography-root": {
      "@media(min-width:0px) and (max-width:600px)": {
        fontSize: "12px",
      },
      "@media(min-width:600px) and (max-width:900px)": {
        fontSize: "13px",
      },
      "@media(min-width:900px) and (max-width:1200px)": {
        fontSize: "13px",
      },
      "@media(min-width:1200px) and (max-width:2000px)": {
        fontSize: "14px",
      },
    },
  },
}));

export const PlaceOrder = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { addToBuynow, handleSnackbar } = useCartContext();

  const handleBuynow = () => {
    const loggedIn = localStorage.getItem("userEmail");
    if (loggedIn) {
      // dispatch(checkOut(id));
      addToBuynow(product);

      navigate("/checkOut");
    } else {
      handleSnackbar(true, "User is not logged in", "error");
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        size="large"
        className={classes.button}
        onClick={handleBuynow}
      >
        <Typography variant="p" component="p" className={classes.typography}>
          BUY NOW
        </Typography>
      </Button>
    </Box>
  );
};
