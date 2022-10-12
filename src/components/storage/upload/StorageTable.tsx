// ** React Imports
import { useState, useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

// ** Third Party Components
import toast from "react-hot-toast";

// ** Types Imports
import { ThemeColor } from "src/@core/layouts/types";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";

// ** Data Import
import { rows } from "src/@fake-db/table/static-data";

// ** Amplify Imports
import { API, graphqlOperation } from 'aws-amplify';
import { listStorages } from 'src/graphql/queries';

import FallbackSpinner from "src/@core/components/spinner";

interface StorageObj {
  cid: string;
  name: string;
  type: string;
  size: number;
}

const StorageTable = () => {
  // ** States
  const [pageSize, setPageSize] = useState<number>(10);
  const [storageData, setStorageData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      // TODO: set the nexttoken logic for pagination
      const allStorageObjects = await API.graphql({ query: listStorages, variables: {limit: pageSize} });

      return allStorageObjects
    }

    fetchData().then((result) => {
      console.log('fetched data');
      // @ts-ignore
      setStorageData(result.data.listStorages.items)
    })
  }, [pageSize]);

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
          {params.row.size}
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
          {params.row.createdAt}
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
            onClick={() => console.log("share")}
          >
            Share
          </Button>
        );
      },
    },
  ];

  return (
    <Card>
      <CardHeader
        title="Uploaded Objects"
      />
      <DataGrid
        autoHeight
        rows={storageData}
        columns={columns}
        pageSize={pageSize}
        disableSelectionOnClick
        rowsPerPageOptions={[10, 20, 50, 100]}
        getRowId={row => row.cid}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      />
    </Card>
  );
};

export default StorageTable;
