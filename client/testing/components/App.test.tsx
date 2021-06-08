import React from 'react'
import { shallow } from 'enzyme'

import App from '../../components/App'

test('true is true', () => {
  expect(true).toBeTruthy()
})

test('<App> root has 1 h1 tag', () => {
  const wrapper = shallow(<App />)
  const root = wrapper.find('h1')
  expect(root).toHaveLength(1)
})

test('App header has correct text', () => {
  const wrapper = shallow(<App />)
  const h1 = wrapper.find('h1')
  expect(h1.text()).toMatch('App has arrived')
})
