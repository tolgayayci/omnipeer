// ** React Imports
import { useState, SyntheticEvent, useEffect } from "react";

// ** MUI Imports
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Box, { BoxProps } from "@mui/material/Box";

// ** Icons Imports
import Microphone from "mdi-material-ui/Microphone";
import Paperclip from "mdi-material-ui/Paperclip";

// ** Types
import { SendMsgComponentType } from "src/context/chatTypes";
import { useAppSelector } from "src/store/hooks";

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

  const handleSendMsg = (e: SyntheticEvent) => {
    e.preventDefault();
    if (store && store.selectedChat && msg.trim().length) {
      dispatch(sendMsg({ ...store.selectedChat, message: msg }));
    }
    setMsg("");
  };

  useEffect(() => {
    //@ts-ignore
    console.log(node?.connectionManager.getConnections().length)
    console.log(node?.connectionManager.getConnections().map((c) => c.remoteAddr.toString()));
  }, []);  

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
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button type="submit" variant="contained" disabled>
            Send
          </Button>
        </Box>
      </ChatFormWrapper>
    </Form>
  );
};

export default SendMsgForm;
