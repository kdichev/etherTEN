// @flow
import React from "react";
// $FlowFixMe
import Blockies from "react-blockies";
import type { Transactions } from "./../types";
import {
  TransactionsInfoContainer,
  DialogContent,
  truncate,
  Box,
  Arrow
} from "./../types";

export const BlockTransactions: Transactions = props => (
  <TransactionsInfoContainer loading={props.loading}>
    <b
      onClick={() =>
        props.onToggle(props.blockHash, props.blockIndex, props.toggle)
      }
    >
      Transactions:
    </b>{" "}
    <br />
    {props.toggle &&
      props.info.map(tInfo => (
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
