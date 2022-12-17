// ** Next Imports
import Head from "next/head";
import { Router } from "next/router";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

// ** React Imports
import { useEffect, useState, useRef } from "react";

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

// ** Redux Imports
import { Provider } from "react-redux";
import { store } from "src/store";
import { createNode } from "src/store/apps/node";
import { getUserInfo, updateUserInfo } from "src/store/apps/user";
import { setFileDetails } from "src/store/apps/node";

// ** Libp2p Imports
import { pipe } from "it-pipe";
import { toString as uint8ArrayToString } from "uint8arrays/to-string";
import { fromString as uint8ArrayFromString } from "uint8arrays/from-string";

import TransferRequest from "src/components/transfer/TransferRequest";
import TransferProgress from "src/components/transfer/TransferProgress";

import { setIsAccepted } from "src/store/apps/node";

import type PeerId from "peer-id";

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

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isTransferRequest, setIsTransferRequest] = useState(false);
  const [isTransferRequestApproved, setIsTransferRequestApproved] =
    useState(false);
  const [peerId, setPeerId] = useState<PeerId>();
  const chunkSize = useRef(0);
  const [value, setValue] = useState<number>(0);

  // Variables
  const getLayout =
    Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>);

  const setConfig = Component.setConfig ?? undefined;

  store.subscribe(() => {
    setIsLoading(false);
  });

  useEffect(() => {
    store
      .dispatch(createNode())
      .then(() => {
        console.log("Node created");
      })
      .then(() => {
        store.dispatch(getUserInfo());
      })
      .then(() => {
        console.log("User info fetched");
        //@ts-ignore
        store.dispatch(
          //@ts-ignore
          updateUserInfo(store.getState().node.node.peerId.toString())
        );
      })
      .then(() => {
        store
          .getState()
          .node.node?.handle(
            "/send-stream-request",
            ({ stream, connection }) => {
              console.log("Stream Request Received");
              pipe(stream, (source) =>
                (async function () {
                  for await (const msg of source) {
                    const fileDetailsArray = uint8ArrayToString(
                      msg.subarray()
                    ).split(" ");
                    //@ts-ignore
                    store.dispatch(
                      //@ts-ignore
                      setFileDetails([
                        fileDetailsArray[0],
                        fileDetailsArray[1],
                        fileDetailsArray[2],
                        false
                      ])
                    );
                  }
                })()
              ).then(() => {
                //@ts-ignore
                store
                  .getState()
                  .node.node?.dialProtocol(connection.remotePeer, [
                    "/send-stream-request/answer",
                  ])
                  .then((stream) => {
                    //@ts-ignore
                    setPeerId(connection.remotePeer);
                    setIsTransferRequest(true);

                    // pipe([uint8ArrayFromString("NO")], stream)
                    stream.close();
                  });
              });
            }
          );
        store
          .getState()
          .node.node?.handle(
            "/send-stream-request/answer",
            ({ stream, connection }) => {
              console.log("Answer Received");
              pipe(stream, (source) =>
                (async function () {
                  for await (const msg of source) {
                    if (uint8ArrayToString(msg.subarray()) === "YES") {
                      console.log("YES");
                      store
                        .getState()
                        .node.node?.dialProtocol(connection.remotePeer, [
                          "/send-file",
                        ])
                        .then((stream) => {
                          if (store.getState().node.files?.length) {
                            console.log("sending file");

                            const file = new File(
                              //@ts-ignore
                              [store.getState().node.files[0]], store.getState().node.files[0].name
                            );

                            const blob = new Blob([file], {
                              // @ts-ignore
                              type: store.getState().node.files[0].type,
                            });

                            // Create a file reader
                            const reader = new FileReader();

                            // Set the reader to load as a data URL
                            reader.readAsArrayBuffer(blob);

                            // When the reader has loaded, set the image source to the data URL
                            reader.onload = () => {
                              var arrayBuffer = reader.result;

                              //@ts-ignore
                              var bytes = new Uint8Array(arrayBuffer);

                              console.log(bytes.length);

                              // Send the file to the remote peer
                              pipe([bytes], stream)
                              .then(() => {
                                console.log("File transfer is started");
                                //@ts-ignore
                                store.dispatch(setIsAccepted(true));
                              });

                            } 
                          } else {
                            console.log("file is undefined");
                            const data = store
                              .getState()
                              .node.files?.map((file) => {
                                console.log(file);
                              });
                            console.log(data);
                          }
                        })
                    } else {
                      console.log("NO");
                      store.dispatch(setIsAccepted(false));
                    }
                  }
                })()
              );
            }
          );
        store
          .getState()
          .node.node?.handle("/send-file", ({ stream }) => {
            console.log("got a new stream");

            pipe(
              stream.source,
              function logger(source) {
                var array = new Uint8Array(
                  //@ts-ignore
                  store.getState().node.fileDetails[1]
                );
                let counter = 0;

                return (async function* () {
                  // A generator is async iterable
                  for await (const msg of source) {

                    //@ts-ignore
                    for (var i = 0; i < msg.bufs.length; i++) {
                      if (i === 0 && counter === 0) {
                        //@ts-ignore
                        array.set(msg.bufs[i]);
                        //@ts-ignore
                        counter += msg.bufs[i].length;
                      } else {
                        //@ts-ignore
                        array.set(msg.bufs[i], counter);
                        //@ts-ignore
                        counter += msg.bufs[i].length;
                      }
                    }

                    //@ts-ignore
                    chunkSize.current += counter - chunkSize.current;
                    //@ts-ignore
                    setValue((chunkSize.current / store.getState().node.fileDetails[1]) * 100);
                  }

                  var blob = new Blob([array], {
                    //@ts-ignore
                    type: store.getState().node.fileDetails[2],
                  });

                  console.log(blob);

                  const aElement = document.createElement("a");
                  //@ts-ignore
                  aElement.setAttribute(
                    "download",
                    //@ts-ignore
                    store.getState().node.fileDetails[0]
                  );
                  const href = URL.createObjectURL(blob);
                  aElement.href = href;
                  aElement.setAttribute("target", "_blank");
                  aElement.click();
                  URL.revokeObjectURL(href);
                })();
              },
              stream.sink
            ).then(() => {
              console.log("stream closed");
            });
          });
      })
      .then(() => {
        //@ts-ignore
        store.getState().node.node?.pubsub.subscribe("chat");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Provider store={store}>
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <CacheProvider value={emotionCache}>
          <Head>
            <title>{`${themeConfig.templateName} - All Star P2P Platform`}</title>
            <meta
              name="description"
              content={`${themeConfig.templateName} for instant file transfer, storage and many features as p2p on one platform`}
            />
            <meta name="keywords" content="Omnipeer, P2P, omnipeer p2p, ipfs" />
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <SettingsProvider
            {...(setConfig ? { pageSettings: setConfig() } : {})}
          >
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <WindowWrapper>
                      {getLayout(<Component {...pageProps} />)}
                      <TransferRequest
                        open={isTransferRequest}
                        setOpen={setIsTransferRequest}
                        peerId={peerId}
                        setAccepted={setIsTransferRequestApproved}
                      />
                      <TransferProgress
                        open={isTransferRequestApproved}
                        setOpen={setIsTransferRequestApproved}
                        chunkSize={chunkSize}
                      />
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
        </CacheProvider>
      )}
    </Provider>
  );
};

export default withAuthenticator(App);
