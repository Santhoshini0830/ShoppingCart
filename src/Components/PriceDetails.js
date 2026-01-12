import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withLastLocation } from "react-router-dom-last-location";
import { Typography, Grid, Box, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import { NumberFormat } from "./NumberFormat";
import { removeFromCartOnOrder } from "../redux/actions/ProductActions";
import { AddressForm } from "./AddressForm";
import { useCartContext } from "./CartContext";

const useStyles = makeStyles(() => ({
  typography: {
    "&.MuiTypography-root": {
      fontWeight: "bold",
    },
  },
  fields: {
    fontSize: "20px",
  },
  box: {
    textAlign: "center",
  },
  button: {
    "&.MuiButton-root": {
      width: "50%",
      padding: "10px",
      backgroundColor: "black",
    },
  },
  flexBox: {
    display: "flex",
    flexDirection: "column",
  },
  addressFormBox: {
    display: "flex",
    flexDirection: "column",
    color: "rgb(240, 240, 240)",
  },
  typographyBox: {
    "&.MuiTypography-root": {
      marginTop: "-2em",
      color: "white",
    },
  },
  checkoutButton: {
    color: "white",
  },
}));

export const PriceDetails = withLastLocation(
  ({ lastLocation, subOrderTotal, discount, total }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { clearCartAndLocalStorage } = useCartContext();
    const [open, setOpen] = useState(false);

    const previousPath = JSON.stringify(lastLocation);

    const onclickHandle = () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const loginUserEmail = localStorage.getItem("userEmail");
      userData.map((item) => {
        if (item.email === loginUserEmail) {
          if (item.address.length === 0) {
            setOpen(true);
          } else {
            if (previousPath.includes("/cart")) {
              clearCartAndLocalStorage();
              navigate("/thankYou");
            } else {
              navigate("/thankYou");
            }
          }
        }
      });
    };

    return (
      <Box>
        <Typography variant="h5" className={classes.typography}>
          Price Details
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="p" className={classes.fields}>
              Subtotal
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="p" align="right" className={classes.fields}>
              {NumberFormat(subOrderTotal)}
            </Typography>
          </Grid>
          {discount > 0 && (
            <React.Fragment>
              <Grid item xs={6}>
                <Typography variant="p" className={classes.fields}>
                  Discount
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="p"
                  align="right"
                  className={classes.fields}
                >
                  - {NumberFormat(discount)}
                </Typography>
              </Grid>
            </React.Fragment>
          )}
          <Grid item xs={6}>
            <Typography variant="p" className={classes.fields}>
              Shipping
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="p" align="right" className={classes.fields}>
              {NumberFormat(33)} (Standard Charge)
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="p" className={classes.fields}>
              Estimated Tax
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="p" align="right" className={classes.fields}>
              {NumberFormat(20)}
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={6}>
            <Typography
              variant="p"
              fontWeight="bold"
              className={classes.fields}
            >
              TOTAL PRICE
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="p" align="right" className={classes.fields}>
              {NumberFormat(total)}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={4} className={classes.box}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={onclickHandle}
          >
            {open === true ? (
              <Box>
                <Box className={classes.flexBox}>
                  <Box className={classes.addressFormBox}>
                    <AddressForm />
                  </Box>
                  <Typography variant="h6" className={classes.typographyBox}>
                    Checkout
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Typography variant="h6" className={classes.checkoutButton}>
                Checkout
              </Typography>
            )}
          </Button>
        </Box>
      </Box>
    );
  }
);
