import { useEffect, useState, SyntheticEvent } from "react";

// libp2p imports
import { createLibp2p } from "libp2p";
import { webSockets } from "@libp2p/websockets";
import { webRTCStar } from "@libp2p/webrtc-star";
import { Noise } from "@chainsafe/libp2p-noise";
import { mplex } from "@libp2p/mplex";
import { pipe } from "it-pipe";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { toString as uint8ArrayToString } from "uint8arrays/to-string";
import peerId from "peer-id";

// Type Imports
import type { Libp2p } from "libp2p";
import type { PeerId } from "@libp2p/interface-peer-id";

// Custom Component Imports
import FallbackSpinner from "src/@core/components/spinner";
import PeerTable from "./PeerTable";

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
import ChevronDown from "mdi-material-ui/ChevronDown";
import Plus from "mdi-material-ui/Plus";
import Minus from "mdi-material-ui/Minus";

const createNode = async () => {
  const star = new (webRTCStar as any)();

  const node = await createLibp2p({
    addresses: {
      // To signal the addresses we want to be available, we use
      // the multiaddr format, a self describable address
      listen: [
        "/dns4/pacific-shelf-40622.herokuapp.com/tcp/443/wss/p2p-webrtc-star/",
      ],
    },
    transports: [
      // We use the WebRTCStar transport to enable WebRTC
      webSockets(),
      star.transport,
    ],
    connectionEncryption: [() => new Noise()],
    streamMuxers: [mplex()],
    peerDiscovery: [star.discovery],
    connectionManager: {
        maxParallelDials: 150, // 150 total parallel multiaddr dials
        maxDialsPerPeer: 4, // Allow 4 multiaddrs to be dialed per peer in parallel
        dialTimeout: 10e3, // 10 second dial timeout per peer dial
        autoDial: true
    },
    nat: {
        enabled: false
    },
    metrics: {
        enabled: true
    }
  });

  await node.start();

  return node;
};

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
    padding: "{theme.spacing(4)} !important",
    marginTop: theme.spacing(5),
  })
);

const FindPeers = () => {
  const [node, setNode] = useState<Libp2p | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const [remotePeerId, setRemotePeerId] = useState<PeerId>();

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };  

  node?.addEventListener("peer:discovery", (evt) => {
    // No need to dial, autoDial is on
    console.log("Discovered:", evt.detail.id.toString());
  });

  node?.connectionManager.addEventListener("peer:connect", (evt) => {
    const connection = evt.detail;
    console.log(`Connected to ${connection.remotePeer.toString()}`);
    setRemotePeerId(connection.remotePeer)
    node?.peerStore.addressBook.set(connection.remotePeer, [connection.remoteAddr]);
  });

//   // Listen for peers disconnecting
//   node?.connectionManager.addEventListener("peer:disconnect", (evt) => {
//     const connection = evt.detail;
//     node?.peerStore.addressBook.delete(connection.remotePeer);
//     console.log(`Disconnected from ${connection.remotePeer.toString()}`);
//   });

  async function handleChangeRemotePeerId() {
    //@ts-ignore
    node?.dialProtocol(remotePeerId, ['/your-protocol']).then((stream) => {
        console.log('request send')

        pipe(
        [uint8ArrayFromString('my own protocol, wow!')],
        stream
        )

    }).catch((err) => {
        console.log(err)
    })
  }

  const expandIcon = (value: string) =>
    expanded === value ? <Minus /> : <Plus />;

  useEffect(() => {
    async function init() {
      const node = await createNode();
      setNode(node);
      setIsLoading(false);

      node?.handle('/your-protocol', ({ stream }) => {
        console.log('got a new stream')
        pipe(
          stream,
          source => (async function () {
            for await (const msg of source) {
              console.log(uint8ArrayToString(msg.subarray()))
            }
          })()
        )
      })
    }

    init();
  }, []);

  return {
    ...(isLoading ? (
      <FallbackSpinner />
    ) : (
      <>
        <Grid container spacing={5}>
          <Divider />
          <Grid item xs={12} sm={12}>
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
                {/* TODO: Show Peer ID's as random generated names  */}
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
                <Typography>Manually Connect</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={4} sx={{ marginLeft: "-20px" }}>
                  <Grid item xs={9}>
                    <TextField
                      label="Remote Peer Id"
                      placeholder="12D3KooWBr19pozVrpu7c4jqjHiWd26Z9uxQsHbL1ZPbhoRbQ2dw"
                      fullWidth
                      size="medium"
                    //   onChange={(e) =>
                    //     setRemotePeerId(
                    //       e.target.value
                    //     )
                    //   }
                    ></TextField>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      onClick={handleChangeRemotePeerId}
                      sx={{
                        height: "100%",
                      }}
                      variant="outlined"
                      color="warning"
                      fullWidth
                    >
                      Connect
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                id="customized-panel-header-2"
                expandIcon={expandIcon("panel2")}
                aria-controls="customized-panel-content-2"
              >
                <Typography>Show Peers & Connect</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12}>
                    {/* <PeerTable /> */}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </>
    )),
  };
};

export default FindPeers;
