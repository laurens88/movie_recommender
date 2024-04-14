import React from "react";
import Slider from "@mui/material/Slider";

function PrettySlider() {
  return (
    <div>
      <Slider
        defaultValue={50}
        aria-label="pretto slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={100}
        style={{ color: "#A7C7E7" }}
      />
    </div>
  );
}

export default PrettySlider;
