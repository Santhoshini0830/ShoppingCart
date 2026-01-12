import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { isValidEmail, isValidPassword } from "./Validations";
// import { fetchProducts } from "../redux/actions/ProductActions";
import { Styles } from "./Styles";
import { useCartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  avtar: {
    "&.MuiAvatar-root ": {
      backgroundColor: "black",
    },
  },
  box: {
    display: "inline-flex",
  },
  typography: {
    "&.MuiTypography-root": {
      color: "red",
      marginLeft: 0,
      fontSize: "20px",
      marginTop: "-0.1em",
      marginRight: "0.3em",
    },
  },
  textField: {
    width: "60%",
  },
  labelTypography: {
    display: "inline-flex",
  },
  required: {
    color: "red",
    marginLeft: 0,
    fontSize: 20,
    marginTop: -0.4,
    maxWidth: 7,
    paddingRight: 0.2,
  },
  errorText: {
    marginBottom: "1em",
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

export const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passType: true,
  });

  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const {
    //  initializeWishlist
    // loginUser,
    fetchData,
  } = useCartContext();
  const loginUserEmail = localStorage.getItem("userEmail");

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setFormErrors({ ...formErrors, [event.target.name]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate(0);
    // fetchData();
    // console.log(fetchData);
    const usersData = localStorage.getItem("userData") || "[]";
    const errors = {
      email:
        formData.email.trim() === ""
          ? "Email is required"
          : !isValidEmail(formData.email)
          ? "Enter valid email"
          : "",
      password:
        formData.password.trim() === ""
          ? "Password is required"
          : !isValidPassword(formData.password)
          ? "Enter valid password"
          : "",
    };

    setFormErrors(errors);

    const hasNoErrors = Object.values(errors).every((value) => value === "");
    if (!hasNoErrors) return;

    const userdata = JSON.parse(usersData);
    const userEmail = userdata.filter(
      (value) => value.email === formData.email
    );
    const userPassword = userdata.filter(
      (value) => value.password === formData.password
    );

    const errorMessages = {
      password: userPassword.length === 0 ? "Enter valid password" : "",
      email: userEmail.length === 0 ? "Enter valid email" : "",
    };

    setFormErrors((prevErrors) => ({ ...prevErrors, ...errorMessages }));

    const hasValidCredentials = userPassword.length > 0 && userEmail.length > 0;
    if (!hasValidCredentials) return;

    localStorage.setItem("userEmail", formData.email);
    props.afterLogin(formData.email);
    // props.fetchData(formData.email, setCart, setWishlist);
    // initializeWishlist();
    // loginUser();
  };

  return (
    <Stack direction="column" alignItems="center" spacing={1.1}>
      <Avatar className={classes.avtar} />
      <Box className={classes.box}>
        <Typography variant="p" component="p" className={classes.typography}>
          *
        </Typography>
        <Typography>fileds are mandatory</Typography>
      </Box>
      <TextField
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        variant="outlined"
        autoComplete="off"
        className={classes.textField}
        error={!!formErrors.email}
        helperText={formErrors.email}
        label={
          <React.Fragment>
            <Box className={classes.labelTypography}>
              <Typography
                varient="span"
                component="span"
                className={Styles.fieldsTypography}
              >
                Email Address
              </Typography>
              <Typography className={classes.required}>{"*"}</Typography>
            </Box>
          </React.Fragment>
        }
      />
      <TextField
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        variant="outlined"
        type={formData.passType ? "password" : "text"}
        className={classes.textField}
        error={!!formErrors.password}
        helperText={formErrors.password}
        label={
          <React.Fragment>
            <Box className={classes.labelTypography}>
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
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    passType: !prevFormData.passType,
                  }))
                }
              >
                {formData.passType ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {formErrors.error && (
        <Typography variant="body2" color="error" className={classes.errorText}>
          {formErrors.error}
        </Typography>
      )}
      <Button
        onClick={handleSubmit}
        variant="contained"
        className={classes.button}
        size="large"
      >
        Login
      </Button>
      <Typography variant="body2" component="span" fontWeight="bold">
        or
      </Typography>
    </Stack>
  );
};
