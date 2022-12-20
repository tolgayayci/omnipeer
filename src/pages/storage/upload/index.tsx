// ** MUI Imports
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

// ** Custom Components Imports
import PageHeader from "src/@core/components/page-header";
import UploadFile from "src/components/storage/upload/UploadFile";
import StorageTable from "src/components/storage/upload/StorageTable";

// ** Styled Component
import DropzoneWrapper from "src/@core/styles/libs/react-dropzone";

const StorageUpload = () => {
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
        <PageHeader
          title={
            <Typography variant="h5">
              <Link href="">Upload File</Link>
            </Typography>
          }
          subtitle={
            <Typography variant="body2">
              Upload your files to the decentralized web, it's as simple as drag
              and drop!
            </Typography>
          }
        />
        <Grid item xs={12}>
          <Alert severity="error">
            <AlertTitle>Important Warning</AlertTitle>
            Uploading a file to IPFS will permanently upload this file to the
            network. There will be no way of removing this file from the network
            once it has been added.
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <DropzoneWrapper>
            <UploadFile />
          </DropzoneWrapper>
        </Grid>
      </Grid>
  );
};

export default StorageUpload;
