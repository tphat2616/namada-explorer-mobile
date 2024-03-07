export const tokenQueryKeys = {
  transactions: () => ['transactions'] as const,
  blocks: () => ['blocks'] as const,
  proposals: () => ['proposals'] as const,
  infor: () => ['infor'] as const,
  validator: () => ['validator'] as const,
  transactionsByAddress: (address: string) =>
    [tokenQueryKeys.transactions(), address] as const,
  balance: (address: string) => ['balance', address] as const,
  getTransactionDetail: ({hash}: {hash: string}) => ['get-transactions', hash],
  getBlockDetail: ({hash}: {hash: string}) => ['get-blocks', hash],
};
