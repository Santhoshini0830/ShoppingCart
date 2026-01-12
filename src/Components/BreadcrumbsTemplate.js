import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Link from "@mui/material/Link";
import { Breadcrumbs, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { clearSearch } from "../redux/actions/ProductActions";

const useStyles = makeStyles(() => ({
  box: {
    "@media(min-width:0px) and (max-width:600px)": {
      paddingTop: "5px",
      marginLeft: "50px",
    },
    "@media(min-width:600px) and (max-width:900px)": {
      paddingTop: "5px",
      marginLeft: "50px",
    },
    "@media(min-width:900px) and (max-width:1200px)": {
      paddingTop: "10px",
      marginLeft: "22px",
    },
    "@media(min-width:1200px) and (max-width:2000px)": {
      paddingTop: "10px",
      marginLeft: "15px",
    },
    fontSize: "50px",
  },
  breadcrumbs: {
    marginTop: "0px",
  },
}));

export const BreadcrumbsTemplate = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const classes = useStyles();

  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);

    let lastElement = pathnames[pathnames.length - 1];
    if (!isNaN(+lastElement) === true) {
      pathnames.splice(-1);
    }

    const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const clearResult = () => {
      dispatch(clearSearch(""));
    };

    return (
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        {pathnames.length > 0 ? (
          <Link
            underline="hover"
            color="inherit"
            href="/"
            onClick={clearResult}
          >
            <Typography>Home</Typography>
          </Link>
        ) : (
          <Typography>Home</Typography>
        )}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography key={name}>{capatilize(name)}</Typography>
          ) : (
            <Link
              key={name}
              onClick={clearResult}
              underline="hover"
              color="inherit"
              href={routeTo}
            >
              <Typography>{capatilize(name)}</Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    );
  };

  return (
    <>
      <Box className={classes.box}>{breadCrumbView()}</Box>
    </>
  );
};
