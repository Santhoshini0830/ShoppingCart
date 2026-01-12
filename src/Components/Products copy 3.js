import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";

// import { useQuery } from "react-query";
import { Typography, Box, CardMedia } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Sliders } from "./Sliders";
// import { ProductContext } from "./ProductProvider";
import { useQuery } from "react-query";
import { useCartContext } from "./CartContext";
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

export const Products = ({ productList }) => {
  const classes = useStyles();
  const {
    selectedProduct,
    filterItem,
    // handleLogin,
    wishlist,
    // initializeWishlist,
    cart,
    // loginUser,
    fetchData,
    // rafi,
  } = useCartContext();

  const [loading, setLoading] = useState(true);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery("products", async () => {
    const response = await fetch("http://localhost:8081/api/products");
    const data = await response.json();
    return data;
  });

  useEffect(() => {
    // dispatch(fetchProducts());
    // initializeWishlist();
    // loginUser();
    // fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

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
          {selectedProduct.length > 0 ? (
            <ProductTemplate
              list={wishlist}
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
                  list={wishlist}
                  cart={cart}
                  selectedProduct={products}
                />
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
