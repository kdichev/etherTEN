import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import Provider from "./components/Web3Provider";
import { BlockCard } from "./components/BlockCard/BlockCard";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { updateBlock, addBlock } from "./components/App/App";

configure({ adapter: new Adapter() });

const mockBlock = {
  difficulty: "2860567509086985",
  hash: "0xf586c298167ca897087694039612ccf18845955f04de6d3b772a4651558e6056",
  miner: "0x52bc44d5378309EE2abF1539BF71dE1b7d7bE3b5",
  number: 5129778,
  timestamp: 1519210152,
  transactions: []
};

const MockEth = {
  getBlockNumber: () => setTimeout(() => null, 2000),
  getBlock: () => setTimeout(() => null, 2000)
};
const MockWeb3 = {
  utils: {
    fromWei: (n, type) => n
  },
  eth: MockEth
};
it("renders App without crashing if Web3 Eth is provided", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider web3={MockWeb3}>
      <App />
    </Provider>,
    div
  );
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

it("updates 'block' with values", () => {
  const state = {
    blocks: [
      {
        hash: 0xf586c298167ca897087694039612ccf18845955f04de6d3b772a4651558e6056
      },
      {},
      {},
      {},
      {}
    ]
  };
  const result = updateBlock(
    state,
    { toggle: true },
    0xf586c298167ca897087694039612ccf18845955f04de6d3b772a4651558e6056
  );
  const expected = {
    blocks: [
      {
        hash: 0xf586c298167ca897087694039612ccf18845955f04de6d3b772a4651558e6056,
        toggle: true
      },
      {},
      {},
      {},
      {}
    ]
  };
  expect(result).toEqual(expected);
});

it("adds new 'block' to 'blocks'", () => {
  const state = { blocks: [{}] };
  const result = addBlock(state, mockBlock);
  const expected = { blocks: [{}, mockBlock] };
  expect(result).toEqual(expected);
});
