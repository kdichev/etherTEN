import React from "react";
import styled, { css } from "styled-components";

const TransactionsInfoContainer = styled.div`
  overflow: auto;
  height: 250px;
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

const MiniAvatar = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

export const BlockTransactions = props => (
  <TransactionsInfoContainer loading={props.loading}>
    <b>Transactions:</b> <br />
    {props.info &&
      props.info.map(tInfo => (
        <DialogContent>
          {/* <MiniAvatar src={`http://tinygraphs.com/squares/${tInfo.from}?theme=seascape&numcolors=4&size=25&fmt=svg`} /> */}
          <b>From:</b> <Box> {tInfo.from}</Box>
          <Arrow>&rarr;</Arrow>
          {/* <MiniAvatar src={`http://tinygraphs.com/squares/${tInfo.to}?theme=seascape&numcolors=4&size=25&fmt=svg`} /> */}
          <b>To:</b> <Box> {tInfo.to}</Box>
        </DialogContent>
      ))}
  </TransactionsInfoContainer>
);
