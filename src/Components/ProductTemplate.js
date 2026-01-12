import React from "react";
import {
  Box,
  CardActionArea,
  Typography,
  Stack,
  CardContent,
  Card,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Ratings } from "./Ratings";
import { AddToCart } from "./AddToCart";
import { Cards } from "./Cards";
import { AddToList } from "./AddToList";
import { PlaceOrder } from "./PlaceOrder";
import { NumberFormat } from "./NumberFormat";
import WishlistCart from "./WishlistCart";

const useStyles = makeStyles(() => ({
  grid: {
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
  card: {
    "&.MuiCard-root": {
      height: "100%",
      border: "1px solid grey",
    },
  },
  stack: {
    "&.MuiStack-root": {
      justifyContent: "flex-end",
      padding: "8px",
    },
  },
  cardActionArea: {
    "&.MuiCardActionArea-root": {
      width: "100%",
    },
  },
  cardContent: {
    "&.MuiCardContent-root": {
      flexGrow: 1,
    },
  },
  box: {
    "&.MuiBox-root": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  titleBox: {
    "&.MuiBox-root": {
      padding: 1,
      textAlign: "center",
    },
  },
  titleTypography: {
    "&.MuiTypography-root": {
      "@media(min-width:0px) and (max-width:600px)": {
        height: 60,
      },
      "@media(min-width:600px) and (max-width:900px)": {
        height: 60,
      },
      "@media(min-width:900px) and (max-width:1200px)": {
        height: 70,
      },
      "@media(min-width:1200px) and (max-width:2000px)": {
        height: 70,
      },
    },
  },
  ratingTypography: {
    "&.MuiTypography-root": {
      marginTop: 1,
    },
  },
  cartBox: {
    "&.MuiBox-root": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "-1.5em",
    },
  },
}));

export const ProductTemplate = ({ selectedProduct }) => {
  const classes = useStyles();

  return (
    <Box>
      <Grid container spacing={2}>
        {selectedProduct &&selectedProduct.map((product) => (
          <Grid
            item
            xs={10}
            sm={5.6}
            md={3.8}
            lg={2.89}
            key={product.id}
            className={classes.grid}
          >
            <Card variant="outlined" className={classes.card}>
              <Stack
                sx={{
                  justifyContent: "flex-end",
                  padding: 1,
                }}
                spacing={0}
                direction="row"
              >
                <AddToList
                  product={product}
                  title={product.title}
                  id={product.id}
                />
              </Stack>
              <CardActionArea className={classes.cardActionArea}>
                <CardContent className={classes.cardContent}>
                  <Box className={classes.box}>
                    <Cards
                      id={product.id}
                      title={product.title}
                      image={product.image}
                    />
                  </Box>
                  <Box className={classes.titleBox}>
                    <Typography
                      variant="h5"
                      className={classes.titleTypography}
                    >
                      {product.title}
                    </Typography>
                    <Typography variant="h5">
                      {NumberFormat(product.price)}
                    </Typography>
                    <Typography
                      variant="body1"
                      className={classes.ratingTypography}
                    >
                      <Ratings rating={product.stars} />
                    </Typography>
                  </Box>
                  <Box className={classes.cartBox}>
                    <Stack spacing={1} direction="row">
                      {/* <WishlistCart
                        id={product.id}
                        title={product.title}
                        cart={cart}
                      /> */}
                      <AddToCart
                        product={product}
                        title={product.title}
                        id={product.id}
                        // cart={cart}
                      />
                      {/* <WishlistCart
                        product={product}
                        // id={product.id}
                        title={product.title}
                        //   cart={cart}
                      /> */}
                      <PlaceOrder product={product} />
                    </Stack>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
