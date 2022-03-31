import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import InsuranceOption from "../../components/HomePage/InsuranceOption";
import AppContext from "../../context";
import HomePageLayout from "../../layout/HomePageLayout";
import { authAxios } from "../../utilityFunctions/fetcher.js";
import formateAndAddYear from "../../utilityFunctions/formateAndAddYear";
import {
  motorInsuranceHomePageInitialValues as initialValues,
  motorInsuranceHomePageValidationSchema as validationSchema,
} from "../../utilityFunctions/validation";

function MotorInsurancePage() {
  const [, setContextState] = useContext(AppContext);
  const appType = {
    name: "Motor Insurance",
    hasIcon: true,
    previousOption: false,
    optionName: "appType",
    className: "",
    childElementsClassName: "",
    options: [
      {
        imageurl: "./images/motor_new_app.png",
        className: "",
        name: "New Application",
        id: "new",
      },
      {
        imageurl: "./images/motor_renew.png",
        className: "",
        name: "Renew Application",
        id: "renew",
      },
    ],
  };
  const [insuranceOptions, setInsuranceOptions] = useState(false);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [calculateData, setCalculateData] = useState(null);
  const [masterData, setMasterData] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [coverage, setCoverage] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    insType: "Motor Insurance",
  });

  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleGetCalculation(values);
    },
  });

  function handleSelect(optionName, optionValue) {
    setSelectedOptions((currentState) => {
      const newState = { ...currentState };
      newState[optionName] = optionValue;
      return newState;
    });
  }
  function handleToggleSelect(optionName, optionValue) {
    let value = optionValue;
    if (selectedOptions[optionName]) {
      value = "";
    }
    handleSelect(optionName, value);
  }

  async function handleGetCalculation({
    siv,
    engineCapacity,
    driver,
    passenger,
  }) {
    const { ecType, motorCoverageId, vehicleTypeId } = selectedOptions;
    setModalOpen(true);
    try {
      const { data, status, ...rest } = await authAxios.post(
        "/tarrif/calculate",
        {
          type_id: vehicleTypeId,
          cc: ecType !== "ton" ? engineCapacity : null,
          ton: ecType === "ton" ? engineCapacity : null,
          price: siv,
          coverage_id: motorCoverageId,
          passenger,
          driver,
        }
      );
      if (status === 200) {
        setCalculateData(data.data);
        setMasterData(data.masterData);
      } else {
        setModalOpen(false);
        toast.loading(data);
      }
    } catch (err) {
      toast.error("Invalid Value");
      setModalOpen(false);
    }
  }

  // function formateAndAddYear(startDate, yearsToAdd = 1) {
  //   const endDate = new Date(startDate);
  //   endDate.setDate(
  //     endDate.getDate(endDate.setFullYear(endDate.getFullYear() + yearsToAdd)) -
  //       1
  //   );
  //   return format(new Date(endDate), "MM/dd/yyyy");
  // }

  function handleCloseModel() {
    modalRef.current.classList.remove("slideToLeft");
    setTimeout(() => {
      setModalOpen(false);
      setCalculateData(null);
    }, 600);
  }

  function handleBuy() {
    setContextState({
      motorCalc: { ...masterData, ...selectedOptions, ...values },
    });
    router.push("/motor-insurance/info");
  }

  useEffect(() => {
    if (selectedOptions.appType === "renew") {
      setSelectedOptions({ appType: "renew" });
    } else {
      const currentDate = new Date();
      handleSelect("policyStartDate", currentDate);
      handleSelect("policyEndDate", formateAndAddYear(currentDate, 1));
      handleSelect("ecType", "CC");
    }
  }, [selectedOptions.appType]);

  // getting coverage and insuranceOptions
  useEffect(() => {
    (async () => {
      const { data: category, error } = await authAxios.get("category");

      setInsuranceOptions([
        {
          name: "Vehicle Category",
          hasIcon: true,
          previousOption: "appType",
          optionName: "vehicleCatId",
          className: "",
          childElementsClassName: "",
          options: [...category.data],
        },
        {
          name: "Plan Type",
          hasIcon: false,
          previousOption: "vehicleCatId",
          optionName: "planType",
          className: "plan-type",
          childElementsClassName: "plan-type-btn",
          options: [
            {
              imageurl: "./images/car-icon.png",
              name: "Comprehensive",
              id: "comprehensive",
            },
            {
              imageurl: "./images/car-icon.png",
              name: "Act Liability",
              id: "act liability",
            },
          ],
        },
      ]);

      // coverage
      const { data: coverage, error: err } = await authAxios.get("/coverage");
      const options = coverage.data.map(({ id, description }) => ({
        id,
        name: description,
      }));
      setCoverage({
        name: "Coverage",
        hasIcon: false,
        previousOption: "planType",
        optionName: "motorCoverageId",
        className: "coverage",
        childElementsClassName: "coverage-btn",
        options,
      });
    })();
  }, []);

  useEffect(() => {
    if (selectedOptions.vehicleCatId) {
      handleSelect("vehicleTypeId", null);
      handleSelect("planType", null);
      handleSelect("motorCoverageId", "");
      (async () => {
        const { data, error } = await authAxios.post("/type/getbycategory", {
          id: selectedOptions.vehicleCatId,
        });
        setVehicleType({
          name: "Vehicle Type",
          hasIcon: false,
          previousOption: "planType",
          optionName: "vehicleTypeId",
          className: "vehicle-type",
          childElementsClassName: "vehicle-type-btn",
          options: [...data.data],
        });
      })();
    }
  }, [selectedOptions.vehicleCatId]);

  return (
    <HomePageLayout pageTitle={"Motor Insurance"}>
      <div className="insurance-input">
        <InsuranceOption
          {...appType}
          handleSelect={handleSelect}
          selectedOptions={selectedOptions}
        />
        {selectedOptions.appType === "new" && (
          <>
            {insuranceOptions ? (
              insuranceOptions.map((option) => (
                <InsuranceOption
                  key={option.name}
                  {...option}
                  handleSelect={handleSelect}
                  selectedOptions={selectedOptions}
                />
              ))
            ) : (
              <div className="loader-box">
                <span className="loader"></span>
              </div>
            )}
            {selectedOptions.planType && (
              <>
                {vehicleType ? (
                  <>
                    <InsuranceOption
                      {...vehicleType}
                      handleSelect={handleSelect}
                      selectedOptions={selectedOptions}
                    />
                    <InsuranceOption
                      {...coverage}
                      handleSelect={handleToggleSelect}
                      selectedOptions={selectedOptions}
                    />
                  </>
                ) : (
                  <div className="loader-box">
                    <span className="loader"></span>
                  </div>
                )}
              </>
            )}
            {selectedOptions.vehicleTypeId && (
              <div className="vehicle-info-container">
                <div className="input">
                  <TextField
                    required
                    value={values.siv}
                    label="Vehicle Price"
                    type="text"
                    variant="standard"
                    placeholder="Enter Vehicle Price"
                    error={touched.siv && Boolean(errors.siv)}
                    name="siv"
                    onChange={handleChange}
                  />
                  <span className="bdt">BDT</span>
                </div>
                <div className="input">
                  <TextField
                    required
                    value={values.engineCapacity}
                    label="Engine Capacity"
                    type="text"
                    variant="standard"
                    error={
                      touched.engineCapacity && Boolean(errors.engineCapacity)
                    }
                    name="engineCapacity"
                    placeholder={`Enter Vehicle ${selectedOptions.ecType}`}
                    onChange={handleChange}
                  />
                  <FormControl variant="standard">
                    <Select
                      value={selectedOptions.ecType}
                      defaultValue="CC"
                      type="number"
                      onChange={(e) => handleSelect("ecType", e.target.value)}
                    >
                      <MenuItem value="CC">CC</MenuItem>
                      <MenuItem value="ton">Ton</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="input">
                  <TextField
                    required
                    label="Number Of Driver"
                    value={values.driver}
                    variant="standard"
                    type="number"
                    name="driver"
                    error={touched.driver && Boolean(errors.driver)}
                    inputProps={{
                      min: 1,
                    }}
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <TextField
                    required
                    label="Passenger"
                    value={values.passenger}
                    variant="standard"
                    type="number"
                    name="passenger"
                    error={touched.passenger && Boolean(errors.passenger)}
                    inputProps={{
                      min: 1,
                    }}
                    onChange={handleChange}
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
                    onClick={handleSubmit}
                    className="get-calculation-btn"
                  >
                    {modalOpen && !calculateData ? (
                      <span className="loader"></span>
                    ) : (
                      "Get Calculation"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
        {selectedOptions.appType === "renew" && <>Renew Motor Insurance</>}
      </div>
      <Modal open={modalOpen}>
        <div
          ref={modalRef}
          className={calculateData ? "modal-box slideToLeft" : "modal-box"}
        >
          {calculateData && (
            <>
              <div className="modal-header">
                <h3 className="modal-title">Premium Calculation</h3>
              </div>
              <div className="modal-body">
                <h4>Motor Insurance</h4>
                <h5>
                  <span>Application Type</span>
                  <span>New</span>
                </h5>
                <h5>
                  <span>Vehicle Category</span>
                  <span>Private Vehicle</span>
                </h5>
                <h5>
                  <span>Plan Type</span>
                  <span>Comprehensive</span>
                </h5>
                <h5>
                  <span>Vehicle Type</span>
                  <span>Private Car</span>
                </h5>
                <div className="invoice">
                  {calculateData.map(({ name, value }) => {
                    if (value) {
                      return (
                        <div
                          key={name}
                          className={
                            name === "Net Premium"
                              ? "invoice-row net-premium"
                              : "invoice-row"
                          }
                        >
                          <h5>{name}</h5>
                          <h5>{value}</h5>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
              <div className="modal-footer">
                <Button onClick={handleCloseModel} className="back-btn">
                  Go Back
                </Button>
                <Button onClick={handleBuy} className="buy-btn">
                  Buy Now
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </HomePageLayout>
  );
}

export default MotorInsurancePage;
