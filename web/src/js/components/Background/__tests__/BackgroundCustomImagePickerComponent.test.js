/* eslint-env jest */

import React from 'react'
import {
  shallow
} from 'enzyme'
import TextField from 'material-ui/TextField'

const mockOnCustomImageSelection = jest.fn()
const mockShowError = jest.fn()
const mockProps = {
  user: {
    customImage: 'https://example.com/here/is/some-img.png'
  },
  onCustomImageSelection: mockOnCustomImageSelection,
  showError: mockShowError
}

afterEach(() => {
  jest.clearAllMocks()
})

describe('Background custom image picker component', () => {
  it('renders without error', () => {
    const BackgroundCustomImagePicker = require('js/components/Background/BackgroundCustomImagePickerComponent').default
    shallow(
      <BackgroundCustomImagePicker {...mockProps} />
    )
  })

  it('calls onCustomImageSelection on mount', () => {
    const BackgroundCustomImagePicker = require('js/components/Background/BackgroundCustomImagePickerComponent').default
    shallow(
      <BackgroundCustomImagePicker {...mockProps} />
    )
    expect(mockOnCustomImageSelection)
      .toHaveBeenCalledWith(mockProps.user.customImage)
  })

  it('calls onCustomImageSelection prop when the custom photo changes', () => {
    const BackgroundCustomImagePicker = require('js/components/Background/BackgroundCustomImagePickerComponent').default
    const wrapper = shallow(
      <BackgroundCustomImagePicker {...mockProps} />
    )

    // Mock that the user enters an image URL.
    const imgURL = 'https://example.com/check/out/my/image.png'
    wrapper.find(TextField).prop('onChange')({}, imgURL)

    wrapper.update()

    // Mock that the image loads successfully.
    wrapper.find('img').first().prop('onLoad')()
    expect(mockOnCustomImageSelection).toHaveBeenCalledWith(imgURL)
  })
})
