const { chromium } = require('playwright');
const ExcelJS = require('exceljs');

async function fillSalesforceAccount() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('SalesforceTFile1.xlsx');
  const worksheet = workbook.worksheets[0]; // Assuming the data is in the first worksheet

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Your Playwright automation code here
  await page.bringToFront();//watch testing live
  await page.goto('https://login.salesforce.com/',{ timeout: 100000 });
  //log in
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('Busisiwe.D@bsky.co.za');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Mag45524@');
  await page.getByRole('button', { name: 'Log In' }).click();
  //after log in create go to create account form
  await page.goto('https://mindful-koala-a9w9r7-dev-ed.trailblaze.lightning.force.com/lightning/page/home',{ timeout: 100000 });
  await page.getByRole('link', { name: 'Accounts' },{ timeout: 100000 }).click(); await page.getByRole('button', { name: 'New' },{ timeout: 100000 }).click();
  // Fill in the account creation form using the data extracted from Excel
  await page.fill('input[name="Name"]', worksheet.getCell('A2').value);
  await page.fill('input[name="AccountNumber"]', worksheet.getCell('B2').value);
 // await page.fill('input[name="phone"]', worksheet.getCell('C3').value);
  // Add other necessary fields

  // Submit the form to create the account
 //save account details
 await page.getByRole('button', { name: 'Save', exact: true}).click();
 await page.waitForSelector('.toastMessage', { timeout: 50000 });
 const successMessage = await page.$eval('.toastMessage', (element) => element.textContent);
 console.log('Success Message:', successMessage);

  
  // take screenshot and close browser
  await page.screenshot({ path: 'salesforce-test2.png' });
  await browser.close();
}

fillSalesforceAccount();
