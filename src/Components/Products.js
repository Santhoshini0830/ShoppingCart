import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Typography, Box, CardMedia } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Sliders } from "./Sliders";
import { fetchProducts } from "../redux/actions/ProductActions";
import { ProductTemplate } from "./ProductTemplate";
import loader from "../images/loader.gif";

const useStyles = makeStyles(() => ({
  box: {
    paddingBottom: 2,
  },
  loadingBox: {
    "&.MuiBox-root": {
      marginTop: "30px",
      marginBottom: "250px",
    },
  },
  cardMedia: {
    "&.MuiCardMedia-root": {
      height: "20px",
      width: "5%",
      margin: "auto",
    },
  },
  emptyBox: {
    "&.MuiBox-root": {
      paddingTop: "20px",
      paddingBottom: "5em",
      textAlign: "center",
    },
  },
}));

export const Products = ({
  productList,
  list,
  cart,
  selectedProduct,
  filterItem,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  
  useEffect(() => {
    dispatch(fetchProducts());
    console.log(fetchProducts)
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);
  console.log(productList)

  return (
    <Box className={classes.box}>
      <Sliders />
      {loading ? (
        <Box className={classes.loadingBox}>
          <CardMedia
            component="img"
            image={loader}
            alt="loading..."
            className={classes.cardMedia}
          />
        </Box>
      ) : (
        <Box>
          {selectedProduct && selectedProduct.length > 0 ? (
            <ProductTemplate
              list={list}
              cart={cart}
              selectedProduct={selectedProduct}
            />
          ) : (
            <Box>
              {filterItem === null ? (
                <Box>
                  <Box className={classes.emptyBox}>
                    <Typography variant="h4" component="h4">
                      Produt not found
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <ProductTemplate
                  list={list}
                  cart={cart}
                  selectedProduct={productList}
                />
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
