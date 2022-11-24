/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateStorageInput = {
  cid: string,
  name: string,
  type: string,
  size: number,
};

export type ModelStorageConditionInput = {
  name?: ModelStringInput | null,
  type?: ModelStringInput | null,
  size?: ModelIntInput | null,
  and?: Array< ModelStorageConditionInput | null > | null,
  or?: Array< ModelStorageConditionInput | null > | null,
  not?: ModelStorageConditionInput | null,
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

export type Storage = {
  __typename: "Storage",
  cid: string,
  name: string,
  type: string,
  size: number,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateStorageInput = {
  cid: string,
  name?: string | null,
  type?: string | null,
  size?: number | null,
};

export type DeleteStorageInput = {
  cid: string,
};

export type CreateStreamInput = {
  ownerPeerId: string,
  remotePeerId: string,
  name: string,
  type: string,
  size: number,
  status: StorageType,
  statusDetails: string,
};

export enum StorageType {
  pending = "pending",
  done = "done",
  cancelled = "cancelled",
}


export type ModelStreamConditionInput = {
  remotePeerId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  type?: ModelStringInput | null,
  size?: ModelIntInput | null,
  status?: ModelStorageTypeInput | null,
  statusDetails?: ModelStringInput | null,
  and?: Array< ModelStreamConditionInput | null > | null,
  or?: Array< ModelStreamConditionInput | null > | null,
  not?: ModelStreamConditionInput | null,
};

export type ModelStorageTypeInput = {
  eq?: StorageType | null,
  ne?: StorageType | null,
};

export type Stream = {
  __typename: "Stream",
  ownerPeerId: string,
  remotePeerId: string,
  name: string,
  type: string,
  size: number,
  status: StorageType,
  statusDetails: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateStreamInput = {
  ownerPeerId: string,
  remotePeerId?: string | null,
  name?: string | null,
  type?: string | null,
  size?: number | null,
  status?: StorageType | null,
  statusDetails?: string | null,
};

export type DeleteStreamInput = {
  ownerPeerId: string,
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
  contacts?: Array< string | null > | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  peerId?: ModelStringInput | null,
  fullName?: ModelStringInput | null,
  about?: ModelStringInput | null,
  role?: ModelStringInput | null,
  nickname?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  contacts?: ModelStringInput | null,
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
  contacts?: Array< string | null > | null,
  chats?: ModelChatConnection | null,
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
  userId: string,
  unseenMsgs: number,
  chat?: Array< string | null > | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
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
  contacts?: Array< string | null > | null,
};

export type DeleteUserInput = {
  owner: string,
};

export type CreateChatInput = {
  id?: string | null,
  userId: string,
  unseenMsgs: number,
  chat?: Array< string | null > | null,
};

export type ModelChatConditionInput = {
  userId?: ModelStringInput | null,
  unseenMsgs?: ModelIntInput | null,
  chat?: ModelStringInput | null,
  and?: Array< ModelChatConditionInput | null > | null,
  or?: Array< ModelChatConditionInput | null > | null,
  not?: ModelChatConditionInput | null,
};

export type UpdateChatInput = {
  id: string,
  userId?: string | null,
  unseenMsgs?: number | null,
  chat?: Array< string | null > | null,
};

export type DeleteChatInput = {
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
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelStorageConnection = {
  __typename: "ModelStorageConnection",
  items:  Array<Storage | null >,
  nextToken?: string | null,
};

export type ModelStreamFilterInput = {
  ownerPeerId?: ModelStringInput | null,
  remotePeerId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  type?: ModelStringInput | null,
  size?: ModelIntInput | null,
  status?: ModelStorageTypeInput | null,
  statusDetails?: ModelStringInput | null,
  and?: Array< ModelStreamFilterInput | null > | null,
  or?: Array< ModelStreamFilterInput | null > | null,
  not?: ModelStreamFilterInput | null,
};

export type ModelStreamConnection = {
  __typename: "ModelStreamConnection",
  items:  Array<Stream | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  owner?: ModelStringInput | null,
  email?: ModelStringInput | null,
  peerId?: ModelStringInput | null,
  fullName?: ModelStringInput | null,
  about?: ModelStringInput | null,
  role?: ModelStringInput | null,
  nickname?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  contacts?: ModelStringInput | null,
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
  userId?: ModelStringInput | null,
  unseenMsgs?: ModelIntInput | null,
  chat?: ModelStringInput | null,
  and?: Array< ModelChatFilterInput | null > | null,
  or?: Array< ModelChatFilterInput | null > | null,
  not?: ModelChatFilterInput | null,
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
    owner?: string | null,
  } | null,
};

export type CreateStreamMutationVariables = {
  input: CreateStreamInput,
  condition?: ModelStreamConditionInput | null,
};

export type CreateStreamMutation = {
  createStream?:  {
    __typename: "Stream",
    ownerPeerId: string,
    remotePeerId: string,
    name: string,
    type: string,
    size: number,
    status: StorageType,
    statusDetails: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateStreamMutationVariables = {
  input: UpdateStreamInput,
  condition?: ModelStreamConditionInput | null,
};

export type UpdateStreamMutation = {
  updateStream?:  {
    __typename: "Stream",
    ownerPeerId: string,
    remotePeerId: string,
    name: string,
    type: string,
    size: number,
    status: StorageType,
    statusDetails: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteStreamMutationVariables = {
  input: DeleteStreamInput,
  condition?: ModelStreamConditionInput | null,
};

export type DeleteStreamMutation = {
  deleteStream?:  {
    __typename: "Stream",
    ownerPeerId: string,
    remotePeerId: string,
    name: string,
    type: string,
    size: number,
    status: StorageType,
    statusDetails: string,
    createdAt: string,
    updatedAt: string,
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
    contacts?: Array< string | null > | null,
    chats?:  {
      __typename: "ModelChatConnection",
      items:  Array< {
        __typename: "Chat",
        id: string,
        userId: string,
        unseenMsgs: number,
        chat?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
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
    contacts?: Array< string | null > | null,
    chats?:  {
      __typename: "ModelChatConnection",
      items:  Array< {
        __typename: "Chat",
        id: string,
        userId: string,
        unseenMsgs: number,
        chat?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
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
    contacts?: Array< string | null > | null,
    chats?:  {
      __typename: "ModelChatConnection",
      items:  Array< {
        __typename: "Chat",
        id: string,
        userId: string,
        unseenMsgs: number,
        chat?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
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
    userId: string,
    unseenMsgs: number,
    chat?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    userId: string,
    unseenMsgs: number,
    chat?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    userId: string,
    unseenMsgs: number,
    chat?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetStreamQueryVariables = {
  ownerPeerId: string,
};

export type GetStreamQuery = {
  getStream?:  {
    __typename: "Stream",
    ownerPeerId: string,
    remotePeerId: string,
    name: string,
    type: string,
    size: number,
    status: StorageType,
    statusDetails: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListStreamsQueryVariables = {
  ownerPeerId?: string | null,
  filter?: ModelStreamFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListStreamsQuery = {
  listStreams?:  {
    __typename: "ModelStreamConnection",
    items:  Array< {
      __typename: "Stream",
      ownerPeerId: string,
      remotePeerId: string,
      name: string,
      type: string,
      size: number,
      status: StorageType,
      statusDetails: string,
      createdAt: string,
      updatedAt: string,
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
    contacts?: Array< string | null > | null,
    chats?:  {
      __typename: "ModelChatConnection",
      items:  Array< {
        __typename: "Chat",
        id: string,
        userId: string,
        unseenMsgs: number,
        chat?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
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
      contacts?: Array< string | null > | null,
      chats?:  {
        __typename: "ModelChatConnection",
        items:  Array< {
          __typename: "Chat",
          id: string,
          userId: string,
          unseenMsgs: number,
          chat?: Array< string | null > | null,
          createdAt: string,
          updatedAt: string,
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
    userId: string,
    unseenMsgs: number,
    chat?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
      userId: string,
      unseenMsgs: number,
      chat?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateStorageSubscriptionVariables = {
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
    owner?: string | null,
  } | null,
};

export type OnUpdateStorageSubscriptionVariables = {
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
    owner?: string | null,
  } | null,
};

export type OnDeleteStorageSubscriptionVariables = {
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
    owner?: string | null,
  } | null,
};

export type OnCreateStreamSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateStreamSubscription = {
  onCreateStream?:  {
    __typename: "Stream",
    ownerPeerId: string,
    remotePeerId: string,
    name: string,
    type: string,
    size: number,
    status: StorageType,
    statusDetails: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateStreamSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateStreamSubscription = {
  onUpdateStream?:  {
    __typename: "Stream",
    ownerPeerId: string,
    remotePeerId: string,
    name: string,
    type: string,
    size: number,
    status: StorageType,
    statusDetails: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteStreamSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteStreamSubscription = {
  onDeleteStream?:  {
    __typename: "Stream",
    ownerPeerId: string,
    remotePeerId: string,
    name: string,
    type: string,
    size: number,
    status: StorageType,
    statusDetails: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
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
    contacts?: Array< string | null > | null,
    chats?:  {
      __typename: "ModelChatConnection",
      items:  Array< {
        __typename: "Chat",
        id: string,
        userId: string,
        unseenMsgs: number,
        chat?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
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
    contacts?: Array< string | null > | null,
    chats?:  {
      __typename: "ModelChatConnection",
      items:  Array< {
        __typename: "Chat",
        id: string,
        userId: string,
        unseenMsgs: number,
        chat?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
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
    contacts?: Array< string | null > | null,
    chats?:  {
      __typename: "ModelChatConnection",
      items:  Array< {
        __typename: "Chat",
        id: string,
        userId: string,
        unseenMsgs: number,
        chat?: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateChatSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateChatSubscription = {
  onCreateChat?:  {
    __typename: "Chat",
    id: string,
    userId: string,
    unseenMsgs: number,
    chat?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateChatSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateChatSubscription = {
  onUpdateChat?:  {
    __typename: "Chat",
    id: string,
    userId: string,
    unseenMsgs: number,
    chat?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteChatSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteChatSubscription = {
  onDeleteChat?:  {
    __typename: "Chat",
    id: string,
    userId: string,
    unseenMsgs: number,
    chat?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
