// ** React Imports
import { Fragment, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography, { TypographyProps } from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

// ** Icons Imports
import Close from "mdi-material-ui/Close";
import FileDocumentOutline from "mdi-material-ui/FileDocumentOutline";

// ** Third Party Components
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";

// ** Web3 Storage
import { Web3Storage } from "web3.storage";

// ** Amplify Imports
import { API, graphqlOperation } from "aws-amplify";
import { createStorage } from "src/graphql/mutations";

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return (
    process.env.WEB3_STORAGE_TOKEN ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhhMTc4QjJjQjE5OTQ3ZDgyNTZGRGUyYWY2ODhBM2ZiRTk4QjZCRkEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjUyMjQ5OTQ3OTIsIm5hbWUiOiJvbW5pcGVlciJ9.79LIuUXhMGPrl5eW2IOwO12KTCh0d0dtq1RuA7Tp7nQ"
  );
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

interface FileProp {
  name: string;
  type: string;
  size: number;
}

// Styled component for the upload image inside the dropzone area
const Img = styled("img")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    marginRight: theme.spacing(10),
  },
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.down("sm")]: {
    width: 250,
  },
}));

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(4),
  },
}));

const UploadFile = () => {
  // ** State
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 100000000,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)));
    },
    onDropRejected: () => {
      toast.error("You can only upload 1 file & maximum size of 2 MB.", {
        duration: 2000,
      });
    },
  });

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          width={38}
          height={38}
          alt={file.name}
          src={URL.createObjectURL(file as any)}
        />
      );
    } else {
      return <FileDocumentOutline />;
    }
  };

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter(
      (i: FileProp) => i.name !== file.name
    );
    setFiles([...filtered]);
  };

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name}>
      <div className="file-details">
        <div className="file-preview">{renderFilePreview(file)}</div>
        <div>
          <Typography className="file-name">{file.name}</Typography>
          {/* <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? {(Math.round(file.size / 100) / 10000).toFixed(1)} mb
              : {(Math.round(file.size / 100) / 10).toFixed(1)} kb}
          </Typography> */}
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Close fontSize="small" />
      </IconButton>
    </ListItem>
  ));

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  async function storeWithProgress() {
    setLoading(true);
    // show the root cid as soon as it's ready
    const onRootCidReady = (cid: string) => {
      console.log("uploading files with cid:", cid);
    };

    // when each chunk is stored, update the percentage complete and display
    const totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0);
    let uploaded = 0;

    const onStoredChunk = (size: number) => {
      uploaded += size;
      const pct = 100 * (uploaded / totalSize);
      console.log(`Uploading... ${pct.toFixed(0)}% complete`);
    };

    // makeStorageClient returns an authorized web3.storage client instance
    const client = makeStorageClient();

    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    return client.put(files, { onRootCidReady, onStoredChunk });
  }

  const handleUploadFile = () => {
    // ** Handle upload file heretoast.success('File uploaded successfully.')
    files.map((file: FileProp) =>
      storeWithProgress().then((data) => {
        setLoading(false);
        toast.success("File uploaded successfully.");
        const newStorage = API.graphql(
          graphqlOperation(createStorage, {
            input: {
              cid: data,
              name: file.name,
              type: file.type,
              size: file.size,
            },
          })
        ); // equivalent to above example
      })
    );
  };

  return (
    <Fragment>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Box
          sx={{
            display: "flex",
            flexDirection: ["column", "column", "row"],
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: ["center", "center", "inherit"],
            }}
          >
            <HeadingTypography variant="h5">
              Drop files here or click to upload.
            </HeadingTypography>
            <Typography color="textSecondary">
              Allowed *.jpeg, *.jpg, *.png, *.gif
            </Typography>
            <Typography color="textSecondary">
              Max 1 file and max size of 100 MB
            </Typography>
          </Box>
        </Box>
      </div>
      {files.length ? (
        <Fragment>
          <List>{fileList}</List>
          <div className="buttons">
            {/* <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove All
            </Button>
            <Button variant='contained' onClick={handleUploadFile}>Upload Files</Button> */}
            <LoadingButton
              onClick={handleUploadFile}
              endIcon={<FileDocumentOutline />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              Upload
            </LoadingButton>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default UploadFile;
