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

await page.getByLabel('Case Origin - Current Selection: --None--').click();
await page.getByLabel('Case Origin', { exact: true });

// Open the picklist to display its options
//#dropdown-element-292

  // Wait for the options to appear
 await page.waitForSelector('[role="option"]');
 const optionElements = await page.$$('[role="option"]');
  // Retrieve the options from the picklist
  const options = [];
  for (const optionElement of optionElements) {
    const optionText = await optionElement.textContent();
    options.push(optionText.trim());
  }
  //= await page.$$eval('[role="option"]', options => options.map(option => option.textContent.trim()));

  // Log the extracted data
  console.log('Picklist options:', options);
  const declaredItem= 'Manual';
  const expectedItems = ['--None--', 'Manual', 'Branch Email','NBS', 'WhatsApp', 'USSD','Email', 'System originated', 'Data Wash','Deceased Estates'];
  const allPresent = expectedItems.every(item => options.includes(item));
  if (options.includes(declaredItem)) {
    console.log(`${declaredItem} is present in the picklist options.`);
  } else {
    console.log(`${declaredItem} is not present in the picklist options.`);
  }
  if (allPresent) {
    console.log('All declared items are present in the picklist options.');
  } else {
    console.log('Not all declared items are present in the picklist options.');
  }
// Assert that actual list items match expected list items

 
await browser.close(); 
  // Close the browser
  
})();

