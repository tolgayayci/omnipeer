// ** React Imports
import { ReactElement, useState, useEffect } from "react";

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

// ** Types
import { ThemeColor } from "src/@core/layouts/types";

// ** Custom Components Imports
import CustomAvatar from "src/@core/components/mui/avatar";

// ** Amplify Imports
import { API, Auth, graphqlOperation } from "aws-amplify";
import { listStreams } from "src/graphql/queries";
import { StreamStatus } from "src/API";

const IncomingStreamOverview = () => {

  const [totalUploadedSize, setTotalUploadedSize] = useState<string>("0 MB");
  const [totalUploadedFiles, setTotalUploadedFiles] = useState<number>(0);
  const [lastUpload, setLastUpload] = useState<string>("No Stream");

  interface SaleDataType {
    stats: string;
    title: string;
    color: ThemeColor;
    icon: ReactElement;
  }
  
  const renderStats = () => {
    return salesData.map((sale: SaleDataType, index: number) => (
      <Grid item xs={12} sm={4} key={index}>
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
      title: "Streams",
      icon: <FileUploadOutline />,
    },
    {
      icon: <Poll />,
      stats: totalUploadedSize,
      color: "warning",
      title: "Total Stream Size",
    },
    {
      color: "info",
      stats: lastUpload,
      icon: <CalendarImport />,
      title: "Last Stream Date",
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

    const user = await Auth.currentAuthenticatedUser();

    let size = 0;
    let date = lastUpload || new Date();

    await API.graphql(graphqlOperation(listStreams, { filter: {
      and: [
        { owners: { contains: user.attributes.sub } },
        { status : { eq:  StreamStatus.COMPLETED} },
        { userStreamsId: { ne: user.attributes.sub } },
      ]
    }}))
      // @ts-ignore
      .then((res) => {
        res.data.listStreams.items.map((item: any) => {
          size += item.size;
          
          if (item.createdAt > date) {
            date = new Date(item.createdAt);
          }

        });

        setTotalUploadedSize(formatBytes(size));
        setTotalUploadedFiles(res.data.listStreams.items.length);

        if(date !== lastUpload){
          const finalDate = new Date(date);
          setLastUpload(finalDate.getDate().toString() + "/" + (finalDate.getMonth() + 1).toString() + "/" + finalDate.getFullYear().toString());
        }

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
        title="Streaming Overview (Incoming)"
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

export default IncomingStreamOverview;
