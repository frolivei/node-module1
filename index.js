const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyPaser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyPaser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('main');
});

const verifyParameters = (req, res, next) => {
  if (!req.query.nome) {
    res.redirect('/');
  } else {
    next();
  }
};

app.get('/major', verifyParameters, (req, res) => {
  res.render('major', { nome: req.query.nome });
});

app.get('/minor', verifyParameters, (req, res) => {
  res.render('minor', { nome: req.query.nome });
});

app.post('/check', (req, res) => {
  const name = req.body.userName;
  const date = req.body.birthDate;

  const age = moment().diff(moment(date, 'DD/MM/YYYY'), 'years');

  const page = (age >= 18) ? 'major' : 'minor';

  const redirectURL = `/${page}?nome=${name}`;

  res.redirect(redirectURL);
});

app.listen(3000);
