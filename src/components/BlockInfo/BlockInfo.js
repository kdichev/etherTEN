// @flow
import React from "react";
// $FlowFixMe
import { Info } from "./../types";
import { BlockInfoContainer } from "./primitives";

export const BlockInfo: Info = props => (
  <BlockInfoContainer>
    <b>Info:</b> <br />
    Difficulty: {props.difficulty} <br />
    Gas Used: {props.gasUsed} <br />
  </BlockInfoContainer>
);
