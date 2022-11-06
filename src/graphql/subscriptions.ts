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
