import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { isValidZipCode } from "./Validations";
import { PopupForm } from "./PopupForm";
import { Styles } from "./Styles";
import "reactjs-popup/dist/index.css";

const useStyles = makeStyles(() => ({
  boxText: {
    marginLeft: 3,
  },
  addIcon: {
    color: "black",
  },
  gridBox: {
    "&.MuiGrid-root": {
      marginLeft: "1em",
      marginBottom: 6,
    },
  },
  editButton: {
    "&.MuiButton-root": {
      backgroundColor: "black",
      "&:hover": {
        backgroundColor: "#424242",
      },
    },
  },
  formBox: {
    display: "inline-flex",
    justifyContent: "center",
    paddingBottom: 7,
    marginLeft: "10em",
  },
  filedsTypography: {
    color: "red",
    marginLeft: 0,
    fontSize: 20,
    marginTop: -2.4,
    marginRight: 10,
  },
  labelBox: {
    display: "inline-flex",
  },
  labelTypography: {
    color: "red",
    marginLeft: 0,
    fontSize: 20,
    marginTop: -2.4,
    maxWidth: 25,
    paddingRight: 2.2,
  },
  textField: {
    width: "60%",
  },
  submitButton: {
    "&.MuiButton-root": {
      width: "50%",
      backgroundColor: "black",
      "&:hover": {
        backgroundColor: "#424242",
      },
    },
  },
}));

