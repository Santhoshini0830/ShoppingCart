import React from "react";
import { Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useCartContext } from "./CartContext";
import { ProductTemplate } from "./ProductTemplate";

const useStyles = makeStyles(() => ({
  box: {
    minHeight: "auto",
    paddingTop: "0.2em",
    marginBottom: "5.2em",
  },
  emptyBox: {
    paddingTop: "16em",
    paddingBottom: "16.5em",
    textAlign: "center",
  },
  wishlistBox: {
    marginTop: "2em",
  },
}));

export const Wishlist = () => {
  const classes = useStyles();
  const { cart, wishlist, filterItem, selectedProduct } = useCartContext();

  return (
    <Box className={classes.box}>
      <Box>
        {wishlist.length === 0 ? (
          <Box className={classes.emptyBox}>
            <Typography variant="h4" component="h4">
              Wishlist is empty
            </Typography>
          </Box>
        ) : (
          <Box>
            {selectedProduct.length > 0 ? (
              <Box className={classes.wishlistBox}>
                <ProductTemplate
                  list={wishlist}
                  cart={cart}
                  selectedProduct={selectedProduct}
                />
              </Box>
            ) : (
              <Box>
                {filterItem === null ? (
                  <Box className="wishlistSearch">
                    <Box className={classes.emptyBox}>
                      <Typography variant="h4" component="h4">
                        Product not found
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box className={classes.wishlistBox}>
                    <ProductTemplate
                      list={wishlist}
                      cart={cart}
                      selectedProduct={wishlist}
                    />
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
