import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'

export const withWeb3 = C => (
  class Web3Component extends Component {
    static contextTypes = {
      web3: PropTypes.object.isRequired,
    }

    handleGetBlockNumber = async () => {
      const { web3: { eth } } = this.context
      try {
        return await eth.getBlockNumber()
      } catch (e) {
        throw new Error('Failed to fetch Block Number', e)
      }
    }

    handleGetBlock = async (blockNumber, i) => {
      const { web3: { eth } } = this.context
      try {
        return await eth.getBlock(blockNumber - i)
      } catch (e) {
        throw new Error('Failed to fetch Block', e)
      }
    }

    handleGetTransaction = async hash => {
      const { web3: { eth } } = this.context
      try {
        return await eth.getTransaction(hash)
      } catch (e) {
        throw new Error('Failed to fetch Block', e)
      }
    }

    render() {
      const { web3 } = this.context
      const props = {
        ...this.props,
        web3,
        handleGetBlock: this.handleGetBlock,
        handleGetBlockNumber: this.handleGetBlockNumber,
        handleGetTransaction: this.handleGetTransaction
      }
      return (
        <C {...props} />
      )
    }
  }
)

class Web3Provider extends Component {
  static propTypes = {
    web3: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    web3: PropTypes.object.isRequired,
  }

  getChildContext() {
    const { web3 } = this.props
    return { web3 }
  }
  render() {
    return Children.only(this.props.children)
  }
}

export default Web3Provider