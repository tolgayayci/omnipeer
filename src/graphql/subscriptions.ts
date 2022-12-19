/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat($filter: ModelSubscriptionChatFilterInput) {
    onCreateChat(filter: $filter) {
      id
      senderId
      userId
      unseenMsgs
      chat
      owners
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat($filter: ModelSubscriptionChatFilterInput) {
    onUpdateChat(filter: $filter) {
      id
      senderId
      userId
      unseenMsgs
      chat
      owners
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat($filter: ModelSubscriptionChatFilterInput) {
    onDeleteChat(filter: $filter) {
      id
      senderId
      userId
      unseenMsgs
      chat
      owners
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStorage = /* GraphQL */ `
  subscription OnCreateStorage(
    $filter: ModelSubscriptionStorageFilterInput
    $owner: String
  ) {
    onCreateStorage(filter: $filter, owner: $owner) {
      cid
      name
      type
      size
      createdAt
      updatedAt
      userStorageId
      owner
    }
  }
`;
export const onUpdateStorage = /* GraphQL */ `
  subscription OnUpdateStorage(
    $filter: ModelSubscriptionStorageFilterInput
    $owner: String
  ) {
    onUpdateStorage(filter: $filter, owner: $owner) {
      cid
      name
      type
      size
      createdAt
      updatedAt
      userStorageId
      owner
    }
  }
`;
export const onDeleteStorage = /* GraphQL */ `
  subscription OnDeleteStorage(
    $filter: ModelSubscriptionStorageFilterInput
    $owner: String
  ) {
    onDeleteStorage(filter: $filter, owner: $owner) {
      cid
      name
      type
      size
      createdAt
      updatedAt
      userStorageId
      owner
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      owner
      email
      peerId
      fullName
      about
      role
      nickname
      avatar
      chats {
        items {
          id
          senderId
          userId
          unseenMsgs
          chat
          owners
          createdAt
          updatedAt
        }
        nextToken
      }
      friends {
        items {
          id
          contactId
          contact {
            owner
            email
            peerId
            fullName
            about
            role
            nickname
            avatar
            createdAt
            updatedAt
          }
          status
          owners
          createdAt
          updatedAt
        }
        nextToken
      }
      storage {
        items {
          cid
          name
          type
          size
          createdAt
          updatedAt
          userStorageId
          owner
        }
        nextToken
      }
      streams {
        items {
          id
          name
          size
          status
          owners
          createdAt
          updatedAt
          userStreamsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      owner
      email
      peerId
      fullName
      about
      role
      nickname
      avatar
      chats {
        items {
          id
          senderId
          userId
          unseenMsgs
          chat
          owners
          createdAt
          updatedAt
        }
        nextToken
      }
      friends {
        items {
          id
          contactId
          contact {
            owner
            email
            peerId
            fullName
            about
            role
            nickname
            avatar
            createdAt
            updatedAt
          }
          status
          owners
          createdAt
          updatedAt
        }
        nextToken
      }
      storage {
        items {
          cid
          name
          type
          size
          createdAt
          updatedAt
          userStorageId
          owner
        }
        nextToken
      }
      streams {
        items {
          id
          name
          size
          status
          owners
          createdAt
          updatedAt
          userStreamsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      owner
      email
      peerId
      fullName
      about
      role
      nickname
      avatar
      chats {
        items {
          id
          senderId
          userId
          unseenMsgs
          chat
          owners
          createdAt
          updatedAt
        }
        nextToken
      }
      friends {
        items {
          id
          contactId
          contact {
            owner
            email
            peerId
            fullName
            about
            role
            nickname
            avatar
            createdAt
            updatedAt
          }
          status
          owners
          createdAt
          updatedAt
        }
        nextToken
      }
      storage {
        items {
          cid
          name
          type
          size
          createdAt
          updatedAt
          userStorageId
          owner
        }
        nextToken
      }
      streams {
        items {
          id
          name
          size
          status
          owners
          createdAt
          updatedAt
          userStreamsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFriendship = /* GraphQL */ `
  subscription OnCreateFriendship(
    $filter: ModelSubscriptionFriendshipFilterInput
  ) {
    onCreateFriendship(filter: $filter) {
      id
      contactId
      contact {
        owner
        email
        peerId
        fullName
        about
        role
        nickname
        avatar
        chats {
          items {
            id
            senderId
            userId
            unseenMsgs
            chat
            owners
            createdAt
            updatedAt
          }
          nextToken
        }
        friends {
          items {
            id
            contactId
            status
            owners
            createdAt
            updatedAt
          }
          nextToken
        }
        storage {
          items {
            cid
            name
            type
            size
            createdAt
            updatedAt
            userStorageId
            owner
          }
          nextToken
        }
        streams {
          items {
            id
            name
            size
            status
            owners
            createdAt
            updatedAt
            userStreamsId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      status
      owners
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFriendship = /* GraphQL */ `
  subscription OnUpdateFriendship(
    $filter: ModelSubscriptionFriendshipFilterInput
  ) {
    onUpdateFriendship(filter: $filter) {
      id
      contactId
      contact {
        owner
        email
        peerId
        fullName
        about
        role
        nickname
        avatar
        chats {
          items {
            id
            senderId
            userId
            unseenMsgs
            chat
            owners
            createdAt
            updatedAt
          }
          nextToken
        }
        friends {
          items {
            id
            contactId
            status
            owners
            createdAt
            updatedAt
          }
          nextToken
        }
        storage {
          items {
            cid
            name
            type
            size
            createdAt
            updatedAt
            userStorageId
            owner
          }
          nextToken
        }
        streams {
          items {
            id
            name
            size
            status
            owners
            createdAt
            updatedAt
            userStreamsId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      status
      owners
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFriendship = /* GraphQL */ `
  subscription OnDeleteFriendship(
    $filter: ModelSubscriptionFriendshipFilterInput
  ) {
    onDeleteFriendship(filter: $filter) {
      id
      contactId
      contact {
        owner
        email
        peerId
        fullName
        about
        role
        nickname
        avatar
        chats {
          items {
            id
            senderId
            userId
            unseenMsgs
            chat
            owners
            createdAt
            updatedAt
          }
          nextToken
        }
        friends {
          items {
            id
            contactId
            status
            owners
            createdAt
            updatedAt
          }
          nextToken
        }
        storage {
          items {
            cid
            name
            type
            size
            createdAt
            updatedAt
            userStorageId
            owner
          }
          nextToken
        }
        streams {
          items {
            id
            name
            size
            status
            owners
            createdAt
            updatedAt
            userStreamsId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      status
      owners
      createdAt
      updatedAt
    }
  }
`;
export const onCreateStream = /* GraphQL */ `
  subscription OnCreateStream($filter: ModelSubscriptionStreamFilterInput) {
    onCreateStream(filter: $filter) {
      id
      name
      size
      status
      owners
      createdAt
      updatedAt
      userStreamsId
    }
  }
`;
export const onUpdateStream = /* GraphQL */ `
  subscription OnUpdateStream($filter: ModelSubscriptionStreamFilterInput) {
    onUpdateStream(filter: $filter) {
      id
      name
      size
      status
      owners
      createdAt
      updatedAt
      userStreamsId
    }
  }
`;
export const onDeleteStream = /* GraphQL */ `
  subscription OnDeleteStream($filter: ModelSubscriptionStreamFilterInput) {
    onDeleteStream(filter: $filter) {
      id
      name
      size
      status
      owners
      createdAt
      updatedAt
      userStreamsId
    }
  }
`;
