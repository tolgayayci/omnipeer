import { useState, SyntheticEvent, useEffect } from "react";

// MUI Imports
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails, {
  AccordionDetailsProps,
} from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip";

// ** Icons Imports
import Web from "mdi-material-ui/Web";
import Server from "mdi-material-ui/Server";
import AccountCircleOutline from "mdi-material-ui/AccountCircleOutline";
import Plus from "mdi-material-ui/Plus";
import Minus from "mdi-material-ui/Minus";

import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { setRemotePeerIds, setRemotePeerIdAsString } from "src/store/apps/node";

import type { Friendship } from "src/API";
import ListUsers from "src/views/transfer/UserList";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listFriendships } from "src/graphql/queries";
import { FriendshipStatus } from "src/API";

// Styled component for Accordion component
const Accordion = styled(MuiAccordion)<AccordionProps>(({ theme }) => ({
  boxShadow: "none !important",
  border: "1px solid {theme.palette.divider}",
  "&:not(:last-of-type)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: "auto",
  },
  "&:first-of-type": {
    "& .MuiButtonBase-root": {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
  },
  "&:last-of-type": {
    "& .MuiAccordionSummary-root:not(.Mui-expanded)": {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
  },
}));

// Styled component for AccordionSummary component
const AccordionSummary = styled(MuiAccordionSummary)<AccordionSummaryProps>(
  ({ theme }) => ({
    marginBottom: -1,
    padding: theme.spacing(0, 4),
    minHeight: theme.spacing(12),
    borderBottom: "1px solid {theme.palette.divider}",
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[50]
        : theme.palette.background.default,
    "&.Mui-expanded": {
      minHeight: theme.spacing(12),
    },
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: "12px 0",
    },
  })
);

// Styled component for AccordionDetails component
const AccordionDetails = styled(MuiAccordionDetails)<AccordionDetailsProps>(
  ({ theme }) => ({
    padding: theme.spacing(8, 1),
    marginTop: theme.spacing(8),
  })
);

interface FindPeersProps {
  step: number;
  setStep: (step: number) => void;
}

const FindPeers = (props: FindPeersProps) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const node = useAppSelector((state) => state.node.node);
  const user = useAppSelector((state) => state.user);
  const remotePeerIds = useAppSelector((state) => state.node.remotePeerIds);
  const remotePeerIdAsString = useAppSelector(
    (state) => state.node.remotePeerIdAsString
  );
  const [contacts, setContacts] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  node?.connectionManager.addEventListener("peer:connect", (evt) => {
    const connection = evt.detail;
    console.log(`Connected to ${connection.remotePeer.toString()}`);
    node?.peerStore.addressBook.set(connection.remotePeer, [
      connection.remoteAddr,
    ]);
    //@ts-ignore
    dispatch(setRemotePeerIds([...remotePeerIds, connection.remotePeer]));
  });

  async function handleChangeRemotePeerId() {
    //TODO: Manually dial peer
  }

  const handleAddContact = async () => {
    const user = await Auth.currentAuthenticatedUser();

    await API.graphql(
      graphqlOperation(listFriendships, {
        filter: {
          and: [
            { contactId: { ne: user.attributes.sub } },
            { status: { eq: FriendshipStatus.ACCEPTED } },
            { owners: { contains: user.attributes.sub } },
          ],
        },
      })
    ) //@ts-ignore
      .then(async (result) => {
        if (result.data.listFriendships.items.length) {
          //@ts-ignore
          result.data.listFriendships.items.map(
            (contact: Friendship, index: number) => {
              let peerIdsArray = contacts;

              //@ts-ignore
              peerIdsArray.splice(index, 1, contact);

              setContacts(peerIdsArray);

              return true;
            }
          );
        }

        return false;

      })
      //@ts-ignore
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleAddContact();
  }, []);

  const expandIcon = (value: string) =>
    expanded === value ? <Minus /> : <Plus />;

  return (
    <>
      <Grid container spacing={5}>
        <Divider />
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            border: "1px solid white",
            borderRadius: "7px",
            margin: "15px 0",
            padding: "10px 20px!important",
            marginLeft: "1.25rem",
          }}
        >
          <List dense>
            <ListItem>
              <ListItemIcon>
                <Web />
              </ListItemIcon>
              <ListItemText primary="Status" />
              <CustomChip
                size="small"
                skin="light"
                color="success"
                label="Online"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Server />
              </ListItemIcon>
              <ListItemText primary="Signaling Server" />
              <CustomChip
                size="small"
                skin="light"
                color="warning"
                label="Omnipeer-East-1"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccountCircleOutline />
              </ListItemIcon>
              <ListItemText primary="Peer ID" />
              <Typography fontWeight={400}>
                {node?.peerId.toString()}
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Divider />
        <Grid item xs={12} sm={12}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              id="customized-panel-header-1"
              expandIcon={expandIcon("panel1")}
              aria-controls="customized-panel-content-1"
            >
              <Typography>Show Peers & Connect</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListUsers
                users={contacts}
                step={props.step}
                setStep={props.setStep}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </>
  );
};

export default FindPeers;
