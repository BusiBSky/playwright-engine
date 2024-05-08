const { chromium } = require('playwright');
const Excel = require('exceljs');
(async () => {
        const browser = await chromium.launch({ headless: false });//watch testing as it happens
        const context = await browser.newContext({
            recordVideo: {
              dir: './videos/', // enable recording and specify the directory to store the video recording
            },
          });
        
        

const page = await context.newPage();
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
  

   //input account details
 const accountData = {
    Name: 'Try2Account Company',
    AccountNumber: '10111',
    Phone: '1234567890',

  };

for (const [key, value] of Object.entries(accountData)) {
  await page.fill(`input[name="${key}"]`, value);
}

//save account details
  await page.getByRole('button', { name: 'Save', exact: true}).click();
  await page.waitForSelector('.toastMessage', { timeout: 50000 });
  const successMessage = await page.$eval('.toastMessage', (element) => element.textContent);
  console.log('Success Message:', successMessage);

 // Save data to an Excel file
 const workbook = new Excel.Workbook();
 const excelFilePath = 'SalesforceTFile1.xlsx'; // Replace with the desired file path
 const worksheet = workbook.addWorksheet('Salesforce Data');
 worksheet.addRow(['Account Name','Account Number', 'Phone']);
 worksheet.addRow([accountData.Name,accountData.AccountNumber,accountData.Phone]);
 await workbook.xlsx.writeFile(excelFilePath);
 console.log('Success Message:', successMessage);

  

  // take screenshot
  await page.screenshot({ path: 'salesforce-test1.png' });
  await browser.close();
})();