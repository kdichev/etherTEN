import React from "react";
import styled from "styled-components";
import Blockies from "react-blockies";

const TransactionsInfoContainer = styled.div`
  overflow: auto;
  min-height: 0px;
  max-height: 250px;
`;

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
  ${truncate("110px")} flex: 6;
`;

const Arrow = styled.div`
  flex: 1;
`;

export const BlockTransactions = props => (
  <TransactionsInfoContainer loading={props.loading}>
    <b onClick={() => props.onToggle(props.blockHash)}>Transactions:</b> <br />
    {props.toggle &&
      props.info.map(tInfo => (
        <DialogContent>
          <Blockies seed={tInfo.from} scale={2} />
          <Box>{tInfo.from}</Box>
          <Arrow>&rarr;</Arrow>
          <Blockies seed={tInfo.to} scale={2} />
          <Box>{tInfo.to}</Box>
        </DialogContent>
      ))}
  </TransactionsInfoContainer>
);
