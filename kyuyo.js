const puppeteer = require("puppeteer");
require("dotenv").config();
async function snap() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.setViewport({ width: 960, height: 800 });
  await page.goto('https://www1.shalom-house.jp/komon/login.aspx');
  await page.waitFor(2000);
  // メニュー選択
  await page.type('#txtID', process.env.id);
  await page.type('#txtPsw', process.env.pass);
  await page.click("#btnLogin");
  await page.waitForSelector('#ctl00_ContentPlaceHolder1_imgBtnMeisai');
  await page.click('#ctl00_ContentPlaceHolder1_imgBtnMeisai');
  await page.waitForSelector('#ctl00_ContentPlaceHolder1_btnSearch');
  await page.click('#ctl00_ContentPlaceHolder1_btnSearch');
  await page.waitForSelector('#ctl00_ContentPlaceHolder1_btnPrint');
  await page.click('#ctl00_ContentPlaceHolder1_btnPrint');
  await page.pdf({
    path: `${new Date().getFullYear()}${new Date().getMonth() + 1}.pdf`,
    landscape: false,
    width: 960,
    height: 600,
    pageRanges: "1"
  });
  await browser.close()
}

(async () => {
  await snap();
})().catch(e => console.error(e));
