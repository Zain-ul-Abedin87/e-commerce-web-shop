import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomTextField";
import { Link } from "react-router-dom";

import { commerce } from "../../lib/commerce";
const AdressForm = ({ checkoutToken, Next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
  const [shippingSubDivision, setShippingSubDivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const subdivisions = Object.entries(shippingSubDivisions).map(
    ([code, name]) => ({ id: code, label: name })
  );
  // console.log(countries);

  // const options = shippingOptions.map((sO) => ({
  //   id: sO.id,
  //   lable: `${sO.description} - (${sO.price.formatted_with_symbol}) `,
  // }));
  // console.log(shippingOptions);

  const fetchShipingCountries = async (CheckoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      CheckoutTokenId
    );
    console.log(countries);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubDivision = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    console.log(subdivisions);
    setShippingSubDivisions(subdivisions);
    setShippingSubDivision(Object.keys(subdivisions)[0]);
  };

  const fetchShipingOptions = async (
    CheckoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      CheckoutTokenId,
      { country, region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };
  useEffect(() => {
    fetchShipingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubDivision(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubDivision)
      fetchShipingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubDivision
      );
  }, [shippingSubDivision]);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            Next({
              ...data,
              shippingCountry,
              shippingSubDivision,
              shippingOption,
            })
          )}
        >
          <Grid spacing={3} container>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="Last name" label="Last name" />
            <FormInput required name="Address" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="city" />
            <FormInput required name="zip" label="zip/postel Code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem value={country.id} key={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>SubDivision</InputLabel>
              <Select
                value={shippingSubDivision}
                fullWidth
                onChange={(e) => setShippingSubDivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem value={subdivision.id} key={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Option</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptions
                  .map((sO) => ({
                    id: sO.id,
                    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                  }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              <ArrowBackIcon /> Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AdressForm;
