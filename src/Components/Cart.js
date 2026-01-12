import React, { useEffect, useState, useContext } from "react";
// import React, { useContext } from 'react';
// import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  AddAllProductsToCheckOut,
  AddAllProductsToCheckOutOnSearch,
  // snackBar,
} from "../redux/actions/ProductActions";
import { CartTemplate } from "./CartTemplate";
// import { ProductContext } from "./ProductProvider";
import { useCartContext } from "./CartContext";

const useStyles = makeStyles(() => ({
  box: {
    minHeight: "auto",
    paddingTop: 35,
    marginBottom: "8.5em",
  },
  emptyBox: {
    paddingTop: "14em",
    paddingBottom: "13em",
    textAlign: "center",
  },
}));

export const Cart = ({
  // cart,
  productList,
  product,
  // selectedProduct,
  // filterItem,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    cart,
    removeFromCart,
    addToBuynowFromCart,
    handleSnackbar,
    selectedProduct,
    addToBuynowFromCartOnSearch,
    filterItem,
  } = useCartContext();

  const [cartData, setCartData] = useState({
    cartTotal: 0,
    searchCartTotal: 0,
  });

  // const increaseQuantity = (item) => {
  //   item.quantity += 1;
  //   setCartData((prevData) => ({
  //     ...prevData,
  //     cartTotal: prevData.cartTotal + item.price,
  //     searchCartTotal: prevData.searchCartTotal + item.price,
  //   }));
  // };

  // const decreaseQuantity = (item) => {
  //   return item.quantity > 1
  //     ? ((item.quantity -= 1),
  //       setCartData((prevData) => ({
  //         ...prevData,
  //         cartTotal: prevData.cartTotal - item.price,
  //         searchCartTotal: prevData.searchCartTotal - item.price,
  //       })))
  //     : null;
  // };

  const increaseQuantity = (item) => {
    item.quantity += 1;
    setCartData((prevData) => ({
      ...prevData,
      cartTotal: prevData.cartTotal + item.price,
      searchCartTotal: prevData.searchCartTotal + item.price,
    }));
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setCartData((prevData) => ({
        ...prevData,
        cartTotal: prevData.cartTotal - item.price,
        searchCartTotal: prevData.searchCartTotal - item.price,
      }));
    }
  };

  const total = () => {
    const cartTotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setCartData((prevData) => ({ ...prevData, cartTotal: cartTotal }));
  };

  const Searchtotal = () => {
    const searchCartTotal = selectedProduct.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setCartData((prevData) => ({
      ...prevData,
      searchCartTotal: searchCartTotal,
    }));
  };

  const handlePlaceOrder = () => {
    const loggedIn = localStorage.getItem("userEmail");
    return loggedIn
      ? selectedProduct.length > 0
        ? (addToBuynowFromCartOnSearch(), navigate("/checkOut"))
        : (addToBuynowFromCart(), navigate("/checkOut"))
      : handleSnackbar(true, "User is not logged in", "error");
  };
  // const { cartItems } = useContext(CartContext);
  // const products = useContext(ProductContext);

  // const handleRemoveFromCart = (productId) => {
  //   removeFromCart(productId);
  // };

  useEffect(() => {
    total();
    Searchtotal();
  }, [
    cart,
    selectedProduct,
    // , cartData
  ]);

  return (
    <Box className={classes.box}>
      <Box>
        {cart.length <= 0 ? (
          <Box className={classes.emptyBox}>
            <Typography variant="h4" component="h4">
              Cart is empty
            </Typography>
          </Box>
        ) : (
          <Box>
            {selectedProduct.length > 0 ? (
              <CartTemplate
                cart={selectedProduct}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                productList={cart}
                cartTotal={cartData.searchCartTotal}
                handlePlaceOrder={handlePlaceOrder}
              />
            ) : (
              <Box>
                {filterItem === null ? (
                  <Box className={classes.emptyBox}>
                    <Typography variant="h4" component="h4">
                      Product not found
                    </Typography>
                  </Box>
                ) : (
                  <CartTemplate
                    cart={cart}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    productList={cart}
                    cartTotal={cartData.cartTotal}
                    handlePlaceOrder={handlePlaceOrder}
                  />
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
