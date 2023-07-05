import { PlaywrightCrawler } from 'crawlee';

const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page, request, enqueueLinks }) => {
        console.log(`Processing: ${request.url}`)
        if (request.label === 'DETAIL') {
            const modifiedTimestamp = await page.locator('time[datetime]').getAttribute('datetime');
            const results = {
                url: request.url,
                title: await page.locator('h1').textContent(),
                description: await page.locator('p').textContent()
            }

            console.log(results);
        } else {
            await page.waitForSelector('.btn-next a');
            await enqueueLinks({
                selector: '.btn-next a',
                label: 'LIST',
            })
            await page.waitForSelector('div[class="col2 job-space"] a');
            await enqueueLinks({
                selector: 'div[class="col2 job-space"] a',
                label: 'DETAIL', // <= note the different label
            })
        }
    }
});

await crawler.run(['https://www.linkedin.com/job/']);