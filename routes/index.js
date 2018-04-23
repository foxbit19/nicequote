var express = require('express');
const fs = require('fs');
var randomColor = require('random-color');
const fontCount = 6;

var router = express.Router();

function getRandomQuote(callback) {
  fs.readFile('quotes', (err, data) => {
    var split = data.toString().split(/\r?\n/);
    callback(split[Math.floor((Math.random() * 1000) % split.length)].toString());
  })
}

/* GET home page. */
router.get('/', function (req, res, next) {
  getRandomQuote((quote) => {
    var randomQuote = '';
    var randomSize;
    var random;
    var prevRandom;

    quote.split(' ').forEach((quoteSplit) => {
      while ((random = Math.floor((Math.random() * 100) % fontCount) + 1) == prevRandom);
      prevRandom = random;
      randomSize = (Math.floor(Math.random() * 100) % 4) + 6;
      randomQuote += '<span class="font' + random + '" style="font-size: ' + randomSize + 'vh" >'
      randomQuote += ' ' + quoteSplit + ' '
      randomQuote += '</span>'
    });

    res.render('index', {
      title: 'NiceQuote', quote: randomQuote, color: randomColor().hexString()
    });
  });
});

module.exports = router;
