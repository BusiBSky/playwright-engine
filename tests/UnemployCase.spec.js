const { chromium } = require('playwright');
const Excel = require('exceljs');
const fs = require('fs');
const dotenv = require('dotenv');
(async () => {
  dotenv.config();
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

await page.goto(process.env.HOST);
  await page.getByLabel('Username').fill(process.env.NAME);
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(process.env.PASSWORD);
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  fs.appendFileSync('success_log.txt', 'Log In-Test succeeded: ' + new Date().toLocaleString() + '\n');
  await page.goto(process.env.LIGHTNING_HOST);
  //create a case
  await page.getByRole('link', { name: 'Cases' }).click();
  await page.getByRole('link', { name: process.env.CASE }).click();
  await page.getByRole('button', { name: 'Edit Account Name' }).click();
  await page.getByPlaceholder('Search Accounts...').click();
  await page.getByPlaceholder('Search Accounts...').fill('de');
  await page.getByRole('option', { name: 'DEVAMO NAME SURNAMESEA 0880000000' }).click();
  await page.getByLabel('Product Type - Current Selection: Unclassified/Unidentified').click();
  await page.getByRole('option', { name: 'Credit Life' }).click();
  await page.getByLabel('Case Type - Current Selection: Unclassified/Unidentified').click();
  await page.getByRole('option', { name: 'Unemployment/ITEI' }).click();
  await page.getByLabel('Sub Type - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'Retrenchment' }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForTimeout(5000);
  //Classify case
await page.getByRole('button', { name: 'Classify Case' }).click(); 
await page.getByRole('button',{name:'Next'}).click();
await page.waitForTimeout(3000);
await page.getByRole('button', { name: 'Yes' }).click();
await page.waitForTimeout(3000);

await page.getByRole('tab', { name: 'Related' }).click();
await page.getByRole('link',{name:'image001'}).click();
await page.waitForTimeout(5000);
await page.getByRole('button', { name: 'Edit Document Type' }).click();
  await page.getByLabel('Name*').click();
  await page.getByLabel('Name*').fill('Retrenchment Letter');
  await page.getByPlaceholder('Search Document Types...').click();
  await page.getByPlaceholder('Search Document Types...').fill('retrenchment');
  await page.getByRole('option', { name: 'Search Document Types "retrenchment" in Document Types' }).click();
  await page.getByRole('link', { name: 'Retrenchment Letter' }).click();
  await page.getByRole('button', { name: 'New', exact: true }).click();
  await page.getByRole('menuitemradio', { name: 'Verified' }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.getByRole('button', { name: 'Close Retrenchment Letter' }).click();
  await page.waitForTimeout(4000);



  await page.getByRole('tab', { name: 'Claim Event' }).click();
  await page.getByRole('button', { name: 'Edit Event Date' }).click();
  await page.getByLabel('Event Date').click();
  await page.getByRole('button', { name: '19' }).click();
  await page.getByLabel('Last Working Date').click();
  await page.getByLabel('2024-05-11').getByRole('button', { name: '11' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  
  await page.getByRole('tab', { name: 'Details' }).click();
  await page.getByRole('button', { name: 'Edit Sub Type Reason' }).click();
  await page.getByLabel('Sub Type Reason - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'New technology' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Lodge' }).click();
  await page.waitForTimeout(3000);
  await page.getByText('Confirm', { exact: true }).click();
  await page.waitForTimeout(3000);
  /*await page.getByRole('button', { name: 'Event Approval' }).click();
  await page.waitForTimeout(3000);
  await page.getByText('Yes', { exact: true }).click();
  await page.waitForTimeout(3000);*/

console.log("Success Message: Case Lodged");

fs.appendFileSync('success_log.txt', 'Lodge Case-Test succeeded: ' + new Date().toLocaleString() + '\n');

await browser.close();
}catch(error) {
    console.error('Test failed:', error);

    // Write failure message to a text file
    fs.appendFileSync('failure_log.txt', 'Lodge Case-Test failed: ' + new Date().toLocaleString() + '\n');
    await browser.close();}





})();

