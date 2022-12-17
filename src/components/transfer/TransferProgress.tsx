// ** React Imports
import {
  Ref,
  useState,
  useEffect,
  forwardRef,
  ReactElement,
  MutableRefObject,
  Fragment,
} from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Fade, { FadeProps } from "@mui/material/Fade";
import DialogContent from "@mui/material/DialogContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

// ** Icons Imports
import Close from "mdi-material-ui/Close";
import ChevronLeft from "mdi-material-ui/ChevronLeft";
import ChevronRight from "mdi-material-ui/ChevronRight";
import FileDocumentOutline from "mdi-material-ui/FileDocumentOutline";

// ** Hooks
import useBgColor from "src/@core/hooks/useBgColor";
import { useSettings } from "src/@core/hooks/useSettings";

import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

import { useAppSelector } from "src/store/hooks";

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

interface TransferRequestProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  chunkSize: MutableRefObject<number>;
}

const TransferProgress = (props: TransferRequestProps) => {
  // ** States
  const [show, setShow] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // ** Hooks
  const bgClasses = useBgColor();
  const { settings } = useSettings();

  const nodeStore = useAppSelector((state) => state.node);

  const handleClose = () => {
    props.setOpen(false);
    setIsCompleted(false);
  };

  // ** Var
  const { direction } = settings;

  function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
  ) {
    if (props.value == 100) {
      setIsCompleted(true);
    } 

    return (
      <>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" {...props} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              props.value
            )}%`}</Typography>
          </Box>
        </Box>
      </>
    );
  }

  useEffect(() => {
    setShow(props.open);
  }, [props.open]);

  const Arrow = direction === "ltr" ? ChevronRight : ChevronLeft;

  return (
    <Card>
      <Dialog
        fullWidth
        maxWidth="md"
        scroll="body"
        open={show}
        onClose={handleClose}
        TransitionComponent={Transition}
        onBackdropClick={handleClose}
      >
        <DialogContent
          sx={{
            px: { xs: 8, sm: 15 },
            py: { xs: 8, sm: 12.5 },
            position: "relative",
          }}
        >
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{ position: "absolute", right: "1rem", top: "1rem" }}
          >
            <Close />
          </IconButton>

          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Box>
                {isCompleted ? (
                  <Typography variant="h6" sx={{ mb: 4, textAlign: "left" }}>
                    Your file is downloaded 🥳
                  </Typography>
                ) : (
                  <Typography variant="h6" sx={{ mb: 4, textAlign: "left" }}>
                    Your file is being transferred...
                  </Typography>
                )}

                {isCompleted ? (
                  <Typography>
                    Your file is successfully downloaded and ready to be used!
                  </Typography>
                ) : (
                  <Typography>
                    Please wait while your file is being transferred and don't
                    close this window.
                  </Typography>
                )}

                <Box sx={{ width: "100%", mt: 6 }}>
                  <LinearProgressWithLabel
                    value={
                      // @ts-ignore
                      (props.chunkSize.current / nodeStore.fileDetails[1]) * 100
                    }
                  />
                </Box>

                {isCompleted ? (
                  <Alert
                    severity="success"
                    icon={false}
                    sx={{
                      mt: 6,
                      "& .MuiAlert-message": { overflow: "hidden" },
                    }}
                  >
                    <List>
                      <ListItem>
                        <FileDocumentOutline sx={{ mr: 1 }} />
                        <Typography variant="body1" sx={{ mr: 1 }}>
                          {
                            // @ts-ignore
                            nodeStore.fileDetails[0]
                          }
                        </Typography>
                      </ListItem>
                    </List>
                  </Alert>
                ) : (
                  <Alert
                    severity="info"
                    icon={false}
                    sx={{
                      mt: 6,
                      "& .MuiAlert-message": { overflow: "hidden" },
                    }}
                  >
                    <List>
                      <ListItem>
                        <FileDocumentOutline sx={{ mr: 1 }} />
                        <Typography variant="body1" sx={{ mr: 1 }}>
                          File Name:
                        </Typography>
                        <Typography variant="body1" sx={{ mr: 1 }}>
                          {
                            // @ts-ignore
                            nodeStore.fileDetails[0]
                          }
                        </Typography>
                      </ListItem>
                    </List>
                  </Alert>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TransferProgress;
