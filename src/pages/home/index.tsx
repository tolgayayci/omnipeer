// ** MUI Imports
import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useAppSelector, useAppDispatch } from "src/store/hooks";

import Stats from "src/components/home/Stats";
import UploadOverview from "src/components/home/UploadOverview";
import StreamOverview from "src/components/home/StreamOverview";
import PendingRequests from "src/components/home/PendingRequests";
import UserInvite from "src/components/home/UserInvite";

const Home = () => {

  const user = useAppSelector((state) => state.user);

  useEffect(() => {

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
        minHeight: "100%"
      }}
    >
      <Grid item xs={12} md={12} lg={12}>
        <UserInvite />
      </Grid>
      <Grid spacing={6} marginLeft={0} pt={6.5} container alignContent="center" flexDirection="row" sx={{
        maxWidth: "100%"
      }}>
        <Grid item xs={12} md={6} lg={6}>
          <UploadOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <StreamOverview />
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={12}>
        <PendingRequests />
      </Grid>
    </Grid>
  );
};

export default Home;
