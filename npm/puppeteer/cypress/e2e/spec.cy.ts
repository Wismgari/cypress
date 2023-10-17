// TODO: move types to more appropriate place
export {}

declare global {
  namespace Cypress {
    interface Chainable {
      puppeteer(name: string, ...args: any[]): Chainable
    }
  }
}

describe('multi-tab', () => {
  it('tests a new tab', () => {
    cy.visit('/cypress/fixtures/index.html')
    cy.get('button').click()

    cy.puppeteer('testNewTab')
    .should('deep.equal', {
      paragraphText: 'This is the new tab',
      buttonText: 'Send message',
    })
  })

  it('is another test', () => {
    cy.log('another test')
  })
})
