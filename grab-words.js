const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://fr.wiktionary.org/wiki/Wiktionnaire:Liste_de_1750_mots_fran%C3%A7ais_les_plus_courants');

  const result = await page.evaluate(() => {

    const words = [];

    document
      .querySelectorAll('h3')
      .forEach(header => {
        if (header.contains(header.querySelector('.mw-headline'))) {
          if (header.contains(header.querySelector('a'))) {
            let currentP = header.nextElementSibling;
            while (currentP.nodeName === 'P') {
              currentP.querySelectorAll('a').forEach(currentWord => {
                words.push({
                  category: header.querySelector('a').title,
                  word: currentWord.innerText
                });
              });
              currentP = currentP.nextElementSibling;
            }
          }
        }
      });
    return words;
  });
  
  let data = JSON.stringify(result);
  fs.writeFileSync('words.json', data);

  await browser.close();
})();