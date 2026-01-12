// import React, { memo } from "react";
// // import { CartContext } from "./CartContext";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Button, Box, Typography } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import { useCartContext } from "./CartContext";
// import { cartProduct, snackBar } from "../redux/actions/ProductActions";

// const useStyles = makeStyles(() => ({
//   button: {
//     "&.MuiButton-root": {
//       width: "100%",
//       backgroundColor: "black",
//       "&:hover": {
//         backgroundColor: "#424242",
//       },
//     },
//   },
//   typography: {
//     "@media(min-width:0px) and (max-width:600px)": {
//       fontSize: "12px",
//     },
//     "@media(min-width:600px) and (max-width:900px)": {
//       fontSize: "13px",
//     },
//     "@media(min-width:900px) and (max-width:1200px)": {
//       fontSize: "13px",
//     },
//     "@media(min-width:1200px) and (max-width:2000px)": {
//       fontSize: "14px",
//     },
//   },
// }));

// const WishlistCart = ({ product, title }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const classes = useStyles();

//   const { addToCart } = useCartContext();

//   const handleCart = () => {
//     addToCart(product);
//     dispatch(snackBar(true, "success", title + " added to cart"));
//   };

//   const goToCart = () => {
//     navigate("/cart");
//   };

//   return (
//     <Box>
//       <Button
//         variant="contained"
//         size="large"
//         className={classes.button}
//         onClick={handleCart}
//       >
//         <Typography variant="p" component="p" className={classes.typography}>
//           ADD TO CART
//         </Typography>
//       </Button>
//     </Box>
//   );
// };

// export default memo(WishlistCart);
