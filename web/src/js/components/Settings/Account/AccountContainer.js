import {
  createFragmentContainer,
  graphql
} from 'react-relay'

import Account from 'js/components/Settings/Account/AccountComponent'

export default createFragmentContainer(Account, {
  user: graphql`
    fragment AccountContainer_user on User {
      id
      email
      username
      ...LogConsentDataContainer_user
    }
  `
})
