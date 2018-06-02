const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `Now: ${now} | ${req.method} ${req.url}`
  fs.appendFile('server.log', log + '\n', (e) => {
    if (e) {
      console.log('Unable to append to server.log')
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {});
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    welcomeMessage: 'Welcome to this site!',
    pageTitle: 'Home Page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill this request.'
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
