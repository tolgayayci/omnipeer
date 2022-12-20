// ** React Imports
import { useState, useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

// ** Amplify Imports
import { API, graphqlOperation } from "aws-amplify";
import { listStorages } from "src/graphql/queries";

interface StorageObj {
  cid: string;
  name: string;
  type: string;
  size: number;
}

interface StorageTableProps {
  isNewUpload: boolean;
}

const StorageTable = (props: StorageTableProps) => {
  // ** States
  const [pageSize, setPageSize] = useState<number>(10);
  const [storageData, setStorageData] = useState<any>([]);
  const [isThereUploads, setIsThereUploads] = useState<boolean>(false);

  useEffect(() => {

    console.log(props.isNewUpload)

    const fetchData = async () => {
      // TODO: set the nexttoken logic for pagination
      const allStorageObjects = await API.graphql({
        query: listStorages,
        variables: { limit: pageSize },
      });

      return allStorageObjects;
    };

    fetchData().then((result) => {
      // @ts-ignore
      setStorageData(result.data.listStorages.items);

      if(result.data.listStorages.items.length > 0) {
        setIsThereUploads(true);
      }
    });
  }, [pageSize, props.isNewUpload]);

  // ** Function to format Bytes
  // @ts-ignore
  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  function formatDate(date: string) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const _date = d.getDate();
    const time = `${d.getHours()}:${(d.getMinutes()<10?'0':'') + d.getMinutes()}`;
    return `${_date}/${month}/${year} - ${time}`;
  }

  const columns: GridColDef[] = [
    {
      flex: 0.175,
      minWidth: 120,
      headerName: "CID",
      field: "cid",
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.cid}
        </Typography>
      ),
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: "name",
      headerName: "Name",
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.name}
        </Typography>
      ),
    },
    {
      flex: 0.1,
      field: "size",
      minWidth: 80,
      headerName: "Size",
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {formatBytes(params.row.size)}
        </Typography>
      ),
    },
    {
      flex: 0.1,
      field: "createdAt",
      minWidth: 80,
      headerName: "Upload Date",
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {formatDate(params.row.createdAt)}
        </Typography>
      ),
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: "actions",
      headerName: "Actions",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Button
            size="small"
            variant="outlined"
            color="success"
            onClick={() => window.open("https://w3s.link/ipfs/" + params.row.cid, "_blank")}
            fullWidth
          >
            Show On IPFS
          </Button>
        );
      },
    },
  ];

  return (
    <>
    {isThereUploads ? (
      <Card sx={{mt: 8}}>
      <CardHeader title="Uploaded Objects" />
      <DataGrid
        autoHeight
        rows={storageData}
        columns={columns}
        pageSize={pageSize}
        disableSelectionOnClick
        rowsPerPageOptions={[10, 20, 50, 100]}
        getRowId={(row) => row.cid}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      />
    </Card>
    ) : (
      <Card sx={{mt:6 }}>
        <Box sx={{p: 4}}>
          <Typography sx={{color: "text.primary", fontSize: "17px"}}>
            There is no uploads yet, you can upload a file by clicking on the area above
          </Typography>
        </Box>
      </Card>
    )}
    </>
  );
};

export default StorageTable;
