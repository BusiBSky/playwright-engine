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
  await page.goto('https://capitecretail0223--devint.sandbox.lightning.force.com/lightning/r/User/0052600000BuL7hAAF/view');
  await page.getByRole('tab', { name: 'User Claims Administrator' }).click();
  await page.getByRole('button', { name: 'User Detail' }).click();
  await page.frameLocator('iframe[title="User: Claims Administrator ~ Salesforce - Unlimited Edition"]').getByRole('row', { name: 'User Detail Edit Sharing Reset Password Login Freeze View Summary' }).getByTitle('Login').click();
  /*await page.goto('https://capitecretail0223--devint.sandbox.lightning.force.com/one/one.app');
  await page.goto('https://capitecretail0223--devint.sandbox.lightning.force.com/lightning');
  await page.goto('https://capitecretail0223--devint.sandbox.lightning.force.com/lightning/r/Case/500Fg000009o0sVIAQ/view?channel=OMNI');
  /**/
  await page.getByLabel('Show Navigation Menu').click();
  await page.getByRole('menuitem', { name: 'Cases' }).click();
  //create a case
  await page.getByRole('link', { name: 'Cases' }).click();
  await page.getByRole('link', { name: process.env.CASE }).click();
  //wait page.waitForTimeout(70000);
  await page.getByRole('button', { name: 'Edit Account Name' }).click();
  await page.getByPlaceholder('Search Accounts...').click();
  await page.getByPlaceholder('Search Accounts...').fill('182250768');
  await page.getByRole('option', { name: 'Search Show more results for "182250768"' }).locator('svg').click();
  await page.getByRole('gridcell', { name: 'Select Item 1' }).locator('span').nth(1).click();
  await page.getByRole('button', { name: 'Select' }).click();
 // await page.getByRole('button', { name: 'Save'}).click();
  await page.waitForTimeout(5000);
  await page.getByRole('combobox', { name: 'Product Type' }).click()
  await page.getByRole('option', { name: process.env.PROD_TYPE }).click();
  await page.getByRole('combobox', { name: 'Case Type' }).click()
  await page.getByRole('option', { name: process.env.CASE_TYPE }).click();
  await page.getByRole('combobox', { name: 'Sub Type' ,exact :true }).click()
  await page.getByRole('option', { name: process.env.SUB_TYPE , exact :true }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForTimeout(5000);
//classify case
  await page.getByRole('tab', { name: 'Claim Event' }).click();
  await page.getByRole('button', { name: 'Classify Case' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.waitForTimeout(3000);

  //set event date
  await page.getByRole('tab', { name: 'Claim Event' }).click();
  await page.getByRole('button', { name: 'Edit Deceased Date of Death' }).click();
  await page.getByLabel('Deceased Date of Death').click();
  await page.getByLabel('Deceased Date of Death').fill(process.env.DIE_DATE);
  await page.getByLabel('Deceased Date of Death').press('Enter');
  await page.getByLabel('*Doctor Name').click();
  await page.getByLabel('*Doctor Name').fill('test');
  await page.getByLabel('*Doctor Surname').click();
  await page.getByLabel('*Doctor Surname').fill('TT');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);
  //verify documents
  await page.getByRole('tab', { name: 'Related' }).click();
  await page.getByRole('link',{name:'image001'}).click();;
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Edit Document Type' }).click();
  await page.getByLabel('Name*').click();
  await page.getByLabel('Name*').fill('Death Certificate');
  await page.getByPlaceholder('Search Document Types...').click();
  await page.getByPlaceholder('Search Document Types...').fill('Death');
  await page.waitForTimeout(3000);
  await page.getByRole('option', { name: 'Search Document Types "Death" in Document Types' }).click();
  await page.getByRole('link', { name: 'Death certificate' }).click();
  await page.waitForTimeout(6000);
  await page.getByText('Status*New').click();
  //await page.locator('div').filter({ hasText: /^Status\*New$/ }).first().click();
  //await page.getByRole('combobox', { name: '' }).click()
 // await page.getByLabel('Edit image001').getByText('New', { exact: true }).click();
  //await page.getByLabel('Edit Death Certificate').getByText('New', { exact: true }).click();
  await page.getByRole('option', { name: 'Verified' }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForTimeout(4000);
  await page.getByRole('button', { name: 'Close Death Certificate' }).click();
  //2nd coc
  await page.waitForTimeout(4000);
  await page.getByRole('tab', { name: 'Related' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'View All Document Checklist Items' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('link',{name:'image002'}).click();
  await page.waitForTimeout(4000);
  await page.getByRole('button', { name: 'Edit Document Type' }).click();
  await page.getByLabel('Name*').click();
  await page.getByLabel('Name*').fill('Claimant ID');
  await page.getByPlaceholder('Search Document Types...').click();
  await page.getByPlaceholder('Search Document Types...').fill('Claimant');
  await page.getByRole('option', { name: 'Search Document Types "Claimant" in Document Types' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'Claimant\'s ID' }).click();
  await page.waitForTimeout(2000);
  await page.locator('div').filter({ hasText: /^Status\*New$/ }).first().click();
  await page.getByRole('option', { name: 'Verified' }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForTimeout(4000);
  await page.getByRole('button', { name: 'Close Claimant ID' }).click();
  //3rd doc
  await page.getByRole('link',{name:'image003'}).click();
  await page.waitForTimeout(4000);
  await page.getByRole('button', { name: 'Edit Document Type' }).click();
  await page.getByLabel('Name*').click();
  await page.getByLabel('Name*').fill('BI-1663');
  await page.getByPlaceholder('Search Document Types...').click();
  await page.getByPlaceholder('Search Document Types...').fill('BI-1663');
  await page.getByRole('option', { name: 'Search Document Types "BI-1663" in Document Types' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'BI-1663 / DHA-1663' }).click();
  await page.waitForTimeout(2000);
  await page.locator('div').filter({ hasText: /^Status\*New$/ }).first().click();
  await page.getByRole('option', { name: 'Verified' }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForTimeout(4000);
  await page.getByRole('button', { name: 'Close BI-1663' }).click();
  await page.getByRole('button', { name: 'Close Document Checklist Items' }).click();

//change case owner 
  await page.getByRole('tab', { name: 'Details' }).click();
  await page.getByRole('button', { name: 'Change Owner' }).click();
  await page.getByPlaceholder('Search Users...').click();
  await page.getByPlaceholder('Search Users...').fill('bu');
  await page.getByRole('option', { name: 'User Busisiwe Dube' }).click();
  await page.getByRole('button', { name: 'Change Owner' }).click();
  await page.waitForTimeout(3000);
//get obligations
await page.getByRole('button', { name: 'Get Obligations' }).click();
await page.getByRole('button', { name: 'Finish' }).click();
await page.getByRole('tab', { name: 'Obligations' }).click();
//Lodge case
await page.getByRole('button', { name: 'Lodge' }).click();
await page.waitForTimeout(4000);
await page.getByText('Confirm', { exact: true }).click();
await page.waitForTimeout(5000);
onsole.log("Success Message: Case Lodged");

fs.appendFileSync('success_log.txt', 'Decline event-Test succeeded: ' + new Date().toLocaleString() + '\n');

await page.getByRole('button', { name: 'Show more actions' }).click();
  await page.getByRole('menuitem', { name: 'Event Decline' }).click();
  await page.getByText('Yes').click();
  await page.locator('#select-3514').selectOption('DeclineReasonFromGetRecord.5');
  await page.locator('#input-3518').click();
  await page.locator('#input-3518').fill('test');
  await page.getByRole('button', { name: 'Next' }).click();
console.log("Success Message: Case Declined");




}catch(error) {
    console.error('Test failed:', error);

    // Write failure message to a text file
    fs.appendFileSync('failure_log.txt', 'Lodge Case-Test failed: ' + new Date().toLocaleString() + '\n');
    await browser.close();}





})();