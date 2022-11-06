import { createContext, useState } from "react";

// Type Imports
import type { Libp2p } from "libp2p";
import type { PeerId } from "@libp2p/interface-peer-id";

export type ErrCallbackType = (err: { [key: string]: string }) => void;

// export type LoginParams = {
//   email: string
//   password: string
// }

// export type RegisterParams = {
//   email: string
//   username: string
//   password: string
// }

// export type UserDataType = {
//   id: number
//   role: string
//   email: string
//   fullName: string
//   username: string
//   password: string
//   avatar?: string | null
// }

// export type AuthValuesType = {
//   loading: boolean
//   setLoading: (value: boolean) => void
//   logout: () => void
//   isInitialized: boolean
//   user: UserDataType | null
//   setUser: (value: UserDataType | null) => void
//   setIsInitialized: (value: boolean) => void
//   login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
//   register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
// }

export type NodeContext = {
  node: Libp2p | undefined;
  setNode: React.Dispatch<React.SetStateAction<Libp2p | undefined>>;
  remotePeerIds: PeerId[];
  setRemotePeerIds: React.Dispatch<React.SetStateAction<PeerId[]>>;
  remotePeerIdAsString: string;
  setRemotePeerIdAsString: React.Dispatch<React.SetStateAction<string>>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};
