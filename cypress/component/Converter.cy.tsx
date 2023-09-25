import Converter from "@/components/Converter";
import 'cypress-react-selector'

Cypress.on('uncaught:exception', () => false)

describe('Converter.cy.tsx', () => {
  it('Debe convertir de manera correcta entre divisas', () => {

    const apikey = "b06e8a72da793c2544b7f983bced725a"
    const currencies = [
      {
        label: 'EUR',
        value: 1.00
      },
      {
        label: 'USD',
        value: 1.12
      },
      {
        label: 'CUP',
        value: 200.15
      },
      {
        label: 'CHL',
        value: 1000.52
      }
    ]

    cy.mount(<Converter currencies={currencies} />)

    cy.get('input[name="amount"]').focus().clear()
    cy.get('input[name="amount"]').type('100{backspace}');

    cy.waitForReact(500, "#fromCurrency")
    cy.get('#fromCurrency',).type('EUR{enter}')

    cy.waitForReact(500, "#toCurrency")
    cy.get('#toCurrency').type('CUP{enter}');

    cy.get('button[name="convert"]').click().then(
      () => {
        cy.get('#result').then(
          () => {
          }
        ).should('have.text', '20015')
      }
    )
  });
});
