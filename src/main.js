// Instead of CheerioCrawler let's use Playwright
// to be able to render JavaScript.
import { PlaywrightCrawler } from 'crawlee';

const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page }) => {
        // Wait for the actor cards to render.
        await page.waitForSelector('div[class="results margin-bottom"]');
        // Execute a function in the browser which targets
        // the actor card elements and allows their manipulation.
        const actorTexts = await page.$$eval('div[class="results margin-bottom"]', (els) => {
            // Extract text content from the actor cards
            return els.map((el) => el.textContent);
        });
        actorTexts.forEach((text, i) => {
            if (text.includes('ITS1')){
                console.log(`Job ${i + 1}: ${text}\n`);
            }
        });
    },
});

await crawler.run(['https://mn.gov/mnit/about-mnit/careers/']);