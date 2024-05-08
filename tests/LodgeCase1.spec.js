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
          const page = await context.newPage();

await page.goto('https://capitecretail0223--devint.sandbox.my.salesforce.com/');
  await page.getByLabel('Username').fill('Busisiwe.D@capitecbank.co.za.devint');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Mag45524');
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  await page.goto('https://capitecretail0223--devint.sandbox.lightning.force.com/lightning');
  await page.goto('https://capitecretail0223--devint.sandbox.lightning.force.com/lightning/r/Case/5002600000XDOdqAAH/view');
  await page.getByRole('link', { name: 'Cases' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.locator('label').filter({ hasText: 'Insurance ClaimsInsurance Claims' }).locator('span').first().click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('link', { name: '00041169 Administration 17/11/2023, 12:25' }).click();
  await page.getByRole('link', { name: 'Cases' }).click();
  await page.getByRole('button', { name: 'New', exact: true }).click();
  await page.locator('label').filter({ hasText: 'Insurance ClaimsInsurance Claims' }).locator('span').first().click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('combobox', { name: 'Account Name' }).click();
  await page.getByRole('combobox', { name: 'Account Name' }).fill('dev');
  await page.getByRole('option', { name: 'DEV NAME SURNAME 0719038857' }).getByRole('strong').click();
  await page.getByRole('combobox', { name: 'Case Origin, --None--' }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.getByRole('button', { name: 'Edit Product Type' }).click();
  await page.getByRole('combobox', { name: 'Product Type, --None--' }).click();
  await page.getByRole('combobox', { name: 'Type, Unclassified/Unidentified' }).click();
  await page.getByRole('combobox', { name: 'Sub Type, --None--' }).click();
  await page.getByRole('combobox', { name: 'Sub Type Reason, --None--' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Classify Case' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('tab', { name: 'Claim Event' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('tab', { name: 'Related' }).click();
  await page.getByRole('button', { name: 'New', exact: true }).click();
  await page.getByLabel('Name*').fill('Retrenchment Letter');
  await page.getByPlaceholder('Search Document Types...').click();
  await page.getByPlaceholder('Search Document Types...').fill('Re');
  await page.getByPlaceholder('Search Document Types...').press('Enter');
  await page.getByRole('link', { name: 'Retrenchment Letter' }).click();
  await page.getByRole('button', { name: 'New', exact: true }).click();
  await page.getByRole('menuitemradio', { name: 'Verified' }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.getByRole('button', { name: 'Close Retrenchment Letter' }).click();
  await page.getByRole('button', { name: 'Lodge' }).click();
  await page.getByRole('button', { name: 'Finish' }).click();


  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Mag45524');
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  await page.goto('https://capitecretail0223--devint.sandbox.lightning.force.com/lightning');
  await page.goto('https://capitecretail0223--devint.sandbox.lightning.force.com/lightning/r/Case/5002600000XDu63AAD/view');
  await page.getByRole('button', { name: 'Close 00041169 | Case' }).click();
  await page.getByRole('button', { name: 'Close 00045550 | Case' }).click();
  await page.getByRole('button', { name: 'Close 00045561 | Case' }).click();
  await page.getByRole('button', { name: 'Close 00045559 | Case' }).click();
  await page.getByRole('button', { name: 'Close 00045518 | Case' }).click();
  await page.getByRole('link', { name: 'Cases' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.locator('label').filter({ hasText: 'Insurance ClaimsInsurance Claims' }).locator('span').first().click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Event Date').click();
  await page.getByRole('button', { name: '23' }).click();
  await page.getByPlaceholder('Search Accounts...').click();
  await page.getByPlaceholder('Search Accounts...').fill('dev');
  await page.getByRole('option', { name: 'DEV NAME SURNAME 0719038857' }).locator('path').nth(1).click();
  await page.getByLabel('Product Type, --None--').click();
  await page.getByRole('option', { name: 'Credit Life' }).click();
  await page.getByLabel('Type, Unclassified/Unidentified').click();
  await page.getByRole('option', { name: 'Unemployment/ITEI' }).click();
  await page.getByLabel('Sub Type, --None--').click();
  await page.getByRole('option', { name: 'Retrenchment' }).click();
  await page.getByLabel('Sub Type Reason, --None--').click();
  await page.getByRole('option', { name: 'New technology' }).click();
  await page.getByLabel('Case Origin, --None--').click();
  await page.getByText('Email', { exact: true }).click();
  await page.getByLabel('Case Origin, Email').click();
  await page.getByRole('option', { name: 'Email', exact: true }).locator('svg').click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.getByRole('button', { name: 'Classify Case' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('tab', { name: 'Related' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByLabel('Name*').fill('retrenchment letter');
  await page.getByPlaceholder('Search Document Types...').click();
  await page.getByPlaceholder('Search Document Types...').fill('re');
  await page.getByPlaceholder('Search Document Types...').press('Enter');
  await page.getByRole('link', { name: 'Retrenchment Letter' }).click();
  await page.getByRole('button', { name: 'New', exact: true }).click();
  await page.getByRole('menuitemradio', { name: 'Verified' }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.getByRole('button', { name: 'Close retrenchment letter' }).click();
  await page.getByRole('button', { name: 'Lodge' }).click();
  await page.getByRole('button', { name: 'Finish' }).click();
})();