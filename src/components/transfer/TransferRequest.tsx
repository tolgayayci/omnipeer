// ** React Imports
import { Ref, useState, useEffect, forwardRef, ReactElement } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Fade, { FadeProps } from "@mui/material/Fade";
import DialogContent from "@mui/material/DialogContent";

// ** Icons Imports
import Close from "mdi-material-ui/Close";
import CogOutline from "mdi-material-ui/CogOutline";
import LockOutline from "mdi-material-ui/LockOutline";
import ChevronLeft from "mdi-material-ui/ChevronLeft";
import ChevronRight from "mdi-material-ui/ChevronRight";
import MessageOutline from "mdi-material-ui/MessageOutline";

// ** Hooks
import useBgColor from "src/@core/hooks/useBgColor";
import { useSettings } from "src/@core/hooks/useSettings";

import { useAppDispatch, useAppSelector } from "src/store/hooks";
import node, { setFileDetails } from "src/store/apps/node";

// ** Libp2p Imports
import { pipe } from "it-pipe";
import { toString as uint8ArrayToString } from "uint8arrays/to-string";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";

import type PeerId from "peer-id";
import { FormatListChecks, Label } from "mdi-material-ui";
import { FormLabel } from "@mui/material";

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

interface DialogAuthenticationProps {
  open: boolean;
  peerId: PeerId | undefined;
  setOpen: (open: boolean) => void;
  setAccepted: (accepted: boolean) => void;
}

const TransferRequest = (props: DialogAuthenticationProps) => {
  // ** States
  const [show, setShow] = useState<boolean>(false);

  const { settings } = useSettings();

  const nodeStore = useAppSelector((state) => state.node);

  const handleAnswer = (answer: string) => {
    // @ts-ignore
    nodeStore.node?.dialProtocol(props.peerId, ["/send-stream-request/answer"])
      .then((stream) => {
        if (stream && answer === "YES") {
          pipe([uint8ArrayFromString("YES")], stream);
          props.setAccepted(true);
        } else {
          pipe([uint8ArrayFromString("NO")], stream);
          props.setAccepted(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Create a promise to wait user click on the button

  const handleUserClick = (status: boolean) => {
    if (status) {
      handleAnswer("YES");
      props.setOpen(false);
    } else {
      handleAnswer("NO");
      props.setOpen(false);
    }
  };

  // ** Var
  const { direction } = settings;

  useEffect(() => {
    setShow(props.open);
    //@ts-ignore
  }, [props.open]);

  const Arrow = direction === "ltr" ? ChevronRight : ChevronLeft;

  return (
    <Card>
      <Dialog
        fullWidth
        maxWidth="md"
        scroll="body"
        open={show}
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
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
            onClick={() => setShow(false)}
            sx={{ position: "absolute", right: "1rem", top: "1rem" }}
          >
            <Close />
          </IconButton>

          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Box>
                <Typography variant="h5" sx={{ mb: 4, textAlign: "center" }}>
                  File Transfer Request
                </Typography>

                <Alert
                  severity="warning"
                  icon={false}
                  sx={{ mb: 6, "& .MuiAlert-message": { overflow: "hidden" } }}
                >
                  Please review carefully the file details before accepting the
                  request. <br /> If you accept the request, the file will be
                  downloaded to your device.
                </Alert>

                <Grid item sm={12} xs={12} sx={{ mb: 6 }}>
                  <TextField
                    fullWidth
                    label="Peer ID"
                    defaultValue={props.peerId?.toString()}
                    disabled
                    size="medium"
                  />
                </Grid>
                <Grid item sm={12} xs={12} sx={{ mb: 6 }}>
                  <TextField
                    fullWidth
                    label="File Name"
                    //@ts-ignore
                    defaultValue={nodeStore.fileDetails[0]}
                    disabled
                    size="medium"
                  />
                </Grid>
                <Grid item sm={12} xs={12} sx={{ mb: 6 }}>
                  <TextField
                    fullWidth
                    label="File Size"
                    //@ts-ignore
                    defaultValue={nodeStore.fileDetails[1] + " KB"}
                    disabled
                    size="medium"
                  />
                </Grid>
                <Grid item sm={12} xs={12} sx={{ mb: 6 }}>
                  <TextField
                    fullWidth
                    label="File Type"
                    //@ts-ignore
                    defaultValue={nodeStore.fileDetails[2]}
                    disabled
                    size="medium"
                  />
                </Grid>
                <Grid container spacing={6}>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleUserClick(false)}
                      sx={{ mr: 4 }}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="contained"
                      endIcon={<Arrow />}
                      onClick={() => handleUserClick(true)}
                    >
                      Accept
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TransferRequest;
