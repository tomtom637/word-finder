const puppeteer = require('puppeteer');
const fs = require('fs');

let rawdata = fs.readFileSync('../words.json');
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

  for(let i = 389; i <= words.length; ++i) {
    try {
      await page.goto(`https://www.bing.com/search?q="${words[i].word}"+dessin`);

      const src = await page.evaluate(() => {
        // console.log(document.querySelector('.b_rich').querySelector('.rms_img').src)
        // debugger;
        // return document.querySelector('.imgContainer img').src
        return [
          document.querySelectorAll('.sgt')[0].dataset.srcHq,
          document.querySelectorAll('.sgt')[1].dataset.srcHq,
          document.querySelectorAll('.sgt')[2].dataset.srcHq,
          document.querySelectorAll('.sgt')[3].dataset.srcHq,
          document.querySelectorAll('.sgt')[4].dataset.srcHq
        ];
      });
      words[i].image = src;

      let data = JSON.stringify(words, null, 2);
      fs.writeFileSync('../words.json', data);

    } catch (error) {
      console.log(error);
      console.log('word index:' + i);
    }
  }
  
  await browser.close();
})();
