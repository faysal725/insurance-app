import { Button, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context";
import DefaultLayout from "../../layout/DefaultLayout";
import { useRouter } from "next/router";

function Invoice(props) {
  const router = useRouter();
  const [contextState, setContextState] = useContext(AppContext);
  const [data, setData] = useState({
    generalInfo: [],
    vehicleInfo: [],
    personalInfo: [],
    uploadDocumentList: [],
    premiumCalculation: [],
  });

  useEffect(() => {
    if (contextState.submitData) {
      setData({ ...contextState.submitData });
      setContextState({});
      return;
    }
    router.replace("./");
  }, []);

  return (
    <DefaultLayout pageTitle="Invoice | Motor Insurance">
      <div className="invoice-page">
        <Container>
          <Box className="title">General Information</Box>
          <Grid container>
            {data.generalInfo.map(({ name, value, className }) => (
              <>
                <Grid item md={6} xs={12} className={className}>
                  {name}
                </Grid>
                <Grid item md={6} xs={12}>
                  {value}
                </Grid>
              </>
            ))}
          </Grid>
          <Box className="title" item xs={12}>
            Vehicle Information
          </Box>
          <Grid container>
            {data.vehicleInfo.map(({ name, value, className }) => (
              <>
                <Grid item md={6} xs={12} className={className}>
                  {name}
                </Grid>
                <Grid item md={6} xs={12} className={className}>
                  {value}
                </Grid>
              </>
            ))}
          </Grid>
          <Box className="title" item xs={12}>
            Personal Information
          </Box>
          <Grid container>
            {data.personalInfo.map(({ name, value, className }) => (
              <>
                <Grid item md={6} xs={12} className={className}>
                  {name}
                </Grid>
                <Grid item md={6} xs={12}>
                  {value}
                </Grid>
              </>
            ))}
          </Grid>
          <Box className="title" item xs={12}>
            Uploaded Documents List
          </Box>
          <Grid container>
            {data.uploadDocumentList.map(({ name, value, className }) => (
              <>
                <Grid item md={6} xs={12} className={className}>
                  {name}
                </Grid>
                <Grid item md={6} xs={12}>
                  {value}
                </Grid>
              </>
            ))}
          </Grid>

          <Box className="title" item xs={12}>
            Premium Calculation
          </Box>
          <Grid container>
            {data.premiumCalculation.map(({ name, value, className }) => (
              <>
                <Grid item md={6} xs={12} className={className}>
                  {name}
                </Grid>
                <Grid item md={6} xs={12}>
                  {value}
                </Grid>
              </>
            ))}
          </Grid>

          <div className="buttons">
            <Button className="close-btn">Close</Button>
            <Button className="pay-btn">Pay Now</Button>
          </div>
        </Container>
      </div>
    </DefaultLayout>
  );
}
export default Invoice;
