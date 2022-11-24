import * as React from "react";
import { useState } from "react";

// Mui Import
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

// Custom Component Imports
import FindPeers from "./FindPeers";
import UploadFile from "./UploadFile";
import TransferFile from "./TransferFile";
import FallbackSpinner from "src/@core/components/spinner";
import toast from "react-hot-toast";

// ** Styled Component
import DropzoneWrapper from "src/@core/styles/libs/react-dropzone";

import { useAppSelector } from "src/store/hooks";

const steps = ["Find Peers", "Select File", "Start Transfer"];

export default function StepperWrapper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const node = useAppSelector((state) => state.node.node);
  const remotePeerIds = useAppSelector((state) => state.node.remotePeerIds);
  const remotePeerIdAsString = useAppSelector(
    (state) => state.node.remotePeerIdAsString
  );
  const files = useAppSelector((state) => state.node.files);

  const isStepOptional = (step: number) => {
    return step === 3;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    switch (activeStep) {
      case 0:
        if (remotePeerIdAsString === "") {
          toast.error("Please select a peer to connect to or enter manually!", {
            position: "top-right",
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
              background: "#ffffff",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });
        } else if (node?.peerId.toString() === remotePeerIdAsString) {
          toast.error("You cannot transfer file to yourself!", {
            position: "top-right",
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
              background: "#ffffff",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });
        } else {
          const result = remotePeerIds?.find(
            (item) => item.toString() === remotePeerIdAsString
          );

          if (result === undefined) {
            toast.error("Peer id is wrong or peer not connected!", {
              position: "top-right",
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
                background: "#ffffff",
              },
              iconTheme: {
                primary: "#713200",
                secondary: "#FFFAEE",
              },
            });
          } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
        }
      case 1:
        if (files?.length === 0) {
          toast.error("Please select a file to transfer!", {
            position: "top-right",
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
              background: "#ffffff",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  switch (activeStep) {
    case 0:
      return (
        <Card>
          <CardContent>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <CardContent>
                    {node ? <FindPeers /> : <FallbackSpinner />}
                  </CardContent>

                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {isStepOptional(activeStep) && (
                      <Button
                        color="inherit"
                        onClick={handleSkip}
                        sx={{ mr: 1 }}
                      >
                        Skip
                      </Button>
                    )}
                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </CardContent>
        </Card>
      );
    case 1:
      return (
        <Card>
          <CardContent>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <CardContent>
                    {node ? (
                      <DropzoneWrapper>
                        <UploadFile />
                      </DropzoneWrapper>
                    ) : (
                      <FallbackSpinner />
                    )}
                  </CardContent>

                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {isStepOptional(activeStep) && (
                      <Button
                        color="inherit"
                        onClick={handleSkip}
                        sx={{ mr: 1 }}
                      >
                        Skip
                      </Button>
                    )}
                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </CardContent>
        </Card>
      );
    case 2:
      return (
        <Card>
          <CardContent>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <CardContent>
                    {node ? <TransferFile /> : <FallbackSpinner />}
                  </CardContent>

                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {isStepOptional(activeStep) && (
                      <Button
                        color="inherit"
                        onClick={handleSkip}
                        sx={{ mr: 1 }}
                      >
                        Skip
                      </Button>
                    )}
                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </CardContent>
        </Card>
      );
  }
}
