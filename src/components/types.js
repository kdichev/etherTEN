// @flow
// Blockchain objects type definitions
export type BlockNumber = number;

export type Block = {
  hash: string,
  number: BlockNumber,
  miner: string,
  txns: number,
  timestamp: string,
  transactions: [],
  difficulty: number
};

// App.js props and state type definitions
export type AppProps = {
  getBlockNumber: () => BlockNumber,
  getBlock: (number: BlockNumber) => Block
};

export type AppState = {
  blocks: Array<Block>,
  loading: boolean
};

// BlockCard.js props type definitions

export type Card = (props: CardProps) => any;

type CardProps = {
  hash: string,
  number: number,
  miner: string,
  timestamp: string,
  transactions: []
};
