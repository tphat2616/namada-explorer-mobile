import { ethers } from "ethers";

export type IBlockReceipt = ethers.Block | null | undefined;

export interface IKaleidoBlocksTransactions {
  index: number;
  hash: string;
  blockHash: string;
  blockNumber: number;
  timestamp: Date;
  status: string;
  private: boolean;
  from: string;
  to: string;
}

export interface IBlocks {
  height: number;
  hash: string;
  time: string;
  signatures: Signature[];
  transactions: string[];
  proposer: string;
  moniker: string;
  logo_url: string;
}

export interface IBlockJSON {
  data: IBlocks[];
}

export interface Signature {
  moniker?: string;
  logo_url?: null | string;
  signature: string;
  address_hex: string;
}

export interface IBlockDetail {
  data: {
    height: any;
    hash: string;
    time: string;
    signatures: any[];
    transactions: any[];
    proposer: string;
    moniker: string;
    logo_url: string;
  };
}

export interface ProposalJson {
  data: {
    proposals: Proposal[];
    epoch: string;
  };
}

export interface Proposal {
  proposal_id: number;
  title: string;
  type: any;
  start_epoch: number;
  end_epoch: number;
  grace_epoch: number;
  author: string;
  epoch: string;
}
