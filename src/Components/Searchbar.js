import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  IconButton,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Search } from "@mui/icons-material";
import // searchCategory,
// clearSearch,
// searchDatalist,
// wishlistSearch,
// cartSearch,
"../redux/actions/ProductActions";
import { useCartContext } from "./CartContext";

const useStyles = makeStyles(() => ({
  grid: {
    display: "inline-flex",
  },
  textField: {
    maxWidth: "100%",
  },
  icon: {
    color: "grey",
  },
  button: {
    "&.MuiButton-root": {
      width: 5,
      height: 38.5,
      backgroundColor: "whiteSmoke",
      "&:hover": {
        backgroundColor: "lightblue",
      },
    },
  },
  searchResults: {
    display: "flex",
    backgroundColor: "lightBlue",
    border: "1.5px solid black",
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    maxHeight: 500,
    cursor: "pointer",
    flexDirection: "column",
    position: "relative",
    width: "58%",
    padding: "5px 8px",
    borderTop: "0.3px solid gray",
    top: "-2px",
    right: 0,
    zIndex: 99,
  },
}));

export const Searchbar = () => {
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    searchCategory,
    clearSearch,
    searchDatalist,
    wishlistSearch,
    cartSearch,
    dataList,
    // rafi,
  } = useCartContext();
  console.log(dataList);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const classes = useStyles();

  const { pathname } = location;
  const path = pathname.split("/");

  const onSearchMatch = (result) => {
    if (path.includes("productDetails") || path.includes("checkOut")) {
      navigate("/");
    }
    clearSearch(result);
    setSearchText(result);
    searchDatalist("");
    setShowDropdown(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value.trim();

    if (value === "") {
      if (searchText !== "") {
        searchDatalist("");
        clearSearch("");
        setSearchText("");
        setShowDropdown(false);
      }
    } else {
      setSearchText(value);

      if (path.includes("categories")) {
        const categoryValue = path[2];
        searchCategory(value, categoryValue);
      } else if (path.includes("wishlist")) {
        wishlistSearch(value);
      } else if (path.includes("cart")) {
        cartSearch(value);
      } else {
        searchDatalist(value);
      }

      setShowDropdown(true);
    }
  };

  const handleDocumentClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    setSearchText("");
    setShowDropdown(false);
  }, [location.pathname]);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Grid className={classes.grid}>
          <TextField
            className={classes.textField}
            label="Search"
            autoComplete="off"
            value={searchText}
            onChange={handleSearch}
            variant="outlined"
            size="small"
          />
          <Button
            variant="contained"
            className={classes.button}
            size="small"
            onClick={() => {
              onSearchMatch(searchText);
            }}
          >
            <IconButton type="submit" aria-label="search">
              <Search className={classes.icon} />
            </IconButton>
          </Button>
        </Grid>
      </form>

      {showDropdown &&
        Array.isArray(dataList) &&
        dataList.map((item, index) => (
          <Box
            ref={dropdownRef}
            key={index}
            className={classes.searchResults}
            onClick={() => onSearchMatch(item.title)}
          >
            <Typography variant="strong" component="strong">
              {item.title}
            </Typography>
          </Box>
        ))}
    </Box>
  );
};
