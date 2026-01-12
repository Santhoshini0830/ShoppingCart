import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  box: {
    position: "fixed",
    bottom: 16,
    right: 16,
  },
}));

export const ScrollButton = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box className={classes.box}>
      {showTopBtn && (
        <Fab size="small" onClick={handleClick} aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </Box>
  );
};
