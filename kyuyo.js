const puppeteer = require("puppeteer");
require("dotenv").config();
async function snap() {
  const month =  process.argv[2] ? getMonth(process.argv[2]) : getMonth();
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
  console.log(`login complete`);
  await page.click('#ctl00_ContentPlaceHolder1_imgBtnMeisai');
  await page.waitForSelector('#ctl00_ContentPlaceHolder1_btnSearch');

  await page.select('#ctl00_ContentPlaceHolder1_cboMonth', `${month}`);
  await page.click('#ctl00_ContentPlaceHolder1_btnSearch');
  console.log("click search button");
  await page.waitForSelector('#ctl00_ContentPlaceHolder1_btnPrint');
  await page.click('#ctl00_ContentPlaceHolder1_btnPrint');
  await page.pdf({
    path: `${new Date().getFullYear()}${month}.pdf`,
    landscape: false,
    width: 960,
    height: 600,
    pageRanges: "1"
  });
  console.log(`output: ${new Date().getFullYear()}${month}.pdf`)
  await browser.close()
}

(async () => {
  await snap();
})().catch(e => console.error(e));

function getMonth(month) {
  if (month) {
    return ("00" + month).substr(-2, 2);
  }
  return ("00" + (new Date().getMonth() + 1)).substr(-2, 2);
}