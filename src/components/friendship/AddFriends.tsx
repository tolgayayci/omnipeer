// ** React Imports
import { Ref, useState, forwardRef, ReactElement, useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Fade, { FadeProps } from "@mui/material/Fade";
import OutlinedInput from "@mui/material/OutlinedInput";
import DialogContent from "@mui/material/DialogContent";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

// ** Icons Imports
import Close from "mdi-material-ui/Close";
import Twitter from "mdi-material-ui/Twitter";
import Facebook from "mdi-material-ui/Facebook";
import Linkedin from "mdi-material-ui/Linkedin";
import GiftOutline from "mdi-material-ui/GiftOutline";
import LicenseIcon from "mdi-material-ui/LicenseIcon";
import MessageOutline from "mdi-material-ui/MessageOutline";
import ClipboardOutline from "mdi-material-ui/ClipboardOutline";

// ** Custom Components Imports
import CustomAvatar from "src/@core/components/mui/avatar";
import { useAppSelector } from "src/store/hooks";

// ** Amplify Imports
import { API, Auth, graphqlOperation } from "aws-amplify";
import { listFriendships, userByEmail } from "src/graphql/queries";
import { createFriendship } from "src/graphql/mutations";
import { CreateFriendshipInput, FriendshipStatus } from "src/API";

import toast from "react-hot-toast";

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

interface AddFriendsProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const AddFriends = (props: AddFriendsProps) => {
  // ** States
  const [email, setEmail] = useState<string>("");

  const user = useAppSelector((state) => state.user);
  const show = props.show;

  useEffect(() => {
    props.setShow(props.show);
  }, [props.show]);

  const handleAddFriend = async () => {
    if (user.email !== email) {
      console.log("Add Friend");

      const authUser = await Auth.currentAuthenticatedUser();

      await API.graphql(graphqlOperation(userByEmail, { email: email }))
        //@ts-ignore
        .then(async (res) => {

          if (res.data.userByEmail.items.length) {
            
            const userCheck = await API.graphql(
              graphqlOperation(listFriendships, {
                filter: {
                  and: [
                    { contactId: { eq: authUser.attributes.sub } },
                    {or: [ 
                      { status: { eq: FriendshipStatus.PENDING } },
                      { status: { eq: FriendshipStatus.ACCEPTED } }
                    ]},
                    { owners: { contains: authUser.attributes.sub } },
                  ],
                },
              })
            );


            if (userCheck.data.listFriendships.items.length > 0) {
 
              if(userCheck.data.listFriendships.items[0].status === FriendshipStatus.ACCEPTED) {
                toast.error("You are already friends!", {
                  position: "top-right",
                  style: {
                    border: "1px solid #713200",
                    padding: "16px",
                    color: "#713200",
                    background: "#ffffff",
                  },
                  iconTheme: {
                    primary: "#713200",
                    secondary: "#FFFAEE",
                  },
                });
              } else {
                toast.error("You have already sent a friendship request!", {
                  position: "top-right",
                  style: {
                    border: "1px solid #713200",
                    padding: "16px",
                    color: "#713200",
                    background: "#ffffff",
                  },
                  iconTheme: {
                    primary: "#713200",
                    secondary: "#FFFAEE",
                  },
                });
              }
            }
            else {
              const newFriendship: CreateFriendshipInput = {
                contactId: res.data.userByEmail.items[0].owner,
                status: FriendshipStatus.PENDING,
                owners: [user.owner, res.data.userByEmail.items[0].owner],
              };

              await API.graphql(
                graphqlOperation(createFriendship, { input: newFriendship })
              )//@ts-ignore
                .then((res) => {
                    
                  toast.success("Your friendship request sent!", {
                    position: "top-right",
                    style: {
                      border: "1px solid #713200",
                      padding: "16px",
                      color: "#713200",
                      background: "#ffffff",
                    },
                    iconTheme: {
                      primary: "#713200",
                      secondary: "#FFFAEE",
                    },
                  });

                  props.setShow(false);

                  }
                )//@ts-ignore
                .catch((err) => {
                  console.log(err);
                });
            }
          } else {
            toast.error("User not found, sent an invite them to register!", {
              position: "top-right",
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
                background: "#ffffff",
              },
              iconTheme: {
                primary: "#713200",
                secondary: "#FFFAEE",
              },
            });
          }
        })
        //@ts-ignore
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("You can't send request to yourself!", {
        position: "top-right",
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
          background: "#ffffff",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    }
  };

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth="md"
        scroll="body"
        onClose={() => props.setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => props.setShow(false)}
      >
        <DialogContent
          sx={{ pb: 10, px: [8, 15], pt: [8, 12.5], position: "relative" }}
        >
          <IconButton
            size="small"
            onClick={() => props.setShow(false)}
            sx={{ position: "absolute", right: "1rem", top: "1rem" }}
          >
            <Close />
          </IconButton>
          <Box sx={{ mb: 10, textAlign: "center" }}>
            <Typography variant="h5" sx={{ mb: 3, lineHeight: "2rem" }}>
              Connect to Your Friends
            </Typography>
            <Typography variant="body2">
              Invite your friend to Omnipeer and start to explore the world of
              opportunities.
            </Typography>
          </Box>
          <Grid container spacing={6} sx={{ textAlign: "center" }}>
            <Grid item sm={4} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <CustomAvatar
                  skin="light"
                  color="primary"
                  sx={{ mb: 2.5, width: [70, 100], height: [70, 100] }}
                >
                  <MessageOutline sx={{ fontSize: ["2.2rem", "2.5rem"] }} />
                </CustomAvatar>
                <Typography sx={{ mb: 3, fontWeight: "600" }}>
                  Send Invitation 👍🏻
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", maxWidth: "200px" }}
                >
                  Send a friendship request to your friends via entering email
                  address
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <CustomAvatar
                  skin="light"
                  color="primary"
                  sx={{ mb: 2.5, width: [70, 100], height: [70, 100] }}
                >
                  <ClipboardOutline sx={{ fontSize: ["2.2rem", "2.5rem"] }} />
                </CustomAvatar>
                <Typography sx={{ mb: 3, fontWeight: "600" }}>
                  Wait Approval 😎
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", maxWidth: "200px" }}
                >
                  He/She will get a notification and need to approve your
                  friendship request
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <CustomAvatar
                  skin="light"
                  color="primary"
                  sx={{ mb: 2.5, width: [70, 100], height: [70, 100] }}
                >
                  <LicenseIcon sx={{ fontSize: ["2.2rem", "2.5rem"] }} />
                </CustomAvatar>
                <Typography sx={{ mb: 3, fontWeight: "600" }}>
                  Discover 🎉
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", maxWidth: "200px" }}
                >
                  You can start to explore the world of opportunities with your
                  friends!
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider sx={{ m: 0 }} />
        <DialogContent
          sx={{ pt: 7.5, px: [8, 15], pb: [8, 12.5], position: "relative" }}
        >
          <Box sx={{ mb: 8 }}>
            <Typography variant="h6" sx={{ mb: 4, lineHeight: "2rem" }}>
              Invite your friends
            </Typography>
            <InputLabel
              htmlFor="refer-email"
              sx={{
                mb: 2.5,
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                display: "inline-flex",
                whiteSpace: "break-spaces",
              }}
            >
              Enter your friend’s email address and invite them to join Omnipeer
              😍
            </InputLabel>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                flexWrap: { xs: "wrap", sm: "nowrap" },
              }}
            >
              <TextField
                fullWidth
                size="small"
                id="refer-email"
                sx={{ mr: { xs: 0, sm: 4 } }}
                placeholder={user.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                onClick={handleAddFriend}
                variant="contained"
                sx={{ mt: { xs: 2, sm: 0 }, width: { xs: "100%", sm: "auto" } }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AddFriends;
