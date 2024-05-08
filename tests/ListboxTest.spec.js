const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Navigate to the Salesforce website
  await page.goto('https://www.salesforce.com');
  const specificItemName = 'Canada (English)';
  try{
  // Click on the region dropdown to open it
  await page.getByLabel('Worldwide').click();

  
  // Wait for the region dropdown list to appear
  await page.getByRole('contentinfo');
  await page.screenshot({ path: 'Get list.png' });
  // Retrieve list items
  await page.$$('link');
  
  
    const link =await page.getByRole('link', {name:specificItemName});
    await link.click();
    await page.screenshot({ path: 'Get Link.png' });
    console.log(`The specific link item "${specificItemName}" exists in the region list.`);
    fs.appendFileSync('success_log.txt', 'Link-Test Succeeded: ' + new Date().toLocaleString() + '\n');
    await browser.close();


  }catch(error){

    console.log(`The specific link item "${specificItemName}" does not exist in the region list.`);
    fs.appendFileSync('success_log.txt', 'Link-Test Fail: ' + new Date().toLocaleString() + '\n');
    await browser.close();
}

 
  
  // Close the browser
  await browser.close();
})();
