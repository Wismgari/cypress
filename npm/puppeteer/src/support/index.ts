import type { Browser } from 'puppeteer-core'

interface PuppeteerUtils {
  retry: (functionToRetry: (...args: any[]) => any) => never
}

type Callback = (browser: Browser, utils: PuppeteerUtils) => any

declare global {
  namespace Cypress {
    interface Chainable {
      puppeteer(callback: Callback): Chainable
    }
  }
}

export const setup = () => {
  Cypress.Commands.add('puppeteer', (name, ...args) => {
    Cypress.log({
      name: 'puppeteer',
      message: name,
    })

    cy.task('__cypressPuppeteer__', { name, args }, { log: false }).then((result: any) => {
      if (result && result.__error__) {
        // TODO: wrap and re-throw error

        throw new Error(result.__error__.message)
      }

      return result
    })
  })
}
