import React, { useContext } from "react";
import { Typography, Grid, Button, Card, IconButton, Box } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import { Ratings } from "./Ratings";
import { Cards } from "./Cards";
import { NumberFormat } from "./NumberFormat";
import { RemoveFromCart } from "./RemoveFromCart";
// import { CartContext } from "./CartContext";

const useStyles = makeStyles(() => ({
  card: {
    "&.MuiCard-root": {
      height: "100%",
      border: "1px solid grey",
    },
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
  titleBox: {
    padding: 6,
    textAlign: "center",
  },
  titleTypography: {
    height: 75,
  },
  ratingTypography: {
    marginTop: 6,
  },
  contentBox: {
    textAlign: "center",
  },
  quantityBox: {
    display: "inline-block",
  },
  quantityTypography: {
    "&.MuiTypography-root": {
      paddingLeft: "8px",
      paddingRight: "10px",
    },
  },
  grid: {
    "&.MuiGrid-root": {
      marginLeft: "5px",
      display: "inline-block",
    },
  },
  deleteItemBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "black",

    paddingBottom: 6,
  },
  removeIcon: {
    "&.MuiSvgIcon-root": {
      color: "white",
      marginTop: "6px",
    },
  },
  removeIconTypography: {
    "&.MuiTypography-root": {
      color: "white",
      marginTop: "6px",
    },
  },
  removeFromCart: {
    display: "inline-block",
  },
  priceBox: {
    marginLeft: "2.2em",
  },
  totalTypography: {
    marginBottom: 10,
    display: "block",
  },
  button: {
    "&.MuiButton-root": {
      backgroundColor: "black",
      "&:hover": {
        backgroundColor: "#424242",
      },
      display: "block",
      marginTop: "0.5rem",
    },
  },
  gridBox: {
    "&.MuiGrid-root": {
      "@media(min-width:0px) and (max-width:600px)": {
        marginLeft: "8%",
      },
      "@media(min-width:600px) and (max-width:900px)": {
        marginLeft: "2.5%",
      },
      "@media(min-width:900px) and (max-width:1200px)": {
        marginLeft: "1.39%",
      },
      "@media(min-width:1200px) and (max-width:2000px)": {
        marginLeft: "0.8%",
      },
    },
  },
}));

export const CartTemplate = ({
  cart,
  increaseQuantity,
  decreaseQuantity,
  productList,
  cartTotal,
  handlePlaceOrder,
}) => {
  const classes = useStyles();
  // const { cartItems } = useContext(CartContext);

  return (
    <Box>
      <Grid container spacing={2}>
        {cart.map((cartProduct) => (
          <Grid
            item
            xs={10}
            sm={5.6}
            md={3.8}
            lg={2.89}
            key={cartProduct.id}
            className={classes.gridBox}
          >
            <Card variant="outlined" className={classes.card}>
              <Box className={classes.box}>
                <Cards
                  id={cartProduct.id}
                  title={cartProduct.title}
                  image={cartProduct.image}
                />
              </Box>
              <Box>
                <Box className={classes.titleBox}>
                  <Typography variant="h5" className={classes.titleTypography}>
                    {cartProduct.title}
                  </Typography>
                  <Typography variant="h5">
                    {NumberFormat(cartProduct.price)}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.ratingTypography}
                  >
                    <Ratings rating={cartProduct.stars} />
                  </Typography>
                </Box>
                <Box className={classes.contentBox}>
                  <Box className={classes.quantityBox}>
                    <Typography
                      variant="h6"
                      className={classes.quantityTypography}
                    >
                      Quantity:
                    </Typography>
                  </Box>
                  <Grid item xs={0} className={classes.grid}>
                    <Box className={classes.deleteItemBox}>
                      <IconButton
                        size="small"
                        onClick={() => decreaseQuantity(cartProduct)}
                        disabled={cartProduct.quantity <= 1}
                      >
                        <RemoveIcon className={classes.removeIcon} />
                      </IconButton>
                      <Typography
                        variant="body1"
                        className={classes.removeIconTypography}
                      >
                        {cartProduct.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => increaseQuantity(cartProduct)}
                      >
                        <AddIcon className={classes.removeIcon} />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Box className={classes.removeFromCart}>
                    <RemoveFromCart
                      product={cartProduct}
                      // id={cartProduct.id}
                      // title={cartProduct.title}
                    />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
        <Box className={classes.priceBox}>
          <Box key={productList.id}>
            <Typography
              variant="b"
              component="b"
              className={classes.totalTypography}
            >
              Total - {NumberFormat(cartTotal)}
            </Typography>
            <Button
              onClick={handlePlaceOrder}
              variant="contained"
              className={classes.button}
              size="large"
            >
              PLACE ORDER
            </Button>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
