var express = require('express');
const fs = require('fs');
var randomColor = require('random-color');

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
    var randomQuote = quote;
    console.log(randomQuote);
    console.log('Random quote: ' + randomQuote);

    res.render('index', {
      title: 'NiceQuote', quote: randomQuote, color: randomColor().hexString()
    });
  });
});

module.exports = router;
