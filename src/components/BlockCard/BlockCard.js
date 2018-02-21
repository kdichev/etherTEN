// @flow
import type { Card } from "./../types";
import React from "react";
import {
  CardHeaderContainer,
  CardHeader,
  CardContent,
  CardFooter,
  CardContainer,
  Box
} from "./primitives";
//import Blockies from "react-blockies";

export const BlockCard: Card = props => (
  <CardContainer>
    <CardHeaderContainer>
      <CardHeader>{/* <Blockies seed={props.hash} scale={7} /> */}</CardHeader>
      <CardContent>
        <b>Block</b> <a href={props.hash}>{props.number}</a>
        <br />
        <Box title={props.miner}>Mined By: {props.miner}</Box>
        includes{" "}
        <a href={props.hash}>
          {props.transactions && props.transactions.length}
        </a>{" "}
        Transactions
      </CardContent>
      <CardFooter>{props.timestamp} ago</CardFooter>
    </CardHeaderContainer>
    {props.children}
  </CardContainer>
);
