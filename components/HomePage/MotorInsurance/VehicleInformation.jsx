import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import React, { useState } from "react";
import { useEffect } from "react";
import { authAxios } from "../../../utilityFunctions/fetcher";
import { useIMask } from "react-imask";

function VehicleInformation({ values, touched, errors, handleChange }) {
  const [loading, setLoading] = useState(true);
  const [mark, setMark] = useState([]);
  const [metro, setMetro] = useState([]);
  const { ref, value } = useIMask({
    mask: "00-0000",
  });

  useEffect(() => {
    handleChange({ target: { name: "motorRegNumber", value } });
  }, [value]);

  useEffect(() => {
    (async () => {
      try {
        const { data: metroData } = await authAxios.get("/metro");
        const { data: markData } = await authAxios.get("/mark");
        setMark(markData.data);
        setMetro(metroData.metroList);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="info-container vehicle-info">
      <h2 className="input-title">Vehicle Information</h2>
      <Grid container spacing={3}>
        <Grid item md={7} xs={12}>
          <TextField
            required
            label="Vehicle Brand/Make"
            variant="standard"
            type="text"
            name="motorBrand"
            value={values.motorBrand}
            error={touched.motorBrand && Boolean(errors.motorBrand)}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={5} xs={12}>
          <TextField
            required
            label="Year Of Manufacture"
            variant="standard"
            type="number"
            name="motorManYear"
            className="number-no-arrow"
            value={values.motorManYear}
            error={touched.motorManYear && Boolean(errors.motorManYear)}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={7} xs={12}>
          <p id="demo-simple-select-label">Registration Number</p>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            <Grid item xs={4} sm={4}>
              <FormControl variant="standard">
                <Select
                  name="motorRegMetro"
                  value={values.motorRegMetro}
                  error={touched.motorRegMetro && Boolean(errors.motorRegMetro)}
                  onChange={handleChange}
                >
                  {loading ? (
                    <MenuItem>Loading...</MenuItem>
                  ) : (
                    metro.map(({ name }) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))
                  )}
                </Select>
                <span>(Metro)</span>
              </FormControl>
            </Grid>
            <Grid item xs={4} sm={3}>
              <FormControl variant="standard">
                <Select
                  label="Registration Mark"
                  name="motorRegMark"
                  value={values.motorRegMark}
                  error={touched.motorRegMark && Boolean(errors.motorRegMark)}
                  onChange={handleChange}
                >
                  {loading ? (
                    <MenuItem>Loading...</MenuItem>
                  ) : (
                    mark.map(({ name }) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))
                  )}
                </Select>
                <span>(Mark)</span>
              </FormControl>
            </Grid>
            <Grid item xs={4} sm={5}>
              <FormControl variant="standard">
                <TextField
                  required
                  variant="standard"
                  type="text"
                  name="motorRegNumber"
                  error={
                    touched.motorRegNumber && Boolean(errors.motorRegNumber)
                  }
                  inputRef={ref}
                />
                <span>(Reg. Number)</span>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={5} xs={12}>
          <p
            style={
              touched.motorRegDate && Boolean(errors.motorRegDate)
                ? { color: "red" }
                : {}
            }
          >
            Registration Date
          </p>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              inputFormat="MM/dd/yyyy"
              name="motorRegDate"
              value={values.motorRegDate}
              error={touched.motorRegDate && Boolean(errors.motorRegDate)}
              onChange={(value) =>
                handleChange({ target: { name: "motorRegDate", value } })
              }
              renderInput={(params) => (
                <TextField variant="standard" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={7} xs={12}>
          <TextField
            required
            label="Engin Number"
            variant="standard"
            type="text"
            name="motorEngineNo"
            value={values.motorEngineNo}
            error={touched.motorEngineNo && Boolean(errors.motorEngineNo)}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={5} xs={12}>
          <TextField
            required
            label="Chasis Number"
            variant="standard"
            type="text"
            name="motorChesisNo"
            value={values.motorChesisNo}
            error={touched.motorChesisNo && Boolean(errors.motorChesisNo)}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default VehicleInformation;
