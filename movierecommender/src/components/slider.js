import React from "react";
import Slider from "@mui/material/Slider";

function PrettySlider(props) {
  return (
    <Slider
      aria-label="Temperature"
      defaultValue={50}
      getAriaValueText= "Temperature"
      valueLabelDisplay="auto"
      shiftStep={30}
      step={10}
      marks
      min={0}
      max={100}
    />
  );
}

export default PrettySlider;
