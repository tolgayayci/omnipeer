/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStorage = /* GraphQL */ `
  subscription OnCreateStorage($owner: String) {
    onCreateStorage(owner: $owner) {
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
export const onUpdateStorage = /* GraphQL */ `
  subscription OnUpdateStorage($owner: String) {
    onUpdateStorage(owner: $owner) {
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
export const onDeleteStorage = /* GraphQL */ `
  subscription OnDeleteStorage($owner: String) {
    onDeleteStorage(owner: $owner) {
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
export const onCreateStream = /* GraphQL */ `
  subscription OnCreateStream($owner: String) {
    onCreateStream(owner: $owner) {
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
export const onUpdateStream = /* GraphQL */ `
  subscription OnUpdateStream($owner: String) {
    onUpdateStream(owner: $owner) {
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
export const onDeleteStream = /* GraphQL */ `
  subscription OnDeleteStream($owner: String) {
    onDeleteStream(owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat($owner: String) {
    onCreateChat(owner: $owner) {
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
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat($owner: String) {
    onUpdateChat(owner: $owner) {
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
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat($owner: String) {
    onDeleteChat(owner: $owner) {
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
