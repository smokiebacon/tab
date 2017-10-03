/* eslint-env jest */

import 'utils/jsdom-shims'
import React from 'react'
import { shallow } from 'enzyme'

jest.mock('utils/local-bkg-settings')

beforeEach(() => {
  jest.clearAllMocks()
  jest.resetModules()
})

describe('User background image component', function () {
  it('renders with a photo background', function () {
    const user = {
      backgroundOption: 'photo',
      customImage: null,
      backgroundColor: '#FF0000',
      backgroundImage: {
        imageURL: 'https://example.com/pic.png'
      }
    }
    const UserBackgroundImageComponent = require('../UserBackgroundImageComponent').default
    const wrapper = shallow(
      <UserBackgroundImageComponent user={user} />
    )
    const wrapperStyle = wrapper.get(0).props.style
    expect(wrapperStyle.backgroundImage).toBe('url(https://example.com/pic.png)')
  })

  it('renders with a daily photo background', function () {
    const user = {
      backgroundOption: 'daily',
      customImage: null,
      backgroundColor: '#FF0000',
      backgroundImage: {
        imageURL: 'https://example.com/something.png'
      }
    }
    const UserBackgroundImageComponent = require('../UserBackgroundImageComponent').default
    const wrapper = shallow(
      <UserBackgroundImageComponent user={user} />
    )
    const wrapperStyle = wrapper.get(0).props.style
    expect(wrapperStyle.backgroundImage).toBe('url(https://example.com/something.png)')
  })

  it('renders with a custom photo background', function () {
    const user = {
      backgroundOption: 'custom',
      customImage: 'https://example.com/some-custom-photo.png',
      backgroundColor: '#FF0000',
      backgroundImage: {
        imageURL: 'https://example.com/pic.png'
      }
    }
    const UserBackgroundImageComponent = require('../UserBackgroundImageComponent').default
    const wrapper = shallow(
      <UserBackgroundImageComponent user={user} />
    )
    const wrapperStyle = wrapper.get(0).props.style
    expect(wrapperStyle.backgroundImage).toBe('url(https://example.com/some-custom-photo.png)')
  })

  it('renders with a color background', function () {
    const user = {
      backgroundOption: 'color',
      customImage: 'https://example.com/some-custom-photo.png',
      backgroundColor: '#FF0000',
      backgroundImage: {
        imageURL: 'https://example.com/pic.png'
      }
    }
    const UserBackgroundImageComponent = require('../UserBackgroundImageComponent').default
    const wrapper = shallow(
      <UserBackgroundImageComponent user={user} />
    )
    const wrapperStyle = wrapper.get(0).props.style
    expect(wrapperStyle.backgroundColor).toBe('#FF0000')
    expect(wrapperStyle.backgroundImage).not.toBeDefined()
  })

  it('correctly determines whether background props change', function () {
    const user = {
      backgroundOption: 'color',
      customImage: 'https://example.com/some-custom-photo.png',
      backgroundColor: '#FF0000',
      backgroundImage: {
        imageURL: 'https://example.com/pic.png'
      }
    }
    const UserBackgroundImageComponent = require('../UserBackgroundImageComponent').default
    const wrapper = shallow(
      <UserBackgroundImageComponent user={user} />
    )

    const propsA = {
      user: {
        backgroundOption: 'photo',
        customImage: 'https://example.com/some-custom-photo.png',
        backgroundColor: '#FF0000',
        backgroundImage: {
          imageURL: 'https://example.com/pic.png'
        }
      }
    }
    const propsB = {
      user: {
        backgroundOption: 'color',
        customImage: 'https://example.com/some-custom-photo.png',
        backgroundColor: '#FF0000',
        backgroundImage: {
          imageURL: 'https://example.com/pic.png'
        }
      }
    }
    const propsC = {
      user: {
        backgroundOption: 'photo',
        customImage: 'https://example.com/some-custom-photo.png',
        backgroundColor: '#FF0000',
        backgroundImage: {
          imageURL: 'https://example.com/a-new-photo.png'
        }
      }
    }
    const propsD = {
      user: {
        backgroundOption: 'photo',
        customImage: 'https://example.com/some-custom-photo.png',
        backgroundColor: '#CDCDCD',
        backgroundImage: {
          imageURL: 'https://example.com/pic.png'
        }
      }
    }
    const propsAExtraneousChange = {
      user: {
        backgroundOption: 'photo',
        customImage: 'https://example.com/some-custom-photo.png',
        backgroundColor: '#FF0000',
        backgroundImage: {
          imageURL: 'https://example.com/pic.png'
        },
        someOtherProp: 'foo'
      }
    }
    expect(wrapper.instance()
      .hasBackgroundChanged(propsA, propsA)).toBe(false)
    expect(wrapper.instance()
      .hasBackgroundChanged(propsA, propsAExtraneousChange)).toBe(false)
    expect(wrapper.instance()
      .hasBackgroundChanged(propsA, propsB)).toBe(true)
    expect(wrapper.instance()
      .hasBackgroundChanged(propsA, propsC)).toBe(true)
    expect(wrapper.instance()
      .hasBackgroundChanged(propsA, propsD)).toBe(true)
  })

  it('handles null user prop when determining if props changed', function () {
    const user = {
      backgroundOption: 'color',
      customImage: 'https://example.com/some-custom-photo.png',
      backgroundColor: '#FF0000',
      backgroundImage: {
        imageURL: 'https://example.com/pic.png'
      }
    }
    const UserBackgroundImageComponent = require('../UserBackgroundImageComponent').default
    const wrapper = shallow(
      <UserBackgroundImageComponent user={user} />
    )

    const propsA = {
      user: {
        backgroundOption: 'photo',
        customImage: 'https://example.com/some-custom-photo.png',
        backgroundColor: '#FF0000',
        backgroundImage: {
          imageURL: 'https://example.com/pic.png'
        }
      }
    }
    expect(wrapper.instance()
      .hasBackgroundChanged({}, {})).toBe(false)
    expect(wrapper.instance()
      .hasBackgroundChanged(propsA, {})).toBe(true)
    expect(wrapper.instance()
      .hasBackgroundChanged({}, propsA)).toBe(true)
  })

  it('sets state on mount using local storage values', function () {
    // Mock the settings in local storage.
    jest.mock('utils/local-bkg-settings', () => {
      return {
        getUserBackgroundOption: jest.fn(() => 'color'), // Different
        getUserBackgroundCustomImage: jest.fn(() => null),
        getUserBackgroundColor: jest.fn(() => '#FFF'),
        getUserBackgroundImageURL: jest.fn(() => 'https://example.com/pic.png'),
        setBackgroundSettings: jest.fn()
      }
    })

    // As if we have not yet fetched the user from the server.
    const user = null
    const UserBackgroundImageComponent = require('../UserBackgroundImageComponent').default
    const wrapper = shallow(<UserBackgroundImageComponent user={user} />)
    expect(wrapper.state()).toEqual({
      backgroundOption: 'color',
      customImage: null,
      backgroundColor: '#FFF',
      backgroundImageURL: 'https://example.com/pic.png'
    })
  })

  it('saves background settings to storage on mount (when the settings differ)', function () {
    // Mock the settings in local storage.
    jest.mock('utils/local-bkg-settings', () => {
      return {
        getUserBackgroundOption: jest.fn(() => 'color'), // Different
        getUserBackgroundCustomImage: jest.fn(() => null),
        getUserBackgroundColor: jest.fn(() => '#FFF'),
        getUserBackgroundImageURL: jest.fn(() => 'https://example.com/pic.png'),
        setBackgroundSettings: jest.fn()
      }
    })

    const user = {
      backgroundOption: 'photo',
      customImage: null,
      backgroundColor: '#FF0000',
      backgroundImage: {
        imageURL: 'https://example.com/pic.png'
      }
    }
    const UserBackgroundImageComponent = require('../UserBackgroundImageComponent').default
    shallow(<UserBackgroundImageComponent user={user} />)
    const setBackgroundSettings = require('utils/local-bkg-settings')
      .setBackgroundSettings
    expect(setBackgroundSettings).toHaveBeenCalledTimes(1)
  })

  it('does not save background settings to storage on mount (when the settings are the same)', function () {
    // Mock the settings in local storage.
    jest.mock('utils/local-bkg-settings', () => {
      return {
        getUserBackgroundOption: jest.fn(() => 'photo'),
        getUserBackgroundCustomImage: jest.fn(() => null),
        getUserBackgroundColor: jest.fn(() => '#FF0000'),
        getUserBackgroundImageURL: jest.fn(() => 'https://example.com/pic.png'),
        setBackgroundSettings: jest.fn()
      }
    })

    const user = {
      backgroundOption: 'photo',
      customImage: null,
      backgroundColor: '#FF0000',
      backgroundImage: {
        imageURL: 'https://example.com/pic.png'
      }
    }
    const UserBackgroundImageComponent = require('../UserBackgroundImageComponent').default
    shallow(<UserBackgroundImageComponent user={user} />)
    const setBackgroundSettings = require('utils/local-bkg-settings')
      .setBackgroundSettings
    expect(setBackgroundSettings).not.toHaveBeenCalled()
  })
})
