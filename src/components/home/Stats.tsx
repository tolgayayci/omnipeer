// ** React Imports
import { useState, useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";

// ** Amplify Imports
import { API, graphqlOperation } from "aws-amplify";
import { listStorages } from "src/graphql/queries";
import AddFriends from "../friendship/AddFriends";

const Stats = () => {
  // ** States

  useEffect(() => {}, []);

  return (
    <Card>
      <CardHeader title="Stats" />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          No stats
        </Typography>
      </Box>
    </Card>
  );
};

export default Stats;
