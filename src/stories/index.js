import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import { BlockCard } from "./../components/BlockCard/BlockCard";
import { BlockInfo } from "./../components/BlockInfo/BlockInfo";
import { BlockTransactions } from "./../components/BlockTransactions/BlockTransactions";

const mockBlock = {
  difficulty: "2860567509086985",
  hash: "0xf586c298167ca897087694039612ccf18845955f04de6d3b772a4651558e6056",
  miner: "0x52bc44d5378309EE2abF1539BF71dE1b7d7bE3b5",
  number: 5129778,
  timestamp: 1519210152,
  transactions: []
};

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));
storiesOf("Card", module).add("basic", () => <BlockCard {...mockBlock} />);
storiesOf("Info", module).add("basic", () => <BlockInfo />);
storiesOf("Transactions", module).add("basic", () => <BlockTransactions />);
