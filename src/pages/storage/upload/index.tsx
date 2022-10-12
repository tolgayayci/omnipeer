// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import CardSnippet from 'src/@core/components/card-snippet'
import UploadFile from "src/components/storage/upload/UploadFile";
import StorageTable from "src/components/storage/upload/StorageTable";

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

const StorageUpload = () => {
  return (
    <DropzoneWrapper> 
      <Grid container spacing={6}>
        <PageHeader
          title={
            <Typography variant='h5'>
              <Link href='https://github.com/react-dropzone/react-dropzone/' target='_blank'>
                Upload File
              </Link>
            </Typography>
          }
          subtitle={<Typography variant='body2'>Upload your files to the decentralized web, it's as simple as drag and drop!</Typography>}
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
          <UploadFile />
        </Grid>
        <Grid item xs={12}>
          <StorageTable />
        </Grid>
      </Grid>
    </DropzoneWrapper>
  );
};

export default StorageUpload;
