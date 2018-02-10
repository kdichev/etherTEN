import React from 'react'
import { CardContainer, CardHeader, CardContent } from './primitives'

export const BlockCard = (props) => (
  <CardContainer onMouseEnter={() => props.onCardClick(props.hash)} onClick={props.onClick}>
    <CardHeader>
      #{props.number} <br />
      {props.timestamp}
    </CardHeader>
    <CardContent>
      Mined By: {props.miner} <br />
      {props.txns} <a href=''>txns</a>
    </CardContent>
  </CardContainer>
)