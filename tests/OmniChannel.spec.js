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
await page.getByLabel('Username').click();
await page.getByLabel('Username').fill('Busisiwe.D@capitecbank.co.za.devint');
await page.getByLabel('Password').click();
await page.getByLabel('Password').fill('Mag45524@');
await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
await page.goto('https://capitecretail0223--devint.sandbox.lightning.force.com/lightning');
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
 // await page.getByRole('option', { name: 'Email', exact: true }).locator('span').nth(1).click();
  await page.getByLabel('Event Date').click();
  await page.getByRole('button', { name: '23' }).click();
  await page.getByLabel('Last Working Date').click();
  await page.getByRole('button', { name: '31' }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForSelector('.toastMessage', { timeout: 5000 });
const successMessage = await page.$eval('.toastMessage', (element) => element.textContent);
console.log('Success Message:', successMessage);
await page.screenshot({ path: 'Create case.png' });
  fs.appendFileSync('success_log.txt', 'Create Case-Test succeeded: ' + new Date().toLocaleString() + '\n');
 

  await page.getByRole('button', { name: 'Omni-Channel (Offline)' }).click();
  await page.getByRole('button', { name: 'Change your Omni-Channel status' }).click();
  await page.getByRole('menuitem', { name: 'Available' }).click();
  await page.getByRole('button', { name: 'Change Owner' }).click();
  await page.getByLabel('—Current Selection: Users, Pick an object').click();
  await page.getByRole('menuitem', { name: 'Queues' }).click();
  await page.getByPlaceholder('Search Queues...').click();
  await page.getByPlaceholder('Search Queues...').fill('Credit');
  await page.getByRole('option', { name: 'Group Credit Life Claims', exact: true }).click();
  await page.getByRole('button', { name: 'Change Owner' }).click();
  await page.getByRole('button', { name: 'Minimize' }).click();
  await page.getByRole('tab', { name: 'Obligations' }).click();
  await page.getByRole('tab', { name: 'Details' }).click();
  await page.getByRole('button', { name: 'Change Owner' }).click();
  await page.getByPlaceholder('Search Users...').click();
  await page.getByPlaceholder('Search Users...').fill('bu');
  await page.getByRole('option', { name: 'User Busisiwe Dube' }).click();
  await page.getByRole('button', { name: 'Change Owner' }).click();
 /* await page.getByRole('button', { name: 'Omni-Channel (Online)' }).click();
  //await page.getByRole('button', { name: 'Highlighted Omni-Channel (Online)' }).click();
  await page.getByRole('button', { name: 'Accept Case' }).click();
  await page.getByRole('tab', { name: 'My work (1)' }).click();*/
  
console.log("Success Message: Case Assigned to user");


fs.appendFileSync('success_log.txt', 'Assign Case to Omni-Test succeeded: ' + new Date().toLocaleString() + '\n');

await browser.close();
}catch(error) {
    console.error('Test failed:', error);

    // Write failure message to a text file
    fs.appendFileSync('failure_log.txt', 'Assign Case to Omni-Test failed: ' + new Date().toLocaleString() + '\n');
    await browser.close();}





})();