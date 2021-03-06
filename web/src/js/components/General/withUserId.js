import React from 'react'
import {
  getCurrentUserListener
} from 'js/authentication/user'

// https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

/**
 * Adds a "userId" prop to a child component.
 * @param {Object} options
 * @param {Boolean} options.renderIfNoUser - If true, we will render the
 *   children even if there is no user ID (the user is not signed in).
 * @return {Function} A higher-order component.
 */
const withUserId = (options = {}) => WrappedComponent => {
  class CompWithUserId extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        userId: null,
        authStateLoaded: false
      }
    }

    componentDidMount () {
      // Store unsubscribe function.
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onAuthStateChanged
      this.authListenerUnsubscribe = getCurrentUserListener()
        .onAuthStateChanged((user) => {
          if (user && user.uid) {
            this.setState({
              userId: user.uid
            })
          }
          this.setState({
            authStateLoaded: true
          })
        })
    }

    componentWillUnmount () {
      if (typeof this.authListenerUnsubscribe === 'function') {
        this.authListenerUnsubscribe()
      }
    }

    render () {
      const { renderIfNoUser } = options
      // Return null if the user is not authenticated but the children require
      // an authenticated user.
      if (!this.state.userId && !renderIfNoUser) {
        return null
      }
      // Don't render the children until we've retrieved the user.
      if (!this.state.authStateLoaded) {
        return null
      }
      return <WrappedComponent userId={this.state.userId} {...this.props} />
    }
  }
  CompWithUserId.displayName = `CompWithUserId(${getDisplayName(WrappedComponent)})`
  return CompWithUserId
}

export default withUserId
