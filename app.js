const puppeteer = require('puppeteer');

async function startBrowser(counter) {
  console.log("STARTING HEADLESS...."+counter);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  return {browser, page};
}

async function closeBrowser(browser, counter) {
  console.log("CLOSING HEADLESS...."+counter);
  return browser.close();
}

async function openHeadlessInstance(counter, url = "https://www.google.com/") {
  const {browser, page} = await startBrowser(counter);
  page.setViewport({width: 1366, height: 768});
  await page.goto(url);
  await page.screenshot({path: 'downloads/screenshot'+counter+'.png'});
  closeBrowser(browser, counter);
}

function init(n) {
    for(let i = 0; i < n; i++) {
        openHeadlessInstance(i+1);
    }
}

( () => {
    try {
        init(100);
    } catch (error) {
       console.log("EXCEPTION => ", error);
       process.exit(1);
    }
})();