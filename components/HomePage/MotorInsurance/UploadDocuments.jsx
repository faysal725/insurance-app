import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function UploadDocuments({ doctype, handleFileInput, fileError }) {
  const [documents, setDocuments] = useState({});

  function handleFile(optionName, file) {
    setDocuments((currentDocuments) => {
      const newDocuments = { ...currentDocuments };
      newDocuments[optionName] = file;
      return newDocuments;
    });
  }

  return (
    <div className="info-container upload-documents">
      <h2 className="input-title">Upload Documents</h2>
      <Grid container>
        {doctype.map(({ name, id }) => (
          <Grid key={id} className="upload-container" item md={12} xs={12}>
            <p>{name} *</p>
            <label>
              <input
                accept=".pdf, image/*"
                multiple={false}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  handleFileInput(id, e.target.files[0]);
                  handleFile(id, e.target.files[0]);
                }}
              />
              <TextField
                error={Boolean(fileError[id])}
                required
                type="text"
                name="vehicleBrand"
                value={documents[id]?.name || "Select File"}
                disabled={!fileError[id]}
              />
              <Button
                className="upload-btn"
                variant="contained"
                component="span"
              >
                Upload
              </Button>
            </label>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default UploadDocuments;
