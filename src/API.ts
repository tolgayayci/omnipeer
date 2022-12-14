/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateStorageInput = {
  cid: string,
  name: string,
  type: string,
  size: number,
  userStorageId?: string | null,
};

export type ModelStorageConditionInput = {
  name?: ModelStringInput | null,
  type?: ModelStringInput | null,
  size?: ModelIntInput | null,
  and?: Array< ModelStorageConditionInput | null > | null,
  or?: Array< ModelStorageConditionInput | null > | null,
  not?: ModelStorageConditionInput | null,
  userStorageId?: ModelIDInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Storage = {
  __typename: "Storage",
  cid: string,
  name: string,
  type: string,
  size: number,
  createdAt: string,
  updatedAt: string,
  userStorageId?: string | null,
  owner?: string | null,
};

export type UpdateStorageInput = {
  cid: string,
  name?: string | null,
  type?: string | null,
  size?: number | null,
  userStorageId?: string | null,
};

export type DeleteStorageInput = {
  cid: string,
};

export type CreateUserInput = {
  owner: string,
  email: string,
  peerId?: string | null,
  fullName?: string | null,
  about?: string | null,
  role?: string | null,
  nickname?: string | null,
  avatar?: string | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  peerId?: ModelStringInput | null,
  fullName?: ModelStringInput | null,
  about?: ModelStringInput | null,
  role?: ModelStringInput | null,
  nickname?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  owner: string,
  email: string,
  peerId?: string | null,
  fullName?: string | null,
  about?: string | null,
  role?: string | null,
  nickname?: string | null,
  avatar?: string | null,
  chats?: ModelChatConnection | null,
  friends?: ModelFriendshipConnection | null,
  storage?: ModelStorageConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelChatConnection = {
  __typename: "ModelChatConnection",
  items:  Array<Chat | null >,
  nextToken?: string | null,
};

export type Chat = {
  __typename: "Chat",
  id: string,
  senderId: string,
  userId: string,
  unseenMsgs: number,
  chat?: Array< string | null > | null,
  owners: Array< string >,
  createdAt: string,
  updatedAt: string,
};

export type ModelFriendshipConnection = {
  __typename: "ModelFriendshipConnection",
  items:  Array<Friendship | null >,
  nextToken?: string | null,
};

export type Friendship = {
  __typename: "Friendship",
  id: string,
  contactId: string,
  contact?: User | null,
  status: FriendshipStatus,
  owners: Array< string >,
  createdAt: string,
  updatedAt: string,
};

export enum FriendshipStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  BLOCKED = "BLOCKED",
}


export type ModelStorageConnection = {
  __typename: "ModelStorageConnection",
  items:  Array<Storage | null >,
  nextToken?: string | null,
};

export type UpdateUserInput = {
  owner: string,
  email?: string | null,
  peerId?: string | null,
  fullName?: string | null,
  about?: string | null,
  role?: string | null,
  nickname?: string | null,
  avatar?: string | null,
};

export type DeleteUserInput = {
  owner: string,
};

export type CreateChatInput = {
  id?: string | null,
  senderId: string,
  userId: string,
  unseenMsgs: number,
  chat?: Array< string | null > | null,
  owners: Array< string >,
};

export type ModelChatConditionInput = {
  senderId?: ModelStringInput | null,
  userId?: ModelStringInput | null,
  unseenMsgs?: ModelIntInput | null,
  chat?: ModelStringInput | null,
  owners?: ModelStringInput | null,
  and?: Array< ModelChatConditionInput | null > | null,
  or?: Array< ModelChatConditionInput | null > | null,
  not?: ModelChatConditionInput | null,
};

export type UpdateChatInput = {
  id: string,
  senderId?: string | null,
  userId?: string | null,
  unseenMsgs?: number | null,
  chat?: Array< string | null > | null,
  owners?: Array< string > | null,
};

export type DeleteChatInput = {
  id: string,
};

export type CreateFriendshipInput = {
  id?: string | null,
  contactId: string,
  status: FriendshipStatus,
  owners: Array< string >,
};

export type ModelFriendshipConditionInput = {
  contactId?: ModelStringInput | null,
  status?: ModelFriendshipStatusInput | null,
  owners?: ModelStringInput | null,
  and?: Array< ModelFriendshipConditionInput | null > | null,
  or?: Array< ModelFriendshipConditionInput | null > | null,
  not?: ModelFriendshipConditionInput | null,
};

export type ModelFriendshipStatusInput = {
  eq?: FriendshipStatus | null,
  ne?: FriendshipStatus | null,
};

export type UpdateFriendshipInput = {
  id: string,
  contactId?: string | null,
  status?: FriendshipStatus | null,
  owners?: Array< string > | null,
};

export type DeleteFriendshipInput = {
  id: string,
};

export type ModelStorageFilterInput = {
  cid?: ModelStringInput | null,
  name?: ModelStringInput | null,
  type?: ModelStringInput | null,
  size?: ModelIntInput | null,
  and?: Array< ModelStorageFilterInput | null > | null,
  or?: Array< ModelStorageFilterInput | null > | null,
  not?: ModelStorageFilterInput | null,
  userStorageId?: ModelIDInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserFilterInput = {
  owner?: ModelStringInput | null,
  email?: ModelStringInput | null,
  peerId?: ModelStringInput | null,
  fullName?: ModelStringInput | null,
  about?: ModelStringInput | null,
  role?: ModelStringInput | null,
  nickname?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelChatFilterInput = {
  id?: ModelIDInput | null,
  senderId?: ModelStringInput | null,
  userId?: ModelStringInput | null,
  unseenMsgs?: ModelIntInput | null,
  chat?: ModelStringInput | null,
  owners?: ModelStringInput | null,
  and?: Array< ModelChatFilterInput | null > | null,
  or?: Array< ModelChatFilterInput | null > | null,
  not?: ModelChatFilterInput | null,
};

export type ModelFriendshipFilterInput = {
  id?: ModelIDInput | null,
  contactId?: ModelStringInput | null,
  status?: ModelFriendshipStatusInput | null,
  owners?: ModelStringInput | null,
  and?: Array< ModelFriendshipFilterInput | null > | null,
  or?: Array< ModelFriendshipFilterInput | null > | null,
  not?: ModelFriendshipFilterInput | null,
};

export type ModelSubscriptionChatFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  senderId?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
  unseenMsgs?: ModelSubscriptionIntInput | null,
  chat?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionChatFilterInput | null > | null,
  or?: Array< ModelSubscriptionChatFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionStorageFilterInput = {
  cid?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  size?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionStorageFilterInput | null > | null,
  or?: Array< ModelSubscriptionStorageFilterInput | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  email?: ModelSubscriptionStringInput | null,
  peerId?: ModelSubscriptionStringInput | null,
  fullName?: ModelSubscriptionStringInput | null,
  about?: ModelSubscriptionStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  nickname?: ModelSubscriptionStringInput | null,
  avatar?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionFriendshipFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  contactId?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionFriendshipFilterInput | null > | null,
  or?: Array< ModelSubscriptionFriendshipFilterInput | null > | null,
};

export type CreateStorageMutationVariables = {
  input: CreateStorageInput,
  condition?: ModelStorageConditionInput | null,
};

export type CreateStorageMutation = {
  createStorage?:  {
    __typename: "Storage",
    cid: string,
    name: string,
    type: string,
    size: number,
    createdAt: string,
    updatedAt: string,
    userStorageId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateStorageMutationVariables = {
  input: UpdateStorageInput,
  condition?: ModelStorageConditionInput | null,
};

export type UpdateStorageMutation = {
  updateStorage?:  {
    __typename: "Storage",
    cid: string,
    name: string,
    type: string,
    size: number,
    createdAt: string,
    updatedAt: string,
    userStorageId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteStorageMutationVariables = {
  input: DeleteStorageInput,
  condition?: ModelStorageConditionInput | null,
};

export type DeleteStorageMutation = {
  deleteStorage?:  {
    __typename: "Storage",
    cid: string,
    name: string,
    type: string,
    size: number,
    createdAt: string,
    updatedAt: string,
    userStorageId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    owner: string,
    email: string,
    peerId?: string | null,
    fullName?: string | null,
    about?: string | null,
    role?: string | null,
    nickname?: string | null,
    avatar?: string | null,
    chats?:  {
      __typename: "ModelChatConnection",
      items:  Array< {
        __typename: "Chat",
        id: string,
        senderId: string,
        userId: string,
        unseenMsgs: number,
        chat?: Array< string | null > | null,
        owners: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    friends?:  {
      __typename: "ModelFriendshipConnection",
      items:  Array< {
        __typename: "Friendship",
        id: string,
        contactId: string,
        contact?:  {
          __typename: "User",
          owner: string,
          email: string,
          peerId?: string | null,
          fullName?: string | null,
          about?: string | null,
          role?: string | null,
          nickname?: string | null,
          avatar?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        status: FriendshipStatus,
        owners: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    storage?:  {
      __typename: "ModelStorageConnection",
      items:  Array< {
        __typename: "Storage",
        cid: string,
        name: string,
        type: string,
        size: number,
        createdAt: string,
        updatedAt: string,
        userStorageId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    owner: string,
    email: string,
    peerId?: string | null,
    fullName?: string | null,
    about?: string | null,
    role?: string | null,
    nickname?: string | null,
    avatar?: string | null,
    chats?:  {
      __typename: "ModelChatConnection",
      items:  Array< {
        __typename: "Chat",
        id: string,
        senderId: string,
        userId: string,
        unseenMsgs: number,
        chat?: Array< string | null > | null,
        owners: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    friends?:  {
      __typename: "ModelFriendshipConnection",
      items:  Array< {
        __typename: "Friendship",
        id: string,
        contactId: string,
        contact?:  {
          __typename: "User",
          owner: string,
          email: string,
          peerId?: string | null,
          fullName?: string | null,
          about?: string | null,
          role?: string | null,
          nickname?: string | null,
          avatar?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        status: FriendshipStatus,
        owners: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    storage?:  {
      __typename: "ModelStorageConnection",
      items:  Array< {
        __typename: "Storage",
        cid: string,
        name: string,
        type: string,
        size: number,
        createdAt: string,
        updatedAt: string,
        userStorageId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    owner: string,
    email: string,
    peerId?: string | null,
    fullName?: string | null,
    about?: string | null,
    role?: string | null,
    nickname?: string | null,
    avatar?: string | null,
    chats?:  {
      __typename: "ModelChatConnection",
      items:  Array< {
        __typename: "Chat",
        id: string,
        senderId: string,
        userId: string,
        unseenMsgs: number,
        chat?: Array< string | null > | null,
        owners: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    friends?:  {
      __typename: "ModelFriendshipConnection",
      items:  Array< {
        __typename: "Friendship",
        id: string,
        contactId: string,
        contact?:  {
          __typename: "User",
          owner: string,
          email: string,
          peerId?: string | null,
          fullName?: string | null,
          about?: string | null,
          role?: string | null,
          nickname?: string | null,
          avatar?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        status: FriendshipStatus,
        owners: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    storage?:  {
      __typename: "ModelStorageConnection",
      items:  Array< {
        __typename: "Storage",
        cid: string,
        name: string,
        type: string,
        size: number,
        createdAt: string,
        updatedAt: string,
        userStorageId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateChatMutationVariables = {
  input: CreateChatInput,
  condition?: ModelChatConditionInput | null,
};

export type CreateChatMutation = {
  createChat?:  {
    __typename: "Chat",
    id: string,
    senderId: string,
    userId: string,
    unseenMsgs: number,
    chat?: Array< string | null > | null,
    owners: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateChatMutationVariables = {
  input: UpdateChatInput,
  condition?: ModelChatConditionInput | null,
};

export type UpdateChatMutation = {
  updateChat?:  {
    __typename: "Chat",
    id: string,
    senderId: string,
    userId: string,
    unseenMsgs: number,
    chat?: Array< string | null > | null,
    owners: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteChatMutationVariables = {
  input: DeleteChatInput,
  condition?: ModelChatConditionInput | null,
};

export type DeleteChatMutation = {
  deleteChat?:  {
    __typename: "Chat",
    id: string,
    senderId: string,
    userId: string,
    unseenMsgs: number,
    chat?: Array< string | null > | null,
    owners: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateFriendshipMutationVariables = {
  input: CreateFriendshipInput,
  condition?: ModelFriendshipConditionInput | null,
};

export type CreateFriendshipMutation = {
  createFriendship?:  {
    __typename: "Friendship",
    id: string,
    contactId: string,
    contact?:  {
      __typename: "User",
      owner: string,
      email: string,
      peerId?: string | null,
      fullName?: string | null,
      about?: string | null,
      role?: string | null,
      nickname?: string | null,
      avatar?: string | null,
      chats?:  {
        __typename: "ModelChatConnection",
        items:  Array< {
          __typename: "Chat",
          id: string,
          senderId: string,
          userId: string,
          unseenMsgs: number,
          chat?: Array< string | null > | null,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      friends?:  {
        __typename: "ModelFriendshipConnection",
        items:  Array< {
          __typename: "Friendship",
          id: string,
          contactId: string,
          status: FriendshipStatus,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      storage?:  {
        __typename: "ModelStorageConnection",
        items:  Array< {
          __typename: "Storage",
          cid: string,
          name: string,
          type: string,
          size: number,
          createdAt: string,
          updatedAt: string,
          userStorageId?: string | null,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    status: FriendshipStatus,
    owners: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFriendshipMutationVariables = {
  input: UpdateFriendshipInput,
  condition?: ModelFriendshipConditionInput | null,
};

export type UpdateFriendshipMutation = {
  updateFriendship?:  {
    __typename: "Friendship",
    id: string,
    contactId: string,
    contact?:  {
      __typename: "User",
      owner: string,
      email: string,
      peerId?: string | null,
      fullName?: string | null,
      about?: string | null,
      role?: string | null,
      nickname?: string | null,
      avatar?: string | null,
      chats?:  {
        __typename: "ModelChatConnection",
        items:  Array< {
          __typename: "Chat",
          id: string,
          senderId: string,
          userId: string,
          unseenMsgs: number,
          chat?: Array< string | null > | null,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      friends?:  {
        __typename: "ModelFriendshipConnection",
        items:  Array< {
          __typename: "Friendship",
          id: string,
          contactId: string,
          status: FriendshipStatus,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      storage?:  {
        __typename: "ModelStorageConnection",
        items:  Array< {
          __typename: "Storage",
          cid: string,
          name: string,
          type: string,
          size: number,
          createdAt: string,
          updatedAt: string,
          userStorageId?: string | null,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    status: FriendshipStatus,
    owners: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFriendshipMutationVariables = {
  input: DeleteFriendshipInput,
  condition?: ModelFriendshipConditionInput | null,
};

export type DeleteFriendshipMutation = {
  deleteFriendship?:  {
    __typename: "Friendship",
    id: string,
    contactId: string,
    contact?:  {
      __typename: "User",
      owner: string,
      email: string,
      peerId?: string | null,
      fullName?: string | null,
      about?: string | null,
      role?: string | null,
      nickname?: string | null,
      avatar?: string | null,
      chats?:  {
        __typename: "ModelChatConnection",
        items:  Array< {
          __typename: "Chat",
          id: string,
          senderId: string,
          userId: string,
          unseenMsgs: number,
          chat?: Array< string | null > | null,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      friends?:  {
        __typename: "ModelFriendshipConnection",
        items:  Array< {
          __typename: "Friendship",
          id: string,
          contactId: string,
          status: FriendshipStatus,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      storage?:  {
        __typename: "ModelStorageConnection",
        items:  Array< {
          __typename: "Storage",
          cid: string,
          name: string,
          type: string,
          size: number,
          createdAt: string,
          updatedAt: string,
          userStorageId?: string | null,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    status: FriendshipStatus,
    owners: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetStorageQueryVariables = {
  cid: string,
};

export type GetStorageQuery = {
  getStorage?:  {
    __typename: "Storage",
    cid: string,
    name: string,
    type: string,
    size: number,
    createdAt: string,
    updatedAt: string,
    userStorageId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListStoragesQueryVariables = {
  cid?: string | null,
  filter?: ModelStorageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListStoragesQuery = {
  listStorages?:  {
    __typename: "ModelStorageConnection",
    items:  Array< {
      __typename: "Storage",
      cid: string,
      name: string,
      type: string,
      size: number,
      createdAt: string,
      updatedAt: string,
      userStorageId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  owner: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    owner: string,
    email: string,
    peerId?: string | null,
    fullName?: string | null,
    about?: string | null,
    role?: string | null,
    nickname?: string | null,
    avatar?: string | null,
    chats?:  {
      __typename: "ModelChatConnection",
      items:  Array< {
        __typename: "Chat",
        id: string,
        senderId: string,
        userId: string,
        unseenMsgs: number,
        chat?: Array< string | null > | null,
        owners: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    friends?:  {
      __typename: "ModelFriendshipConnection",
      items:  Array< {
        __typename: "Friendship",
        id: string,
        contactId: string,
        contact?:  {
          __typename: "User",
          owner: string,
          email: string,
          peerId?: string | null,
          fullName?: string | null,
          about?: string | null,
          role?: string | null,
          nickname?: string | null,
          avatar?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        status: FriendshipStatus,
        owners: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    storage?:  {
      __typename: "ModelStorageConnection",
      items:  Array< {
        __typename: "Storage",
        cid: string,
        name: string,
        type: string,
        size: number,
        createdAt: string,
        updatedAt: string,
        userStorageId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  owner?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      owner: string,
      email: string,
      peerId?: string | null,
      fullName?: string | null,
      about?: string | null,
      role?: string | null,
      nickname?: string | null,
      avatar?: string | null,
      chats?:  {
        __typename: "ModelChatConnection",
        items:  Array< {
          __typename: "Chat",
          id: string,
          senderId: string,
          userId: string,
          unseenMsgs: number,
          chat?: Array< string | null > | null,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      friends?:  {
        __typename: "ModelFriendshipConnection",
        items:  Array< {
          __typename: "Friendship",
          id: string,
          contactId: string,
          status: FriendshipStatus,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      storage?:  {
        __typename: "ModelStorageConnection",
        items:  Array< {
          __typename: "Storage",
          cid: string,
          name: string,
          type: string,
          size: number,
          createdAt: string,
          updatedAt: string,
          userStorageId?: string | null,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserByEmailQueryVariables = {
  email: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserByEmailQuery = {
  userByEmail?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      owner: string,
      email: string,
      peerId?: string | null,
      fullName?: string | null,
      about?: string | null,
      role?: string | null,
      nickname?: string | null,
      avatar?: string | null,
      chats?:  {
        __typename: "ModelChatConnection",
        items:  Array< {
          __typename: "Chat",
          id: string,
          senderId: string,
          userId: string,
          unseenMsgs: number,
          chat?: Array< string | null > | null,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      friends?:  {
        __typename: "ModelFriendshipConnection",
        items:  Array< {
          __typename: "Friendship",
          id: string,
          contactId: string,
          status: FriendshipStatus,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      storage?:  {
        __typename: "ModelStorageConnection",
        items:  Array< {
          __typename: "Storage",
          cid: string,
          name: string,
          type: string,
          size: number,
          createdAt: string,
          updatedAt: string,
          userStorageId?: string | null,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetChatQueryVariables = {
  id: string,
};

export type GetChatQuery = {
  getChat?:  {
    __typename: "Chat",
    id: string,
    senderId: string,
    userId: string,
    unseenMsgs: number,
    chat?: Array< string | null > | null,
    owners: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListChatsQueryVariables = {
  id?: string | null,
  filter?: ModelChatFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListChatsQuery = {
  listChats?:  {
    __typename: "ModelChatConnection",
    items:  Array< {
      __typename: "Chat",
      id: string,
      senderId: string,
      userId: string,
      unseenMsgs: number,
      chat?: Array< string | null > | null,
      owners: Array< string >,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ChatsByUserIdQueryVariables = {
  userId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelChatFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ChatsByUserIdQuery = {
  chatsByUserId?:  {
    __typename: "ModelChatConnection",
    items:  Array< {
      __typename: "Chat",
      id: string,
      senderId: string,
      userId: string,
      unseenMsgs: number,
      chat?: Array< string | null > | null,
      owners: Array< string >,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetFriendshipQueryVariables = {
  id: string,
};

export type GetFriendshipQuery = {
  getFriendship?:  {
    __typename: "Friendship",
    id: string,
    contactId: string,
    contact?:  {
      __typename: "User",
      owner: string,
      email: string,
      peerId?: string | null,
      fullName?: string | null,
      about?: string | null,
      role?: string | null,
      nickname?: string | null,
      avatar?: string | null,
      chats?:  {
        __typename: "ModelChatConnection",
        items:  Array< {
          __typename: "Chat",
          id: string,
          senderId: string,
          userId: string,
          unseenMsgs: number,
          chat?: Array< string | null > | null,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      friends?:  {
        __typename: "ModelFriendshipConnection",
        items:  Array< {
          __typename: "Friendship",
          id: string,
          contactId: string,
          status: FriendshipStatus,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      storage?:  {
        __typename: "ModelStorageConnection",
        items:  Array< {
          __typename: "Storage",
          cid: string,
          name: string,
          type: string,
          size: number,
          createdAt: string,
          updatedAt: string,
          userStorageId?: string | null,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    status: FriendshipStatus,
    owners: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFriendshipsQueryVariables = {
  id?: string | null,
  filter?: ModelFriendshipFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListFriendshipsQuery = {
  listFriendships?:  {
    __typename: "ModelFriendshipConnection",
    items:  Array< {
      __typename: "Friendship",
      id: string,
      contactId: string,
      contact?:  {
        __typename: "User",
        owner: string,
        email: string,
        peerId?: string | null,
        fullName?: string | null,
        about?: string | null,
        role?: string | null,
        nickname?: string | null,
        avatar?: string | null,
        chats?:  {
          __typename: "ModelChatConnection",
          nextToken?: string | null,
        } | null,
        friends?:  {
          __typename: "ModelFriendshipConnection",
          nextToken?: string | null,
        } | null,
        storage?:  {
          __typename: "ModelStorageConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      status: FriendshipStatus,
      owners: Array< string >,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type FriendsByUserIdQueryVariables = {
  contactId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFriendshipFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FriendsByUserIdQuery = {
  friendsByUserId?:  {
    __typename: "ModelFriendshipConnection",
    items:  Array< {
      __typename: "Friendship",
      id: string,
      contactId: string,
      contact?:  {
        __typename: "User",
        owner: string,
        email: string,
        peerId?: string | null,
        fullName?: string | null,
        about?: string | null,
        role?: string | null,
        nickname?: string | null,
        avatar?: string | null,
        chats?:  {
          __typename: "ModelChatConnection",
          nextToken?: string | null,
        } | null,
        friends?:  {
          __typename: "ModelFriendshipConnection",
          nextToken?: string | null,
        } | null,
        storage?:  {
          __typename: "ModelStorageConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      status: FriendshipStatus,
      owners: Array< string >,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateChatSubscriptionVariables = {
  filter?: ModelSubscriptionChatFilterInput | null,
};

export type OnCreateChatSubscription = {
  onCreateChat?:  {
    __typename: "Chat",
    id: string,
    senderId: string,
    userId: string,
    unseenMsgs: number,
    chat?: Array< string | null > | null,
    owners: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateChatSubscriptionVariables = {
  filter?: ModelSubscriptionChatFilterInput | null,
};

export type OnUpdateChatSubscription = {
  onUpdateChat?:  {
    __typename: "Chat",
    id: string,
    senderId: string,
    userId: string,
    unseenMsgs: number,
    chat?: Array< string | null > | null,
    owners: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteChatSubscriptionVariables = {
  filter?: ModelSubscriptionChatFilterInput | null,
};

export type OnDeleteChatSubscription = {
  onDeleteChat?:  {
    __typename: "Chat",
    id: string,
    senderId: string,
    userId: string,
    unseenMsgs: number,
    chat?: Array< string | null > | null,
    owners: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateStorageSubscriptionVariables = {
  filter?: ModelSubscriptionStorageFilterInput | null,
  owner?: string | null,
};

export type OnCreateStorageSubscription = {
  onCreateStorage?:  {
    __typename: "Storage",
    cid: string,
    name: string,
    type: string,
    size: number,
    createdAt: string,
    updatedAt: string,
    userStorageId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateStorageSubscriptionVariables = {
  filter?: ModelSubscriptionStorageFilterInput | null,
  owner?: string | null,
};

export type OnUpdateStorageSubscription = {
  onUpdateStorage?:  {
    __typename: "Storage",
    cid: string,
    name: string,
    type: string,
    size: number,
    createdAt: string,
    updatedAt: string,
    userStorageId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteStorageSubscriptionVariables = {
  filter?: ModelSubscriptionStorageFilterInput | null,
  owner?: string | null,
};

export type OnDeleteStorageSubscription = {
  onDeleteStorage?:  {
    __typename: "Storage",
    cid: string,
    name: string,
    type: string,
    size: number,
    createdAt: string,
    updatedAt: string,
    userStorageId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    owner: string,
    email: string,
    peerId?: string | null,
    fullName?: string | null,
    about?: string | null,
    role?: string | null,
    nickname?: string | null,
    avatar?: string | null,
    chats?:  {
      __typename: "ModelChatConnection",
      items:  Array< {
        __typename: "Chat",
        id: string,
        senderId: string,
        userId: string,
        unseenMsgs: number,
        chat?: Array< string | null > | null,
        owners: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    friends?:  {
      __typename: "ModelFriendshipConnection",
      items:  Array< {
        __typename: "Friendship",
        id: string,
        contactId: string,
        contact?:  {
          __typename: "User",
          owner: string,
          email: string,
          peerId?: string | null,
          fullName?: string | null,
          about?: string | null,
          role?: string | null,
          nickname?: string | null,
          avatar?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        status: FriendshipStatus,
        owners: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    storage?:  {
      __typename: "ModelStorageConnection",
      items:  Array< {
        __typename: "Storage",
        cid: string,
        name: string,
        type: string,
        size: number,
        createdAt: string,
        updatedAt: string,
        userStorageId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    owner: string,
    email: string,
    peerId?: string | null,
    fullName?: string | null,
    about?: string | null,
    role?: string | null,
    nickname?: string | null,
    avatar?: string | null,
    chats?:  {
      __typename: "ModelChatConnection",
      items:  Array< {
        __typename: "Chat",
        id: string,
        senderId: string,
        userId: string,
        unseenMsgs: number,
        chat?: Array< string | null > | null,
        owners: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    friends?:  {
      __typename: "ModelFriendshipConnection",
      items:  Array< {
        __typename: "Friendship",
        id: string,
        contactId: string,
        contact?:  {
          __typename: "User",
          owner: string,
          email: string,
          peerId?: string | null,
          fullName?: string | null,
          about?: string | null,
          role?: string | null,
          nickname?: string | null,
          avatar?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        status: FriendshipStatus,
        owners: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    storage?:  {
      __typename: "ModelStorageConnection",
      items:  Array< {
        __typename: "Storage",
        cid: string,
        name: string,
        type: string,
        size: number,
        createdAt: string,
        updatedAt: string,
        userStorageId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    owner: string,
    email: string,
    peerId?: string | null,
    fullName?: string | null,
    about?: string | null,
    role?: string | null,
    nickname?: string | null,
    avatar?: string | null,
    chats?:  {
      __typename: "ModelChatConnection",
      items:  Array< {
        __typename: "Chat",
        id: string,
        senderId: string,
        userId: string,
        unseenMsgs: number,
        chat?: Array< string | null > | null,
        owners: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    friends?:  {
      __typename: "ModelFriendshipConnection",
      items:  Array< {
        __typename: "Friendship",
        id: string,
        contactId: string,
        contact?:  {
          __typename: "User",
          owner: string,
          email: string,
          peerId?: string | null,
          fullName?: string | null,
          about?: string | null,
          role?: string | null,
          nickname?: string | null,
          avatar?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null,
        status: FriendshipStatus,
        owners: Array< string >,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    storage?:  {
      __typename: "ModelStorageConnection",
      items:  Array< {
        __typename: "Storage",
        cid: string,
        name: string,
        type: string,
        size: number,
        createdAt: string,
        updatedAt: string,
        userStorageId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFriendshipSubscriptionVariables = {
  filter?: ModelSubscriptionFriendshipFilterInput | null,
};

export type OnCreateFriendshipSubscription = {
  onCreateFriendship?:  {
    __typename: "Friendship",
    id: string,
    contactId: string,
    contact?:  {
      __typename: "User",
      owner: string,
      email: string,
      peerId?: string | null,
      fullName?: string | null,
      about?: string | null,
      role?: string | null,
      nickname?: string | null,
      avatar?: string | null,
      chats?:  {
        __typename: "ModelChatConnection",
        items:  Array< {
          __typename: "Chat",
          id: string,
          senderId: string,
          userId: string,
          unseenMsgs: number,
          chat?: Array< string | null > | null,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      friends?:  {
        __typename: "ModelFriendshipConnection",
        items:  Array< {
          __typename: "Friendship",
          id: string,
          contactId: string,
          status: FriendshipStatus,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      storage?:  {
        __typename: "ModelStorageConnection",
        items:  Array< {
          __typename: "Storage",
          cid: string,
          name: string,
          type: string,
          size: number,
          createdAt: string,
          updatedAt: string,
          userStorageId?: string | null,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    status: FriendshipStatus,
    owners: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFriendshipSubscriptionVariables = {
  filter?: ModelSubscriptionFriendshipFilterInput | null,
};

export type OnUpdateFriendshipSubscription = {
  onUpdateFriendship?:  {
    __typename: "Friendship",
    id: string,
    contactId: string,
    contact?:  {
      __typename: "User",
      owner: string,
      email: string,
      peerId?: string | null,
      fullName?: string | null,
      about?: string | null,
      role?: string | null,
      nickname?: string | null,
      avatar?: string | null,
      chats?:  {
        __typename: "ModelChatConnection",
        items:  Array< {
          __typename: "Chat",
          id: string,
          senderId: string,
          userId: string,
          unseenMsgs: number,
          chat?: Array< string | null > | null,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      friends?:  {
        __typename: "ModelFriendshipConnection",
        items:  Array< {
          __typename: "Friendship",
          id: string,
          contactId: string,
          status: FriendshipStatus,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      storage?:  {
        __typename: "ModelStorageConnection",
        items:  Array< {
          __typename: "Storage",
          cid: string,
          name: string,
          type: string,
          size: number,
          createdAt: string,
          updatedAt: string,
          userStorageId?: string | null,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    status: FriendshipStatus,
    owners: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFriendshipSubscriptionVariables = {
  filter?: ModelSubscriptionFriendshipFilterInput | null,
};

export type OnDeleteFriendshipSubscription = {
  onDeleteFriendship?:  {
    __typename: "Friendship",
    id: string,
    contactId: string,
    contact?:  {
      __typename: "User",
      owner: string,
      email: string,
      peerId?: string | null,
      fullName?: string | null,
      about?: string | null,
      role?: string | null,
      nickname?: string | null,
      avatar?: string | null,
      chats?:  {
        __typename: "ModelChatConnection",
        items:  Array< {
          __typename: "Chat",
          id: string,
          senderId: string,
          userId: string,
          unseenMsgs: number,
          chat?: Array< string | null > | null,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      friends?:  {
        __typename: "ModelFriendshipConnection",
        items:  Array< {
          __typename: "Friendship",
          id: string,
          contactId: string,
          status: FriendshipStatus,
          owners: Array< string >,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      storage?:  {
        __typename: "ModelStorageConnection",
        items:  Array< {
          __typename: "Storage",
          cid: string,
          name: string,
          type: string,
          size: number,
          createdAt: string,
          updatedAt: string,
          userStorageId?: string | null,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    status: FriendshipStatus,
    owners: Array< string >,
    createdAt: string,
    updatedAt: string,
  } | null,
};
