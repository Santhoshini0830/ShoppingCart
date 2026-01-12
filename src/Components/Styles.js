import { makeStyles } from "@mui/styles";

export const Styles = makeStyles(() => ({
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
