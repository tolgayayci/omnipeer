import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/store";

// Libp2p Imports
import { createLibp2p, Libp2p } from "libp2p";
import { webSockets } from "@libp2p/websockets";
import { webRTCStar } from "@libp2p/webrtc-star";
import { Noise } from "@chainsafe/libp2p-noise";
import { mplex } from "@libp2p/mplex";
import { gossipsub } from "@chainsafe/libp2p-gossipsub";

import type { PeerId } from "@libp2p/interface-peer-id";

interface NodeState {
  node: Libp2p | null;
  peerId: PeerId | null;
  remotePeerIds: PeerId[] | null;
  remotePeerIdAsString: string | null;
  remotePeerAuthId: string | null;
  files: File[] | null;
  fileDetails: String[] | null;
  isAccepted: boolean | null;
}

const initialState: NodeState = {
  node: null,
  peerId: null,
  remotePeerIds: [],
  remotePeerIdAsString: "",
  remotePeerAuthId: "",
  files: [],
  fileDetails: [],
  isAccepted: null,
};

export const createNode = createAsyncThunk("node/createNode", async () => {
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
    pubsub: gossipsub({ allowPublishToZeroPeers: true }),
    streamMuxers: [mplex()],
    peerDiscovery: [star.discovery],
    connectionManager: {
      maxParallelDials: 150, // 150 total parallel multiaddr dials
      maxDialsPerPeer: 4, // Allow 4 multiaddrs to be dialed per peer in parallel
      dialTimeout: 10e3, // 10 second dial timeout per peer dial
      autoDial: true,
    },
    metrics: {
      enabled: true,
    },
  });

  await node.start();

  return node;
});

export const nodeSlice = createSlice({
  name: "node",
  initialState,
  reducers: {
    // ** Set Node
    setRemotePeerIds: (state, action) => {
      state.remotePeerIds = action.payload;
    },
    setRemotePeerIdAsString: (state, action) => {
      state.remotePeerIdAsString = action.payload;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setFileDetails: (state, action) => {
      state.fileDetails = action.payload;
    },
    setIsAccepted: (state, action) => {
      state.isAccepted = action.payload;
    },
    setRemotePeerAuthId: (state, action) => {
      state.remotePeerAuthId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createNode.fulfilled,
      (state, action: PayloadAction<Libp2p>) => {
        state.node = action.payload;
      }
    );
  },
});

export const {
  setRemotePeerIds,
  setRemotePeerIdAsString,
  setFiles,
  setFileDetails,
  setIsAccepted,
  setRemotePeerAuthId
} = nodeSlice.actions;

export const node = (state: RootState) => state.node.node;

export default nodeSlice.reducer;
