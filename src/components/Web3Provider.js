// @flow
import React from "react";
// $FlowFixMe
import PropTypes from "prop-types";
import type { AppProps, Connector } from "./types";

export const withWeb3: Connector = C =>
  class Web3Component extends React.Component<AppProps> {
    static contextTypes = {
      web3: PropTypes.object.isRequired,
      connected: PropTypes.bool.isRequired
    };

    getBlockNumber = async () => {
      const { web3 } = this.context;
      try {
        return await web3.eth.getBlockNumber();
      } catch (e) {
        console.dir(e);
        throw new Error("Failed to fetch Block Number:");
      }
    };

    getBlock = async number => {
      const { web3 } = this.context;
      try {
        const response = await web3.eth.getBlock(number);
        if (response) {
          const {
            difficulty,
            transactions,
            number,
            timestamp,
            miner,
            hash,
            gasUsed
          } = response;
          return {
            difficulty,
            transactions,
            number,
            timestamp,
            miner,
            hash,
            gasUsed
          };
        }
      } catch (e) {
        console.dir(e);
        throw new Error("Failed to fetch Block");
      }
    };

    componentDidCatch(error, info) {
      console.log(error, info);
    }

    getTransaction = async hash => {
      const { web3 } = this.context;
      try {
        const result = await web3.eth.getTransaction(hash);
        return {
          ...result
        };
      } catch (e) {
        console.dir(e);
        throw new Error("Failed to fetch Block");
      }
    };

    fromWei = (value, type) => {
      this.context.web3.utils.fromWei(value, type);
    };

    render() {
      const methods = {
        getBlock: this.getBlock,
        getBlockNumber: this.getBlockNumber,
        getTransaction: this.getTransaction,
        fromWei: this.fromWei
      };
      return <C {...this.props} {...methods} />;
    }
  };

class Web3Provider extends React.Component<{ web3: AppProps, children: Node }> {
  static propTypes = {
    web3: PropTypes.object.isRequired
  };

  static childContextTypes = {
    web3: PropTypes.object.isRequired,
    connected: PropTypes.bool.isRequired
  };

  getChildContext() {
    const { web3 } = this.props;
    if (!web3) {
      return;
    }
    return {
      web3
    };
  }

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}

export default Web3Provider;
