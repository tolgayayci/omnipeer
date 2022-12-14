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
      userStorageId
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
      userStorageId
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
      userStorageId
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
export const updateChat = /* GraphQL */ `
  mutation UpdateChat(
    $input: UpdateChatInput!
    $condition: ModelChatConditionInput
  ) {
    updateChat(input: $input, condition: $condition) {
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
export const deleteChat = /* GraphQL */ `
  mutation DeleteChat(
    $input: DeleteChatInput!
    $condition: ModelChatConditionInput
  ) {
    deleteChat(input: $input, condition: $condition) {
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
export const createFriendship = /* GraphQL */ `
  mutation CreateFriendship(
    $input: CreateFriendshipInput!
    $condition: ModelFriendshipConditionInput
  ) {
    createFriendship(input: $input, condition: $condition) {
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
export const updateFriendship = /* GraphQL */ `
  mutation UpdateFriendship(
    $input: UpdateFriendshipInput!
    $condition: ModelFriendshipConditionInput
  ) {
    updateFriendship(input: $input, condition: $condition) {
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
export const deleteFriendship = /* GraphQL */ `
  mutation DeleteFriendship(
    $input: DeleteFriendshipInput!
    $condition: ModelFriendshipConditionInput
  ) {
    deleteFriendship(input: $input, condition: $condition) {
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
