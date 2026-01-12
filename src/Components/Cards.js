import React from "react";
import { Link } from "react-router-dom";
import { Box, CardActionArea, CardMedia } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  card: {
    maxWidth: "100%",
    padding: 2,
  },
  media: {
    height: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "contain",
    backgroundColor: "transparent",
    borderRadius: 0,
    boxShadow: "none",
    border: "none",
  },
});

export const Cards = ({ id, title, image }) => {
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.card}>
        <CardActionArea component={Link} to={`/productDetails/${id}`}>
          <CardMedia
            component="img"
            image={image}
            alt={title}
            className={classes.media}
          />
        </CardActionArea>
      </Box>
    </Box>
  );
};
