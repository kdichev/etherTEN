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
  transactions: [],
  transactionInfo?: Array<TransactionInfo>,
  difficulty: number,
  toggle: boolean,
  hover: boolean,
  focused: boolean,
  infoToggle: boolean
};

export type TransactionInfo = {
  from: Hash,
  to: Hash
};

// App.js props and state type definitions
export type AppProps = {
  getBlockNumber: () => BlockNumber,
  getBlock: (number: BlockNumber) => Block,
  getTransaction: (hash: Hash) => TransactionInfo
};

export type AppState = {
  blocks: Array<Block>
};

// BlockCard.js props type definitions

export type CardProps = {
  onClick: () => void,
  avatar: Node,
  title: any,
  subtitle: any,
  footer: Node,
  children?: Node
};

export type Card = (props: CardProps) => any;

type togglePayload = {
  toggle: boolean
};

type infoPayload = {
  transactionInfo?: Array<TransactionInfo>,
  infoLoading?: boolean
};

type updatePayloads = togglePayload | infoPayload;

export type updateBlockByIndex = (
  prevState: AppState,
  updatedValues: updatePayloads,
  hash: Hash
) => AppState;

export type AddBlock = (prevState: AppState, newBlock: Block) => {};
export type Connector = (C: ComponentType<any>) => ComponentType<any>;

export type Transactions = (props: {
  loading: boolean,
  blockHash: string,
  blockIndex: number,
  toggle: boolean,
  onToggle: (hash: string, index: number, toggle: boolean) => void,
  transactionInfo: Array<TransactionInfo>
}) => any;

export type Info = (props: {
  difficulty: number,
  gasUsed: number,
  miner: Hash
}) => any;
