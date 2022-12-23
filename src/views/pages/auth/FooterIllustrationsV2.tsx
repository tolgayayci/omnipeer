// ** React Imports
import { Fragment } from "react";

// ** MUI Components
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";

interface FooterIllustrationsProp {
  image?: string;
}

// Styled Components
const MaskImg = styled("img")(({ theme }) => ({
  zIndex: -1,
  bottom: "7%",
  height: "50%",
  width: "auto",
  position: "absolute",
  [theme.breakpoints.down("lg")]: {
    bottom: "17.5%",
  },
}));

const FooterIllustrationsV2 = (props: FooterIllustrationsProp) => {
  // ** Props
  const { image } = props;

  // ** Hook
  const theme = useTheme();

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  const src = "../images/pages/auth-v2-forgot-password-mask-dark.png";

  if (!hidden) {
    return (
      <Fragment>
        <MaskImg alt="mask" src={src} />
      </Fragment>
    );
  } else {
    return null;
  }
};

export default FooterIllustrationsV2;
