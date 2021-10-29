const puppeteer = require('puppeteer');
const fs = require('fs');

let rawdata = fs.readFileSync('words.json');
const words = JSON.parse(rawdata);

(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    // devtools: true,
    args: [`--window-size=2800,2000`],
    defaultViewport: {
      width:2800,
      height:2000
    }
  });

  const page = await browser.newPage();

  for(let i = 0; i <= words.length; ++i) {
    if(words[i].image === undefined) {
      try {
        await page.goto(`https://www.bing.com/images/search?q="${words[i].word}"+dessin`);

        await page.waitForSelector('.mimg');
        await page.click('.mimg');
        await page.waitForSelector('.imgContainer img');

        const src = await page.evaluate(() => {
          // console.log(document.querySelector('.b_rich').querySelector('.rms_img').src)
          // debugger;
          return document.querySelector('.imgContainer img').src
        });
        words[i].image = src;

        let data = JSON.stringify(words, null, 2);
        fs.writeFileSync('words.json', data);

      } catch (error) {
        console.log(error);
        console.log('word index:' + i);
      }
    }
  }
  
  await browser.close();
})();
