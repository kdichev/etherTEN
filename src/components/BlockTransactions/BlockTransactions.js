import React from "react";
import styled from "styled-components";

const TransactionsInfoContainer = styled.div``;

const DialogContent = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
`;

function truncate(width) {
  return `
    width: ${width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}

// Make this div truncate the text with an ellipsis
const Box = styled.div`
  ${ truncate('110px') }
  flex: 6;
`;

const Arrow = styled.div`
  flex: 1;
`

export const  BlockTransactions = props => (
  <TransactionsInfoContainer>
    <b>Transactions:</b> <br />
    {props.selected.map(item =>
      <DialogContent>
        <b>From:</b> <Box> {item.from}</Box>
        <Arrow>&rarr;</Arrow>
        <b>To:</b> <Box> {item.to}</Box>
      </DialogContent>
    )}
  </TransactionsInfoContainer>
);
