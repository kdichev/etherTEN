// @flow
import React from "react";
// $FlowFixMe
import Blockies from "react-blockies";
import type { Transactions } from "./../types";
import {
  TransactionsInfoContainer,
  DialogContent,
  Box,
  Arrow
} from "./primitives";

export const BlockTransactions: Transactions = props => (
  <TransactionsInfoContainer>
    {props.transactionInfo.map(tInfo => (
      <DialogContent>
        <Blockies seed={tInfo.from} scale={2} />
        <Box>{tInfo.from}</Box>
        <Arrow>&rarr;</Arrow>
        <Blockies seed={tInfo.to} scale={2} />
        <Box>{tInfo.to}</Box>
      </DialogContent>
    ))}
  </TransactionsInfoContainer>
);
