import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import { BlockCard } from "./../components/BlockCard/BlockCard";
import { BlockInfo } from "./../components/BlockInfo/BlockInfo";
import { BlockTransactions } from "./../components/BlockTransactions/BlockTransactions";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Card", module).add("basic", () => <BlockCard />);
storiesOf("Info", module).add("basic", () => <BlockInfo />);
storiesOf("Transactions", module).add("basic", () => <BlockTransactions />);
