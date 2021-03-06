/* eslint-env jest */

import localStorageMgr from 'js/utils/localstorage-mgr'

jest.mock('js/utils/extension-messenger')
jest.mock('js/utils/localstorage-mgr')

afterEach(() => {
  jest.clearAllMocks()
})

describe('localBkgStorageMgr', () => {
  it('loads the background option', () => {
    // Mock localStorage values
    localStorageMgr.setItem('tab.user.background.option', 'photo')
    localStorageMgr.setItem('tab.user.background.color', '#FF0000')
    localStorageMgr.setItem('tab.user.background.imageURL', 'https://static.example.com/my-img.png')
    localStorageMgr.setItem('tab.user.background.customImage', 'https://static.foo.com/some-img.png')

    const getUserBackgroundOption = require('js/utils/local-bkg-settings')
      .getUserBackgroundOption
    expect(getUserBackgroundOption()).toEqual('photo')
  })

  it('loads the background color', () => {
    // Mock localStorage values
    localStorageMgr.setItem('tab.user.background.option', 'photo')
    localStorageMgr.setItem('tab.user.background.color', '#FF0000')
    localStorageMgr.setItem('tab.user.background.imageURL', 'https://static.example.com/my-img.png')
    localStorageMgr.setItem('tab.user.background.customImage', 'https://static.foo.com/some-img.png')

    const getUserBackgroundColor = require('js/utils/local-bkg-settings')
      .getUserBackgroundColor
    expect(getUserBackgroundColor()).toEqual('#FF0000')
  })

  it('loads the background image URL', () => {
    // Mock localStorage values
    localStorageMgr.setItem('tab.user.background.option', 'photo')
    localStorageMgr.setItem('tab.user.background.color', '#FF0000')
    localStorageMgr.setItem('tab.user.background.imageURL', 'https://static.example.com/my-img.png')
    localStorageMgr.setItem('tab.user.background.customImage', 'https://static.foo.com/some-img.png')

    const getUserBackgroundImageURL = require('js/utils/local-bkg-settings')
      .getUserBackgroundImageURL
    expect(getUserBackgroundImageURL())
      .toEqual('https://static.example.com/my-img.png')
  })

  it('loads the background custom image', () => {
    // Mock localStorage values
    localStorageMgr.setItem('tab.user.background.option', 'photo')
    localStorageMgr.setItem('tab.user.background.color', '#FF0000')
    localStorageMgr.setItem('tab.user.background.imageURL', 'https://static.example.com/my-img.png')
    localStorageMgr.setItem('tab.user.background.customImage', 'https://static.foo.com/some-img.png')

    const getUserBackgroundCustomImage = require('js/utils/local-bkg-settings')
      .getUserBackgroundCustomImage
    expect(getUserBackgroundCustomImage())
      .toEqual('https://static.foo.com/some-img.png')
  })

  it('writes to local storage as expected', () => {
    const setBackgroundSettings = require('js/utils/local-bkg-settings').setBackgroundSettings
    setBackgroundSettings('color', 'https://static.foo.com/blep.png',
      '#000000', 'https://static.example.com/my-img.png')

    expect(localStorageMgr.setItem.mock.calls).toEqual([
      ['tab.user.background.option', 'color'],
      ['tab.user.background.customImage', 'https://static.foo.com/blep.png'],
      ['tab.user.background.color', '#000000'],
      ['tab.user.background.imageURL', 'https://static.example.com/my-img.png']
    ])
  })

  it('messages the extension parent frame when saving new settings', () => {
    jest.mock('js/utils/extension-messenger')
    const postBackgroundSettings = require('js/utils/extension-messenger').postBackgroundSettings

    const setBackgroundSettings = require('js/utils/local-bkg-settings').setBackgroundSettings
    setBackgroundSettings('color', 'https://static.foo.com/blep.png',
      '#000000', 'https://static.example.com/my-img.png')

    expect(postBackgroundSettings).toHaveBeenCalledWith({
      backgroundOption: 'color',
      customImage: 'https://static.foo.com/blep.png',
      backgroundColor: '#000000',
      imageURL: 'https://static.example.com/my-img.png'
    })
  })
})
