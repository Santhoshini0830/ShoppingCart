import React from "react";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { makeStyles } from "@mui/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { snackBar } from "../redux/actions/ProductActions";
import { useCartContext } from "./CartContext";

const useStyles = makeStyles(() => ({
  icon: {
    color: "black",
  },
}));

export const AddToList = ({ product, title, id }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { wishlist, addToWishlist, removeFromWishlist, handleSnackbar } =
    useCartContext();

  // const isIdInList = wishlist.some(
  //   (wishlistProductId) => wishlistProductId === product
  // );

  const isIdInList = wishlist.some((product) => product.id === id);

  const handleClick = () => {
    const loginUserEmail = localStorage.getItem("userEmail");
    if (loginUserEmail) {
      if (isIdInList) {
        removeFromWishlist(product);
        handleSnackbar(true, title + " removed from Wishlist", "error");
      } else {
        addToWishlist(product);
        handleSnackbar(true, title + " added to wishlist", "success");
      }
    } else if (loginUserEmail === null) {
      handleSnackbar(true, "User is not logged in", "error");
    }
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     dispatch(snackBar(false, "", ""));
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, [isIdInList, dispatch]);

  // console.log(isIdInList);

  return (
    <IconButton onClick={handleClick}>
      {isIdInList ? (
        <FavoriteIcon className="icon-active" className={classes.icon} />
      ) : (
        <FavoriteBorderIcon className="icon-nonactive" />
      )}
    </IconButton>
  );
};
