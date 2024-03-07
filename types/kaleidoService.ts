export type PayloadGetKaleidoTransactions = {
  address: string;
  page?: number;
  limit?: number;
};

export type PayloadGetKaleidoBlocks = {
  address: string;
  page?: number;
  limit?: number;
};

export type IKaleidoStatsItem = {
  id: number;
  log_time: Date;
  transaction_count: number;
  block_count: number;
};

export type IKaleidoStats = {
  data: IKaleidoStatsItem[];
};
