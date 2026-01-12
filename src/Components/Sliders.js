import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import { makeStyles } from "@mui/styles";
import { CardMedia } from "@mui/material";
import { clearSearch } from "../redux/actions/ProductActions";
import slider1 from "../images/slider1.png";
import slider3 from "../images/slider3.png";
import slider2 from "../images/slider2.png";

const useStyles = makeStyles(() => ({
  cardMedia: {
    height: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "contain",
    bgcolor: "transparent",
    borderRadius: 0,
    elevation: 0,
    border: "none",
    boxShadow: "none",
  },
}));

export const Sliders = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [index, setIndex] = useState(0);

  const [home_decoration, eletronics] = ["home_decoration", "eletronics"];

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const clearResult = () => {
    dispatch(clearSearch(""));
  };

  useEffect(() => {
    return () => {
      if (!index) return 0;
    };
  }, []);

  return (
    <Carousel
      variant="dark"
      activeIndex={index}
      onSelect={handleSelect}
      onClick={clearResult}
      className="carousel"
    >
      <Carousel.Item>
        <NavLink to={`/`}>
          <CardMedia
            component="img"
            image={slider1}
            alt="First slide"
            className={classes.cardMedia}
          />
        </NavLink>
      </Carousel.Item>
      <Carousel.Item>
        <NavLink to={`/categories/${home_decoration}`}>
          <img
            className="d-block w-100"
            src={slider3}
            alt="Third slide"
            height="400px"
          />
        </NavLink>
      </Carousel.Item>
      <Carousel.Item>
        <NavLink to={`/categories/${eletronics}`}>
          <CardMedia
            component="img"
            image={slider2}
            alt="Third slide"
            className={classes.cardMedia}
          />
        </NavLink>
      </Carousel.Item>
    </Carousel>
  );
};
