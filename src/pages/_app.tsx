// ** Next Imports
import Head from "next/head";
import { Router } from "next/router";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

// ** React Imports
import { useEffect, useState } from "react";

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

// ** Fake-DB Import
import "src/@fake-db";

// ** Redux Imports
import { Provider } from "react-redux";
import { store } from "src/store";
import { createNode } from "src/store/apps/node";
import { getUserInfo, updateUserInfo } from "src/store/apps/user";

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
        
        store.dispatch(
          //@ts-ignore
          updateUserInfo(store.getState().node.node?.peerId.toString())
        );
      })
      .then(() => {
        store.dispatch(getUserInfo());
      })
      .catch((err) => {
        console.log(err);
      });

    // node?.handle("/send-stream-request", ({ stream, connection }) => {
    //   console.log("Stream Request Received");
    //   pipe(stream, (source) =>
    //     (async function () {
    //       for await (const msg of source) {
    //         const fileDetailsArray = uint8ArrayToString(msg.subarray()).split(
    //           " "
    //         );
    //         setFileDetails((prev) => [
    //           ...prev,
    //           fileDetailsArray[0],
    //           fileDetailsArray[1],
    //           fileDetailsArray[2],
    //         ]);
    //       }
    //     })()
    //   ).then(() => {
    //     //@ts-ignore
    //     node
    //       ?.dialProtocol(connection.remotePeer, [
    //         "/send-stream-request/answer",
    //       ])
    //       .then((stream) => {
    //         console.log("Answer Send");
    //         //TODO: Check the conditions!
    //         pipe([uint8ArrayFromString("YES")], stream);
    //       });
    //   });
    // });
    // node?.handle("/send-stream-request/answer", ({ stream, connection }) => {
    //   console.log("Answer Received");
    //   pipe(stream, (source) =>
    //     (async function () {
    //       for await (const msg of source) {
    //         if (uint8ArrayToString(msg.subarray()) === "YES") {
    //           console.log("YES");
    //           node
    //             ?.dialProtocol(connection.remotePeer, ["/send-file"])
    //             .then((stream) => {
    //               if (files[0]) {
    //                 console.log("sending file");
    //                 const file = new File([files[0]], files[0].name);
    //                 const blob = new Blob([file], { type: files[0].type });
    //                 // Create a file reader
    //                 const reader = new FileReader();
    //                 // Set the reader to load as a data URL
    //                 reader.readAsArrayBuffer(blob);
    //                 // When the reader has loaded, set the image source to the data URL
    //                 reader.onload = () => {
    //                   var arrayBuffer = reader.result;
    //                   //@ts-ignore
    //                   var bytes = new Uint8Array(arrayBuffer);
    //                   console.log(bytes.byteLength);
    //                   // Send the file to the remote peer
    //                   pipe([bytes], stream);
    //                 };
    //               }else{
    //                 console.log("file is undefined")
    //                 const data = files.map((file) => {
    //                   console.log(file)
    //                 })
    //                 console.log(data)
    //               }
    //             });
    //         } else {
    //           console.log("NO");
    //         }
    //       }
    //     })()
    //   );
    // });
    // node?.handle("/send-file", ({ stream }) => {
    //   console.log("got a new stream");
    //   pipe(stream, (source) =>
    //     (async function () {
    //       for await (const msg of source) {
    //         var array = new Uint8Array(msg.length);
    //         //@ts-ignore
    //         for (var i = 0; i < msg.bufs.length; i++) {
    //           //@ts-ignore
    //           if (i === 0) {
    //             //@ts-ignore
    //             array.set(msg.bufs[i]);
    //           } else {
    //             //@ts-ignore
    //             array.set(msg.bufs[i], msg.bufs[i - 1].length);
    //           }
    //         }
    //         console.log(array.length);
    //         var blob = new Blob([array], { type: fileDetails[2] });
    //         console.log(blob);
    //         const aElement = document.createElement("a");
    //         aElement.setAttribute("download", fileDetails[0]);
    //         const href = URL.createObjectURL(blob);
    //         aElement.href = href;
    //         aElement.setAttribute("target", "_blank");
    //         aElement.click();
    //         URL.revokeObjectURL(href);
    //       }
    //     })()
    //   );
    // });
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
