
const { chromium } = require('playwright');
const Excel = require('exceljs');
const fs = require('fs');
const dotenv = require('dotenv');
(async () => {
    dotenv.config();
    try{
        const browser = await chromium.launch({ headless: false });//watch testing as it happens
        const context = await browser.newContext({
            recordVideo: {
              dir: './videos/', // enable recording and specify the directory to store the video recording
            },
          });
         

//log in
const page = await context.newPage();
await page.goto(process.env.HOST);
await page.getByLabel('Username').click();
await page.getByLabel('Username').fill(process.env.NAME);
await page.getByLabel('Password').click();
await page.getByLabel('Password').fill(process.env.PASSWORD);
await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
await page.goto(process.env.LIGHTNING_HOST);
await page.getByRole('link', { name: 'Cases' }).click();
await page.getByRole('button', { name: 'New' }).click();
await page.locator('label').filter({ hasText: 'Insurance ClaimsInsurance Claims' }).locator('span').first().click();
await page.getByRole('button', { name: 'Next' }).click();
await page.getByPlaceholder('Search Accounts...').click();
await page.getByPlaceholder('Search Accounts...').fill('de');
await page.getByRole('option', { name: 'DEVAMO NAME SURNAMESEA 0880000000' }).click();


await page.getByLabel('Product Type - Current Selection: --None--').click();
await page.getByRole('option', { name: 'Credit Life' }).click();
await page.getByLabel('Case Type - Current Selection: --None--').click();
await page.getByRole('option', { name: 'Unemployment/ITEI' }).click();
await page.getByLabel('Sub Type - Current Selection: --None--').click();
await page.getByRole('option', { name: 'Retrenchment' }).click();
await page.getByLabel('Case Origin - Current Selection: --None--').click();
await page.getByRole('option', { name: 'Email', exact: true }).click();
//await page.getByRole('option', { name: 'Email', exact: true }).locator('span').nth(1).click();

await page.getByRole('button', { name: 'Save', exact: true }).click();
await page.waitForSelector('.toastMessage', { timeout: 5000 });
const successMessage = await page.$eval('.toastMessage', (element) => element.textContent);
caseNumber = successMessage.substring(6,14)
console.log('Success Message:', successMessage);
console.log(caseNumber);
await page.screenshot({ path: 'salesforce-test0.png' });
//Classify case
await page.getByRole('button', { name: 'Classify Case' }).click(); 
await page.getByRole('button',{name:'Next'}).click();
await page.waitForTimeout(3000);
await page.getByRole('button', { name: 'Yes' }).click();
await page.waitForTimeout(3000);
await page.screenshot({ path: 'salesforce-test1.png' });
console.log('case classified');

//write success message to text file
fs.appendFileSync('success_log.txt', 'Create A Case-Test succeeded: ' + new Date().toLocaleString() + '\n');
await browser.close();
}catch(error) {
    console.error('Test failed:', error);

    // Write failure message to a text file
    fs.appendFileSync('failure_log.txt', 'Create A Case-Test failed: ' + new Date().toLocaleString() + '\n');
    await browser.close();}





} 
)();

