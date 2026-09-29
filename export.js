const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const launchOptions = { headless: true };

  if (fs.existsSync(chromePath)) {
    launchOptions.executablePath = chromePath;
  } else if (fs.existsSync(edgePath)) {
    launchOptions.executablePath = edgePath;
  }

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  const filePath = 'file://' + path.resolve(__dirname, 'index.html');
  await page.goto(filePath, {
    waitUntil: 'networkidle0'
  });

  await page.pdf({
    path: 'cv.pdf',
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: 0
  });

  const pages = await page.$$('.page');
  for (let i = 0; i < pages.length; i++) {
    await pages[i].screenshot({ path: `cv-page${i + 1}.png` });
  }

  await page.screenshot({ path: 'cv-full.png', fullPage: true });

  await browser.close();
  console.log('✅ Export CV (PDF & PNG) thành công!');
})();