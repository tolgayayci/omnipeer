import { useEffect } from "react";

// libp2p imports
import { pipe } from "it-pipe";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";

import Grid from "@mui/material/Grid";

import toast from "react-hot-toast";

import { Button } from "@mui/material";

import { useAppSelector } from "src/store/hooks";

const TransferFile = () => {
  const node = useAppSelector((state) => state.node.node);
  const remotePeerIds = useAppSelector((state) => state.node.remotePeerIds);
  const remotePeerIdAsString = useAppSelector(
    (state) => state.node.remotePeerIdAsString
  );
  const files = useAppSelector((state) => state.node.files);

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
    console.log(files);
  }, [files]);

  return (
    <Grid container spacing={6}>
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
        >
          Start File Transfer
        </Button>
      </Grid>
    </Grid>
  );
};

export default TransferFile;
