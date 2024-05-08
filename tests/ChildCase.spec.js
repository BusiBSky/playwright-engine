const { chromium } = require('playwright');
const Excel = require('exceljs');
const fs = require('fs');
(async () => {
    try{
        const browser = await chromium.launch({ headless: false
        });//watch testing as it happens
        const context = await browser.newContext({
            recordVideo: {
              dir: './videos/', // enable recording and specify the directory to store the video recording
            },
          });
         

//log in
const page = await context.newPage();

await page.goto('https://capitecretail0223--devint.sandbox.my.salesforce.com/');
  await page.getByLabel('Username').fill('Busisiwe.D@capitecbank.co.za.devint');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Mag45524@');
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  fs.appendFileSync('success_log.txt', 'Log In-Test succeeded: ' + new Date().toLocaleString() + '\n');
  //create a case
  await page.goto('https://capitecretail0223--devint.sandbox.lightning.force.com/lightning');
  await page.goto('https://capitecretail0223--devint.sandbox.lightning.force.com/lightning/r/Case/5002600000XDOdqAAH/view');
  await page.getByRole('link', { name: 'Cases' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.locator('label').filter({ hasText: 'Insurance ClaimsInsurance Claims' }).locator('span').first().click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Search Accounts...').fill('245849580');
  await page.getByPlaceholder('Search Accounts...').press('Enter');
  await page.getByText('Show All Results for "245849580"').click();
  await page.getByRole('link', { name: 'DEV NAME SURNAME' }).click();
 
  await page.getByLabel('Product Type - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'Credit Life' }).click();
  await page.getByLabel('Type - Current Selection: Unclassified/Unidentified').click();
  await page.getByRole('option', { name: 'Unemployment/ITEI' }).click();
  await page.getByLabel('Sub Type - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'Retrenchment' }).click();
  await page.getByLabel('Sub Type Reason - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'New technology' }).click();
  await page.getByLabel('Case Origin - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'Email', exact: true }).click();
  await page.getByLabel('Event Date').click();
  await page.getByLabel('Pick a Year').selectOption('2023');
  await page.getByRole('button', { name: 'Next Month' }).click();
  await page.getByRole('button', { name: 'Next Month' }).click();
  await page.getByRole('button', { name: 'Next Month' }).click();
  await page.getByRole('button', { name: 'Next Month' }).click();
  await page.getByRole('button', { name: 'Next Month' }).click();
  await page.getByRole('button', { name: 'Next Month' }).click();
  await page.getByLabel('2023-08-31').getByRole('button', { name: '31' }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForSelector('.toastMessage', { timeout: 5000 });
const successMessage = await page.$eval('.toastMessage', (element) => element.textContent);
console.log('Success Message:', successMessage);
await page.screenshot({ path: 'Create case.png' });
  fs.appendFileSync('success_log.txt', 'Create Case-Test succeeded: ' + new Date().toLocaleString() + '\n');


 //upload document
  await page.getByRole('tab', { name: 'Related' }).click();
  await page.getByRole('button', { name: 'New', exact: true }).click();
  await page.getByLabel('Name*').fill('Retrenchment Letter');
  await page.getByPlaceholder('Search Document Types...').click();
  await page.getByPlaceholder('Search Document Types...').fill('Re');
  await page.getByRole('button', { name: 'New', exact: true }).click();
  await page.getByRole('menuitemradio', { name: 'Verified' }).click();
  await page.getByPlaceholder('Search Document Types...').click();
  await page.getByPlaceholder('Search Document Types...').press('Enter');
  await page.getByRole('link', { name: 'Retrenchment Letter' }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForSelector('.toastMessage', { timeout: 5000 });
const successMessage2 = await page.$eval('.toastMessage', (element) => element.textContent);
console.log('Success Message:', successMessage2);
await page.screenshot({ path: 'Upload.png' });
//Lodge case
  await page.getByRole('button', { name: 'Close Retrenchment Letter' }).click();
  await page.getByRole('button', { name: 'Event Approval' }, {timeout:50000 }).click();
  await page.screenshot({ path: 'Event Approval.png' });
  await page.getByRole('button', { name: 'Finish' }).click();
  await page.getByRole('tab', { name: 'Details' }).click();
  await page.getByRole('tab', { name: 'Obligations' }).click();

  fs.appendFileSync('success_log.txt', 'Upload Document-Test succeeded: ' + new Date().toLocaleString() + '\n');
//write success message to text file

fs.appendFileSync('success_log.txt', 'Lodge Case-Test succeeded: ' + new Date().toLocaleString() + '\n');

await browser.close();
}catch(error) {
    console.error('Test failed:', error);

    // Write failure message to a text file
    fs.appendFileSync('failure_log.txt', 'Lodge Case-Test failed: ' + new Date().toLocaleString() + '\n');
    await browser.close();}





})();