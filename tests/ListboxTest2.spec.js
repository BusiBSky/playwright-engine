const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  
await page.goto('https://capitecretail0223--devint.sandbox.my.salesforce.com/');
await page.getByLabel('Username').fill('Busisiwe.D@capitecbank.co.za.devint');
await page.getByLabel('Password').click();
await page.getByLabel('Password').fill('Mag45524@');
await page.getByRole('button', { name: 'Log In to Sandbox' }).click();


await page.goto('https://capitecretail0223--devint.sandbox.lightning.force.com/lightning');


await page.getByRole('link', { name: 'Cases' }).click();
await page.getByRole('button', { name: 'New' }).click();
await page.locator('label').filter({ hasText: 'Insurance ClaimsInsurance Claims' }).locator('span').first().click();
await page.getByRole('button', { name: 'Next' }).click();

  
  const specificItemName = 'Manual';


 try{
    await page.getByLabel('Case Origin - Current Selection: --None--').click();
   // await page.getByLabel('Product Type - Current Selection: --None--').click();
  // Retrieve list items

  
  
    const link =await page.getByRole('option', {name:specificItemName});
    await link.click();
    await page.screenshot({ path: 'Get in.png' });
    console.log(`The specific menu item "${specificItemName}" exists in the menu list.`);
    fs.appendFileSync('success_log.txt', 'MenuItem-Test Succeeded: ' + new Date().toLocaleString() + '\n');
    await browser.close();


 }catch(error){

   console.log(`The specific menu item "${specificItemName}" does not exist in the menu list.`);
    fs.appendFileSync('success_log.txt', 'MenuItem-Test Fail: ' + new Date().toLocaleString() + '\n');
    await browser.close();

 }
 
  
  // Close the browser
  
})();
