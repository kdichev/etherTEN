// $FlowFixMe
import styled from "styled-components";

export const TransactionsInfoContainer = styled.div`
  overflow: auto;
  min-height: 0px;
  max-height: 250px;
`;

export const DialogContent = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
`;

export const truncate = width => {
  return `
    width: ${width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
};

// Make this div truncate the text with an ellipsis
export const Box = styled.div`
  ${truncate("110px")} flex: 6;
`;

export const Arrow = styled.div`
  flex: 1;
`;
