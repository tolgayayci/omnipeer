// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from 'axios'

// ** Types
import { Dispatch } from "redux";
import { SendMsgParamsType } from "src/context/chatTypes";

// ** Amplify Imports
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createChat, updateChat, updateUser } from "src/graphql/mutations";
import { getUser, listChats } from "src/graphql/queries";
import { UpdateUserInput } from "src/API";
import { ChatsObj, ContactType } from "src/context/chatTypes";
import { gridPageCountSelector } from "@mui/x-data-grid";

// ** Fetch User Profile
export const fetchUserProfile = createAsyncThunk('appChat/fetchUserProfile', async () => {
  
  const user = await Auth.currentAuthenticatedUser();

  const result = await API.graphql(
    graphqlOperation(getUser, { owner: user.attributes.sub })
  );

  const profileUserData = {
    // @ts-ignore
    id: result.data.getUser.owner,
    // @ts-ignore
    name: result.data.getUser.name,
    // @ts-ignore
    avatar: result.data.getUser.avatar,
    // @ts-ignore
    fullName: result.data.getUser.fullName,
    // @ts-ignore
    peerId: result.data.getUser.peerId,
  }
  
  return profileUserData
})

// ** Fetch Chats & Contacts
export const fetchChatsContacts = createAsyncThunk(
  "appChat/fetchChatsContacts",
  async () => {

    const user = await Auth.currentAuthenticatedUser();

    const result = await API.graphql(
      graphqlOperation(getUser, { owner: user.attributes.sub })
    );

    const userChats = await API.graphql(graphqlOperation(listChats, { owner: user.attributes.sub }));

    // @ts-ignore
    if(!userChats.data.listChats.items.length > 0) {
      console.log("no chats")

      const newChat = {
        userId: user.attributes.sub,
        unseenMsgs: 0,
        chat: JSON.stringify([
          {
            message: "This is your Notebook!",
            time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
            senderId: user.attributes.sub,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          },
          {
            message: "You can save notes here!",
            time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
            senderId: user.attributes.sub,
            feedback: {
              isSent: true,
              isDelivered: true,
              isSeen: true
            }
          },
        ]),
      };

      await API.graphql(graphqlOperation(createChat, { input: newChat }));
    }

    //@ts-ignore
    if(!result.data.getUser.contacts) {

      const updatedUser = {
        owner: user.attributes.sub,
        email: user.attributes.email,
        contacts: JSON.stringify([
          {
            // @ts-ignore
            id: result.data.getUser.owner,
            // @ts-ignore
            fullName: result.data.getUser.fullName,
            // @ts-ignore
            role: result.data.getUser.role,
            // @ts-ignore
            about: result.data.getUser.about,
            // @ts-ignore
            avatar: result.data.getUser.avatar,
            // @ts-ignore
            status: result.data.getUser.status,
          }
        ])
      };

      await API.graphql(
        graphqlOperation(updateUser, { input: updatedUser })
      );
      
    }

    // @ts-ignore
    const parsedChat = userChats.data.listChats.items

    // @ts-ignore
    const parsedContacts = JSON.parse(result.data.getUser.contacts);

    //@ts-ignore
    const chatsContacts = parsedChat.map((chat: ChatsObj) => {
      //@ts-ignore
      const contact = parsedContacts.find(
        (c: ContactType) => c.id === chat.userId
      );
  
      // @ts-ignore
      contact.chat = {
        id: chat.userId,
        unseenMsgs: chat.unseenMsgs,
        //@ts-ignore
        lastMessage: JSON.parse(chat.chat[chat.chat.length - 1]),
      };
  
      return contact;
    });
  
    //@ts-ignore
    const contactsToShow = parsedContacts.filter((co: ContactType) => {
      //@ts-ignore
      return !parsedChat.some((ch: ChatsObj) => {
        return co.id === ch.id;
      });
    });

    const profileUserData = {
      // @ts-ignore
      id: result.data.getUser.owner,
      // @ts-ignore
      name: result.data.getUser.name,
      // @ts-ignore
      avatar: result.data.getUser.avatar,
      // @ts-ignore
      fullName: result.data.getUser.fullName,
    }

    return {chatsContacts, contacts: contactsToShow, profileUser: profileUserData};
    
  }
);

// ** Select Chat
export const selectChat = createAsyncThunk(
  "appChat/selectChat",
  async (id: number | string, { dispatch }: { dispatch: Dispatch<any> }) => {

    const user = await Auth.currentAuthenticatedUser();

    const result = await API.graphql(
      graphqlOperation(getUser, { owner: user.attributes.sub })
    );

    // //  Convert Id to number
    
    // @ts-ignore
    const parsedChat = result.data.getUser.chats.items
    // @ts-ignore
    const parsedContacts = JSON.parse(result.data.getUser.contacts);

    const chat = parsedChat.find((c: ChatsObj) => c.userId === id);

    //TODO: Update unseenMsgs to 0
    // if (chat) chat.unseenMsgs = 0;

    const contact = parsedContacts.find((c: ContactType) => c.id === id);

    // @ts-ignore
    // TODO: Update unseenMsgs to 0
    // if (contact.chat) contact.chat.unseenMsgs = 0;

    dispatch(fetchChatsContacts());

    return { chat, contact };

  }
);

// ** Send Msg
export const sendMsg = createAsyncThunk(
  "appChat/sendMsg",
  async (obj: SendMsgParamsType, { dispatch }) => {

    // OBJ = chat, contact, msg

    const user = await Auth.currentAuthenticatedUser();

    const result = await API.graphql(
      graphqlOperation(getUser, { owner: user.attributes.sub })
    );

    // @ts-ignore
    const userChats = await API.graphql(graphqlOperation(listChats, { owner: user.attributes.sub }));

    // @ts-ignore
    const parsedChat = userChats.data.listChats.items;

    console.log(parsedChat)

    console.log(obj.contact?.id)

    let activeChat = parsedChat.find(
      (chat: ChatsObj) => chat.userId === obj.contact?.id
    );

    const newMessageData = {
      // @ts-ignore
      senderId: result.data.getUser.owner,
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

    if (activeChat === undefined) {
      isNewChat = true;

      console.log("new chat")

      //TODO: Create new chat

      parsedChat.push({
        id: obj.contact?.id,
        userId: obj.contact?.id,
        unseenMsgs: 0,
        chat: [newMessageData],
      });

      // await API.graphql(
      //   graphqlOperation(updateUser, { input: {
      //     owner: user.attributes.sub,
      //     email: user.attributes.email,
      //     chats: JSON.stringify(parsedChat)
      //   } })
      // );
      
      activeChat = parsedChat[parsedChat.length - 1];
    } else {

      const parsedActive = JSON.parse(activeChat.chat)

      parsedActive.push(newMessageData)

      await API.graphql(
        graphqlOperation(updateChat, { input: {
          id: activeChat.id,
          userId: user.attributes.sub,
          chat: JSON.stringify(parsedActive)
        } })
      );

    }

    const response = { newMessageData, id: obj.contact?.id };

    // if (isNewChat) { 
    //   response.chat = activeChat; 
    // }

    if (obj.contact) {
      await dispatch(selectChat(obj.contact.id));
    }

    dispatch(fetchChatsContacts());

    return { response }

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
      state.userProfile = action.payload
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
