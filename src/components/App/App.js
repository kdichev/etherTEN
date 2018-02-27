// @flow
import type {
  AppProps,
  AppState,
  updateBlockByIndex,
  AddBlock
} from "./../types";
import React, { Component } from "react";
import { withWeb3 } from "./../Web3Provider";
import { BlockCard } from "./../BlockCard/BlockCard";
import {
  AppContainer,
  Title,
  SubTitle,
  Headline,
  Text,
  Display1
} from "./primitives";
import { BlockTransactions } from "./../BlockTransactions/BlockTransactions";
import { BlockInfo } from "./../BlockInfo/BlockInfo";
// $FlowFixMe
import Blockies from "react-blockies";
// $FlowFixMe
import moment from "moment";
// $FlowFixMe
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const Spinner = styled.div`
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid #3498db;
  width: 10px;
  height: 10px;
  animation: ${spin} 500ms linear infinite;
`;

export const updateBlock: updateBlockByIndex = (
  prevState,
  updatedBlock,
  hash
) => {
  const blockIndex = prevState.blocks.findIndex(block => block.hash === hash);
  prevState.blocks[blockIndex] = {
    ...prevState.blocks[blockIndex],
    ...updatedBlock
  };
  return { ...prevState };
};

export const addBlock: AddBlock = (prevState, newBlock) => ({
  blocks: [...prevState.blocks, newBlock]
});

const Link = props => {
  return (
    <a
      href={props.href}
      onClick={e => {
        e.preventDefault();
      }}
    >
      {props.children}
    </a>
  );
};

class PureComponent extends React.Component<{ render: any }> {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return this.props.render;
  }
}

const BlockTitle = (props: {
  onClick?: () => void,
  number: number,
  hash: string
}) => (
  <Title>
    Block
    {props.number}
  </Title>
);

const Container = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction ? `${props.direction}` : `row`)};
  ${props => props.flex && `flex: ${props.flex}`};
`;

const BlockSubTitle = (props: {
  onClick?: () => void,
  transactions: [],
  infoLoading?: boolean,
  hash: string
}) =>
  props.transactionInfo ? (
    <Container>
      <Display1>{props.transactionInfo.length}</Display1>
      <Text>trx</Text>
    </Container>
  ) : null;

class App extends Component<AppProps, AppState> {
  state = { blocks: [] };

  componentDidMount() {
    this.initAsyncFlow();
  }

  initAsyncFlow = async () => {
    const { getBlockNumber } = this.props;
    try {
      const latestBlockNumber = await getBlockNumber();
      await this.getLatestBlocks(latestBlockNumber);
      this.getLatestBlocksInfo();
    } catch (e) {
      console.log("Error");
    }
  };

  getLatestBlocks = async number => {
    const { getBlock } = this.props;
    for (let i = 1; i <= 10; i++) {
      const newBlock = await getBlock(number - i);
      this.setState(
        prevState => newBlock && addBlock(prevState, { ...newBlock })
      );
    }
  };

  getLatestBlocksInfo = () => {
    const { blocks } = this.state;
    blocks.forEach(async ({ hash, transactions }) => {
      this.setBlockState({ infoLoading: true }, hash);
      const transactionInfo = await Promise.all(
        transactions
          .map(async trx => await this.props.getTransaction(trx))
          .filter(this.validateTransactions)
          .map(async item => {
            const result = await item;
            return {
              ...result,
              value: this.props.fromWei(result.value, "ether")
            };
          })
      );
      this.setBlockState({ transactionInfo, infoLoading: false }, hash);
    });
  };

  validateTransactions = async item => {
    const result = await item;
    return result.value > "0" && result.to;
  };

  setBlockState = (payload, hash) =>
    this.setState(prevState => updateBlock(prevState, { ...payload }, hash));

  setToggleState = (key, hashIndex, toggle) =>
    this.setState(prevState =>
      updateBlock(prevState, { [key]: !toggle }, hashIndex)
    );

  render() {
    const { blocks } = this.state;
    return (
      <AppContainer>
        {blocks.map(block => (
          <BlockCard
            onClick={() =>
              this.setToggleState("toggle", block.hash, block.toggle)
            }
            {...block}
            key={block.hash}
            avatar={<Blockies seed={block.hash} scale={7} />}
            title={<BlockTitle {...block} />}
            subtitle={
              <PureComponent
                render={<Text>{moment.unix(block.timestamp).fromNow()}</Text>}
              />
            }
            footer={
              block.infoLoading ? <Spinner /> : <BlockSubTitle {...block} />
            }
          >
            {block.toggle && (
              <BlockInfo {...block} innerRef={ref => console.log(ref)} />
            )}
            {block.toggle && (
              <BlockTransactions {...block} blockIndex={block.hash} />
            )}
          </BlockCard>
        ))}
      </AppContainer>
    );
  }
}

export default withWeb3(App);
