const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  const page = await browser.newPage();
  await page.goto('https://capitecretail0223--uat.sandbox.lightning.force.com/lightning/r/Case/5002600000X5SQzAAN/view?ws=%2Flightning%2Fr%2FAccount%2F0012600002Dpw5iAAB%2Fview');

  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('busisiwe.d@capitecbank.co.za.uat'); //enter username
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Mag45524@8'); //enter password
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();














  
  await page.getByRole('listitem', { name: 'Details' }, { timeout: 500000 }).click();
  await page.getByRole('button', { name: 'Edit Primary Need' }).click();

  await page.getByLabel('Primary Need - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'Fraud' }).getByTitle('Fraud').click();
  
  await page.getByLabel('Specific Need - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'Application Fraud' }).click();
  
  await page.getByLabel('Category - Current Selection: --None--', { exact: true }).click();
  await page.getByRole('option', { name: 'Card' }).click();
  
  await page.getByLabel('Sub Category - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'Card Fraud' }).click();

  await page.getByLabel('Modus Operandi - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'Card Lost (Someone uses your lost card for transactions)' }).click();

  await page.getByLabel('Channel - Current Selection: --None--').click();
  await page.getByRole('option', { name: 'ATM' }).click();
  
  console.log('Success Message:Pass');

  await browser.close(); 

})();