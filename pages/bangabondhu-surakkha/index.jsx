import HomePageLayout from "../../layout/HomePageLayout";
import { Modal } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import InsuranceOption from "../../components/HomePage/InsuranceOption";
import Link from "next/link";

function MotorInsurancePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [applicationType] = useState({
    title: "Bangabondhu Surakkha",
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
    setModalOpen(true);
  }

  function formateAndAddYear(startDate, yearsToAdd = 1) {
    const endDate = new Date(startDate);
    endDate.setDate(
      endDate.getDate(endDate.setFullYear(endDate.getFullYear() + yearsToAdd)) -
        1
    );
    return format(new Date(endDate), "MM/dd/yyyy");
  }

  function handleCloseModel() {
    setModalOpen(false);
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
    <HomePageLayout pageTitle={"Bangabondhu Surakkha"}>
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
      <Modal open={modalOpen} >
        <div className="modal-box">
          <div className="modal-header">
            <h3 className="modal-title">Premium Calculation</h3>
          </div>
          <div className="modal-body">
            <h4>Motor Insurance</h4>
            <h5>
              <span>Application Type</span>: New
            </h5>
            <h5>
              <span>Vehicle Category</span>: Private Vehicle
            </h5>
            <h5>
              <span>Plan Type</span>: Comprehensive
            </h5>
            <h5>
              <span>Vehicle Type</span>: Private Car
            </h5>
            <div className="invoice">
              <div className="invoice-row">
                <h5>Comprehensive Premium</h5>
                <h5>Tk.2,873.00</h5>
              </div>
              <div className="invoice-row">
                <h5>Comprehensive Premium</h5>
                <h5>Tk.2,873.00</h5>
              </div>
              <div className="invoice-row">
                <h5>Comprehensive Premium</h5>
                <h5>Tk.2,873.00</h5>
              </div>
              <div className="invoice-row">
                <h5>Comprehensive Premium</h5>
                <h5>Tk.2,873.00</h5>
              </div>
              <div className="invoice-row">
                <h5>Comprehensive Premium</h5>
                <h5>Tk.2,873.00</h5>
              </div>
              <div className="invoice-row net-premium">
                <h5>Net Premium</h5>
                <h5>Tk.69,538.00</h5>
              </div>
              <div className="invoice-row">
                <h5>Comprehensive Premium</h5>
                <h5>Tk.2,873.00</h5>
              </div>
              <div className="invoice-row">
                <h5>Total Premium</h5>
                <h5>Tk.79,969.00</h5>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <Button onClick={handleCloseModel} className="back-btn">Go Back</Button>
            <Link href="/motor-insurance/info" passHref>
              <Button className="buy-btn">Buy Now</Button>
            </Link>
          </div>
        </div>
      </Modal>
    </HomePageLayout>
  );
}

export default MotorInsurancePage;
