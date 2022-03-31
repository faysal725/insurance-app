import { Button } from "@mui/material";
import React from "react";

function OptionWithOutIcon({
  selectedOption,
  handleSelect,
  optionName,
  name,
  id,
  className = "",
}) {
  return (
    <div
      className={className + " " +
        (selectedOption === id
          ? "option-box selected"
          : "option-box")
      }
      onClick={() => handleSelect(optionName, id)}
    >
      <h4 className="title">{name}</h4>
    </div>
  );
}

export default OptionWithOutIcon;
