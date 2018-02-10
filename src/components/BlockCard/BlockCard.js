import React from 'react'
import { CardHeaderContainer, CardHeader, CardContent, CardFooter } from './primitives'
import styled from 'styled-components'

const Avatar = styled.img`
  width: 70%;
  height: auto;
  border-radius: 50%;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

const CardContainer = styled.div`
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  margin-bottom: 10px;
  padding: 10px 15px;
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
        Mined By: {props.miner} <br />
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