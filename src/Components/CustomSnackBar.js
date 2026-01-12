import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import Snackbar from "@material-ui/core/Snackbar";
import { snackBar } from "../redux/actions/ProductActions";
import { useCartContext } from "./CartContext";

export const CustomSnackBar = () => {
  // const dispatch = useDispatch();

  // const { allProduct } = useSelector((state) => state);
  // const { snackbarOpen, snackbarMessage, snackbarType } = allProduct;

  const { snackbar, handleSnackbar } = useCartContext(); // Access snackbar and handleSnackbar from CartContext

  const { open, message, type } = snackbar;
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    handleSnackbar(false, message, type);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert elevation={6} variant="filled" onClose={handleClose} color={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};
