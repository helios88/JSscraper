const rp = require('request-promise');
// const request = require('request');
// const $ = require('cheerio');
const cheerio = require('cheerio');
const url = 'https://matcha-jp.com/en/1973'; 
const fs = require('fs');
const writeStream = fs.createWriteStream('post.txt');


rp(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    $('main').each((i, el) => {
      const title = $(el)
        .find('h1.title')
        .text()
      
      const summary = $(el)
        .find('div.article_content')
        .find('p')
        .text()

      const keywords = $(el)
        .find('div.article_content')
        .find('p')
        .find('strong')
        .text()

      const description = $(el)
        .find('p.description')
        .text()
        
      const subheadings = $(el)
        .find('h2')
        .text()
        

      writeStream.write(`Title: \n${title} \n\nKeywords: \n${keywords} \n\nDescription: \n${description} \n\nSubheadings: \n${subheadings} \n\n\Summary: \n${summary}`);
      });
      console.log('Scrape Done...');
  }
});

