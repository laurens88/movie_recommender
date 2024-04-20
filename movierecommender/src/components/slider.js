import React from "react";
import Slider from "@mui/material/Slider";

function PrettySlider() {
  return (
    <div style={{display: "flex" , justifyContent: "center"}}>
      <Slider
        defaultValue={50}
        aria-label="pretto slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={0}
        max={100}
        style={{ color: "#A7C7E7", width: "60%"}}
      />
    </div>
  );
}

export default PrettySlider;
