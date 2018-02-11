import React from 'react'
import styled from "styled-components";

const BlockInfoContainer = styled.div`
  margin-top: 10px;
`;

export const BlockInfo = props => (
  <BlockInfoContainer>
    <b>Info:</b> <br />
    Difficulty: {props.block.difficulty} <br />
    Gas Used: {props.block.gasUsed} <br />
  </BlockInfoContainer>
)