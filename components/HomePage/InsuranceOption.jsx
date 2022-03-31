import React from "react";
import OptionWithIcon from "./OptionWithIcon";
import OptionWithOutIcon from "./OptionWithOutIcon";

function InsuranceOption({
  name,
  hasIcon,
  options = [],
  selectedOptions,
  handleSelect,
  optionName,
  previousOption,
  className = "",
  childElementsClassName
}) {
  if (previousOption && !selectedOptions[previousOption]) {
    return null;
  }
  return (
    <div className="input-container">
      <h2>{name}</h2>
      <div className={`option-container ${className}`}>
        {options.map((optionData) =>
          hasIcon ? (
            <OptionWithIcon
              key={optionData.name}
              selectedOption={selectedOptions[optionName]}
              handleSelect={handleSelect}
              optionName={optionName}
              {...optionData}
            />
          ) : (
            <OptionWithOutIcon
              key={optionData.name}
              selectedOption={selectedOptions[optionName]}
              handleSelect={handleSelect}
              optionName={optionName}
              {...optionData}
              className={childElementsClassName}
            />
          )
        )}
      </div>
    </div>
  );
}

export default InsuranceOption;
