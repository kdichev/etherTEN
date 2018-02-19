// @flow
import React from "react";
import {
  CardHeaderContainer,
  CardHeader,
  CardContent,
  CardFooter,
  Avatar,
  CardContainer,
  Box,
  Fade
} from "./primitives";
import styled from "styled-components";

type CardProps = {
  hash: string,
  number: number,
  miner: string,
  timestamp: string,
  transactions: [],
  children?: {}
};

export const BlockCard = (props: CardProps) => (
  <CardContainer>
    <CardHeaderContainer>
      <CardHeader>
        <Avatar
          src={`http://tinygraphs.com/squares/${
            props.hash
          }?theme=seascape&numcolors=4&size=220&fmt=svg`}
        />
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
    {props.children}
  </CardContainer>
);
