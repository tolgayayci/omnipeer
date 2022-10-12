// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardActivityTimeline from "src/components/home/CardActivityTimeline";

const Home = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6} lg={8}>
        <CardActivityTimeline />
      </Grid>
    </Grid>
  );
};

export default Home;
