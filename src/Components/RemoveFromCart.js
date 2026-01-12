import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import {
  removeProductFromCart,
  snackBar,
} from "../redux/actions/ProductActions";
import { useCartContext } from "./CartContext";

const useStyles = makeStyles(() => ({
  icon: {
    "&.MuiSvgIcon-root": {
      fontSize: "40px",
      color: "black",
      marginTop: "-0.3em",
    },
  },
}));

export const RemoveFromCart = ({ product }) => {
  // const dispatch = useDispatch();
  const classes = useStyles();
  const { cart, removeFromCart } = useCartContext();

  // const deleteProduct = (id) => {
  //   dispatch(removeProductFromCart(id));
  //   dispatch(snackBar(true, "error", title + " removed from cart"));
  // };

  return (
    <Box>
      <IconButton onClick={() => removeFromCart(product)}>
        <DeleteIcon className={classes.icon} />
      </IconButton>
    </Box>
  );
};
