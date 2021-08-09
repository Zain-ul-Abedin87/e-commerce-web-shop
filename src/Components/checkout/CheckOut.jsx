import React, { useState, useEffect } from "react";
import { Paper, Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import useStyles from "./style";
import AddreFrom from "./AdressForm";
import PaymentForm from "./PaymentForm";

import { commerce } from "../../lib/commerce";
const steps = ["Shipping Address", "payment Details"];
const CheckOut = ({ cart, order, handleCaptureCheckOut, error }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setcheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        console.log(token);
        setcheckoutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, []);

  const NextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const BackStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const Next = (data) => {
    setShippingData(data);
    NextStep();
  };

  const Confirmation = () => <div>confirmation</div>;

  const Form = () =>
    activeStep === 0 ? (
      <AddreFrom checkoutToken={checkoutToken} Next={Next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        BackStep={BackStep}
        onCaptureCheckout={handleCaptureCheckOut}
        NextStep={NextStep}
      />
    );

  return (
    <>
      <main className={classes.layout}>
        <div className={classes.toolbar} />
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Check Out
          </Typography>
          <Stepper activeStep={activeStep} className={classes.Stepper}>
            {steps.map((item) => (
              <Step key={item}>
                <StepLabel>{item}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep == steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default CheckOut;
