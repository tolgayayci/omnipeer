/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStorage = /* GraphQL */ `
  query GetStorage($cid: String!) {
    getStorage(cid: $cid) {
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
export const listStorages = /* GraphQL */ `
  query ListStorages(
    $cid: String
    $filter: ModelStorageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStorages(
      cid: $cid
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($owner: String!) {
    getUser(owner: $owner) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $owner: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      owner: $owner
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const userByEmail = /* GraphQL */ `
  query UserByEmail(
    $email: AWSEmail!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getChat = /* GraphQL */ `
  query GetChat($id: ID!) {
    getChat(id: $id) {
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
export const listChats = /* GraphQL */ `
  query ListChats(
    $id: ID
    $filter: ModelChatFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listChats(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
  }
`;
export const chatsByUserId = /* GraphQL */ `
  query ChatsByUserId(
    $userId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelChatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    chatsByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getFriendship = /* GraphQL */ `
  query GetFriendship($id: ID!) {
    getFriendship(id: $id) {
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
export const listFriendships = /* GraphQL */ `
  query ListFriendships(
    $id: ID
    $filter: ModelFriendshipFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFriendships(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
          chats {
            nextToken
          }
          friends {
            nextToken
          }
          storage {
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
      nextToken
    }
  }
`;
export const friendsByUserId = /* GraphQL */ `
  query FriendsByUserId(
    $contactId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelFriendshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    friendsByUserId(
      contactId: $contactId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
          chats {
            nextToken
          }
          friends {
            nextToken
          }
          storage {
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
      nextToken
    }
  }
`;
