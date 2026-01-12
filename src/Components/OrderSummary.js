import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  List,
  ListItem,
  CardMedia,
  IconButton,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { removeOrderP, updateOrder } from "../redux/actions/ProductActions";
import { AddressForm } from "./AddressForm";
import { PopupForCheckout } from "./PopupForCheckout";
import { NumberFormat } from "./NumberFormat";
import { PriceDetails } from "./PriceDetails";
import { useCartContext } from "./CartContext";

export const OrderSummary = ({ selectedProduct }) => {
  const [state, setState] = useState({
    error: "",
    discountPercent: 0,
    promoCode: "",
    subOrderTotal: 0,
    discountApplied: false,
  });

  const dispatch = useDispatch();
  const { cart, order, removeFromBuyNow, updateOrder } = useCartContext();

  const PROMOTIONS = [
    { code: "SUMMER", discount: 50 },
    { code: "150OFFNOW", discount: 150 },
    { code: "WINTER", discount: 30 },
  ];

  const orderItemsLength = order.length;

  const deleteProductFromCheckout = (items) => {
    removeFromBuyNow(items);
  };

  // const increaseQuantity = (product) => {
  //   product.quantity += 1;

  //   const updatedProduct = { quantity: product.quantity + 1 };
  //   updateOrder(updatedProduct);
  //   setState((prevState) => ({
  //     ...prevState,
  //     subOrderTotal: prevState.subOrderTotal + product.price,
  //   }));
  // };

  // const decreaseQuantity = (product) => {
  //   if (product.quantity > 1) {
  //     product.quantity -= 1;
  //     const updatedProduct = { quantity: product.quantity - 1 };
  //     updateOrder(updatedProduct);
  //     setState((prevState) => ({
  //       ...prevState,
  //       subOrderTotal: prevState.subOrderTotal - product.price,
  //     }));
  //   }
  // };
  // const increaseQuantity = (product) => {
  //   product.quantity += 1;
  //   const updatedProduct = { quantity: product.quantity };
  //   updateOrder(updatedProduct);
  //   setState((prevState) => ({
  //     ...prevState,
  //     subOrderTotal: prevState.subOrderTotal + product.price,
  //   }));
  // };

  // const decreaseQuantity = (product) => {
  //   if (product.quantity > 1) {
  //     product.quantity -= 1;
  //     const updatedProduct = { quantity: product.quantity };
  //     updateOrder(updatedProduct);
  //     setState((prevState) => ({
  //       ...prevState,
  //       subOrderTotal: prevState.subOrderTotal - product.price,
  //     }));
  //   }
  // };

  const increaseQuantity = (product) => {
    const updatedProduct = { ...product, quantity: product.quantity + 1 };
    updateOrder(updatedProduct);
    setState((prevState) => ({
      ...prevState,
      subOrderTotal: prevState.subOrderTotal + product.price,
    }));
  };

  const decreaseQuantity = (product) => {
    if (product.quantity > 1) {
      const updatedProduct = { ...product, quantity: product.quantity - 1 };
      updateOrder(updatedProduct);
      setState((prevState) => ({
        ...prevState,
        subOrderTotal: prevState.subOrderTotal - product.price,
      }));
    }
  };

  // const increaseQuantity = (product) => {
  //   product.quantity += 1;
  //   // updateOrder(product);
  //   setState((prevState) => ({
  //     ...prevState,
  //     subOrderTotal: prevState.subOrderTotal + product.price,
  //   }));
  // };

  // const decreaseQuantity = (product) => {
  //   if (product.quantity > 1) {
  //     product.quantity -= 1;
  //     // updateOrder(product);
  //     setState((prevState) => ({
  //       ...prevState,
  //       subOrderTotal: prevState.subOrderTotal - product.price,
  //     }));
  //   }
  // };

  const subTotal = () => {
    let subOrderTotal = 0;
    for (let i = 0; i < order.length; i++) {
      subOrderTotal += order[i].price * order[i].quantity;
    }
    setState((prevState) => ({
      ...prevState,
      subOrderTotal: subOrderTotal,
    }));
  };

  const onEnterPromoCode = (event) => {
    const promoCode = event.target.value;
    setState((prevState) => ({
      ...prevState,
      promoCode: promoCode,
      discountApplied: false,
    }));
  };

  const checkPromoCode = () => {
    const { promoCode } = state;
    for (let i = 0; i < PROMOTIONS.length; i++) {
      if (promoCode === PROMOTIONS[i].code) {
        setState((prevState) => ({
          ...prevState,
          discountPercent: parseFloat(PROMOTIONS[i].discount),
          discountApplied: true,
          error: "",
        }));
        return;
      }
    }
    setState((prevState) => ({
      ...prevState,
      discountApplied: false,
      error: "Enter the valid Coupon Code",
    }));
  };

  const removePromoCode = () => {
    setState((prevState) => ({
      ...prevState,
      discountApplied: false,
      discountPercent: 0,
    }));
  };

  const { error, discountPercent, promoCode, subOrderTotal, discountApplied } =
    state;

  useEffect(() => {
    subTotal();
  }, [orderItemsLength]);

  const discount = discountPercent;
  const total = subOrderTotal - discountPercent + 53;

  useEffect(() => {
    return () => {
      if (!total) return 0;
      if (!subOrderTotal) return 0;
    };
  }, []);

  return (
    <Box className="order-card" sx={{ mb: "9em" }}>
      {order.length <= 0 ? (
        <Box>
          <PopupForCheckout selectedProduct={selectedProduct} />
        </Box>
      ) : (
        <Box className="row">
          <Box className="col-md-8" id="orderItems">
            <AddressForm />
            {order.map((orderProduct) => (
              <Box className="card lol">
                <Box id="alignItems" key={orderProduct.id}>
                  <Box>
                    <CardMedia
                      component="img"
                      image={orderProduct.image}
                      alt={orderProduct.title}
                      sx={{
                        height: 100,
                        width: 150,
                        ml: 0.5,
                        mt: 1,
                        objectFit: "contain",
                        bgcolor: "transparent",
                        borderRadius: 0,
                        elevation: 0,
                        border: "none",
                        boxShadow: "none",
                      }}
                    />

                    <Box>
                      <Box sx={{ mb: 1 }}>
                        <Typography component="b" sx={{ ml: 6 }}>
                          Quantity:
                        </Typography>
                      </Box>
                      <Grid container spacing={0}>
                        <Grid item xs={6} sx={{ ml: 4.6 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              background: "black",
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => decreaseQuantity(orderProduct)}
                              disabled={orderProduct.quantity <= 1}
                            >
                              <RemoveIcon sx={{ color: "white" }} />
                            </IconButton>
                            <Typography variant="body1" sx={{ color: "white" }}>
                              {orderProduct.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => increaseQuantity(orderProduct)}
                            >
                              <AddIcon sx={{ color: "white" }} />
                            </IconButton>
                          </Box>
                        </Grid>
                        <Grid item xs={1} sx={{ mt: -2 }}>
                          <Box>
                            <IconButton
                              className="delete"
                              id="deleteFromCheckOutBtn"
                              onClick={() =>
                                deleteProductFromCheckout(orderProduct)
                              }
                            >
                              <DeleteIcon
                                sx={{ fontSize: 35, color: "black" }}
                              />
                            </IconButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: { sm: 200, lg: 370 },

                      maxWidth: "100%",
                      pl: { xs: 2, sm: 2, md: 4 },
                      textAlign: {
                        xs: "center",
                      },
                    }}
                  >
                    <Typography variant="h6">{orderProduct.title}</Typography>
                    <Typography variant="body1">
                      {orderProduct.category}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: { sm: 200, lg: 230 },
                      maxWidth: "100%",
                      display: "inline-flex",
                      textAlign: { xs: "center" },
                      pl: { xs: 3, sm: 2, lg: 3 },
                    }}
                  >
                    <Typography variant="p">
                      {orderProduct.specification}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      ml: { xs: 0, sm: 5, lg: 3 },
                      pr: { xs: 0, sm: 2, lg: 2 },
                      textAlign: { xs: "center" },
                    }}
                  >
                    <Typography variant="h5">
                      {NumberFormat(orderProduct.price)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box className="col-md-4 summary">
            <Box>
              <PriceDetails
                subOrderTotal={subOrderTotal}
                discount={discount}
                total={total}
                order={order}
                cart={cart}
              />
            </Box>
            <Grid container spacing={2} sx={{ pt: 7 }}>
              <Grid item xs={8} sm={10} lg={12}>
                <Typography variant="h5" component="Box">
                  <b>Apply Coupon</b>
                </Typography>
                <hr />
              </Grid>
              <Grid
                item
                xs={10}
                sm={10}
                sx={{ mt: { xs: 0, sm: 0, lg: -2.8 } }}
              >
                {discountApplied ? (
                  <Typography variant="subtitle1" component="Box">
                    <b>{promoCode}</b> Coupon Applied
                    <Button
                      onClick={removePromoCode}
                      variant="text"
                      sx={{ ml: 1 }}
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </Button>
                  </Typography>
                ) : (
                  <Grid container spacing={0}>
                    <Grid item xs={5} sm={5} lg={8}>
                      <TextField
                        variant="outlined"
                        sx={{ height: "10%" }}
                        label="Enter Coupon Code"
                        id="enterCouponCode"
                        onChange={onEnterPromoCode}
                        error={!!error}
                        helperText={error}
                      />
                    </Grid>
                    <Grid item xs={2} sm={4} lg={4}>
                      <Button
                        onClick={checkPromoCode}
                        variant="contained"
                        sx={{
                          backgroundColor: "black",
                          "&:hover": {
                            backgroundColor: "#424242",
                          },
                          height: 60,
                        }}
                      >
                        Apply
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12} sx={{ pb: 5 }}>
                <Typography variant="subtitle1" component="Box">
                  <b>Applicable Coupons</b>
                </Typography>
                <List
                  sx={{
                    listStyleType: "disc",
                    pl: 2,
                    "& .MuiListItem-root": {
                      display: "list-item",
                    },
                  }}
                >
                  <ListItem>
                    Get flat 150 OFF on your first purchase with code
                    <Typography variant="strong"></Typography>
                    150OFFNOW
                  </ListItem>
                  <ListItem>
                    Use HDFC card for payment and get an extra 10% OFF.
                  </ListItem>
                  <ListItem sx={{ listStyle: "disc" }}>
                    Check the other crazy deals from the landing page.
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
};
