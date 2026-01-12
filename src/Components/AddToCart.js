import React from "react";
// import { CartContext } from "./CartContext";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useCartContext } from "./CartContext";
import { cartProduct, snackBar } from "../redux/actions/ProductActions";

const useStyles = makeStyles(() => ({
  button: {
    "&.MuiButton-root": {
      width: "100%",
      backgroundColor: "black",
      "&:hover": {
        backgroundColor: "#424242",
      },
    },
  },
  typography: {
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
}));

export const AddToCart = ({ product, title, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const { addToCart, cart, handleSnackbar, addToCartonNotLogin } =
    useCartContext();

  const handleCart = () => {
    addToCart(product);
    handleSnackbar(true, title + " added to cart", "success");
  };

  // const handleCart = () => {
  //   const loginUserEmail = localStorage.getItem("userEmail");

  //   if (loginUserEmail) {
  //     addToCart(product);
  //     handleSnackbar(true, title + " added to cart", "success");
  //   } else {
  //     addToCartonNotLogin(product);
  //     handleSnackbar(true, title + " added to cart", "success");
  //   }
  // };

  const isIdInCart = cart && cart.some((product) => product.id === id);
  // const isInCart = () => {
  //   return cart.some(item => item.id === product.id);
  // };

  // const goToCart = () => {
  //   navigate("/cart");
  // };
  const goToCart = () => {
    navigate("/cart")
  }

  return (
    // <Box>
    //   <Button
    //     variant="contained"
    //     size="large"
    //     className={classes.button}
    //     onClick={handleCart}
    //   >
    //     <Typography variant="p" component="p" className={classes.typography}>
    //       ADD TO CART
    //     </Typography>
    //   </Button>
    // </Box>
    <Box
    // className={classes.root}
    >
      <Button
        variant="contained"
        size="large"
        className={classes.button}
        onClick={isIdInCart ? goToCart : () => handleCart(id)}
      >
        <Typography variant="p" component="p" className={classes.typography}>
          {isIdInCart ? "GO TO CART" : "ADD TO CART"}
        </Typography>
      </Button>
    </Box>
  );
};
