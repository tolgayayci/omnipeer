// ** Next Imports
import Head from "next/head";
import { Router } from "next/router";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

// ** React Imports
import { useEffect, useState, createContext, useContext, useCallback } from "react";
import { Provider } from "react-redux";
import { store } from "src/store";

// ** Loader Import
import NProgress from "nprogress";

// ** Emotion Imports
import { CacheProvider } from "@emotion/react";
import type { EmotionCache } from "@emotion/cache";

// ** Config Imports
import themeConfig from "src/configs/themeConfig";

// ** Third Party Import
import { Toaster } from "react-hot-toast";

// ** Component Imports
import UserLayout from "src/layouts/UserLayout";
import ThemeComponent from "src/@core/theme/ThemeComponent";
import WindowWrapper from "src/@core/components/window-wrapper";

// ** Contexts
import {
  SettingsConsumer,
  SettingsProvider,
} from "src/@core/context/settingsContext";

// ** Styled Components
import ReactHotToast from "src/@core/styles/libs/react-hot-toast";

// ** Utils Imports
import { createEmotionCache } from "src/@core/utils/create-emotion-cache";

// ** Prismjs Styles
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";

// ** React Perfect Scrollbar Style
import "react-perfect-scrollbar/dist/css/styles.css";

// ** Global css styles
import "../../styles/globals.css";

// ** Amplify Imports
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../aws-exports";

// Libp2p Imports
import { createLibp2p, Libp2p } from "libp2p";
import { webSockets } from "@libp2p/websockets";
import { webRTCStar } from "@libp2p/webrtc-star";
import { Noise } from "@chainsafe/libp2p-noise";
import { mplex } from "@libp2p/mplex";

import { NodeContext } from "src/context/types";

import type { PeerId } from "@libp2p/interface-peer-id";

// libp2p imports
import { pipe } from "it-pipe";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";
import { toString as uint8ArrayToString } from "uint8arrays/to-string";

// ** Fake-DB Import
import "src/@fake-db";

Amplify.configure(awsExports);

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
}

// Libp2p Functions
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
      autoDial: true,
    },
    nat: {
      enabled: false,
    },
    metrics: {
      enabled: true,
    },
  });

  await node.start();

  return node;
};

export const MyNodeContext = createContext<NodeContext>({
  node: undefined,
  setNode: () => {},
  remotePeerIds: [],
  setRemotePeerIds: () => {},
  remotePeerIdAsString: "",
  setRemotePeerIdAsString: () => {},
  files: [],
  setFiles: () => {},
});

// @ts-ignore
export const useGlobalContext = () => useContext(MyNodeContext)

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [node, setNode] = useState<Libp2p | undefined>();
  const [remotePeerIds, setRemotePeerIds] = useState<PeerId[]>([]);
  const [remotePeerIdAsString, setRemotePeerIdAsString] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileDetails, setFileDetails] = useState<string[]>([]);

  // Variables
  const getLayout =
    Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>);

  const setConfig = Component.setConfig ?? undefined;

  const updateFile = useCallback( () => {
    console.log(files)
  }, [files])  

  useEffect(() => {
    const init = async () => {
      const node = await createNode();
      setNode(node);

      node?.handle("/send-stream-request", ({ stream, connection }) => {
        console.log("Stream Request Received");

        pipe(stream, (source) =>
          (async function () {
            for await (const msg of source) {
              const fileDetailsArray = uint8ArrayToString(msg.subarray()).split(
                " "
              );
              setFileDetails((prev) => [
                ...prev,
                fileDetailsArray[0],
                fileDetailsArray[1],
                fileDetailsArray[2],
              ]);
            }
          })()
        ).then(() => {
          //@ts-ignore
          node
            ?.dialProtocol(connection.remotePeer, [
              "/send-stream-request/answer",
            ])
            .then((stream) => {
              console.log("Answer Send");

              //TODO: Check the conditions!

              pipe([uint8ArrayFromString("YES")], stream);
            });
        });
      });

      node?.handle("/send-stream-request/answer", ({ stream, connection }) => {
        console.log("Answer Received");

        pipe(stream, (source) =>
          (async function () {
            for await (const msg of source) {
              if (uint8ArrayToString(msg.subarray()) === "YES") {
                console.log("YES");

                node
                  ?.dialProtocol(connection.remotePeer, ["/send-file"])
                  .then((stream) => {

                    if (files[0]) {
                      console.log("sending file");

                      const file = new File([files[0]], files[0].name);

                      const blob = new Blob([file], { type: files[0].type });

                      // Create a file reader
                      const reader = new FileReader();
                      // Set the reader to load as a data URL
                      reader.readAsArrayBuffer(blob);
                      // When the reader has loaded, set the image source to the data URL
                      reader.onload = () => {
                        var arrayBuffer = reader.result;

                        //@ts-ignore
                        var bytes = new Uint8Array(arrayBuffer);
                        console.log(bytes.byteLength);

                        // Send the file to the remote peer
                        pipe([bytes], stream);
                      };
                    }else{
                      console.log("file is undefined")

                      const data = files.map((file) => {  
                        console.log(file)
                      })

                      console.log(data)
                    }
                  });
              } else {
                console.log("NO");
              }
            }
          })()
        );
      });

      node?.handle("/send-file", ({ stream }) => {
        console.log("got a new stream");

        pipe(stream, (source) =>
          (async function () {
            for await (const msg of source) {
              var array = new Uint8Array(msg.length);

              //@ts-ignore
              for (var i = 0; i < msg.bufs.length; i++) {
                //@ts-ignore
                if (i === 0) {
                  //@ts-ignore
                  array.set(msg.bufs[i]);
                } else {
                  //@ts-ignore
                  array.set(msg.bufs[i], msg.bufs[i - 1].length);
                }
              }

              console.log(array.length);

              var blob = new Blob([array], { type: fileDetails[2] });

              console.log(blob);

              const aElement = document.createElement("a");
              aElement.setAttribute("download", fileDetails[0]);
              const href = URL.createObjectURL(blob);
              aElement.href = href;
              aElement.setAttribute("target", "_blank");
              aElement.click();
              URL.revokeObjectURL(href);
            }
          })()
        );
      });
    };

    init();
    updateFile();
  }, [updateFile]);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} - All Star P2P Platform`}</title>
          <meta
            name="description"
            content={`${themeConfig.templateName} for instant file transfer, storage and many features as p2p on one platform`}
          />
          <meta name="keywords" content="Omnipeer, P2P, omnipeer p2p, ipfs" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <MyNodeContext.Provider
          value={{
            node,
            setNode,
            remotePeerIds,
            setRemotePeerIds,
            remotePeerIdAsString,
            setRemotePeerIdAsString,
            files,
            setFiles
          }}
        >
          <SettingsProvider
            {...(setConfig ? { pageSettings: setConfig() } : {})}
          >
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <WindowWrapper>
                      {getLayout(<Component {...pageProps} />)}
                    </WindowWrapper>
                    <ReactHotToast>
                      <Toaster
                        position={settings.toastPosition}
                        toastOptions={{ className: "react-hot-toast" }}
                      />
                    </ReactHotToast>
                  </ThemeComponent>
                );
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </MyNodeContext.Provider>
      </CacheProvider>
    </Provider>
  );
};

export default withAuthenticator(App);
