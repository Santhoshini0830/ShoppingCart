import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "reactjs-popup/dist/index.css";
import { Button, Typography } from "@mui/material";
import Box from "@material-ui/core/Box";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { makeStyles } from "@mui/styles";
import { PopupForm } from "./PopupForm";
import { Signup } from "./Signup";
import { Login } from "./Login";
import {
  clearSearch,
  removeFromCartOnLogout,
  removeFromListOnLogout,
} from "../redux/actions/ProductActions";
import { useCartContext } from "./CartContext";

const useStyles = makeStyles(() => ({
  logoutButton: {
    "&.MuiButton-root": {
      backgroundColor: "black",
      "&:hover": {
        backgroundColor: "#424242",
      },
    },
  },
  logoutText: {
    "&.MuiTypography-root": {
      color: "white",
      "@media(min-width:0px) and (max-width:600px)": {
        display: "none",
      },
      "@media(min-width:600px) and (max-width:900px)": {
        display: "none",
      },
      "@media(min-width:900px) and (max-width:1200px)": {
        display: "block",
      },
      "@media(min-width:1200px) and (max-width:2000px)": {
        display: "block",
      },
    },
  },
  icon: {
    color: "white",
  },
  loginButton: {
    "&.MuiButton-root": {
      width: "50%",
      height: 40,
      marginLeft: "25%",
      backgroundColor: "black",
      color: "white",
      borderTopLeftRadius: "5px",
      borderBottomLeftRadius: "5px",
      borderTopRightRadius: "5px",
      borderBottomRightRadius: "5px",
      "&:hover": {
        backgroundColor: "#424242",
      },
    },
  },
}));

export const LogoutUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    cart,
    wishlist,
    clearSearch,
    removeFromCartOnLogout,
    removeFromListOnLogout,
  } = useCartContext();

  const [state, setState] = useState({
    isOpen: false,
    loginScreen: false,
    signupScreen: false,
    loggedInScreen: false,
  });

  const logout = () => {
    setState({
      ...state,
      signupScreen: false,
      loginScreen: false,
      loggedInScreen: false,
      isOpen: false,
    });
    localStorage.removeItem("userEmail");
    removeFromCartOnLogout();
    removeFromListOnLogout();
    navigate("/");
    clearSearch("");
  };

  const afterSignup = () => {
    setState({
      ...state,
      signupScreen: false,
      loginScreen: false,
      loggedInScreen: true,
      isOpen: !state.isOpen,
    });
  };

  const afterLogout = () => {
    setState({
      ...state,
      signupScreen: false,
      loginScreen: true,
      loggedInScreen: false,
      isOpen: !state.isOpen,
    });
    dispatch(clearSearch(""));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("userEmail");
    if (storedUser) {
      setState({
        ...state,
        signupScreen: false,
        loginScreen: false,
        loggedInScreen: true,
      });
    }
  }, []);

  return (
    <Box>
      {state.loggedInScreen ? (
        <Box bgcolor="secondary">
          <Button onClick={logout} className={classes.logoutButton}>
            <Typography variant="body" className={classes.logoutText}>
              {localStorage.getItem("userEmail")}
            </Typography>

            <LogoutIcon className={classes.icon} />
          </Button>
        </Box>
      ) : (
        <Box bgcolor="secondary">
          <Button onClick={afterLogout} className={classes.logoutButton}>
            <Typography variant="body" className={classes.logoutText}>
              Login/Signup
            </Typography>
            <LoginIcon className={classes.icon} />
          </Button>
        </Box>
      )}
      {state.isOpen && (
        <PopupForm
          animation={false}
          className="popupform"
          content={
            <>
              <Box className="MainScreen">
                {state.signupScreen ? (
                  <Box className="signPage">
                    <Signup afterSignup={afterSignup} />

                    <Button
                      variant="contained"
                      onClick={() => {
                        setState({
                          ...state,
                          signupScreen: false,
                          loginScreen: true,
                        });
                      }}
                      className={classes.loginButton}
                      size="large"
                    >
                      Login
                    </Button>
                  </Box>
                ) : null}
                {state.loginScreen ? (
                  <Box className="loginPage">
                    <Login
                      afterLogin={afterSignup}
                      list={wishlist}
                      cart={cart}
                    />
                    <Button
                      variant="contained"
                      onClick={() => {
                        setState({
                          ...state,
                          signupScreen: true,
                          loginScreen: false,
                        });
                      }}
                      className={classes.loginButton}
                      size="large"
                    >
                      Signup
                    </Button>
                  </Box>
                ) : null}
              </Box>
            </>
          }
          handleClose={afterLogout}
        />
      )}
    </Box>
  );
};
