import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Typography, Box, Grid } from "@mui/material";
import { StoreMallDirectory as ShopIcon } from "@mui/icons-material";
import { LogoutUser } from "./LogoutUser";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Dropdowns } from "./Dropdowns";
import { clearSearch } from "../redux/actions/ProductActions";
import { Searchbar } from "./Searchbar";
import { useCartContext } from "./CartContext";

const useStyles = makeStyles(() => ({
  grid: {
    "&.MuiGrid-root": {
      height: "80px",
      backgroundColor: "#f0f0f0",
      width: "100%",
      position: "relative",
      padding: "0.5rem 0rem",
      bgcolor: "#fff",
      color: "black",
      boxShadow: "0 2px 2px 2px rgba(9, 9, 9, 0.23)",
      "@media(min-width:0px) and (max-width:600px)": {
        paddingLeft: "2%",
      },
      "@media(min-width:600px) and (max-width:900px)": {
        paddingLeft: "2%",
      },
      "@media(min-width:900px) and (max-width:1200px)": {
        paddingLeft: "2%",
      },
      "@media(min-width:1200px) and (max-width:2000px)": {
        paddingLeft: "1%",
      },
    },
  },
  gridItem: {
    "&.MuiGrid-root": {
      marginTop: "1.2em",
    },
  },
  logoBox: {
    "@media(min-width:0px) and (max-width:600px)": {
      display: "inline-block",
    },
    "@media(min-width:600px) and (max-width:900px)": {
      display: "inline-block",
    },
    "@media(min-width:900px) and (max-width:1200px)": {
      display: "none",
    },
    "@media(min-width:1200px) and (max-width:2000px)": {
      display: "none",
    },
  },

  shopIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "40px",
      color: "black",
    },
  },
  textBox: {
    "@media(min-width:0px) and (max-width:600px)": {
      display: "none",
    },
    "@media(min-width:600px) and (max-width:900px)": {
      display: "none",
    },
    "@media(min-width:900px) and (max-width:1200px)": {
      display: "inline-block",
    },
    "@media(min-width:1200px) and (max-width:2000px)": {
      display: "inline-block",
    },
  },
  textTypography: {
    cursor: "pointer",
  },
  dropdownGrid: {
    "&.MuiGrid-root": {
      marginTop: "1.2em",
      "@media(min-width:0px) and (max-width:600px)": {
        marginLeft: "0%",
      },
      "@media(min-width:600px) and (max-width:900px)": {
        marginLeft: "0%",
      },
      "@media(min-width:900px) and (max-width:1200px)": {
        marginLeft: "7%",
      },
      "@media(min-width:1200px) and (max-width:2000px)": {
        marginLeft: "7%",
      },
    },
  },
  searchbarGrid: {
    "&.MuiGrid-root": {
      marginTop: "1.2em",
      "@media(min-width:0px) and (max-width:600px)": {
        marginLeft: "14%",
      },
      "@media(min-width:600px) and (max-width:900px)": {
        marginLeft: "5%",
      },
      "@media(min-width:900px) and (max-width:1200px)": {
        marginLeft: "-5%",
      },
      "@media(min-width:1200px) and (max-width:2000px)": {
        marginLeft: "-5%",
      },
    },
  },
  logoutGrid: {
    "&.MuiGrid-root": {
      marginTop: "1.2em",
      "@media(min-width:0px) and (max-width:600px)": {
        marginLeft: "4.2%",
      },
      "@media(min-width:600px) and (max-width:900px)": {
        marginLeft: "20%",
      },
      "@media(min-width:900px) and (max-width:1200px)": {
        marginLeft: "3%",
      },
      "@media(min-width:1200px) and (max-width:2000px)": {
        marginLeft: "7%",
      },
    },
  },
  wishlistGrid: {
    "&.MuiGrid-root": {
      marginTop: "0.6em",
      "@media(min-width:0px) and (max-width:600px)": {
        display: "none",
        marginLeft: "0",
      },
      "@media(min-width:600px) and (max-width:900px)": {
        display: "none",
        marginLeft: "0",
      },
      "@media(min-width:900px) and (max-width:1200px)": {
        display: "block",
        marginLeft: "12%",
      },
      "@media(min-width:1200px) and (max-width:2000px)": {
        display: "block",
        marginLeft: "10%",
      },
    },
  },
  wishlistTypography: {
    "&.MuiTypography-root": {
      marginLeft: "10px",
    },
  },
  wishlistBox: {
    "&.MuiBox-root": {
      marginTop: "-8px",
    },
  },
  icon: {
    "&.MuiSvgIcon-root": {
      fontSize: "30px",
      color: "black",
    },
  },
  cartGrid: {
    "&.MuiGrid-root": {
      marginTop: "0.6em",
      "@media(min-width:0px) and (max-width:600px)": {
        display: "none",
        marginLeft: "0",
      },
      "@media(min-width:600px) and (max-width:900px)": {
        display: "none",
        marginLeft: "0",
      },
      "@media(min-width:900px) and (max-width:1200px)": {
        display: "block",
        marginLeft: "1%",
      },
      "@media(min-width:1200px) and (max-width:2000px)": {
        display: "block",
        marginLeft: "1%",
      },
    },
  },
  cartTypography: {
    "&.MuiTypography-root": {
      marginLeft: "0.8em",
    },
  },
  cartBox: {
    "&.MuiBox-root": {
      marginTop: "-8px",
    },
  },
}));

export const Header = ({ dataList }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { cart, wishlist, clearSearch, fetchData } = useCartContext();

  const clearResult = () => {
    clearSearch("");
  };

  useEffect(() => {
    // fetchData();
  }, [wishlist.length, cart.length]);

  return (
    <Grid container className={classes.grid}>
      <Grid item xs={1.5} sm={2} md={1} className={classes.gridItem}>
        <NavLink to="/" onClick={clearResult}>
          <Box className={classes.logoBox}>
            <ShopIcon className={classes.shopIcon} />
          </Box>
          <Box className={classes.textBox}>
            <Typography
              variant="h5"
              component="h3"
              className={classes.textTypography}
              onClick={clearResult}
            >
              SHOPPING
            </Typography>
          </Box>
        </NavLink>
      </Grid>

      <Grid item xs={1} sm={2} md={3.5} className={classes.dropdownGrid}>
        <Dropdowns />
      </Grid>
      <Grid item xs={5} sm={3} md={3} className={classes.searchbarGrid}>
        <Searchbar dataList={dataList} />
      </Grid>

      <Grid item xs={2} sm={2} md={1} className={classes.logoutGrid}>
        <LogoutUser list={wishlist} cart={cart} />
      </Grid>
      <Grid item xs={2} sm={2} md={0.5} className={classes.wishlistGrid}>
        <Typography
          variant="b"
          component="b"
          className={classes.wishlistTypography}
        >
          {wishlist.length > 0 ? wishlist.length : false}
        </Typography>
        <NavLink to="/wishlist">
          <Box onClick={clearResult} className={classes.wishlistBox}>
            <Favorite className={classes.icon} />
          </Box>
        </NavLink>
      </Grid>
      <Grid item xs={2} sm={2} md={0.5} className={classes.cartGrid}>
        <Typography
          variant="b"
          component="b"
          className={classes.cartTypography}
        >
          {cart.length > 0 ? cart.length : false}
        </Typography>
        <NavLink to="/cart">
          <Box onClick={clearResult} className={classes.cartBox}>
            <ShoppingCart className={classes.icon} />
          </Box>
        </NavLink>
      </Grid>
    </Grid>
  );
};
