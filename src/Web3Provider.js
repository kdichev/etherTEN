import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'

export const withWeb3 = C => (
  class Web3Component extends Component {
    static contextTypes = {
      web3: PropTypes.object.isRequired,
    }
    render() {
      const { web3 } = this.context
      return (
        <C {...this.props} web3={web3} />
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