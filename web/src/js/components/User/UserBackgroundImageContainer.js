import {
  createFragmentContainer,
  graphql
} from 'react-relay'

import UserBackgroundImage from 'js/components/User/UserBackgroundImageComponent'

export default createFragmentContainer(UserBackgroundImage, {
  user: graphql`
    fragment UserBackgroundImageContainer_user on User {
      id
      backgroundOption
      customImage
      backgroundColor
      backgroundImage {
        imageURL
        timestamp
      }
    }
  `
})
