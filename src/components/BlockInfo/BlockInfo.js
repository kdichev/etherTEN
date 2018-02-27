// @flow
import React from "react";
import type { Info } from "./../types";
import { BlockInfoContainer } from "./primitives";
import { Title, SubTitle, Text } from "./../App/primitives";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;
export const BlockInfo: Info = props => (
  <BlockInfoContainer>
    <Container>
      <SubTitle>{`Mined By:`}</SubTitle>
      <Text>{props.miner}</Text>
    </Container>
    <Container>
      <SubTitle>Difficulty: </SubTitle>
      <Text>{props.difficulty}</Text>
    </Container>
    <Container>
      <SubTitle>Gas Used: </SubTitle>
      <Text>{props.gasUsed}</Text>
    </Container>
  </BlockInfoContainer>
);
