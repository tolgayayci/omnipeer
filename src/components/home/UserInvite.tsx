// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid, { GridProps } from "@mui/material/Grid";

// ** Hook
import { useSettings } from "src/@core/hooks/useSettings";
import { useAppSelector } from "src/store/hooks";

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    order: -1,
    display: "flex",
    justifyContent: "center",
  },
}));

// Styled component for the image
const Img = styled("img")(({ theme }) => ({
  right: 0,
  bottom: 0,
  width: 298,
  position: "absolute",
  [theme.breakpoints.down("sm")]: {
    width: 250,
    position: "static",
  },
}));

const UserInvite = () => {
  // ** Hook
  const { settings } = useSettings();

  const user = useAppSelector((state) => state.user);

  return (
    <Card sx={{ position: "relative" }}>
      <CardContent
        sx={{ p: (theme) => `${theme.spacing(6.75, 7.5)} !important` }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" sx={{ mb: 4.5 }}>
              Heyyy{" "}
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {user.fullName?.split(" ")[0]}
              </Box>
              ! 🎉
            </Typography>
            <Typography variant="body2">
              You have connected{" "}
              <Box component="span" sx={{ fontWeight: 600, color: "#ffffff" }}>
                {// @ts-ignore
                user.friends?.items.length}
              </Box>{" "}
               people from your network.
            </Typography>
            <Typography sx={{ mb: 4.5 }} variant="body2">
              Omnipeer is growing, invite your friends to join the community!
            </Typography>
            <Button variant="contained">Add Friend</Button>
          </Grid>
          <StyledGrid item xs={12} sm={6}>
            <Img
              alt="Congratulations John"
              src={
                "https://pixinvent.com/demo/materialize-mui-react-nextjs-admin-template/demo-3/images/cards/illustration-john-dark.png"
              }
              height="%30"
            />
          </StyledGrid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserInvite;
