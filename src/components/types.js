// @flow
// Blockchain objects type definitions
export type BlockNumber = number;

export type Block = {
  hash: string,
  number: BlockNumber,
  miner: string,
  txns: number,
  timestamp: string,
  transactions: Array<string>,
  transactionsInfo: [],
  difficulty: number,
  toggle: boolean
};

// App.js props and state type definitions
export type AppProps = {
  getBlockNumber: () => BlockNumber,
  getBlock: (number: BlockNumber) => Block,
  getTransaction: (hash: string) => void
};

export type AppState = {
  blocks: Array<Block>
};

// BlockCard.js props type definitions

export type Card = (props: CardProps) => any;

type CardProps = {
  hash: string,
  number: number,
  miner: string,
  timestamp: string,
  transactions: [],
  children: any
};

export type updateBlockByIndex = (
  prevState: AppState,
  updatedValues: updatePayloads,
  index: number
) => AppState;

type togglePayload = {
  toggle: boolean
};

type infoPayload = {
  transactionInfo: Array<any>
};

type updatePayloads = togglePayload | infoPayload;

export type AddBlock = (prevState: AppState, newBlock: Block) => AppState;
