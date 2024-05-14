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

  
await page.getByRole('tab', { name: 'Obligations' }).click();
//get child case number
await page.getByRole('link',{name:'image001'}).click();
await page.getByRole('button', { name: 'Change Owner' }).click();
await page.getByLabel('—Current Selection: Users, Pick an object').click();
await page.getByRole('menuitem', { name: 'Queues' }).click();
await page.getByPlaceholder('Search Queues...').click();
await page.getByPlaceholder('Search Queues...').fill('cred');
await page.getByRole('option', { name: 'Group Credit Life Non-Medical' }).click();
await page.getByRole('button', { name: 'Change Owner' }).click();

//change status of case
  await page.getByRole('button', { name: 'Edit Status' }).click();
  await page.getByRole('option', { name: 'Excalated for Review' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
//first email template
  await page.getByTitle('Compose').click();
  await page.locator('a').filter({ hasText: 'Insert, create, or update templateInsert, create, or update template' }).click();
  await page.getByRole('menuitem', { name: 'Insert a template...' }).click()
  await page.getByLabel('Template Folders').first().selectOption('00l26000000vNNMAA2');
  await page.getByRole('button', { name: 'IC Guardrisk Decline Email Template' }).click();
  await page.locator('button').filter({hasText:/^Send$/}).click();

//second email template
  await page.getByTitle('Compose').click();
  await page.locator('a').filter({ hasText: 'Insert, create, or update templateInsert, create, or update template' }).click();
  await page.getByRole('menuitem', { name: 'Insert a template...' }).click()
  //await page.getByLabel('Template Folders').first().selectOption('00l26000000vNNMAA2');
  await page.getByRole('button', { name: 'IC Credit Life Claims Forum Email Template' }).click();
  await page.locator('button').filter({hasText:/^Send$/}).click();

  


console.log("Success Message: Case Lodged");

fs.appendFileSync('success_log.txt', 'Lodge Case-Test succeeded: ' + new Date().toLocaleString() + '\n');

await browser.close();
}catch(error) {
    console.error('Test failed:', error);

    // Write failure message to a text file
    fs.appendFileSync('failure_log.txt', 'Lodge Case-Test failed: ' + new Date().toLocaleString() + '\n');
    await browser.close();}





})();






