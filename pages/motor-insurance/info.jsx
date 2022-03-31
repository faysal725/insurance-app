import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import InsuredPersonalInformation from "../../components/HomePage/MotorInsurance/InsuredPersonalInformation";
import UploadDocuments from "../../components/HomePage/MotorInsurance/UploadDocuments";
import VehicleInformation from "../../components/HomePage/MotorInsurance/VehicleInformation";
import AppContext from "../../context";
import DefaultLayout from "../../layout/DefaultLayout";
import { authAxios, multipartAuthAxios } from "../../utilityFunctions/fetcher";
import {
  motorInsuranceInfoPageInitialValues as initialValues,
  motorInsuranceInfoPageValidationSchema as validationSchema,
} from "../../utilityFunctions/validation";

function info({ doctype }) {
  const router = useRouter();
  const [contextState, setContextState] = useContext(AppContext);
  const [info, setInfo] = useState({});
  const [files, setFiles] = useState({});
  const [fileError, setFileError] = useState({});
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSave(values);
    },
  });

  useEffect(() => {
    setInfo({ ...contextState.motorCalc });
    setContextState({});
    if (contextState.motorCalc) return;
    router.replace("./");
  }, []);

  function handleFileInput(name, file) {
    setFiles((currentState) => ({ ...currentState, [name]: file }));
    setFileError((currentState) => ({ ...currentState, [name]: false }));
  }

  function appendFile(optionName, file, formData) {
    const extension = file.name.split(".");
    formData.append("files", file, `${optionName}.${extension.pop()}`);
  }

  async function handleSave(val) {
    const err = {};
    let pass = true;
    doctype.forEach(({ id }) => {
      if (files[id]) return;
      err[id] = true;
      pass = false;
    });
    setFileError({ ...err });
    if (!pass) {
      formik.setSubmitting(false);
      return;
    }

    const data = { ...val, ...info };
    if (data.sameAddress) {
      data.insuredMAddress = data.insuredAddress;
      data.insuredMCity = data.insuredCity;
    }
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      console.log(`${key}: ${value}`);
      formData.append(key, value);
    }
    for (const [key, value] of Object.entries(files)) {
      console.log(`${key}: ${value}`);
      appendFile(key, value, formData);
    }

    try {
      const { data, status } = await multipartAuthAxios.post(
        "/insurance",
        formData
      );
      if (status === 200) {
        setContextState({ submitData: data.data });
        router.push("./invoice");
      }
      setInfo({});
      setFiles({});
    } catch (err) {
      console.log(err);
    }
    formik.setSubmitting(false);
  }

  function handleBack() {
    router.push("/motor-insurance");
  }

  return (
    <DefaultLayout pageTitle="Info | Motor Insurance">
      <Container maxWidth="lg" className="info-page">
        <h2 className="page-title">Motor Insurance</h2>
        <div>
          <InsuredPersonalInformation {...formik} />
          <VehicleInformation {...formik} />
          <UploadDocuments
            doctype={doctype}
            handleFileInput={handleFileInput}
            fileError={fileError}
          />
          <div className="submit-container">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                  <p>
                    I accept the all{" "}
                    <a href="terms-conditions" target="_blank">
                      Terms & Conditions
                    </a>
                  </p>
                }
              />
            </FormGroup>
            <div className="buttons">
              <Button onClick={handleBack} className="green-btn">
                Go Back
              </Button>
              <Button
                disabled={formik.isSubmitting}
                className="orange-btn"
                onClick={formik.handleSubmit}
              >
                {formik.isSubmitting ? (
                  <span className="loader"></span>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </DefaultLayout>
  );
}

export default info;

export async function getServerSideProps() {
  try {
    const { data } = await authAxios.get("/doctype");
    const props = { doctype: data.data };
    return { props };
  } catch (err) {
    return { notFound: true };
  }
}
