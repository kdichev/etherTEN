// @flow
import React from "react";
// $FlowFixMe
import Blockies from "react-blockies";
import type { Transactions } from "./../types";
import { TransactionsInfoContainer, DialogContent, Arrow } from "./primitives";
import { Text } from "./../App/primitives";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${props => (props.direction ? `${props.direction}` : `row`)};
  ${props => props.flex && `flex: ${props.flex}`};
`;

export const BlockTransactions: Transactions = props => (
  <TransactionsInfoContainer>
    {props.transactionInfo.map(tInfo => (
      <DialogContent>
        <Container flex={6}>
          <Blockies seed={tInfo.from} scale={4} />
          <Text truncate={240} paddingLeft={8}>
            {tInfo.from}
          </Text>
        </Container>
        <Container direction="column">
          <Arrow>&rarr;</Arrow>
          <Text color="#093" textAlign="center">
            {tInfo.value} ETH
          </Text>
        </Container>
        <Container flex={6} direction="row-reverse">
          <Blockies seed={tInfo.to} scale={4} />
          <Text truncate={240} paddingRight={8}>
            {tInfo.to}
          </Text>
        </Container>
      </DialogContent>
    ))}
  </TransactionsInfoContainer>
);
