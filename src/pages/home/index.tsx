// ** MUI Imports
import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import { API, Auth, graphqlOperation } from "aws-amplify";
import { createUser } from "src/graphql/mutations";
import { getUser } from "src/graphql/queries";
import { useAppSelector } from "src/store/hooks";

const Home = () => {
  const node = useAppSelector((state) => state.node.node?.peerId.toString());

  const checkUser = async () => {};

  useEffect(() => {
    console.log(node);
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6} lg={8}></Grid>
    </Grid>
  );
};

export default Home;
