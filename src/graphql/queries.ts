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
        owner
      }
      nextToken
    }
  }
`;
