/* global graphql */

import React from 'react'
import {QueryRenderer} from 'react-relay/compat'
import environment from '../../../relay-env'

import FullScreenProgress from 'general/FullScreenProgress'
import AuthUserComponent from 'general/AuthUserComponent'

import Settings from './SettingsContainer'

class SettingsView extends React.Component {
  render () {
    return (
      <AuthUserComponent>
        <QueryRenderer
          environment={environment}
          query={graphql`
            query SettingsViewQuery($userId: String!) {
              user(userId: $userId) {
                ...SettingsContainer_user
              }
            }
          `}
          render={({error, props}) => {
            if (error) {
              // TODO: display visual error message.
              console.log('We had a problem loading the settings page :(')
              console.error(error, error.source)
              console.error(error.source)
              return null
            }

            if (props) {
              return (
                <Settings
                  user={props.user}
                  {...this.props}>
                  {this.props.children}
                </Settings>
              )
            } else {
              return (<FullScreenProgress />)
            }
          }} />
      </AuthUserComponent>
    )
  }
}

export default SettingsView
