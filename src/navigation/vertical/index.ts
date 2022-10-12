// ** Icon imports
import HomeOutline from "mdi-material-ui/HomeOutline";
import ShieldOutline from "mdi-material-ui/ShieldOutline";
import CloudUpload from "mdi-material-ui/CloudUpload";
import TextBoxSearchOutline from "mdi-material-ui/TextBoxSearchOutline";
import ChartBar from "mdi-material-ui/ChartBar";
import FolderSwap from "mdi-material-ui/FolderSwap";

// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "Home",
      icon: HomeOutline,
      path: "/home",
    },
    {
      sectionTitle: "Storage",
    },
    {
      title: "Upload",
      icon: CloudUpload,
      path: "/storage/upload",
    },
    {
      title: "Explorer",
      icon: TextBoxSearchOutline,
      path: "/storage/explorer",
    },
    {
      sectionTitle: "File Transfer",
    },
    {
      title: "Transfer File",
      icon: FolderSwap,
    },
    {
      title: "Find Peers",
      icon: TextBoxSearchOutline,
    },
    {
      title: "Reports",
      icon: ChartBar,
    },
  ];
};

export default navigation;
