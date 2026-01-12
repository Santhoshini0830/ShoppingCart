import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Drawer,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  box: {
    width: "250px",
  },
  icon: {
    "&.MuiSvgIcon-root": {
      color: "white",
    },
  },
  menuBox: {
    "@media(min-width:0px) and (max-width:600px)": {
      display: "block",
    },
    "@media(min-width:600px) and (max-width:900px)": {
      display: "block",
    },
    "@media(min-width:900px) and (max-width:1200px)": {
      display: "none",
    },
    "@media(min-width:1200px) and (max-width:2000px)": {
      display: "none",
    },
  },
}));

export const Hamburger = () => {
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles();

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  const sideBarContent = (
    <Box className={classes.box}>
      <List>
        <ListItemButton component={NavLink} to={`/`} onClick={closeSideBar}>
          <ListItemIcon>
            <HomeIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          component={NavLink}
          to={`/wishlist`}
          onClick={closeSideBar}
        >
          <ListItemIcon>
            <FavoriteIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="WishList" />
        </ListItemButton>
        <ListItemButton component={NavLink} to={`/cart`} onClick={closeSideBar}>
          <ListItemIcon>
            <ShoppingCartIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Cart" />
        </ListItemButton>
        <ListItemButton
          component={NavLink}
          to={`/checkOut`}
          onClick={closeSideBar}
        >
          <ListItemIcon>
            <InfoIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Check Out" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box
      // sx={{
      //   display: {
      //     xs: "block",
      //     sm: "block",
      //     md: "none",
      //     lg: "none",
      //     xl: "none",
      //   },
      // }}
      className={classes.menuBox}
    >
      <Menu isOpen={isOpen} onOpen={handleIsOpen} onClose={handleIsOpen}>
        {sideBarContent}
      </Menu>
    </Box>
  );
};
