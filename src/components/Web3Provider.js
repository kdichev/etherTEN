// @flow
import React from "react";
// $FlowFixMe
import PropTypes from "prop-types";
import type { AppProps, Connector } from "./types";

export const withWeb3: Connector = C =>
  class Web3Component extends React.Component<AppProps> {
    static contextTypes = {
      eth: PropTypes.object.isRequired
    };

    getBlockNumber = async () => {
      const { eth } = this.context;
      try {
        return await eth.getBlockNumber();
      } catch (e) {
        console.dir(e);
        throw new Error("Failed to fetch Block Number:");
      }
    };

    getBlock = async number => {
      const { eth } = this.context;
      try {
        const response = await eth.getBlock(number);
        if (response) {
          const {
            difficulty,
            transactions,
            number,
            timestamp,
            miner,
            hash
          } = response;
          return {
            difficulty,
            transactions,
            number,
            timestamp,
            miner,
            hash
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
      const { eth } = this.context;
      try {
        return await eth.getTransaction(hash);
      } catch (e) {
        console.dir(e);
        throw new Error("Failed to fetch Block");
      }
    };

    render() {
      const methods = {
        getBlock: this.getBlock,
        getBlockNumber: this.getBlockNumber,
        getTransaction: this.getTransaction
      };
      return <C {...this.props} {...methods} />;
    }
  };

class Web3Provider extends React.Component<{ eth: {}, children: Node }, {}> {
  static propTypes = {
    eth: PropTypes.object.isRequired
  };

  static childContextTypes = {
    eth: PropTypes.object.isRequired
  };

  getChildContext() {
    const { eth } = this.props;
    if (!eth) {
      throw new Error("No Web3 Provider");
    }
    return {
      eth
    };
  }

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}

export default Web3Provider;
