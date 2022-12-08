var express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha');

const sharp = require('sharp');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/* GET home page. */
router.get('/', async function(req, res, next) {
  var captchaLength = 5
  if (req.query.length) {
    captchaLength = req.query.length
  }
   
  var captcha = svgCaptcha.create({size: getRandomInt(1,8),
                                   color: getRandomInt(0,1) ? false : true,
                                   //background: '#cc9966',
                                   noise: getRandomInt(0,5)});

  let img = await sharp(Buffer.from(captcha.data), {density: 72}).png({compressionLevel: 1}).flatten({ background: { r: 255, g: 255, b: 255 } }).resize(150,50).toBuffer();

  //console.log(await img.toBuffer())
  //res.type('application/json')
  if (req.query.view) {
      res.render('train-captcha', {correct_code: captcha.text,
                               pic: captcha.data,
                               buffer: img.toString('base64')})
  }
  else {
    res.json({img: Buffer.from(captcha.data, "utf-8").toString('base64'), answer: captcha.text});

  }

});

router.get('/login', async function(req, res, next) {
  var captcha = svgCaptcha.create({size: getRandomInt(5,8),
    color: true,
    ignoreChars: 'lI',
    //background: '#cc9966',
    noise: getRandomInt(2,3)});
  req.session.captcha = captcha.text;
  res.render('login', {pic: captcha.data,})
});

router.post('/login', async function(req, res, next) {
  console.log(`CAPTCHA answer is ${req.session.captcha}, received ${req.body['captcha-ans']}`);
  if ((req.body.username == 'admin') && (req.body.password == 'crabmin') && (req.body['captcha-ans'] == req.session.captcha)) {
    res.sendStatus(200);
  }
  else {
    res.sendStatus(403);
  }
  
});

module.exports = router;
