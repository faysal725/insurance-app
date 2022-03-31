import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import InsuranceOption from "./InsuranceOption";

function MotorInsuranceInput(props) {
  const [applicationType] = useState({
    title: "Motor Insurance",
    hasIcon: true,
    previousOption: false,
    optionName: "applicationType",
    className: "",
    childElementsClassName: "",
    options: [
      {
        icon: "./images/car-icon.png",
        className: "",
        title: "New Application",
        value: "new",
      },
      {
        icon: "./images/car-icon.png",
        className: "",
        title: "Renew Application",
        value: "renew",
      },
    ],
  });
  const [insuranceOptions] = useState([
    {
      title: "Vehicle Category",
      hasIcon: true,
      previousOption: "applicationType",
      optionName: "vehicleCategory",
      className: "",
      childElementsClassName: "",
      options: [
        {
          icon: "./images/car-icon.png",
          className: "",
          title: "Private Vehicle",
          value: "private",
        },
        {
          icon: "./images/car-icon.png",
          className: "",
          title: "Commercial Vehicle",
          value: "commercial",
        },
      ],
    },
    {
      title: "Plan Type",
      hasIcon: false,
      previousOption: "vehicleCategory",
      optionName: "planType",
      className: "plan-type",
      childElementsClassName: "plan-type-btn",
      options: [
        {
          icon: "./images/car-icon.png",
          title: "Comprehensive",
          value: "comprehensive",
        },
        {
          icon: "./images/car-icon.png",
          title: "Act Liability",
          value: "act liability",
        },
      ],
    },
  ]);
  const [vehicleType, setVehicleType] = useState({
    title: "Vehicle Type",
    hasIcon: false,
    previousOption: "planType",
    optionName: "vehicleType",
    className: "vehicle-type",
    childElementsClassName: "vehicle-type-btn",
    options: [
      {
        icon: "./images/car-icon.png",
        title: "Private Car",
        value: "private car",
      },
      {
        icon: "./images/car-icon.png",
        title: "Jeep",
        value: "Jeep",
      },
      {
        icon: "./images/car-icon.png",
        title: "Micro Bus",
        value: "Micro Bus",
      },
      {
        icon: "./images/car-icon.png",
        title: "Picup",
        value: "Picup",
      },
      {
        icon: "./images/car-icon.png",
        title: "Covered Van",
        value: "Covered Van",
      },
      {
        icon: "./images/car-icon.png",
        title: "Delivery Van",
        value: "Delivery Van",
      },
    ],
  });
  const [selectedOptions, setSelectedOptions] = useState({});

  function handleSelect(optionName, optionValue) {
    setSelectedOptions((currentState) => {
      const newState = { ...currentState };
      newState[optionName] = optionValue;
      return newState;
    });
  }

  function handleGetCalculation() {
    console.log(selectedOptions);
  }

  function formateAndAddYear(startDate, yearsToAdd = 1) {
    const endDate = new Date(startDate);
    endDate.setDate(
      endDate.getDate(endDate.setFullYear(endDate.getFullYear() + yearsToAdd)) -
        1
    );
    return format(new Date(endDate), "MM/dd/yyyy");
  }

  useEffect(() => {
    if (selectedOptions.applicationType === "renew") {
      setSelectedOptions({ applicationType: "renew" });
    } else {
      const currentDate = new Date();
      handleSelect("policyStartDate", currentDate);
      handleSelect("policyEndDate", formateAndAddYear(currentDate, 1));
      handleSelect("engineCapacityType", "CC");
    }
  }, [selectedOptions.applicationType]);

  return (
    <div className="insurance-input">
      <InsuranceOption
        {...applicationType}
        handleSelect={handleSelect}
        selectedOptions={selectedOptions}
      />
      {selectedOptions.applicationType === "new" && (
        <>
          {insuranceOptions.map((option) => (
            <InsuranceOption
              key={option.title}
              {...option}
              handleSelect={handleSelect}
              selectedOptions={selectedOptions}
            />
          ))}
          {selectedOptions.planType && (
            <InsuranceOption
              {...vehicleType}
              handleSelect={handleSelect}
              selectedOptions={selectedOptions}
            />
          )}
          {selectedOptions.vehicleType && (
            <div className="vehicle-info-container">
              <div className="input number-no-arrow">
                <TextField
                  required
                  label="Vehicle Price"
                  type="number"
                  variant="standard"
                  placeholder="Enter Vehicle Price"
                  name="vehiclePrice"
                  onChange={(e) =>
                    handleSelect(e.target.name, Number(e.target.value))
                  }
                />{" "}
                <span className="bdt">BDT</span>
              </div>
              <div className="input number-no-arrow">
                <TextField
                  required
                  label="Engine Capacity"
                  type="number"
                  variant="standard"
                  name="engineCapacity"
                  placeholder={`Enter Vehicle ${selectedOptions.engineCapacityType}`}
                  onChange={(e) =>
                    handleSelect(e.target.name, Number(e.target.value))
                  }
                />{" "}
                <FormControl variant="standard">
                  <Select
                    value={selectedOptions.engineCapacityType}
                    defaultValue="CC"
                    type="number"
                    onChange={(e) =>
                      handleSelect("engineCapacityType", e.target.value)
                    }
                  >
                    <MenuItem value="CC">CC</MenuItem>
                    <MenuItem value="Ton">Ton</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="input">
                <TextField
                  required
                  label="Number Of Driver"
                  variant="standard"
                  type="number"
                  name="numberOfDriver"
                  onChange={(e) =>
                    handleSelect(e.target.name, Number(e.target.value))
                  }
                />
              </div>
              <div className="input">
                <TextField
                  required
                  label="Passenger"
                  variant="standard"
                  type="number"
                  name="numberOfPassenger"
                  onChange={(e) =>
                    handleSelect(e.target.name, Number(e.target.value))
                  }
                />
              </div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="input">
                  <DesktopDatePicker
                    label="Policy Start Date"
                    inputFormat="MM/dd/yyyy"
                    value={selectedOptions.policyStartDate}
                    onChange={(newValue) => {
                      handleSelect("policyStartDate", newValue);

                      handleSelect(
                        "policyEndDate",
                        formateAndAddYear(newValue, 1)
                      );
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className="input">
                  <TextField
                    disabled
                    label="Policy End Date"
                    inputProps={{ value: selectedOptions.policyEndDate }}
                  />
                </div>
              </LocalizationProvider>
              <div className="input get-calculation">
                <Button
                  onClick={() => handleGetCalculation()}
                  className="get-calculation-btn"
                >
                  {" "}
                  Get Calculation
                </Button>
              </div>
            </div>
          )}
        </>
      )}
      {selectedOptions.applicationType === "renew" && (
        <>Renew Motor Insurance</>
      )}
    </div>
  );
}

export default MotorInsuranceInput;
