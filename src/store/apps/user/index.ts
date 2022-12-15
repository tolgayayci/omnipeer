// ** Redux Imports
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { Dispatch } from "redux";

// ** Amplify Imports
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createUser, updateUser } from "src/graphql/mutations";
import { getUser } from "src/graphql/queries";

// ** Types
import type { User, UpdateUserInput } from "src/API";

export const getUserInfo = createAsyncThunk("user/getUser", async () => {
  const user = await Auth.currentAuthenticatedUser();

  const result = await API.graphql(
    graphqlOperation(getUser, { owner: user.attributes.sub })
  );
  // @ts-ignore
  if (!result.data.getUser) {
    const newUser = {
      owner: user.attributes.sub,
      email: user.attributes.email,
    };

    await API.graphql(graphqlOperation(createUser, { input: newUser }));
  } else {
    //@ts-ignore
    return result.data.getUser;
  }
});

export const updateUserInfo = createAsyncThunk(
  "user/updateUser",
  // TODO: Add type for user and queries
  async (peerId: string, { dispatch }: { dispatch: Dispatch<any> }) => {
    dispatch(getUserInfo());

    const user = await Auth.currentAuthenticatedUser();

    const result = await API.graphql(
      graphqlOperation(getUser, { owner: user.attributes.sub })
    );

    const updatedUser: UpdateUserInput = {
      owner: user.attributes.sub,
      email: user.attributes.email,
      peerId: peerId,
    };

    await API.graphql(graphqlOperation(updateUser, { input: updatedUser }));
  }
);

const initialState: User = {
  __typename: "User",
  owner: "",
  email: "",
  fullName: "",
  peerId: "",
  nickname: "",
  friends: null,
  createdAt: "",
  updatedAt: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.owner = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserInfo.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.__typename = action.payload.__typename;
        state.owner = action.payload.owner;
        state.email = action.payload.email;
        state.fullName = action.payload.fullName;
        state.peerId = action.payload.peerId;
        state.nickname = action.payload.nickname;
        state.friends = action.payload.friends;
        state.createdAt = action.payload.createdAt;
        state.updatedAt = action.payload.updatedAt;
      }
    );
  },
});

export const { setUser } = userSlice.actions;

export const user = (state: RootState) => state.user;

export default userSlice.reducer;
