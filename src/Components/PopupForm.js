import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Box } from "@mui/material";

export const PopupForm = (props) => {
  return (
    <Box className="popupForm">
      <Box className="popup-box">
        <Box className="box">
          <IconButton onClick={props.handleClose} className="close-icon">
            <CloseIcon />
          </IconButton>
          {props.content}
        </Box>
      </Box>
    </Box>
  );
};
