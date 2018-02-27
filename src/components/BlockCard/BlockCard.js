// @flow
import type { Card } from "./../types";
import React from "react";
import {
  CardHeaderContainer,
  CardContent,
  CardFooter,
  CardContainer
} from "./primitives";

export const BlockCard: Card = props => (
  <CardContainer>
    <CardHeaderContainer onClick={props.onClick}>
      <CardContent>
        {props.avatar}
        <div style={{ paddingLeft: 16, flex: 1 }}>
          {props.title}
          {props.subtitle}
        </div>
      </CardContent>
      <CardFooter>{props.footer}</CardFooter>
    </CardHeaderContainer>
    {props.children}
  </CardContainer>
);
