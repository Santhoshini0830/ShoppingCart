import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { isValidZipCode } from "./Validations";
import { PopupForm } from "./PopupForm";
import "reactjs-popup/dist/index.css";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  boxText: {
    marginLeft: 1,
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
    if (inputs.fname === "") {
      newFormErrors.fname = "First Name Required";
    }
    // else if (!isValidUserName(inputs.fname)) {
    //   newFormErrors.fname = "First Name must contain letters";
    // }
    if (inputs.lname === "") {
      newFormErrors.lname = "Last Name Required";
    }
    // else if (!isValidUserName(inputs.lname)) {
    //   newFormErrors.lname = "Last Name must contain letters";
    // }
    if (inputs.mobileNo === "") {
      newFormErrors.mobileNo = "Mobile number Required";
    }
    //  else if (!isValidPhoneNumber(inputs.mobileNo)) {
    //   newFormErrors.mobileNo = "Mobile number must contain 10 digits";
    // }
    if (inputs.houseNO === "") {
      newFormErrors.houseNO = "House number Required";
    }
    if (inputs.street === "") {
      newFormErrors.street = "Street Name Required";
    }
    if (inputs.city === "") {
      newFormErrors.city = "City Name Required";
    }
    if (inputs.zip === "") {
      newFormErrors.zip = "Zip Code Required";
    } else if (!isValidZipCode(inputs.zip)) {
      newFormErrors.zip = "Zip code must contain numbers only";
    }
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

      // setShow(true);
      // setIsOpen(!isOpen);
      setInputs({ ...inputs, show: true, isOpen: !inputs.isOpen });

      updateAddressData(addressData, userAddress);
    }
  };

  const loginUserEmail = localStorage.getItem("userEmail");
  const updateAddressData = (addressData, userAddress) => {
    addressData.map((item) => {
      item.email === loginUserEmail &&
        (() => {
          item["address"].push(userAddress);

          item.houseNO = userAddress.houseNO;
          item.street = userAddress.street;
          item.city = userAddress.city;
          item.zip = userAddress.zip;
        })();
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
        <Box sx={{ ml: 1 }}>
          <Typography varient="body1" component="h5" onClick={handleChange}>
            <IconButton>
              <AddIcon sx={{ color: "black" }} />
            </IconButton>
            Add Address
          </Typography>
        </Box>
      )}
      {inputs.show && (
        <Grid container spacing={2} sx={{ ml: 3, mb: 1 }}>
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
            <Grid item xs={0}>
              <Typography variant="subtitle1">{inputs.zip}</Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            onClick={handleChange}
            sx={{
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "#424242",
              },
            }}
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
              <Box
                sx={{
                  display: "inline-flex",
                  justifyContent: "center",
                  pb: 2,
                  ml: 17,
                }}
              >
                <Typography
                  variant="p"
                  component="p"
                  sx={{
                    color: "red",
                    ml: 0,
                    fontSize: 20,
                    mt: -0.4,
                    mr: 1,
                  }}
                >
                  *
                </Typography>
                <Typography>fileds are mandatory</Typography>
              </Box>
              <Stack direction="column" alignItems="center" spacing={0.8}>
                <TextField
                  // label="First Name"
                  type="text"
                  id="fname"
                  name="fname"
                  autoComplete="off"
                  defaultValue={firstName}
                  variant="outlined"
                  // required
                  label={
                    <React.Fragment>
                      <Box sx={{ display: "inline-flex" }}>
                        <Typography varient="span" component="span">
                          First Name
                        </Typography>
                        <Typography
                          sx={{
                            color: "red",
                            ml: 0,
                            fontSize: 20,
                            mt: -0.4,
                            maxWidth: 7,
                            pr: 0.2,
                          }}
                        >
                          {"*"}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  }
                  disabled
                  sx={{
                    width: "60%",
                  }}
                  InputProps={{
                    style: {
                      fontWeight: firstName ? "bold" : "normal",
                    },
                  }}
                />
                <TextField
                  // label="Last Name"
                  variant="outlined"
                  // required
                  type="text"
                  sx={{ width: "60%" }}
                  id="lname"
                  name="lname"
                  autoComplete="off"
                  defaultValue={lastName}
                  disabled
                  label={
                    <React.Fragment>
                      <Box sx={{ display: "inline-flex" }}>
                        <Typography varient="span" component="span">
                          Last Name
                        </Typography>
                        <Typography
                          sx={{
                            color: "red",
                            ml: 0,
                            fontSize: 20,
                            mt: -0.4,
                            maxWidth: 7,
                            pr: 0.2,
                          }}
                        >
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
                  // label="Mobile Number"
                  variant="outlined"
                  // required
                  sx={{ width: "60%" }}
                  type="text"
                  id="mobileNo"
                  name="mobileNo"
                  autoComplete="off"
                  defaultValue={phoneNo}
                  disabled
                  label={
                    <React.Fragment>
                      <Box sx={{ display: "inline-flex" }}>
                        <Typography varient="span" component="span">
                          Mobile Number
                        </Typography>
                        <Typography
                          sx={{
                            color: "red",
                            ml: 0,
                            fontSize: 20,
                            mt: -0.4,
                            maxWidth: 7,
                            pr: 0.2,
                          }}
                        >
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
                  // label="House Number"
                  variant="outlined"
                  // required
                  sx={{ width: "60%" }}
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
                      <Box sx={{ display: "inline-flex" }}>
                        <Typography varient="span" component="span">
                          House Number
                        </Typography>
                        <Typography
                          sx={{
                            color: "red",
                            ml: 0,
                            fontSize: 20,
                            mt: -0.4,
                            maxWidth: 7,
                            pr: 0.2,
                          }}
                        >
                          {"*"}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  }
                />
                <TextField
                  // label="Street"
                  variant="outlined"
                  // required
                  sx={{ width: "60%" }}
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
                      <Box sx={{ display: "inline-flex" }}>
                        <Typography varient="span" component="span">
                          Street
                        </Typography>
                        <Typography
                          sx={{
                            color: "red",
                            ml: 0,
                            fontSize: 20,
                            mt: -0.4,
                            maxWidth: 7,
                            pr: 0.2,
                          }}
                        >
                          {"*"}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  }
                />
                <TextField
                  // label="City"
                  variant="outlined"
                  // required
                  sx={{ width: "60%" }}
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
                      <Box sx={{ display: "inline-flex" }}>
                        <Typography varient="span" component="span">
                          City
                        </Typography>
                        <Typography
                          sx={{
                            color: "red",
                            ml: 0,
                            fontSize: 20,
                            mt: -0.4,
                            maxWidth: 7,
                            pr: 0.2,
                          }}
                        >
                          {"*"}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  }
                />
                <TextField
                  // label="Zip Code"
                  variant="outlined"
                  // required
                  sx={{ width: "60%" }}
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
                      <Box sx={{ display: "inline-flex" }}>
                        <Typography varient="span" component="span">
                          Zip Code
                        </Typography>
                        <Typography
                          sx={{
                            color: "red",
                            ml: 0,
                            fontSize: 20,
                            mt: -0.4,
                            maxWidth: 7,
                            pr: 0.2,
                          }}
                        >
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
                  sx={{
                    width: "50%",
                    backgroundColor: "black",
                    "&:hover": {
                      backgroundColor: "#424242",
                    },
                  }}
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
