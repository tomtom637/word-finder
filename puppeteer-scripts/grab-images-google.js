const puppeteer = require('puppeteer');
const fs = require('fs');

let rawdata = fs.readFileSync('words.json');
const words = JSON.parse(rawdata);

(async () => {
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      args: [`--window-size=2800,2000`],
      defaultViewport: {
        width:2800,
        height:2000
      }
    });

    const page = await browser.newPage();
  
    for(let i = 0; i <= 3; ++i) {
      try {
        await page.goto(`https://www.google.com/search?q="${words[i].word}"+dessin&hl=fr&tbm=isch`);
        
        await page.evaluate(() => {
          document
            .getElementById('islrg')
            .querySelector('img')
            .click();         
        });

        await page.waitForSelector('#islsp');

        const src = await page.evaluate(() => {
          let source = 'Honney';
          document
            .getElementById('islsp')
            .querySelectorAll('[jsname = "HiaYvf"]')
            .forEach(el => {
              console.log(el);
              debugger;
              if(el.src.startsWith('http')) {
                source = el.currentSrc;
                return el.currentSrc;
              }
            });
            return source;
        });
        words[i].image = src;

      } catch (error) {
        console.log(error);
      }
    }
  
    let data = JSON.stringify(words, null, 2);
    fs.writeFileSync('words.json', data);
  
    await browser.close();
})();
