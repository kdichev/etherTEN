import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import Provider from "./components/Web3Provider";
import { BlockCard } from "./components/BlockCard/BlockCard";

const mockBlock = {
  difficulty: "2860567509086985",
  hash: "0xf586c298167ca897087694039612ccf18845955f04de6d3b772a4651558e6056",
  miner: "0x52bc44d5378309EE2abF1539BF71dE1b7d7bE3b5",
  number: 5129778,
  timestamp: 1519210152,
  transactions: []
};

const MockEth = {
  getBlockNumber: () => setTimeout(() => 123, 2000),
  getBlock: () => setTimeout(() => mockBlock, 2000)
};

it("renders App without crashing if Web3 Eth is provided", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider eth={MockEth}>
      <App />
    </Provider>,
    div
  );
  expect(div.children).toBeDefined();
  ReactDOM.unmountComponentAtNode(div);
});

it("renders App without crashing if Web3 Eth is not provided", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("renders BlockCard with Block data without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BlockCard {...mockBlock} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
