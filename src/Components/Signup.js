import React, { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { IconButton } from "@material-ui/core";
import { Style, Visibility, VisibilityOff } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
  isValidUserName,
} from "./Validations";
import { Styles } from "./Styles";

const useStyles = makeStyles(() => ({
  box: {
    "&.MuiBox-root ": {
      display: "inline-flex",
    },
  },
  typography: {
    "&.MuiTypography-root ": {
      color: "red",
      marginLeft: 0,
      fontSize: "20px",
      marginTop: "-0.1em",
      marginRight: "0.3em",
    },
  },
  textField: {
    "&.MuiTextField-root ": {
      width: "60%",
    },
  },
  required: {
    "&.MuiTypography-root ": {
      color: "red",
      marginLeft: 0,
      fontSize: 20,
      marginTop: -0.4,
      maxWidth: 7,
      paddingRight: 0.2,
    },
  },
  button: {
    "&.MuiButton-root": {
      width: "50%",
      backgroundColor: "black",
      "&:hover": {
        backgroundColor: "#424242",
      },
    },
  },
}));

export const Signup = (props) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNo: "",
    passType1: true,
    passType2: true,
  });

  const [formErrors, setFormErrors] = useState({});
  const classes = useStyles();

  const handleInputChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
    setFormErrors({ ...formErrors, [event.target.name]: "" });
  };

  // const handleSignup = (e) => {
  //   e.preventDefault();
  //   const newFormErrors = {};

  //   newFormErrors.firstName =
  //     formValues.firstName.trim() === ""
  //       ? "First Name Required"
  //       : !isValidUserName(formValues.firstName)
  //       ? "First Name must contain letters"
  //       : undefined;

  //   newFormErrors.lastName =
  //     formValues.lastName.trim() === ""
  //       ? "Last Name Required"
  //       : !isValidUserName(formValues.lastName)
  //       ? "Last Name must contain letters"
  //       : undefined;

  //   newFormErrors.password =
  //     formValues.password.trim() === ""
  //       ? "Password Required"
  //       : !isValidPassword(formValues.password)
  //       ? "Password must contain letters and numbers"
  //       : undefined;

  //   newFormErrors.confirmPassword =
  //     formValues.confirmPassword.trim() === ""
  //       ? "Confirm Password Required"
  //       : formValues.password !== formValues.confirmPassword
  //       ? "Password not matching"
  //       : undefined;

  //   const userData = JSON.parse(localStorage.getItem("userData"));
  //   newFormErrors.email =
  //     formValues.email.trim() === ""
  //       ? "Email Required"
  //       : !isValidEmail(formValues.email)
  //       ? "Email is invalid"
  //       : // : userData.some((user) => user.email === formValues.email)
  //         // ? "Email address already exists"
  //         undefined;

  //   newFormErrors.phoneNo =
  //     formValues.phoneNo.trim() === ""
  //       ? "Mobile Number Required"
  //       : !isValidPhoneNumber(formValues.phoneNo)
  //       ? "Mobile number must contain 10 digits"
  //       : undefined;

  //   if (Object.keys(newFormErrors).length > 0) {
  //     setFormErrors(newFormErrors);
  //   } else {
  //     const userData = JSON.parse(localStorage.getItem("userData") || "[]");
  //     const userdata = {
  //       firstName: formValues.firstName,
  //       lastName: formValues.lastName,
  //       phoneNo: formValues.phoneNo,
  //       password: formValues.password,
  //       email: formValues.email,
  //       id: [],
  //       address: [],
  //       wishlistList: [],
  //       cartList: [],
  //     };

  //     userData.push(userdata);
  //     localStorage.setItem("userData", JSON.stringify(userData));
  //     localStorage.setItem("userEmail", formValues.email);
  //     props.afterSignup(formValues.firstName);
  //   }
  // };

  const handleSignup = (e) => {
    e.preventDefault();
    const newFormErrors = {};

    if (formValues.username === "") {
      newFormErrors.username = "User Name Required";
    } else if (!isValidUserName(formValues.username)) {
      newFormErrors.username = "User Name must contain letters and numbers";
    }

    if (formValues.password.trim() === "") {
      newFormErrors.password = "Password Required";
    } else if (!isValidPassword(formValues.password)) {
      newFormErrors.password = "Password must contain letters and numbers";
    }

    if (formValues.confirmPassword.trim() === "") {
      newFormErrors.confirmPassword = "Confirm Password Required";
    } else if (formValues.password !== formValues.confirmPassword) {
      newFormErrors.confirmPassword = "Password not matching";
    }

    const userData = JSON.parse(localStorage.getItem("userData"));
    if (formValues.email.trim() === "") {
      newFormErrors.email = "Email Required";
    } else if (!isValidEmail(formValues.email)) {
      newFormErrors.email = "Email is invalid";
      // }
      // else if (userData.some((user) => user.email === formValues.email)) {
      //   newFormErrors.email = "Email address already exists";
    }

    if (formValues.phoneNo.trim() === "") {
      newFormErrors.phoneNo = "Mobile Number Required";
    } else if (!isValidPhoneNumber(formValues.phoneNo)) {
      newFormErrors.phoneNo = "Mobile number must contain 10 digits";
    }

    // if (Object.keys(newFormErrors).length > 0) {
    //   setFormErrors(newFormErrors);
    // } else {
    //   const userData = JSON.parse(localStorage.getItem("userData") || "[]");
    //   const userdata = {
    //     username: formValues.username,
    //     password: formValues.password,
    //     email: formValues.email,
    //     id: [],
    //     address: [],
    //     wishlistList: [],
    //     cartList: [],
    //   };

    //   userData.push(userdata);
    //   localStorage.setItem("userData", JSON.stringify(userData));
    //   localStorage.setItem("userloggedin", formValues.username);
    //   localStorage.setItem("userEmail", formValues.email);
    //   props.afterSignup(formValues.username);
    // }
    if (Object.keys(newFormErrors).length > 0) {
      setFormErrors(newFormErrors);
    } else {
      const userData = JSON.parse(localStorage.getItem("userData") || "[]");
      const userdata = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        phoneNo: formValues.phoneNo,
        password: formValues.password,
        email: formValues.email,
        ide: [],
        address: [],
        wishlistList: [],
        cartList: [],
      };

      userData.push(userdata);
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("userEmail", formValues.email);
      props.afterSignup(formValues.firstName);
    }
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={1.1}
      id="signup-stack"
    >
      <Box className={classes.box}>
        <Typography variant="p" component="p" className={classes.typography}>
          *
        </Typography>
        <Typography>fileds are mandatory</Typography>
      </Box>
      <TextField
        name="firstName"
        value={formValues.firstName}
        onChange={handleInputChange}
        variant="outlined"
        className={classes.textField}
        id="firstName"
        autoComplete="off"
        error={!!formErrors.firstName}
        helperText={formErrors.firstName}
        label={
          <React.Fragment>
            <Box className={classes.box}>
              <Typography
                varient="span"
                component="span"
                className={Style.fieldsTypography}
              >
                First Name
              </Typography>
              <Typography className={classes.required}>{"*"}</Typography>
            </Box>
          </React.Fragment>
        }
      />
      <TextField
        name="lastName"
        value={formValues.lastName}
        onChange={handleInputChange}
        variant="outlined"
        className={classes.textField}
        id="lastName"
        autoComplete="off"
        error={!!formErrors.lastName}
        helperText={formErrors.lastName}
        label={
          <React.Fragment>
            <Box className={classes.box}>
              <Typography varient="span" component="span">
                Last Name
              </Typography>
              <Typography className={classes.required}>{"*"}</Typography>
            </Box>
          </React.Fragment>
        }
      />
      <TextField
        variant="outlined"
        className={classes.textField}
        fullWidth
        id="email"
        name="email"
        autoComplete="off"
        value={formValues.email}
        onChange={handleInputChange}
        error={!!formErrors.email}
        helperText={formErrors.email}
        label={
          <React.Fragment>
            <Box className={classes.box}>
              <Typography varient="span" component="span">
                Email Address
              </Typography>
              <Typography className={classes.required}>{"*"}</Typography>
            </Box>
          </React.Fragment>
        }
      />
      <TextField
        variant="outlined"
        id="phoneNo"
        name="phoneNo"
        autoComplete="off"
        className={classes.textField}
        value={formValues.phoneNo}
        onChange={handleInputChange}
        error={!!formErrors.phoneNo}
        helperText={formErrors.phoneNo}
        label={
          <React.Fragment>
            <Box className={classes.box}>
              <Typography varient="span" component="span">
                Mobile Number
              </Typography>
              <Typography className={classes.required}>{"*"}</Typography>
            </Box>
          </React.Fragment>
        }
      />
      <TextField
        variant="outlined"
        name="password"
        className={classes.textField}
        type={formValues.passType1 ? "password" : "text"}
        id="password"
        autoComplete="current-password"
        value={formValues.password}
        onChange={handleInputChange}
        error={!!formErrors.password}
        helperText={formErrors.password}
        label={
          <React.Fragment>
            <Box className={classes.box}>
              <Typography varient="span" component="span">
                Password
              </Typography>
              <Typography className={classes.required}>{"*"}</Typography>
            </Box>
          </React.Fragment>
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  setFormValues((prevFormData) => ({
                    ...prevFormData,
                    passType1: !prevFormData.passType1,
                  }))
                }
              >
                {formValues.passType1 ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        variant="outlined"
        name="confirmPassword"
        className={classes.textField}
        type={formValues.passType2 ? "password" : "text"}
        id="confirmPassword"
        autoComplete="current-password"
        value={formValues.confirmPassword}
        onChange={handleInputChange}
        error={!!formErrors.confirmPassword}
        helperText={formErrors.confirmPassword}
        label={
          <React.Fragment>
            <Box className={classes.box}>
              <Typography varient="span" component="span">
                Confirm Password
              </Typography>
              <Typography className={classes.required}>{"*"}</Typography>
            </Box>
          </React.Fragment>
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  setFormValues((prevFormData) => ({
                    ...prevFormData,
                    passType2: !prevFormData.passType2,
                  }))
                }
              >
                {formValues.passType2 ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        onClick={handleSignup}
        variant="contained"
        className={classes.button}
        size="large"
      >
        Sign up
      </Button>
      <Typography variant="body2" component="span" fontWeight="bold">
        or
      </Typography>
    </Stack>
  );
};
