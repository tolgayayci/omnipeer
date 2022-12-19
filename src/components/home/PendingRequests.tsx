// ** React Import
import { ReactElement, useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// ** Icons Imports
import Cog from "mdi-material-ui/Cog";
import Laptop from "mdi-material-ui/Laptop";
import ChartDonut from "mdi-material-ui/ChartDonut";
import PencilOutline from "mdi-material-ui/PencilOutline";
import AccountOutline from "mdi-material-ui/AccountOutline";

// ** Types Imports
import { ThemeColor } from "src/@core/layouts/types";

// ** Custom Components
import CustomChip from "src/@core/components/mui/chip";
import CustomAvatar from "src/@core/components/mui/avatar";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";
import { Button, CardHeader } from "@mui/material";

// ** Amplify Imports
import { Auth, API, graphqlOperation } from "aws-amplify";
import { updateFriendship, createFriendship } from "../../graphql/mutations";
import { listFriendships, getUser } from "../../graphql/queries";
import {
  FriendshipStatus,
  User,
  CreateFriendshipInput,
  UpdateFriendshipInput,
  UpdateFriendshipMutation,
} from "../../API";

interface TableBodyRowType {
  id: string;
  owner: string;
  email: string;
  fullName: string;
  nickname: string;
  avatar: string;
  status: string;
}

interface CellType {
  row: TableBodyRowType;
}

interface RoleObj {
  [key: string]: {
    icon: ReactElement;
  };
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor;
  };
}

const statusObj: StatusObj = {
  active: { color: "success" },
  pending: { color: "warning" },
  inactive: { color: "secondary" },
};

const handleAccept = async (owner: string) => {
  const user = await Auth.currentAuthenticatedUser();

  const checkPendings = await API.graphql(
    graphqlOperation(listFriendships, {
      filter: {
        and: [
          { contactId: { eq: user.attributes.sub } },
          { status: { eq: FriendshipStatus.PENDING } },
          { owners: { contains: owner } },
        ],
      },
    })
  );

  const updateInput: UpdateFriendshipInput = {
    id: checkPendings.data.listFriendships.items[0].id,
    status: FriendshipStatus.ACCEPTED,
  };

  // contact: User! @belongsTo(fields: ["contactId"])

  console.log(updateInput);

  await API.graphql(graphqlOperation(updateFriendship, { input: updateInput }))
    .then(
      //@ts-ignore
      async (result) => {
        console.log(result);

        const newFriendship: CreateFriendshipInput = {
          contactId: owner,
          status: FriendshipStatus.ACCEPTED,
          owners: [user.attributes.sub, owner],
        };

        console.log(newFriendship);

        await API.graphql(
          graphqlOperation(createFriendship, { input: newFriendship })
        )//@ts-ignore
          .then((res) => {
              console.log("friendship request accepted");
              console.log(res);
            }
          )//@ts-ignore
          .catch((err) => {
            console.log(err);
          });
      }
    )
    .catch(
      //@ts-ignore
      (error) => {
        console.log(error);
      }
    );
};

const renderUserAvatar = (row: User) => {
  if (row.avatar) {
    return (
      <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
    );
  } else {
    return (
      <CustomAvatar
        skin="light"
        sx={{ mr: 3, width: 34, height: 34, fontSize: ".8rem" }}
      >
        {getInitials(row.fullName ? row.fullName : "John Doe")}
      </CustomAvatar>
    );
  }
};

const columns: GridColDef[] = [
  {
    flex: 0.25,
    field: "name",
    minWidth: 200,
    headerName: "User",
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {
            // @ts-ignore
            renderUserAvatar(row)
          }
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
              {row.fullName}
            </Typography>
            <Typography variant="caption" sx={{ lineHeight: 1.6667 }}>
              {row.nickname}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.3,
    minWidth: 250,
    field: "email",
    headerName: "Email",
    renderCell: ({ row }: CellType) => (
      <Typography variant="body2">{row.email}</Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 110,
    field: "decision",
    headerName: "Reply The Request",
    renderCell: ({ row }: CellType) => (
      <div>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => handleAccept(row.owner)}
        >
          Accept
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => console.log("rejected")}
          sx={{ ml: 5 }}
        >
          Reject
        </Button>
      </div>
    ),
  },
];

const PendingRequests = () => {
  const [userArray, setUserArray] = useState<object[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handlePendingRequests = async () => {
    const user = await Auth.currentAuthenticatedUser();

    const checkPendings = await API.graphql(
      graphqlOperation(listFriendships, {
        filter: {
          and: [
            { contactId: { eq: user.attributes.sub } },
            { status: { eq: FriendshipStatus.PENDING } },
            { owners: { contains: user.attributes.sub } },
          ],
        },
      })
    );

    if (checkPendings.data.listFriendships.items.length > 0) {
      const userCheckArray: Array<{}> = [];

      //@ts-ignore
      checkPendings.data.listFriendships.items.map(async (item) => {
        console.log(item.owners[0]);
        userCheckArray.push(item.owners[0]);
      });

      userCheckArray.map(async (item, index) => {
        const user = await API.graphql(
          graphqlOperation(getUser, { owner: item })
        );

        setUserArray((prevArray) => [...prevArray, user.data.getUser]);
      });
    } else {
      console.log("No pending requests");
    }
  };

  useEffect(() => {
    handlePendingRequests();
  }, []);

  return (
    
    <Card>
      <CardHeader title="Friend Requests" />
      <DataGrid
        autoHeight
        hideFooter
        getRowId={(row) => row.owner}
        rows={userArray}
        columns={columns}
        disableSelectionOnClick
        pagination={undefined}
      />
    </Card>
    
  );
};

export default PendingRequests;
