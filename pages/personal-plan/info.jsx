import { Container } from "@mui/material";
import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";

function info() {
  return (
    <DefaultLayout pageTitle="Info | Motor Insurance">
      <Container maxWidth="lg" className="info-page">
        <h2 className="page-title">Motor Insurance</h2>
      </Container>
    </DefaultLayout>
  );
}

export default info;
