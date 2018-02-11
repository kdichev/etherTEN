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
        <Avatar src={`http://tinygraphs.com/squares/${props.hash}?theme=seascape&numcolors=4&size=220&fmt=svg`} />
      </CardHeader>
      <CardContent>
        <b>Block</b> <span onClick={() => props.onCardClick(props.hash)}>{props.number}</span>
        <br />
        <Box>Mined By: {props.miner}</Box>
        includes {props.txns} Transactions
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