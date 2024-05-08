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
  await page.goto('https://capitecretail0223--devint.sandbox.lightning.force.com/lightning/r/Case/500Fg000009MiN0IAK/view');
 /* await page.getByRole('button', { name: 'App Launcher' }).click();
  await page.getByPlaceholder('Search apps and items...').click();
  await page.getByPlaceholder('Search apps and items...').fill('ins');
  await page.getByRole('option', { name: 'Insurance Claims Console' }).click();*/
 // await page.goto('https://capitecretail0223--devint.sandbox.lightning.force.com/lightning/r/Case/5002600000XDOdqAAH/view');
  await page.getByRole('link', { name: 'Cases' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByText('Insurance ClaimsInsurance Claims').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Search Accounts...').click();
  await page.getByPlaceholder('Search Accounts...').fill('de');
  await page.getByRole('option', { name: 'DEV NAME SURNAME 0880000000' }).click();
  //await page.locator('label').filter({ hasText: 'Insurance ClaimsInsurance Claims' }).locator('span').first().click();
  /*await page.getByRole('combobox', { name: 'Account Name' }).click();
  await page.getByRole('combobox', { name: 'Account Name' }).fill('dev');
  await page.getByRole('option', { name: 'DEV NAME SURNAME 0684058895' }).getByTitle('DEV NAME SURNAME').click();*/
  await page.getByLabel('Product Type - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'Credit Life' }).click();
  await page.getByLabel('Case Type - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'Unemployment/ITEI' }).click();
  await page.getByLabel('Sub Type - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'Retrenchment' }).click();
  /*await page.getByLabel('Sub Type Reason - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'New technology' }).click();*/
  await page.getByLabel('Case Origin - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'Email', exact: true }).locator('span').nth(1).click();
  await page.getByLabel('Event Date').click();
  await page.getByRole('button', { name: '24' }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForSelector('.toastMessage', { timeout: 50000 });
const successMessage = await page.$eval('.toastMessage', (element) => element.textContent);
console.log('Success Message:', successMessage);
await page.screenshot({ path: 'Create case.png' });
  fs.appendFileSync('success_log.txt', 'Create Case-Test succeeded: ' + new Date().toLocaleString() + '\n');

  //classify a case
  await page.getByRole('button', { name: 'Classify Case' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  fs.appendFileSync('success_log.txt', 'Classify Case-Test succeeded: ' + new Date().toLocaleString() + '\n');

 //upload document
  await page.getByRole('tab', { name: 'Related' }).click();
  await page.getByLabel('Upload FilesOr drop files').setInputFiles([]);
  const fileInput = await page.$('input[type="file"]');
  // Specify the path to the file you want to upload
  const filePath = 'C:/Users/BusisiweDube/Downloads/Projects/Playwright/Retrenchment letter.pdf';
// Set the file path in the file input element and trigger the file picker dialog
  await fileInput.setInputFiles(filePath);
await page.getByRole('button', { name: 'Done' }).click();

//Add sub reason
  await page.getByRole('tab', { name: 'Details' }).click();
  await page.getByRole('button', { name: 'Edit Sub Type Reason' }).click();
  await page.getByLabel('Sub Type Reason - Current Selection: --None--').click();
  await page.getByRole('button', { name: 'Save' }).click();
  
  await page.getByRole('button', { name: 'Lodge' }).click();
  await page.getByText('Confirm', { exact: true }).click();
  
console.log("Success Message: Case Lodged");
  //await page.getByRole('button', { name: 'Finish' }).click();
  await page.screenshot({ path: 'Lodge-test.png' });
 /* await page.waitForSelector('.toastMessage', { timeout: 5000 });
const successMessage3 = await page.$eval('.toastMessage', (element) => element.textContent);
console.log('Success Message:', successMessage3);
await page.screenshot({ path: 'Lodge.png' });*/
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