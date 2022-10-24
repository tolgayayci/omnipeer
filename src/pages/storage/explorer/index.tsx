// ** MUI Imports
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";

const StorageExplorer = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={
            <Typography variant="h5">
              <Link href="">IPFS Explorer</Link>
            </Typography>
          }
          subtitle={
            <Typography variant="body2">
              Access your data on the decentralized web
            </Typography>
          }
        />
      </Grid>
    </Grid>
  );
};

export default StorageExplorer;
