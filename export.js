const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();

  // Đường dẫn tới file HTML của bạn
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

  await browser.close();

  console.log('✅ Export CV thành công!');
})();