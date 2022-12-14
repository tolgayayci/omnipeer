// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Types
import { Dispatch } from "redux";
import { SendMsgParamsType } from "src/context/chatTypes";

// ** Amplify Imports
import { API, Auth, graphqlOperation } from "aws-amplify";
import {
  createChat,
  updateChat,
  createFriendship,
} from "src/graphql/mutations";
import { getUser, listChats, getChat } from "src/graphql/queries";
import { ChatsObj, ContactType } from "src/context/chatTypes";
import {
  CreateChatMutation,
  User,
  Chat,
  CreateFriendshipInput,
  Friendship,
  FriendshipStatus,
  CreateChatInput,
} from "src/API";

// ** Fetch User Profile
export const fetchUserProfile = createAsyncThunk(
  "appChat/fetchUserProfile",
  async () => {
    const user = await Auth.currentAuthenticatedUser();

    const result = await API.graphql(
      graphqlOperation(getUser, { owner: user.attributes.sub })
    );

    const profileUserData = result.data.getUser;

    return profileUserData;
  }
);

// ** Fetch Chats & Contacts
export const fetchChatsContacts = createAsyncThunk(
  "appChat/fetchChatsContacts",
  async () => {
    const user = await Auth.currentAuthenticatedUser();

    const result = await API.graphql(
      graphqlOperation(getUser, { owner: user.attributes.sub })
    );

    // @ts-ignore
    const userChats = await API.graphql(
      graphqlOperation(listChats, {
        owners: user.attributes.sub,
        filter: {
          or: [
            { senderId: { eq: user.attributes.sub } },
            { userId: { eq: user.attributes.sub } },
          ],
        },
      })
    );

    // @ts-ignore
    if (!userChats.data.listChats.items.length > 0) {
      const newChat = {
        senderId: user.attributes.sub,
        userId: user.attributes.sub,
        unseenMsgs: 0,
        chat: JSON.stringify([
          {
            message: "This is your Notebook!",
            time: "Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)",
            senderId: user.attributes.sub,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true,
            },
          },
          {
            message: "You can save notes here!",
            time: "Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)",
            senderId: user.attributes.sub,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true,
            },
          },
        ]),
        owners: [user.attributes.sub, user.attributes.sub],
      };

      await API.graphql(graphqlOperation(createChat, { input: newChat }));
    }

    // @ts-ignore
    const parsedChat = userChats.data.listChats.items;

    // @ts-ignore
    const parsedContacts = result.data.getUser.contacts.items;

    const filteredContacts = parsedContacts.filter((contact: Friendship) => {
      return (
        contact.owners.includes(user.attributes.sub) &&
        contact.status === FriendshipStatus.PENDING
      );
    });

    const finalContacts = filteredContacts.map((contact: Friendship) => {
      return contact.contact;
    });

    const filteredChats = parsedChat.filter((chat: Chat) => {
      return chat.owners.includes(user.attributes.sub);
    });

    const chatsWithContacts = filteredChats.map((chat: Chat) => {
      // Find the contact that corresponds to the current chat

      const contact = finalContacts.find((c: User) => {
        return c.owner === chat.senderId || c.owner === chat.userId;
      });

      //@ts-ignore
      chat.lastMessage = JSON.parse(chat.chat)[
        //@ts-ignore
        JSON.parse(chat.chat).length - 1
      ];

      if (contact !== undefined) {
        contact.chat = { ...chat };

        return contact;
      }
    });

    return {
      chatsContacts: chatsWithContacts,
      contacts: finalContacts,
      profileUser: result.data.getUser,
    };
  }
);

