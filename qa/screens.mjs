import {chromium} from '@playwright/test';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
page.on('pageerror',e=>console.log('PAGE ERROR:',e.message));
await page.goto('http://localhost:5173');await page.waitForTimeout(800);
await page.screenshot({path:'qa/onboarding.png',fullPage:true});
await page.getByLabel('What should we call you?').fill('Alex');
for(let i=0;i<3;i++)await page.getByRole('button',{name:'Continue',exact:true}).click();
await page.getByRole('button',{name:'Let the good days begin'}).click();
await page.waitForTimeout(500);await page.getByLabel('Dismiss notification').click();
await page.screenshot({path:'qa/dashboard.png',fullPage:true});
await page.context().storageState({path:'qa/state.json'});
for(const view of ['Calendar','Focus','Habits']){await page.locator('.sidebar').getByRole('button',{name:view,exact:true}).click();await page.screenshot({path:`qa/${view.toLowerCase()}.png`,fullPage:true});}
await page.setViewportSize({width:390,height:844});await page.getByLabel('Open menu').click();await page.locator('.sidebar').getByRole('button',{name:/My day/}).click();await page.screenshot({path:'qa/mobile.png',fullPage:true});
await browser.close();
