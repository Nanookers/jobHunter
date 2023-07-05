const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.linkedin.com/');
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(1000); // Add a delay of 1 second before interacting with the elements
  await page.getByLabel('Email or phone').click();
  await page.getByLabel('Email or phone').fill('connordeclark@gmail.com');
  await page.getByLabel('Password', { exact: true }).fill('!K0di@k92)');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.getByRole('link', { name: 'Jobs' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('#recentSearchesIndex__0');
  await page.locator('#recentSearchesIndex__0').click();
  const jobs = await page.$eval('.scaffold-layout__list-container', el => {
    const data = [];
    const listEls = el.getElementsByClassName('li');
    Array.from(listEls).forEach(el => {
      data.push(el);
    })
    return data;
  })
  console.log('This is result ---------->', jobs)
  await page.waitForTimeout(5000); // wait
  await browser.close();
})();