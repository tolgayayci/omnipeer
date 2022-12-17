// ** React Imports
import { useState, SyntheticEvent, Fragment } from "react";

// ** MUI Imports
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import MuiAvatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box, { BoxProps } from "@mui/material/Box";

// ** Icons Imports
import MenuIcon from "mdi-material-ui/Menu";
import DotsVertical from "mdi-material-ui/DotsVertical";
import MessageOutline from "mdi-material-ui/MessageOutline";

// ** Custom Components Import
import ChatLog from "./ChatLog";
import SendMsgForm from "src/views/chat/SendMsgForm";
import CustomAvatar from "src/@core/components/mui/avatar";

// ** Types
import { ChatContentType } from "src/context/chatTypes";

import { useAppSelector, useAppDispatch } from "src/store/hooks";
import { fetchChatsContacts, selectChat } from "src/store/apps/chat";

import { toString as uint8ArrayToString } from "uint8arrays/to-string";

// ** Styled Components
const ChatWrapperStartChat = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  height: "100%",
  display: "flex",
  borderRadius: 1,
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: theme.palette.action.hover,
}));

const ChatContent = (props: ChatContentType) => {
  // ** Props
  const {
    store,
    hidden,
    sendMsg,
    mdAbove,
    dispatch,
    statusObj,
    getInitials,
    sidebarWidth,
    userProfileRightOpen,
    handleLeftSidebarToggle,
    handleUserProfileRightSidebarToggle,
  } = props;

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const [updated, setUpdated] = useState(false);

  const handleClick = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStartConversation = () => {
    if (!mdAbove) {
      handleLeftSidebarToggle();
    }
  };

  const nodeStore = useAppSelector((state) => state.node.node);

  nodeStore?.pubsub.addEventListener("message", (msg) => {
    //@ts-ignore
    if (msg.detail.topic !== "chat") return;

    dispatch(fetchChatsContacts());
  });

  const renderContent = () => {
    if (store) {
      const selectedChat = store.selectedChat;

      if (!selectedChat) {
        return (
          <ChatWrapperStartChat
            sx={{
              ...(mdAbove
                ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
                : {}),
            }}
          >
            <MuiAvatar
              sx={{
                mb: 5,
                pt: 8,
                pb: 7,
                px: 7.5,
                width: 110,
                height: 110,
                backgroundColor: "background.paper",
                boxShadow: (theme) => theme.shadows[3],
              }}
            >
              <MessageOutline
                sx={{ width: 50, height: 50, color: "action.active" }}
              />
            </MuiAvatar>
            <Box
              onClick={handleStartConversation}
              sx={{
                px: 6,
                py: 2.25,
                borderRadius: 5,
                backgroundColor: "background.paper",
                boxShadow: (theme) => theme.shadows[3],
                cursor: mdAbove ? "default" : "pointer",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>
                Start Conversation
              </Typography>
            </Box>
          </ChatWrapperStartChat>
        );
      } else {
        return (
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              height: "100%",
              backgroundColor: (theme) => theme.palette.action.hover,
            }}
          >
            <Box
              sx={{
                py: 3,
                px: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {mdAbove ? null : (
                  <IconButton onClick={handleLeftSidebarToggle} sx={{ mr: 2 }}>
                    <MenuIcon />
                  </IconButton>
                )}
                <Box
                  onClick={handleUserProfileRightSidebarToggle}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    sx={{ mr: 4.5 }}
                    badgeContent={
                      <Box
                        component="span"
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          // color: `${
                          //   statusObj[selectedChat.contact.status]
                          // }.main`,
                          // boxShadow: (theme) =>
                          //   `0 0 0 2px ${theme.palette.background.paper}`,
                          // backgroundColor: `${
                          //   statusObj[selectedChat.contact.status]
                          // }.main`,
                        }}
                      />
                    }
                  >
                    {selectedChat.contact.avatar ? (
                      <MuiAvatar
                        src={selectedChat.contact.avatar}
                        alt={selectedChat.contact.fullName}
                        sx={{ width: 40, height: 40 }}
                      />
                    ) : (
                      <CustomAvatar
                        skin="light"
                        color={selectedChat.contact.avatarColor}
                        sx={{ width: 40, height: 40, fontSize: "1rem" }}
                      >
                        {getInitials(selectedChat.contact.fullName)}
                      </CustomAvatar>
                    )}
                  </Badge>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ color: "text.secondary" }}>
                      {selectedChat.contact.fullName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.disabled" }}>
                      {selectedChat.contact.role}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  size="small"
                  onClick={handleClick}
                  sx={{ color: "text.secondary" }}
                >
                  <DotsVertical />
                </IconButton>
                <Menu
                  open={open}
                  sx={{ mt: 2 }}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleClose}>View Contact</MenuItem>
                  <MenuItem onClick={handleClose}>Mute Notifications</MenuItem>
                  <MenuItem onClick={handleClose}>Block Contact</MenuItem>
                  <MenuItem onClick={handleClose}>Clear Chat</MenuItem>
                  <MenuItem onClick={handleClose}>Report</MenuItem>
                </Menu>
              </Box>
            </Box>

            {selectedChat && store.userProfile ? (
              <ChatLog
                hidden={hidden}
                data={{ ...selectedChat, userContact: store.userProfile }}
              />
            ) : null}

            <SendMsgForm store={store} dispatch={dispatch} sendMsg={sendMsg} />
          </Box>
        );
      }
    } else {
      return null;
    }
  };

  return renderContent();
};

export default ChatContent;
