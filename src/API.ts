/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateStorageInput = {
  cid: string;
  name: string;
  type: string;
  size: number;
};

export type ModelStorageConditionInput = {
  name?: ModelStringInput | null;
  type?: ModelStringInput | null;
  size?: ModelIntInput | null;
  and?: Array<ModelStorageConditionInput | null> | null;
  or?: Array<ModelStorageConditionInput | null> | null;
  not?: ModelStorageConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
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
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Storage = {
  __typename: "Storage";
  cid: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateStorageInput = {
  cid: string;
  name?: string | null;
  type?: string | null;
  size?: number | null;
};

export type DeleteStorageInput = {
  cid: string;
};

export type ModelStorageFilterInput = {
  cid?: ModelStringInput | null;
  name?: ModelStringInput | null;
  type?: ModelStringInput | null;
  size?: ModelIntInput | null;
  and?: Array<ModelStorageFilterInput | null> | null;
  or?: Array<ModelStorageFilterInput | null> | null;
  not?: ModelStorageFilterInput | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type ModelStorageConnection = {
  __typename: "ModelStorageConnection";
  items: Array<Storage | null>;
  nextToken?: string | null;
};

export type CreateStorageMutationVariables = {
  input: CreateStorageInput;
  condition?: ModelStorageConditionInput | null;
};

export type CreateStorageMutation = {
  createStorage?: {
    __typename: "Storage";
    cid: string;
    name: string;
    type: string;
    size: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdateStorageMutationVariables = {
  input: UpdateStorageInput;
  condition?: ModelStorageConditionInput | null;
};

export type UpdateStorageMutation = {
  updateStorage?: {
    __typename: "Storage";
    cid: string;
    name: string;
    type: string;
    size: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeleteStorageMutationVariables = {
  input: DeleteStorageInput;
  condition?: ModelStorageConditionInput | null;
};

export type DeleteStorageMutation = {
  deleteStorage?: {
    __typename: "Storage";
    cid: string;
    name: string;
    type: string;
    size: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type GetStorageQueryVariables = {
  cid: string;
};

export type GetStorageQuery = {
  getStorage?: {
    __typename: "Storage";
    cid: string;
    name: string;
    type: string;
    size: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListStoragesQueryVariables = {
  cid?: string | null;
  filter?: ModelStorageFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListStoragesQuery = {
  listStorages?: {
    __typename: "ModelStorageConnection";
    items: Array<{
      __typename: "Storage";
      cid: string;
      name: string;
      type: string;
      size: number;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type OnCreateStorageSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreateStorageSubscription = {
  onCreateStorage?: {
    __typename: "Storage";
    cid: string;
    name: string;
    type: string;
    size: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdateStorageSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdateStorageSubscription = {
  onUpdateStorage?: {
    __typename: "Storage";
    cid: string;
    name: string;
    type: string;
    size: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeleteStorageSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeleteStorageSubscription = {
  onDeleteStorage?: {
    __typename: "Storage";
    cid: string;
    name: string;
    type: string;
    size: number;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};
