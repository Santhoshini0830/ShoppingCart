import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useCartContext } from "./CartContext";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "26em",
    marginTop: "5em",
  },
  grid: {
    justifyContent: "center",
  },
  box: {
    width: "30%",
    padding: "1rem",
    border: "2px solid #ccc",
    margin: "0.5rem",
    justifyContent: "center",
    textAlign: "center",
  },

  button1: {
    "&.MuiButton-root": {
      marginRight: "15em",
      marginTop: "1em",
      paddingLeft: "50px",
      paddingRight: "50px",
      backgroundColor: "black",
      "&:hover": {
        backgroundColor: "#424242",
      },
    },
  },
  button2: {
    "&.MuiButton-root": {
      marginRight: "3em",
      marginTop: "1em",
      marginLeft: "5em",
      backgroundColor: "black",
      "&:hover": {
        backgroundColor: "#424242",
      },
    },
  },
  bulletList: {
    textAlign: "left",
    marginLeft: "1em",
  },
  bulletListItem: {
    display: "list-item",
    listStyleType: "disc",
    marginLeft: "5em",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1em",
  },
}));

export const ConfirmOrderPopup = () => {
  const { confrimOrder } = useCartContext();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();

  const loginUserEmail = localStorage.getItem("userEmail");
  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleShowed = () => {
    setIsOpen(isOpen);

    navigate("/thankYou");
  };

  const handleBack = () => {
    navigate("/checkOut");
  };

  const user =
    userData && userData.find((user) => user.email === loginUserEmail);

  return (
    <Box className={classes.container}>
      <Grid container>
        <Grid item xs={24} className={classes.buttonContainer}>
          <Box className={classes.box}>
            <Typography variant="h5" component="h5">
              Saved Address:
            </Typography>
            <br />
            <Grid container spacing={1} className={classes.grid}>
              <Grid item>
                <Typography variant="subtitle1">{user.firstName},</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{user.lastName},</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} className={classes.grid}>
              <Grid item>
                <Typography variant="subtitle1">{user.phoneNo},</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{user.street},</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} className={classes.grid}>
              <Grid item>
                <Typography variant="subtitle1">{user.city},</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{user.zip}</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.box}>
            <Typography variant="h5" component="h5">
              The Order for
            </Typography>
            <br />
            <Typography variant="subtitle1" className={classes.bulletList}>
              <ul className="confirmOrderCenter">
                {confrimOrder.map((product) => (
                  <li key={product.id} className={classes.bulletListItem}>
                    {product.title}
                  </li>
                ))}
              </ul>
            </Typography>
            <Typography variant="subtitle1">
              will be delivered in 2 working days
            </Typography>
          </Box>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Box className={classes.buttonContainer}>
            <Button
              onClick={handleBack}
              variant="contained"
              className={classes.button1}
              size="large"
            >
              go back
            </Button>
            <Button
              size="large"
              onClick={handleShowed}
              variant="contained"
              className={classes.button2}
              size="large"
            >
              Confirm Order
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
