// $FlowFixMe
import styled from "styled-components";
import { truncate } from "./../../helpers";

export const TransactionsInfoContainer = styled.div`
  overflow: auto;
  min-height: 0px;
  max-height: 250px;
  margin-top: 16px;
  padding: 8px;
`;

export const DialogContent = styled.div`
  padding: 10px 0px;
  margin-bottom: 10px;
  display: flex;
`;

// Make this div truncate the text with an ellipsis
export const Box = styled.div`
  ${truncate("110px")} flex: 6;
`;

export const Arrow = styled.div`
  flex: 1;
`;
