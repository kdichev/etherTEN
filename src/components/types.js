// @flow
import type { ComponentType } from "react";

// Blockchain objects type definitions
export type BlockNumber = number;
export type Hash = string;

export type Block = {
  hash: Hash,
  number: BlockNumber,
  miner: Hash,
  txns: number,
  timestamp: string,
  transactions: Array<Hash>,
  transactionsInfo: [],
  difficulty: number,
  toggle: boolean
};

// App.js props and state type definitions
export type AppProps = {
  getBlockNumber: () => BlockNumber,
  getBlock: (number: BlockNumber) => Block,
  getTransaction: (hash: Hash) => void
};

export type AppState = {
  blocks: Array<Block>,
  error: boolean
};

// BlockCard.js props type definitions

type CardProps = {
  hash: Hash,
  number: BlockNumber,
  miner: Hash,
  timestamp: string,
  transactions: [],
  children: any
};

export type Card = (props: CardProps) => any;

type togglePayload = {
  toggle: boolean
};

type infoPayload = {
  transactionInfo: Array<any>
};

type updatePayloads = togglePayload | infoPayload;

export type updateBlockByIndex = (
  prevState: AppState,
  updatedValues: updatePayloads,
  index: number
) => AppState;

export type AddBlock = (prevState: AppState, newBlock: Block) => {};
export type Connector = (C: ComponentType<any>) => ComponentType<any>;

export type Transactions = (props: {
  loading: boolean,
  blockHash: string,
  blockIndex: number,
  toggle: boolean,
  onToggle: (hash: string, index: number, toggle: boolean) => void,
  info: []
}) => any;

export type Info = (props: {
  difficulty: number,
  gasUsed: number
}) => any;
