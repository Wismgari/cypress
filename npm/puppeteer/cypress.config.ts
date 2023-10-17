import { defineConfig } from 'cypress'
import type { Browser as PuppeteerBrowser, Page } from 'puppeteer-core'

import { setup, retry } from './src'

export default defineConfig({
  e2e: {
    experimentalWebKitSupport: true,
    setupNodeEvents (on) {
      setup({
        on,
        callbacks: {
          async testNewTab (browser: PuppeteerBrowser) {
            const page = await retry<Promise<Page>>(async () => {
              const pages = await browser.pages()
              const page = pages.find((page) => page.url().includes('new-tab.html'))

              if (!page) throw new Error('Could not find page in usage')

              return page
            })

            const paragraph = await page.waitForSelector('p')
            const paragraphText = await page.evaluate((el) => el!.textContent, paragraph)
            const button = await page.waitForSelector('#send')
            const buttonText = await page.evaluate((el) => el!.textContent, button)

            button!.dispose()
            paragraph!.dispose()

            await page.close()

            return { paragraphText, buttonText }
          },
        },
      })
    },
  },
})
