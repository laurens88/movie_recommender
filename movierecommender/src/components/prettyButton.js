import React from "react";
import Button from "@mui/material/Button";
import { darken } from "@mui/material/styles";

function PrettyButton(props) {
  const { text, width, height, fontSize, color, onClick, isActive } = props;
  const usedColor = color ? color : "#A7C7E7";

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{
        marginTop: {
          xs: "10px",
          sm: "15px",
          md: "20px",
          lg: "25px",
          xl: "30px",
        },
        backgroundColor: isActive ? (usedColor, 0.2) : usedColor,
        fontWeight: isActive ? "bold" : "normal",
        border: isActive ? "2px solid transparent" : "none",
        boxShadow: isActive ? `0 0 0 2px white` : "none",
        "&:hover": {
          backgroundColor: isActive
            ? darken(usedColor, 0.3)
            : darken(usedColor, 0.1),
        },
        width: width ? width : "auto",
        height: height ? height : "auto",
        fontSize: fontSize,
      }}
    >
      {text}
    </Button>
  );
}

export default PrettyButton;
