// @flow
import React from "react";
import {
  CardHeaderContainer,
  CardHeader,
  CardContent,
  CardFooter,
  CardContainer,
  Box
  //Avatar,
  //Fade
} from "./primitives";
import Blockies from "react-blockies";
//import styled from "styled-components";

type CardProps = {
  hash: string,
  number: number,
  miner: string,
  timestamp: string,
  transactions: []
};

export const BlockCard = (props: CardProps) => (
  <CardContainer>
    <CardHeaderContainer>
      <CardHeader>
        <Blockies seed={props.hash} scale={7} />
      </CardHeader>
      <CardContent>
        <b>Block</b> <a href={props.hash}>{props.number}</a>
        <br />
        <Box>Mined By: {props.miner}</Box>
        includes <a href={props.hash}>{props.transactions.length}</a>{" "}
        Transactions
      </CardContent>
      <CardFooter>
        <span>{props.timestamp} ago</span>
      </CardFooter>
    </CardHeaderContainer>
  </CardContainer>
);
