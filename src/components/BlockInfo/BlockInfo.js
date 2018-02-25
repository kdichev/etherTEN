// @flow
import React from "react";
import type { Info } from "./../types";
import { BlockInfoContainer } from "./primitives";

export const BlockInfo: Info = props => (
  <BlockInfoContainer>
    <b>Mined By: </b>
    {props.miner} <br />
    <b>Difficulty: </b>
    {props.difficulty} <br />
    <b>Gas Used: </b>
    {props.gasUsed} <br />
  </BlockInfoContainer>
);
