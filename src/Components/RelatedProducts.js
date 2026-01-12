import React from "react";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { NumberFormat } from "./NumberFormat";

export const RelatedProducts = ({ id, image, title, price }) => {
  return (
    <NavLink to={`/productDetails/${id}`}>
      <img className="card-img-top" src={image} alt={title} />
      <Typography variant="p" component="h6">
        {title}
      </Typography>
      <Typography variant="h6" component="h6">
        {NumberFormat(price)}
      </Typography>
    </NavLink>
  );
};
