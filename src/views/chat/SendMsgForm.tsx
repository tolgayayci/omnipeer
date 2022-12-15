// ** React Imports
import { useState, SyntheticEvent, useEffect } from "react";

// ** MUI Imports
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Box, { BoxProps } from "@mui/material/Box";

// ** Icons Imports
import SendIcon from "mdi-material-ui/Send";

// ** Types
import { SendMsgComponentType } from "src/context/chatTypes";
import { useAppSelector } from "src/store/hooks";

import { LoadingButton } from "@mui/lab";

// ** Amplify Imports
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";

// ** Styled Components
const ChatFormWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  borderRadius: 8,
  alignItems: "center",
  boxShadow: theme.shadows[1],
  padding: theme.spacing(1.25, 4),
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.paper,
}));

const Form = styled("form")(({ theme }) => ({
  padding: theme.spacing(0, 5, 5),
}));

const SendMsgForm = (props: SendMsgComponentType) => {
  // ** Props
  const { store, dispatch, sendMsg } = props;

  // ** State
  const [msg, setMsg] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const node = useAppSelector((state) => state.node.node);

  const handleSendMsg = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (store && store.selectedChat && msg.trim().length && isConnected) {
      node?.pubsub
        .publish("chat", uint8ArrayFromString(msg))
        .then((data) => {
          if (
            data.recipients
              .find(
                (peerId) =>
                  peerId.toString() === store.selectedChat?.contact.peerId
              )
              ?.toString()
          ) {
            console.log("Message sent successfully");
            dispatch(sendMsg({ ...store.selectedChat, message: msg }));
            setMsg("");
          }
        })
        .catch((err) => {
          console.log(err);
        });

      //TODO: Add Validator for Message
    }
  };

  useEffect(() => {
    //@ts-ignore
    if (!isConnected) {
      const connInterval = setInterval(async () => {
        if (
          node?.connectionManager
            .getConnections()
            .find(
              (c) =>
                c.remotePeer.toString() === store.selectedChat?.contact.peerId
            )
        ) {
          setIsConnected(true);
          clearInterval(connInterval);
        }
      }, 1000);
    }
  }, [node?.connectionManager.getConnections(), store.selectedChat]);

  useEffect(() => {
    //@ts-ignore
  }, [isConnected]);

  return (
    <Form onSubmit={handleSendMsg}>
      <ChatFormWrapper>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            value={msg}
            size="small"
            placeholder="Type your message here…"
            onChange={(e) => setMsg(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-input": { pl: 0 },
              "& fieldset": { border: "0 !important" },
            }}
            disabled={!isConnected}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isConnected ? (
            <Button type="submit" variant="contained" startIcon={<SendIcon />}>
              Send
            </Button>
          ) : (
            <LoadingButton
              startIcon={<SendIcon />}
              loading={true}
              loadingPosition="start"
              variant="outlined"
            >
              Connecting
            </LoadingButton>
          )}
        </Box>
      </ChatFormWrapper>
    </Form>
  );
};

export default SendMsgForm;
