import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Box, Menu, MenuItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { categoryProducts } from "../redux/actions/ProductActions";
import { useCartContext } from "./CartContext";

const useStyles = makeStyles(() => ({
  button: {
    "&.MuiButton-root": {
      background: "black",
      "&:hover": {
        backgroundColor: "#424242",
      },
      "@media(min-width:0px) and (max-width:600px)": {
        paddingRight: "25px",
        marginTop: "5px",
      },
      "@media(min-width:600px) and (max-width:900px)": {
        paddingRight: "25px",
        marginTop: "5px",
      },
      "@media(min-width:900px) and (max-width:1200px)": {
        paddingRight: "10px",
        marginTop: "0px",
      },
      "@media(min-width:1200px) and (max-width:2000px)": {
        paddingRight: "12px",
        marginTop: "0px",
      },
    },
  },
  typography: {
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
  menu: {
    width: 180,
  },
  menuItem: {
    "&.MuiMenuItem-root": {
      fontSize: "13px",
    },
  },
  menuItems: {
    "&.MuiMenuItem-root": {
      fontSize: "12.5px",
    },
  },
}));

export const Dropdowns = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const [eletronics, clothing, shoes, home_decoration] = [
    "eletronics",
    "clothing",
    "shoes",
    "home_decoration",
  ];

  const { getProductsByCategory } = useCartContext();

  const handleCategoryClick = (category) => {};

  const categoryHandler = () => {
    // getProductsByCategory(category);
    // dispatch(categoryProducts(category));
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        variant="contained"
        className={classes.button}
        endIcon={<ExpandMoreIcon />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Typography variant="p" component="p" className={classes.typography}>
          CATEGORIES
        </Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        className={classes.menu}
      >
        <MenuItem className={classes.menuItem} onClick={categoryHandler}>
          <NavLink to={`/categories/${eletronics}`}>ELECTRONICS</NavLink>
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={categoryHandler}>
          <NavLink to={`/categories/${clothing}`}>CLOTHING</NavLink>
        </MenuItem>
        <MenuItem onClick={categoryHandler} className={classes.menuItem}>
          <NavLink to={`/categories/${shoes}`}>SHOES</NavLink>
        </MenuItem>
        <MenuItem onClick={categoryHandler} className={classes.menuItems}>
          <NavLink to={`/categories/${home_decoration}`}>
            HOME DECORATION
          </NavLink>
        </MenuItem>
      </Menu>
    </Box>
  );
};
