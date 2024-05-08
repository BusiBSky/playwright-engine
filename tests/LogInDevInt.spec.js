const { chromium } = require('playwright');
const Excel = require('exceljs');
(async () => {
        const browser = await chromium.launch({ headless: false });//watch testing as it happens
        const context = await browser.newContext({
            recordVideo: {
              dir: './videos/', // enable recording and specify the directory to store the video recording
            },
          });
        
        

const page = await context.newPage();
await page.bringToFront();//watch testing live

await page.goto('https://capitecretail0223--devint.sandbox.my.salesforce.com/');
await page.getByLabel('Username').click();
await page.getByLabel('Username').fill('Busisiwe.D@capitecbank.co.za.devint');
await page.getByLabel('Password').click();
await page.getByLabel('Password').fill('Mag45524');
await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
await page.goto('https://capitecretail0223--devint.sandbox.lightning.force.com/lightning');
await page.getByLabel('Show Navigation Menu').click();
await page.getByRole('option', { name: 'Accounts' }).click();
await page.getByRole('button', { name: 'Select a List View: Accounts' }).click();
await page.getByRole('option', { name: 'All Accounts' }).click();
await page.getByRole('option', { name: '100012043 10001204' }).click();
await page.getByRole('button', { name: 'Get Customer Details' }).click();
await page.getByRole('button', { name: 'Finish' }).click();
await page.screenshot({ path: 'salesforce-test1.png' });
await browser.close();
console.log('Success');
  

})();
