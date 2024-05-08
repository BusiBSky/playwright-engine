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
  await page.waitForTimeout(4000);
  await page.getByRole('button', { name: 'Edit Account Name' }).click();
  await page.getByPlaceholder('Search Accounts...').click();
  await page.getByPlaceholder('Search Accounts...').fill('joh');
  await page.getByRole('option', { name: process.env.ACC_NAME }).click();
  await page.getByRole('button', { name: 'Save'}).click();
  await page.waitForTimeout(5000);
  //Classify case
  
  await page.getByRole('tab', { name: 'Claim Event' }).click();
  await page.getByRole('button', { name: 'Classify Case' }).click();
  await page.getByLabel('Product Type - Current Selection: Unclassified/Unidentified').click();
  await page.getByRole('option', { name: process.env.PROD_TYPE }).click();
  await page.getByLabel('Case Type - Current Selection: Unclassified/Unidentified').click();
  await page.getByRole('option', { name: process.env.CASE_TYPE }).click();
  await page.getByLabel('Sub Type - Current Selection: --None--').click();
  await page.getByRole('option', { name: process.env.SUB_TYPE  }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.waitForTimeout(3000);

  //set event date
  await page.getByRole('tab', { name: 'Claim Event' }).click();
  await page.getByRole('button', { name: 'Edit Date of Disability' }).click();
  await page.getByLabel('Date of Disability').click();
  await page.getByLabel('Date of Disability').fill(process.env.DISA_DATE);
  await page.getByLabel('Date of Disability').press('Enter');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);
  //verify documents
  await page.getByRole('tab', { name: 'Related' }).click();
  await page.getByRole('link',{name:'image001'}).click();;
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Edit Document Type' }).click();
  await page.getByLabel('Name*').click();
  await page.getByLabel('Name*').fill('Employee/Client Declaration');
  await page.getByPlaceholder('Search Document Types...').click();
  await page.getByPlaceholder('Search Document Types...').fill(process.env.EMP_DOC);
  await page.waitForTimeout(3000);
  await page.getByPlaceholder('Search Document Types...').click();
  await page.waitForTimeout(2000);
  await page.getByRole('option', { name: 'Search Document Types "Employee/Client Declaration" in Document Types' }).click();
  await page.getByRole('link', { name: 'Employee/Client Declaration' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'New', exact: true }).click();
  await page.getByRole('menuitemradio', { name: 'Verified' }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForTimeout(4000);
  await page.getByRole('button', { name: 'Close Employee/Client Declaration' }).click();
  
  await page.waitForTimeout(4000);
  await page.getByRole('tab', { name: 'Related' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'View All Document Checklist Items' }).click();
  //await page.getByRole('button', { name: 'Refresh' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('link',{name:'image002'}).click();
  await page.waitForTimeout(4000);
  await page.getByRole('button', { name: 'Edit Document Type' }).click();
  await page.getByLabel('Name*').click();
  await page.getByLabel('Name*').fill('Confidential Medical Report');
  await page.getByPlaceholder('Search Document Types...').click();
  await page.getByPlaceholder('Search Document Types...').fill(process.env.MED_DOC);
  await page.getByRole('option', { name: 'Search Document Types "Confidential Medical Report" in Document Types' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'Confidential Medical Report', exact: true }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'New', exact: true }).click();
  await page.getByRole('menuitemradio', { name: 'Verified' }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForTimeout(4000);
  await page.getByRole('button', { name: 'Close Confidential Medical Report' }).click();
  await page.getByRole('button', { name: 'Close Document Checklist Items' }).click();
//change case owner 
  await page.getByRole('tab', { name: 'Details' }).click();
  await page.getByRole('button', { name: 'Change Owner' }).click();
  await page.getByPlaceholder('Search Users...').click();
  await page.getByPlaceholder('Search Users...').fill('bu');
  await page.getByRole('option', { name: 'User Busisiwe Dube' }).click();
  await page.getByRole('button', { name: 'Change Owner' }).click();
  await page.waitForTimeout(3000);
//Lodge case
await page.getByRole('button', { name: 'Lodge' }).click();
await page.waitForTimeout(4000);
await page.getByText('Confirm', { exact: true }).click();
await page.waitForTimeout(5000);

console.log("Success Message: Case Lodged");

fs.appendFileSync('success_log.txt', 'Lodge Case-Test succeeded: ' + new Date().toLocaleString() + '\n');

await browser.close();
}catch(error) {
    console.error('Test failed:', error);

    // Write failure message to a text file
    fs.appendFileSync('failure_log.txt', 'Lodge Case-Test failed: ' + new Date().toLocaleString() + '\n');
    await browser.close();}





})();