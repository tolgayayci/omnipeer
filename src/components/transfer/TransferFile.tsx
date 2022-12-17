import { useEffect, useState } from "react";

// libp2p imports
import { pipe } from "it-pipe";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";

import Grid from "@mui/material/Grid";

import toast from "react-hot-toast";

import { Button, fabClasses } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CheckCircleOutline from "mdi-material-ui/CheckCircleOutline";

import { useAppSelector } from "src/store/hooks";

const TransferFile = () => {
  const node = useAppSelector((state) => state.node.node);
  const remotePeerIds = useAppSelector((state) => state.node.remotePeerIds);
  const remotePeerIdAsString = useAppSelector(
    (state) => state.node.remotePeerIdAsString
  );
  const files = useAppSelector((state) => state.node.files);
  const isAccepted = useAppSelector((state) => state.node.isAccepted);
  const [status, setStatus] = useState<boolean>(false);
  const [isRequestSent, setIsRequestSent] = useState<boolean | null>(false);

  async function transferFile() {
    console.log(remotePeerIdAsString);
    const result = remotePeerIds?.find(
      (item) => item.toString() === remotePeerIdAsString
    );

    if (result === undefined) {
      toast.error(
        "Remote peer connection has lost, please refresh the page and try with new peer id!",
        {
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
          duration: 2000,
        }
      );
    } else {
      node?.dialProtocol(result, ["/send-stream-request"]).then((stream) => {
        console.log("Stream Request Send");
        setIsRequestSent(true);

        pipe(
          [
            uint8ArrayFromString(
              //@ts-ignore
              files[0].name + " " + files[0].size + " " + files[0].type
            ),
          ],
          stream
        );
      });
    }
  }

  useEffect(() => {
    console.log(isAccepted);
  }, [isAccepted]);

  return (
    <Grid container spacing={6}>
      {isAccepted !== null ? null : (
        <Grid item xs={12}>
          {isRequestSent ? (
            <Alert
              severity="info"
              icon={<CheckCircleOutline />}
              sx={{ mt: 6, "& .MuiAlert-message": { overflow: "hidden" } }}
            >
              <AlertTitle>
                <strong>File Transfer Request Sent</strong>
              </AlertTitle>
              Your file transfer request has been sent to the remote peer and
              waiting for the response.
            </Alert>
          ) : (
            <Alert
              severity="warning"
              icon={<CheckCircleOutline />}
              sx={{ mt: 6, "& .MuiAlert-message": { overflow: "hidden" } }}
            >
              <AlertTitle>
                <strong>File Transfer Request is Waiting</strong>
              </AlertTitle>
              You have not sent any file request to the remote peer, click on
              the button below to send the request.
            </Alert>
          )}
        </Grid>
      )}

      {isAccepted !== null ? (
        
        <Grid item xs={12}>
          {isAccepted ? (
            <>
              <Alert
                severity="success"
                icon={<CheckCircleOutline />}
                sx={{ mt: 6, "& .MuiAlert-message": { overflow: "hidden" } }}
              >
                <AlertTitle>
                  <strong>File Transfer Request Accepted</strong>
                </AlertTitle>
                Remote peer has accepted your file transfer request and transfer is in progress.
              </Alert>
            </>
          ) : (
            <Alert
              severity="error"
              icon={<CheckCircleOutline />}
              sx={{ mt: 6, "& .MuiAlert-message": { overflow: "hidden" } }}
            >
              <AlertTitle>
                <strong>File Transfer Request is Denied!</strong>
              </AlertTitle>
              Remote peer has denied your file transfer request.
            </Alert>
          )}
        </Grid>
      ) : null}

      <Grid item xs={12}>
        <Button
          sx={{
            height: "100%",
            color: "black",
            weight: "bold",
          }}
          variant="contained"
          color="warning"
          fullWidth
          onClick={transferFile}
          disabled={isAccepted !== null ? true : false}
        >
          Start File Transfer
        </Button>
      </Grid>
    </Grid>
  );
};

export default TransferFile;
