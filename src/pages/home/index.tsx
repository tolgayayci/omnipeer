// ** MUI Imports
import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useAppSelector, useAppDispatch } from "src/store/hooks";

import Stats from "src/components/home/Stats";
import UploadOverview from "src/components/home/UploadOverview";
import IncomingStreamOverview from "src/components/home/IncomingStreamOverview";
import OutcomingStreamOverview from "src/components/home/OutgoingStreamOverview";
import PendingRequests from "src/components/home/PendingRequests";
import UserInvite from "src/components/home/UserInvite";

// ** Amplify Imports
import { API, Auth, graphqlOperation } from "aws-amplify";
import { listFriendships } from "src/graphql/queries";
import { FriendshipStatus } from "src/API";

const Home = () => {
  const [isThereFriends, setIsThereFriends] = useState<boolean>(false);

  const checkUser = async () => {

    const user = await Auth.currentAuthenticatedUser();

    const finalContacts = await API.graphql(
      graphqlOperation(listFriendships, {
        filter: {
          and: [
            { contactId: { ne: user.attributes.sub } },
            { status: { eq: FriendshipStatus.ACCEPTED } },
            { owners: { contains: user.attributes.sub } },
          ],
        },
      })
    // @ts-ignore
    ).then((res) => {
      // @ts-ignore
      if (res.data.listFriendships.items.length > 0) {
        setIsThereFriends(true);
      }
      setIsThereFriends(false);
    });
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Grid
      container
      spacing={6}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      flexWrap="nowrap"
      sx={{
        minHeight: "100%",
      }}
    >
      <Grid item xs={12} md={12} lg={12}>
        <UserInvite />
      </Grid>
      <Grid
        spacing={6}
        marginLeft={0}
        pt={6.5}
        container
        alignContent="center"
        flexDirection="row"
        sx={{
          maxWidth: "100%",
        }}
      >
        <Grid item xs={12} md={12} lg={12}>
          <UploadOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <IncomingStreamOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <OutcomingStreamOverview />
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={12}>
        {isThereFriends ? (
          <PendingRequests />
        ) : (
          null
        )
        }
      </Grid>
    </Grid>
  );
};

export default Home;
