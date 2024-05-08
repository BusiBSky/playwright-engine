const { chromium } = require('playwright');
const Excel = require('exceljs');
(async () => {
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext({
            recordVideo: {
              dir: './videos/', // Specify the directory to store the video recording
            },
          });
        


        const page = await context.newPage();
await page.goto('https://login.salesforce.com/');
//log in
await page.getByLabel('Username').click();
await page.getByLabel('Username').fill('Busisiwe.D@bsky.co.za');
await page.getByLabel('Password').click();
await page.getByLabel('Password').fill('Mag45524@');
await page.getByRole('button', { name: 'Log In' }).click();
//after log in
await page.goto('https://mindful-koala-a9w9r7-dev-ed.trailblaze.lightning.force.com/lightning/page/home');
await page.getByRole('link', { name: 'Accounts' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByLabel('*Account Name').click();
  //account details
  await page.getByLabel('*Account Name').fill('DemoAccount');
  await page.getByLabel('Account Number').click();
  await page.getByLabel('Account Number').fill('2561438');
  await page.getByRole('textbox', { name: 'Account Site' }).click();
  await page.getByRole('textbox', { name: 'Account Site' }).fill('google.com');
  await page.getByLabel('Type - Current Selection:  --None--').click();
  await page.getByText('Technology Partner').click();
  await page.getByLabel('Rating - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'Warm' }).locator('span').nth(1).click();
  await page.getByRole('textbox', { name: 'Phone' }).click();
  await page.getByRole('textbox', { name: 'Phone' }).fill('0643151500');
  await page.getByLabel('Ownership - Current Selection: --None--').click();
  await page.getByText('Private').click();

  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForSelector('.toastMessage', { timeout: 5000 });

  // Capture the success message text
  const successMessage = await page.$eval('.toastMessage', (element) => element.textContent);
  console.log('Success Message:', successMessage);



  await page.screenshot({ path: 'salesforce-test11.png' });
  await browser.close();
})();