export const AddressForm = () => {
  const [inputs, setInputs] = useState({
    houseNO: "",
    street: "",
    city: "",
    zip: "",
    show: false,
    isOpen: false,
  });

  const [errors, setErrors] = useState({});
  const classes = useStyles();

  const handleInputChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const addressData = JSON.parse(localStorage.getItem("userData") || "[]");

  const handleChange = () => {
    setInputs({ ...inputs, isOpen: !inputs.isOpen });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newFormErrors = {};

    newFormErrors.houseNO =
      inputs.houseNO.trim() === "" ? "House number Required" : "";
    newFormErrors.street =
      inputs.street.trim() === "" ? "Street Name Required" : "";
    newFormErrors.city = inputs.city.trim() === "" ? "City Name Required" : "";
    newFormErrors.zip =
      inputs.zip.trim() === ""
        ? "Zip Code Required"
        : !isValidZipCode(inputs.zip)
        ? "Zip code must contain numbers only"
        : "";

    if (Object.keys(newFormErrors).length > 0) {
      setErrors(newFormErrors);
    } else {
      const userAddress = {
        houseNO: inputs.houseNO,
        street: inputs.street,
        city: inputs.city,
        zip: inputs.zip,
      };
      setInputs({ ...inputs, show: true, isOpen: !inputs.isOpen });
      updateAddressData(addressData, userAddress);
    }
  };

  const loginUserEmail = localStorage.getItem("userEmail");
  const updateAddressData = (addressData, userAddress) => {
    addressData.map((item) => {
      if (item.email === loginUserEmail) {
        item["address"].push(userAddress);

        item.houseNO = userAddress.houseNO;
        item.street = userAddress.street;
        item.city = userAddress.city;
        item.zip = userAddress.zip;
      }
    });
    localStorage.setItem("userData", JSON.stringify(addressData));
  };

  const handleClose = () => {
    setInputs({
      houseNO: "",
      street: "",
      city: "",
      zip: "",
      show: false,
      isOpen: false,
    });
    setErrors({});

    const addressData = JSON.parse(localStorage.getItem("userData") || "[]");
    const updatedAddressData = addressData.map((item) => {
      if (item.email === loginUserEmail) {
        const updatedAddresses = item.address.filter((address) => {
          return (
            address.houseNO !== inputs.houseNO || address.zip !== inputs.zip
          );
        });
        item.address = updatedAddresses;
        item.houseNO = "";
        item.street = "";
        item.city = "";
        item.zip = "";
      }
      return item;
    });
    localStorage.setItem("userData", JSON.stringify(updatedAddressData));
  };

  const user = addressData.find((user) => user.email === loginUserEmail);
  const { firstName, lastName, phoneNo } = user || {};

  useEffect(() => {
    const addressData = JSON.parse(localStorage.getItem("userData") || "[]");
    const storedUser = localStorage.getItem("userEmail");

    const currentUserData = addressData.find(
      (item) => item.email === storedUser
    );

    if (currentUserData && currentUserData.address.length > 0) {
      const lastAddress =
        currentUserData.address[currentUserData.address.length - 1];
      setInputs({
        houseNO: lastAddress.houseNO,
        street: lastAddress.street,
        city: lastAddress.city,
        zip: lastAddress.zip,
        show: true,
      });
    } else {
      setInputs({
        houseNO: "",
        street: "",
        city: "",
        zip: "",
        show: false,
      });
    }
  }, []);

  return (
    <Box>
      {!inputs.show && (
        <Box className={classes.boxText}>
          <Typography varient="body1" component="h5" onClick={handleChange}>
            <IconButton>
              <AddIcon className={classes.addIcon} />
            </IconButton>
            Add Address
          </Typography>
        </Box>
      )}
      {inputs.show && (
        <Grid container spacing={2} className={classes.gridBox}>
          <Typography variant="h6" component="h6">
            Delivery Address
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={0}>
              <Typography variant="subtitle1">{firstName},</Typography>
            </Grid>
            <Grid item xs={0}>
              <Typography variant="subtitle1">{phoneNo},</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={0}>
              <Typography variant="subtitle1">{inputs.houseNO},</Typography>
            </Grid>
            <Grid item xs={0}>
              <Typography variant="subtitle1">{inputs.street},</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={0}>
              <Typography variant="subtitle1">{inputs.city},</Typography>
            </Grid>
            <Grid item xs={0} className={Styles.filedsTypography}>
              <Typography variant="subtitle1">{inputs.zip}</Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            onClick={handleChange}
            className={classes.editButton}
            size="small"
          >
            Edit Address
          </Button>
        </Grid>
      )}

      {inputs.isOpen && (
        <PopupForm
          animation={false}
          content={
            <>
              <Box className={classes.formBox}>
                <Typography
                  variant="p"
                  component="p"
                  className={classes.filedsTypography}
                >
                  *
                </Typography>
                <Typography>fileds are mandatory</Typography>
              </Box>
              <Stack direction="column" alignItems="center" spacing={0.8}>
                <TextField
                  type="text"
                  id="fname"
                  name="fname"
                  autoComplete="off"
                  defaultValue={firstName}
                  variant="outlined"
                  label={
                    <React.Fragment>
                      <Box className={classes.labelBox}>
                        <Typography varient="span" component="span">
                          First Name
                        </Typography>
                        <Typography className={classes.labelTypography}>
                          {"*"}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  }
                  disabled
                  className={classes.textField}
                  InputProps={{
                    style: {
                      fontWeight: firstName ? "bold" : "normal",
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  type="text"
                  className={classes.textField}
                  id="lname"
                  name="lname"
                  autoComplete="off"
                  defaultValue={lastName}
                  disabled
                  label={
                    <React.Fragment>
                      <Box className={classes.labelBox}>
                        <Typography varient="span" component="span">
                          Last Name
                        </Typography>
                        <Typography className={classes.labelTypography}>
                          {"*"}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  }
                  InputProps={{
                    style: {
                      fontWeight: lastName ? "bold" : "normal",
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  className={classes.textField}
                  type="text"
                  id="mobileNo"
                  name="mobileNo"
                  autoComplete="off"
                  defaultValue={phoneNo}
                  disabled
                  label={
                    <React.Fragment>
                      <Box className={classes.labelBox}>
                        <Typography varient="span" component="span">
                          Mobile Number
                        </Typography>
                        <Typography className={classes.labelTypography}>
                          {"*"}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  }
                  InputProps={{
                    style: {
                      fontWeight: phoneNo ? "bold" : "normal",
                    },
                  }}
                />
                <TextField
                  variant="outlined"
                  className={classes.textField}
                  type="text"
                  id="houseNO"
                  name="houseNO"
                  autoComplete="off"
                  value={inputs.houseNO}
                  onChange={handleInputChange}
                  error={!!errors.houseNO}
                  helperText={errors.houseNO}
                  label={
                    <React.Fragment>
                      <Box className={classes.labelBox}>
                        <Typography varient="span" component="span">
                          House Number
                        </Typography>
                        <Typography className={classes.labelTypography}>
                          {"*"}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  }
                />
                <TextField
                  variant="outlined"
                  className={classes.textField}
                  type="text"
                  id="street"
                  name="street"
                  autoComplete="off"
                  value={inputs.street}
                  onChange={handleInputChange}
                  error={!!errors.street}
                  helperText={errors.street}
                  label={
                    <React.Fragment>
                      <Box className={classes.labelBox}>
                        <Typography varient="span" component="span">
                          Street
                        </Typography>
                        <Typography className={classes.labelTypography}>
                          {"*"}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  }
                />
                <TextField
                  variant="outlined"
                  className={classes.textField}
                  type="text"
                  id="city"
                  name="city"
                  autoComplete="off"
                  value={inputs.city}
                  onChange={handleInputChange}
                  error={!!errors.city}
                  helperText={errors.city}
                  label={
                    <React.Fragment>
                      <Box className={classes.labelBox}>
                        <Typography varient="span" component="span">
                          City
                        </Typography>
                        <Typography className={classes.labelTypography}>
                          {"*"}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  }
                />
                <TextField
                  variant="outlined"
                  className={classes.textField}
                  type="text"
                  id="zip"
                  name="zip"
                  autoComplete="off"
                  value={inputs.zip}
                  onChange={handleInputChange}
                  error={!!errors.zip}
                  helperText={errors.zip}
                  label={
                    <React.Fragment>
                      <Box className={classes.labelBox}>
                        <Typography varient="span" component="span">
                          Zip Code
                        </Typography>
                        <Typography className={classes.labelTypography}>
                          {"*"}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  }
                />
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSave}
                  className={classes.submitButton}
                  size="large"
                >
                  Submit
                </Button>
              </Stack>
            </>
          }
          handleClose={handleClose}
        />
      )}
    </Box>
  );
};
