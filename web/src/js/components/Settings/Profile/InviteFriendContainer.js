import {
  createFragmentContainer,
  graphql
} from 'react-relay'

import InviteFriend from 'js/components/Settings/Profile/InviteFriendComponent'

export default createFragmentContainer(InviteFriend, {
  user: graphql`
    fragment InviteFriendContainer_user on User {
      username
    }
  `
})
