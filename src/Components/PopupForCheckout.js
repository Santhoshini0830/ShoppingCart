import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PopupForm } from "./PopupForm";

const useStyles = makeStyles(() => ({
  box: {
    textAlign: "center",
  },
  button: {
    "&.MuiButton-root": {
      marginLeft: "-1em",
      marginTop: "1em",
      backgroundColor: "black",
      "&:hover": {
        backgroundColor: "#424242",
      },
    },
  },
}));

export const PopupForCheckout = ({ selectedProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();

  const handleShowed = () => {
    selectedProduct.length = 0;
    setIsOpen(isOpen);
    navigate("/");
  };

  return (
    <Box id="emptyCheckoutPage">
      <PopupForm
        animation={false}
        className="popupform"
        content={
          <>
            <Box id="popupForCheckout" className="MainScreen">
              <Box className={classes.box}>
                <Typography variant="h5" component="h5">
                  checkout has no products
                </Typography>
                <Button
                  onClick={handleShowed}
                  variant="contained"
                  className={classes.button}
                  size="large"
                >
                  GO TO HOME
                </Button>
              </Box>
            </Box>
          </>
        }
      />
    </Box>
  );
};
