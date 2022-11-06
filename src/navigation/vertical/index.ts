// ** Icon imports
import HomeOutline from "mdi-material-ui/HomeOutline";
import CloudUpload from "mdi-material-ui/CloudUpload";
import Brush from "mdi-material-ui/Brush";
import AccountSwitch from "mdi-material-ui/AccountSwitch";
import ChatOutline from "mdi-material-ui/ChatOutline";

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
      title: "NFT",
      icon: Brush,
      path: "/storage/nft",
    },
    {
      sectionTitle: "File Transfer",
    },
    {
      title: "P2P",
      icon: AccountSwitch,
      path: "/transfer/",
    },
    {
      sectionTitle: "CHAT",
    },
    {
      title: "Messenger",
      icon: ChatOutline,
      path: "/chat/",
    },
  ];
};

export default navigation;