// ** Select Chat
export const selectChat = createAsyncThunk(
  "appChat/selectChat",
  async (obj: Array<any>, { dispatch }: { dispatch: Dispatch<any> }) => {
    console.log("CHAT ID: ", obj[0]);
    console.log("USER ID: ", obj[1]);

    const userChats = await API.graphql(
      graphqlOperation(getChat, { id: obj[0] })
    );

    // @ts-ignore
    const chat = userChats.data.getChat;

    const contact = await API.graphql(
      graphqlOperation(getUser, { owner: obj[1] })
    );

    const contactData = {
      ...contact.data.getUser,
    };

    //TODO: Update unseenMsgs to 0
    // if (chat) chat.unseenMsgs = 0;

    // @ts-ignore
    // TODO: Update unseenMsgs to 0
    // if (contact.chat) contact.chat.unseenMsgs = 0;

    dispatch(fetchChatsContacts());

    return { chat: chat, contact: contactData };
  }
);

// ** Send Msg
export const sendMsg = createAsyncThunk(
  "appChat/sendMsg",
  async (obj: SendMsgParamsType, { dispatch }) => {
    console.log("SEND MSG");
    console.log(obj);

    const user = await Auth.currentAuthenticatedUser();

    let activeChat = obj.chat;

    const newMessageData = {
      // @ts-ignore
      senderId: user.attributes.sub,
      time: new Date("Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)"),
      message: obj.message,
      feedback: {
        isSent: true,
        isSeen: false,
        isDelivered: false,
      },
    };

    // If there's new chat for user create one
    let isNewChat = false;

    if (activeChat === null) {
      isNewChat = true;
      console.log("NEW CHAT");

      console.log(user.attributes.sub);
      //@ts-ignore
      console.log(obj.contact.owner);

      const newChat: CreateChatInput = {
        senderId: user.attributes.sub,
        //@ts-ignore
        userId: obj.contact.owner,
        unseenMsgs: 0,
        //@ts-ignore
        chat: JSON.stringify([newMessageData]),
        //@ts-ignore
        owners: [user.attributes.sub, obj.contact.owner],
      };

      const newChatData = await API.graphql(
        graphqlOperation(createChat, { input: newChat })
        //@ts-ignore
      ).catch((err) => {
        console.log(err);
      });

      console.log(newChatData);

      //@ts-ignore
      await dispatch(selectChat([newChat.data.createChat.id, obj.contact?.id]));

      //set active chat
      //@ts-ignore
      activeChat = newChat.data.createChat;
    } else {
      console.log("CHAT EXIST");

      //@ts-ignore
      const parsedActive = JSON.parse(activeChat?.chat);

      console.log(parsedActive);

      parsedActive.push(newMessageData);

      const newInput = {
        input: {
          id: obj.chat?.id,
          senderId: user.attributes.sub,
          //@ts-ignore
          userId: obj.contact?.owner,
          chat: JSON.stringify(parsedActive),
          //@ts-ignore
          owners: [user.attributes.sub, obj.contact?.owner],
        },
      };

      console.log(newInput);

      await API.graphql(graphqlOperation(updateChat, newInput))
        //@ts-ignore
        .catch((err) => {
          console.log(err);
        });
    }

    //@ts-ignore
    const response = { newMessageData, id: obj.contact?.owner };

    // if (isNewChat) {
    //   response.chat = activeChat;
    // }

    if (obj.contact) {
      //@ts-ignore
      await dispatch(selectChat([activeChat?.id, obj.contact.owner]));
    }

    dispatch(fetchChatsContacts());

    return { response };
  }
);

export const appChatSlice = createSlice({
  name: "appChat",
  initialState: {
    chats: null,
    contacts: null,
    userProfile: null,
    selectedChat: null,
  },
  reducers: {
    removeSelectedChat: (state) => {
      state.selectedChat = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      // @ts-ignore
      state.userProfile = action.payload;
    });
    builder.addCase(fetchChatsContacts.fulfilled, (state, action) => {
      state.contacts = action.payload.contacts;
      state.chats = action.payload.chatsContacts;
    });
    builder.addCase(selectChat.fulfilled, (state, action) => {
      // @ts-ignore
      state.selectedChat = action.payload;
    });
  },
});

export const { removeSelectedChat } = appChatSlice.actions;

export default appChatSlice.reducer;
