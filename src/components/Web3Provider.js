import React from "react";
import PropTypes from "prop-types";

export const withWeb3: Connector = C =>
  class Web3Component extends React.Component {
    static contextTypes = {
      web3: PropTypes.object.isRequired
    };

    getBlockNumber = async () => {
      const { web3: { eth } } = this.context;
      try {
        return await eth.getBlockNumber();
      } catch (e) {
        throw new Error("Failed to fetch Block Number", e);
      }
    };

    getBlock = async (blockNumber, i) => {
      const { web3: { eth } } = this.context;
      try {
        const response = await eth.getBlock(blockNumber - i);
        //TODO: research why response is null
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
        console.log(e);
        throw new Error("Failed to fetch Block", e);
      }
    };

    getTransaction = async hash => {
      const { web3: { eth } } = this.context;
      try {
        return await eth.getTransaction(hash);
      } catch (e) {
        throw new Error("Failed to fetch Block", e);
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

class Web3Provider extends React.Component {
  static propTypes = {
    web3: PropTypes.object.isRequired
  };

  static childContextTypes = {
    web3: PropTypes.object.isRequired
  };

  getChildContext() {
    const { web3 } = this.props;
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
