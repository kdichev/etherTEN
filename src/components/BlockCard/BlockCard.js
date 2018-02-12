import React from 'react'
import {
  CardHeaderContainer,
  CardHeader,
  CardContent,
  CardFooter,
  Avatar,
  CardContainer
} from "./primitives";
import styled from 'styled-components'

function truncate(width) {
  return `
    width: ${width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}

// Make this div truncate the text with an ellipsis
const Box = styled.div`
  ${ truncate('350px') }
`;

export const BlockCard = (props) => (
  <CardContainer>
    <CardHeaderContainer>
      <CardHeader>
        <Avatar src={`http://tinygraphs.com/squares/${props.hash}?theme=seascape&numcolors=4&size=220&fmt=svg`} loading={props.loading}/>
      </CardHeader>
      <CardContent>
        <b>Block</b> <a href={props.hash}>{props.number}</a>
        <br />
        <Box>Mined By: {props.miner}</Box>
        includes <a href={props.hash}>{props.txns}</a> Transactions
      </CardContent>
      <CardFooter>
        <span>
          {props.timestamp} seconds ago
        </span>
      </CardFooter>
    </CardHeaderContainer>
    {props.children}
  </CardContainer>
)