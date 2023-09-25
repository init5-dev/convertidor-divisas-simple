import Converter from "@/components/Converter";
import { loadCurrencies } from "@/libs/currency";
import 'cypress-react-selector'

Cypress.on('uncaught:exception', () => false)

describe('loadCurrencies.cy.tsx', () => {
    it('Debe convertir correctamente las divisas usando los datos de http://api.exchangeratesapi.io/v1/latest, y el resultado debe hacerse visible', () => {

      const apikey = "b06e8a72da793c2544b7f983bced725a"

      loadCurrencies(apikey).then(
        (response) => {
          cy.mount(<Converter currencies={response} />)

          cy.get('input[name="amount"]').clear()
          cy.get('input[name="amount"]').type('100');

          cy.waitForReact(500, "#fromCurrency")
          cy.get('#fromCurrency',).type('EUR{enter}')

          cy.waitForReact(500, "#toCurrency")
          cy.get('#toCurrency').type('CUP{enter}');

          cy.get('button[name="convert"]').click().then(
            () => {
              cy.get('#result').then(
                () => {
                }
              ).should('be.visible')
            }
          )
        });
    }
    )
})