// ** React Imports
import { ReactElement, useEffect, useState} from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Icons Imports
import Poll from "mdi-material-ui/Poll";
import ChevronUp from "mdi-material-ui/ChevronUp";
import TrendingUp from "mdi-material-ui/TrendingUp";
import DotsVertical from "mdi-material-ui/DotsVertical";
import AccountOutline from "mdi-material-ui/AccountOutline";
import FileUploadOutline from "mdi-material-ui/FileUploadOutline";
import CalendarImport from "mdi-material-ui/CalendarImport";
import PencilOutline from "mdi-material-ui/PencilOutline";

// ** Types
import { ThemeColor } from "src/@core/layouts/types";

// ** Custom Components Imports
import CustomAvatar from "src/@core/components/mui/avatar";

// ** Amplify Imports
import { API, graphqlOperation } from "aws-amplify";
import { listStorages} from "src/graphql/queries";

const UploadOverview = () => {

  const [totalUploadedSize, setTotalUploadedSize] = useState<string>("0 MB");
  const [totalUploadedFiles, setTotalUploadedFiles] = useState<number>(0);
  const [lastUpload, setLastUpload] = useState<string>("No Upload");
  const [lastFile, setLastFile] = useState<string>("No File");

  interface SaleDataType {
    stats: string;
    title: string;
    color: ThemeColor;
    icon: ReactElement;
  }
  
  const renderStats = () => {
    return salesData.map((sale: SaleDataType, index: number) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
          <CustomAvatar
            skin="light"
            variant="rounded"
            color={sale.color}
            sx={{ mr: 4 }}
          >
            {sale.icon}
          </CustomAvatar>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {sale.stats}
            </Typography>
            <Typography variant="caption">{sale.title}</Typography>
          </Box>
        </Box>
      </Grid>
    ));
  };

  const salesData: SaleDataType[] = [
    {
      stats: totalUploadedFiles.toString(),
      color: "primary",
      title: "Uploads",
      icon: <FileUploadOutline />,
    },
    {
      icon: <Poll />,
      stats: totalUploadedSize,
      color: "warning",
      title: "Total Upload Size",
    },
    {
      color: "error",
      stats: lastFile.substring(0, 12) + "...",
      icon: <PencilOutline />,
      title: "Last Uploaded File",
    },
    {
      color: "info",
      stats: lastUpload,
      icon: <CalendarImport />,
      title: "Last Upload Date",
    },
  ];

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

  const handleCheckStats = async () => {

    let size = 0;
    let date = new Date();

    await API.graphql(graphqlOperation(listStorages))
      // @ts-ignore
      .then((res) => {
        res.data.listStorages.items.map((item: any) => {
          size += item.size;
          
          if (item.createdAt > date) {
            date = new Date(item.createdAt);
          }

        });

        console.log(date)

        setTotalUploadedSize(formatBytes(size));
        setTotalUploadedFiles(res.data.listStorages.items.length);
        setLastFile(res.data.listStorages.items[res.data.listStorages.items.length - 1].name);
        setLastUpload(date.getDate().toString() + "/" + (date.getMonth() + 1).toString() + "/" + date.getFullYear().toString());
      })
      // @ts-ignore
      .catch((err) => {
        console.log(err);
      });

  };

  useEffect(() => {
    handleCheckStats();
  }, []);

  return (
    <Card>
      <CardHeader
        title="Upload Overview"
        titleTypographyProps={{ variant: "h6" }}
        action={
          <IconButton aria-label="settings" className="card-more-options">
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent>
          <Grid container spacing={6}>
            {renderStats()}
          </Grid>
      </CardContent>
    </Card>
  );
};

export default UploadOverview;
