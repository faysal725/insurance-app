import React from "react";

function OptionWithIcon({
  selectedOption,
  handleSelect,
  optionName,
  imageurl,
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
      <img src={imageurl} alt="" className="rounded" />
      <h4 className="title">{name}</h4>
    </div>
  );
}

export default OptionWithIcon;
