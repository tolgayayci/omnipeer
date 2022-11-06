// ** MUI Imports
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";
import StepperWrapper from "src/components/transfer/Stepper";
import CardDetail from "src/views/transfer/Card";

const TransferFile = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant="h5">
            <Link href="">Real Time File Transfer</Link>
          </Typography>
        }
        subtitle={
          <Typography variant="body2">
            Transfer your files as p2p with webrtc
          </Typography>
        }
      />
      <Grid item xs={12}>
        {/* @ts-ignore */}
        <StepperWrapper />
      </Grid>
    </Grid>
  );
};

export default TransferFile;
