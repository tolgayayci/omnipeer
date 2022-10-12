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
