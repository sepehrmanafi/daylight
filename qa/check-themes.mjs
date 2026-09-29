import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
const b=await chromium.launch();const c=await b.newContext({viewport:{width:390,height:844}});const p=await c.newPage();let results={},errors=[];p.on('pageerror',e=>errors.push(e.message));
async function check(name,shot=true){await p.waitForTimeout(800);if(shot)await p.screenshot({path:`qa/theme-${name}.png`,fullPage:true});const r=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();results[name]=r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));console.log(name,results[name].map(v=>[v.id,v.nodes.length]));fs.writeFileSync('qa/theme-a11y.json',JSON.stringify({results,errors},null,2));}
await p.goto('http://localhost:4173');await p.getByLabel('What should we call you?').fill('Sepehr');for(let i=0;i<3;i++)await p.getByRole('button',{name:'Continue',exact:true}).click();
for(const theme of ['sunshine','blossom','sage','midnight']){await p.locator(`[data-theme-option=${theme}]`).click();await check(`setup-${theme}`)}
await p.getByRole('button',{name:'Let the good days begin'}).click();await p.getByLabel('Dismiss notification').click();
for(const theme of ['sunshine','blossom','sage','midnight']){await p.getByLabel('Open profile settings').click();await p.locator(`[data-theme-option=${theme}]`).click();await check(`settings-${theme}`);await p.getByRole('button',{name:'Save preferences',exact:true}).click();await p.getByLabel('Dismiss notification').click();await check(`home-${theme}`);await p.setViewportSize({width:1440,height:1000});await check(`desktop-${theme}`);await p.setViewportSize({width:390,height:844});}
await p.getByRole('navigation',{name:'Mobile navigation'}).getByRole('button',{name:'You',exact:true}).click();await check('you-midnight');await p.getByRole('button',{name:'Save check-in',exact:true}).click();await check('saved-midnight');await p.getByRole('navigation',{name:'Mobile navigation'}).getByRole('button',{name:'Plan',exact:true}).click();await check('plan-midnight');await p.getByRole('navigation',{name:'Mobile navigation'}).getByRole('button',{name:'Add a task',exact:true}).click();await check('task-midnight');await p.getByLabel('Close dialog').click();
for(const name of ['Calendar','Rituals','Projects']){await p.getByLabel('Browse workspace').click();await p.getByRole('dialog').getByRole('button',{name,exact:true}).click();await check(name.toLowerCase()+'-midnight')}
await p.getByLabel('Browse workspace').click();await check('browse-midnight');await p.getByLabel('Close dialog').click();
await p.getByRole('navigation',{name:'Mobile navigation'}).getByRole('button',{name:'Focus',exact:true}).click();await check('focus-midnight');
await p.getByLabel('Search your workspace').click();await check('search-midnight');await p.getByLabel('Close dialog').click();
await p.setViewportSize({width:1440,height:1000});for(const name of ['Calendar','Habits','Focus','You']){await p.locator('.sidebar').getByRole('button',{name,exact:true}).click();await check('desktop-'+name.toLowerCase()+'-midnight')}
await b.close();console.log('Errors:',errors);
