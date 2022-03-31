import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useIMask } from "react-imask";
import { authAxios } from "../../../utilityFunctions/fetcher";

function InsuredPersonalInformation({ values, touched, errors, handleChange }) {
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ref, value } = useIMask({
    mask: "+8801000000000",
  });

  useEffect(() => {
    handleChange({ target: { name: "insuredMobile", value } });
  }, [value]);
  console.log(values);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await authAxios.get("/city");
        setCity(data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="info-container">
      <h2 className="input-title">Insured Personal Information</h2>
      <Grid container spacing={5}>
        <Grid item md={7} xs={12}>
          <TextField
            required
            label="Insured Full Name"
            variant="standard"
            type="text"
            name="insuredName"
            value={values.insuredName}
            error={touched.insuredName && Boolean(errors.insuredName)}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={5} xs={12}>
          <TextField
            required
            label="NID Number"
            variant="standard"
            type="text"
            className="number-no-arrow"
            name="insuredNid"
            value={values.insuredNid}
            error={touched.insuredNid && Boolean(errors.insuredNid)}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={7} xs={12}>
          <TextField
            required
            label="Insured Address"
            variant="standard"
            type="text"
            name="insuredAddress"
            value={values.insuredAddress}
            error={touched.insuredAddress && Boolean(errors.insuredAddress)}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={5} xs={12}>
          <FormControl variant="standard">
            <InputLabel id="demo-simple-select-label">Insured City</InputLabel>
            <Select
              label="Insured City"
              name="insuredCity"
              value={values.insuredCity}
              error={touched.insuredCity && Boolean(errors.insuredCity)}
              onChange={handleChange}
            >
              {loading ? (
                <MenuItem>Loading city...</MenuItem>
              ) : (
                city.map(({ name }) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={7} xs={12} className="mailing-address">
          <TextField
            disabled={values.sameAddress}
            required
            label="Insured Mailing Address"
            variant="standard"
            type="text"
            name="insuredMAddress"
            value={
              values.sameAddress
                ? values.insuredAddress
                : values.insuredMAddress
            }
            error={touched.insuredMAddress && Boolean(errors.insuredMAddress)}
            onChange={handleChange}
          />
          <FormControlLabel
            label="Same as Insured Address"
            className="checkbox"
            name="sameAddress"
            control={
              <Checkbox onChange={handleChange} checked={values.sameAddress} />
            }
          />
        </Grid>
        <Grid item md={5} xs={12}>
          <FormControl variant="standard">
            <InputLabel id="demo-simple-select-label">
              Insured Mailing City
            </InputLabel>
            <Select
              disabled={values.sameAddress}
              // value={isSameAddress ? input.insuredCity : input.insuredMCity}
              label="Insured Mailing City"
              type="number"
              name="insuredMCity"
              value={
                values.sameAddress ? values.insuredCity : values.insuredMCity
              }
              error={touched.insuredMCity && Boolean(errors.insuredMCity)}
              onChange={handleChange}
            >
              {loading ? (
                <MenuItem>Loading city...</MenuItem>
              ) : (
                city.map(({ name }) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={7} xs={12}>
          <TextField
            required
            label="Mobile Number"
            variant="standard"
            type="text"
            name="insuredMobile"
            error={touched.insuredMobile && Boolean(errors.insuredMobile)}
            inputRef={ref}
          />
        </Grid>
        <Grid item md={5} xs={12}>
          <TextField
            required
            label="Insured E-mail Address"
            variant="standard"
            type="email"
            name="insuredEmail"
            value={values.insuredEmail}
            error={touched.insuredEmail && Boolean(errors.insuredEmail)}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default InsuredPersonalInformation;
