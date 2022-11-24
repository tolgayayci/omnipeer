/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createStorage = /* GraphQL */ `
  mutation CreateStorage(
    $input: CreateStorageInput!
    $condition: ModelStorageConditionInput
  ) {
    createStorage(input: $input, condition: $condition) {
      cid
      name
      type
      size
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateStorage = /* GraphQL */ `
  mutation UpdateStorage(
    $input: UpdateStorageInput!
    $condition: ModelStorageConditionInput
  ) {
    updateStorage(input: $input, condition: $condition) {
      cid
      name
      type
      size
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteStorage = /* GraphQL */ `
  mutation DeleteStorage(
    $input: DeleteStorageInput!
    $condition: ModelStorageConditionInput
  ) {
    deleteStorage(input: $input, condition: $condition) {
      cid
      name
      type
      size
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createStream = /* GraphQL */ `
  mutation CreateStream(
    $input: CreateStreamInput!
    $condition: ModelStreamConditionInput
  ) {
    createStream(input: $input, condition: $condition) {
      ownerPeerId
      remotePeerId
      name
      type
      size
      status
      statusDetails
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateStream = /* GraphQL */ `
  mutation UpdateStream(
    $input: UpdateStreamInput!
    $condition: ModelStreamConditionInput
  ) {
    updateStream(input: $input, condition: $condition) {
      ownerPeerId
      remotePeerId
      name
      type
      size
      status
      statusDetails
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteStream = /* GraphQL */ `
  mutation DeleteStream(
    $input: DeleteStreamInput!
    $condition: ModelStreamConditionInput
  ) {
    deleteStream(input: $input, condition: $condition) {
      ownerPeerId
      remotePeerId
      name
      type
      size
      status
      statusDetails
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      owner
      email
      peerId
      fullName
      about
      role
      nickname
      avatar
      contacts
      chats {
        items {
          id
          userId
          unseenMsgs
          chat
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      owner
      email
      peerId
      fullName
      about
      role
      nickname
      avatar
      contacts
      chats {
        items {
          id
          userId
          unseenMsgs
          chat
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      owner
      email
      peerId
      fullName
      about
      role
      nickname
      avatar
      contacts
      chats {
        items {
          id
          userId
          unseenMsgs
          chat
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createChat = /* GraphQL */ `
  mutation CreateChat(
    $input: CreateChatInput!
    $condition: ModelChatConditionInput
  ) {
    createChat(input: $input, condition: $condition) {
      id
      userId
      unseenMsgs
      chat
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateChat = /* GraphQL */ `
  mutation UpdateChat(
    $input: UpdateChatInput!
    $condition: ModelChatConditionInput
  ) {
    updateChat(input: $input, condition: $condition) {
      id
      userId
      unseenMsgs
      chat
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteChat = /* GraphQL */ `
  mutation DeleteChat(
    $input: DeleteChatInput!
    $condition: ModelChatConditionInput
  ) {
    deleteChat(input: $input, condition: $condition) {
      id
      userId
      unseenMsgs
      chat
      createdAt
      updatedAt
      owner
    }
  }
`;
