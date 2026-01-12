import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Box } from "@mui/material";
import { ProductTemplate } from "./ProductTemplate";
import { useCartContext } from "./CartContext";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";

const useStyles = makeStyles(() => ({
  box: {
    "&.MuiBox-root": {
      minHeight: "auto",
      paddingTop: "30px",
      paddingBottom: "5em",
    },
  },
  emptyProductBox: {
    "&.MuiBox-root": {
      paddingTop: "245px",
      paddingBottom: "180px",
      textAlign: "center",
    },
  },
}));

export const Categories = (
  {
    // list,
    // cart,
    // selectedProduct,
    // categories,
    // filterItem,
  }
) => {
  const classes = useStyles();
  const { category } = useParams();
  const queryClient = useQueryClient();
  const products = queryClient.getQueryData("products");

  const filteredProducts = products.filter((item) =>
    item.category.toLowerCase().includes(category.toLowerCase())
  );
  // console.log(filteredProducts);
  // console.log(products);
  const {
    selectedProduct,
    // categories,
    filterItem,
  } = useCartContext();

  return (
    <Box className={classes.box}>
      {selectedProduct.length > 0 ? (
        <ProductTemplate
          // list={list}
          // cart={cart}
          selectedProduct={selectedProduct}
        />
      ) : (
        <Box>
          {filterItem === null ? (
            <Box>
              <Box className={classes.emptyProductBox}>
                <Typography variant="h4" component="h4">
                  Product not found
                </Typography>
              </Box>
            </Box>
          ) : (
            <ProductTemplate selectedProduct={filteredProducts} />
          )}
        </Box>
      )}
    </Box>
  );
};
