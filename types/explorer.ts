import { Block } from "@/utils/types";

export enum EXPLORER_PRAMS {
  NET = "net",
  Q = "q",
}

export enum EXPLORER_NET_VALUE {
  MAIN = "main",
  ETHER = "ether",
  BINANCE = "binance",
}

export interface InforChain {
  response: {
    last_block_height: string;
    last_block_app_hash: string;
  };
}

export interface ValidatorResponse {
  data: Data;
}

export interface Data {
  validators: Validator[];
  total_stake: number;
}

export interface Validator {
  address: string;
  address_hex: string;
  moniker: string;
  tokens: string;
  logo_url: null | string;
  commission_rate: null | string;
  status: Status;
}

export enum Status {
  Active = "active",
  Inactive = "inactive",
  Jailed = "jailed",
}

export interface IGenesisResponse {
  data: Data;
}

export interface Data {
  total_stake: number;
  nb_validators: string;
  last_height: number;
  avg_blocktime: string;
  validators: Validator[];
  blocks: Block[];
  epoch: string;
}
