// ** MUI Imports
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import List, { ListProps } from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";

import TableHeader from "src/views/transfer/TableHeader";

// ** Amplify Imports
import { API, Auth, graphqlOperation } from "aws-amplify";
import { getUser } from "src/graphql/queries";

// ** Icon Imports
// import Icon from 'src/@core/components/icon'
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "src/store/hooks";
import { setRemotePeerIdAsString } from "src/store/apps/node";

const StyledList = styled(List)<ListProps>(({ theme }) => ({
  "& .MuiListItem-container": {
    border: "1px solid rgba(234, 234, 255, 0.12)",
    "&:first-of-type": {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
    },
    "&:last-child": {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
    },
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "& .MuiListItem-root": {
      paddingRight: theme.spacing(24),
    },
    "& .MuiListItemText-root": {
      marginTop: 0,
      "& .MuiTypography-root": {
        fontWeight: 500,
      },
    },
  },
}));

type ListUsersProps = {
  users: string[];
  step: number;
  setStep: (step: number) => void;
};

const ListUsers = (props: ListUsersProps) => {
  const { users, step, setStep } = props;

  const node = useAppSelector((state) => state.node);
  const dispatch = useAppDispatch();

  const [peerIds, setPeerIds] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState<boolean[]>([]);

  const handleConnectionState = async (contactId: string, index: number) => {
    let peerId = API.graphql(graphqlOperation(getUser, { owner: contactId }));

    peerId
      .then(
        //@ts-ignore
        (contact) => {
          let peerIdsArray = peerIds;
          peerIdsArray.splice(index, 1, contact.data.getUser.peerId);
          setPeerIds(peerIdsArray);
        }
        //@ts-ignore
      )
      .then(() => {
        if (
          node.node
            ?.getConnections()
            .find(
              (connection) =>
                connection.remotePeer.toString() === peerIds[index]
            )
            ?.remotePeer.toString()
        ) {
          let onlineArray = isOnline;
          onlineArray.splice(index, 1, true);
          setIsOnline([...onlineArray]);
        } else {
          let onlineArray = isOnline;
          onlineArray.splice(index, 1, false);
          setIsOnline([...onlineArray]);
        }
      });
  };

  const pingPeer = async (peerId: string) => {
    let remotePeerId = node.remotePeerIds?.find(
      (remotePeerId) => remotePeerId.toString() === peerId
    );

    node.node
      ?.ping(remotePeerId!)
      .then((ping) => {
        console.log(ping);
        dispatch(setRemotePeerIdAsString(peerId));
        setStep(1);
        return true;
      })
      .catch((err) => {
        //Error Message
        console.log(err);
        return false;
      });

    return false;
  };

  const forceConnect = async (peerId: string) => {
    let remotePeerId = node.remotePeerIds?.find(
      (remotePeerId) => remotePeerId.toString() === peerId
    );

    if (remotePeerId) {
      node.node?.connectionManager
        .openConnection(remotePeerId)
        .then((connection) => {
          console.log(connection);
          return true;
        })
        .catch((err) => {
          //Error Message
          console.log(err);
          return false;
        });
    }

    //Error Message
    return false;
  };

  useEffect(() => {
    console.log(users.length);
    if (users.length > 0) {
      users.map((user, index) => {
        //@ts-ignore
        handleConnectionState(user.contactId, index);
      });
    }
  }, [node.remotePeerIds, users.length]);

  return (
    <Grid>
      <Grid item xs={12}>
        <TableHeader />
      </Grid>
      <Grid item xs={12}>
        {users.length > 0 ? (
          <StyledList disablePadding>
            {users.map((user, index) => (
              <ListItem sx={{ pl: 3, pr: 3 }}>
                <ListItemAvatar>
                  <Avatar
                    src={
                      // @ts-ignore
                      user.contact.avatar
                    }
                    //@ts-ignore
                    alt={user.contact.fullName}
                  />
                </ListItemAvatar>
                <div>
                  <ListItemText
                    primary={
                      // @ts-ignore
                      user.contact.fullName
                    }
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Box
                      sx={{
                        mr: 3,
                        display: "flex",
                        alignItems: "center",
                        "& svg": { mr: 1, color: "warning.main" },
                      }}
                    >
                      {
                        //@ts-ignore
                        isOnline[index] ? (
                          <Typography
                            variant="caption"
                            color="#00FF00"
                            fontWeight="500"
                          >
                            Online
                          </Typography>
                        ) : (
                          <Typography
                            variant="caption"
                            color="#FF0000"
                            fontWeight="500"
                          >
                            Offline
                          </Typography>
                        )
                      }
                    </Box>
                  </Box>
                </div>
                <ListItemSecondaryAction>
                  {isOnline[index] ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => pingPeer(peerIds[index])}
                    >
                      Select
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => forceConnect(peerIds[index])}
                    >
                      Connect
                    </Button>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </StyledList>
        ) : (
          <Typography fontWeight={400}>
            No contacts found. Add contacts to connect to them.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default ListUsers;
