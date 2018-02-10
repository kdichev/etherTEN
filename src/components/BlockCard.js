import React from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
  background-color: white;
  border: 1px solid black;
  text-align: initial;
  padding: 10px 15px;
  display: flex;
  flex-direction: row;
  height: 75px;
  margin-bottom: 10px;
`

const CardHeader = styled.div`
  background-color: gray;
  color: white;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CardContent = styled.div`
  flex: 6
`

export const BlockCard = (props) => (
  <CardContainer>
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