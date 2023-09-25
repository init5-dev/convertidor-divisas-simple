import React from 'react'
import Converter from './index'

describe('<Converter />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Converter />)
  })
})