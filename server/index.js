const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../database/index.js');
const passport = require('passport');
const helpers = require('./helpers.js');//eslint-disable-line
require('../server/config/passport')(passport);

app.use(express.static(`${__dirname}/../client/dist`));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: process.env.SESSION_PASSWORD || 'supersecretsecret',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).end('You must log in to do that!');
};

// Due to express, when you load the page, it doesnt make a get request to '/', it simply serves up the dist folder
app.post('/', (req, res) => {
  res.end();
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      // throw err;
      res.status(500).send(err);
    }
  });
  res.end();
});

app.post('/register/artist', async ({ body }, res) => {
  const hash = bcrypt.hashSync(body.password, 10);
  const registration = await db.registerArtist(body.username, hash, body.email, body.city, body.state);
  if (registration === 'username already exists') {
    return res.send('username already exists');
  } if (registration === 'email already exists') {
    return res.send('email already exists');
  }
  // helpers.sendEmail(body.username, body.email)
  const user = await db.getUser(body.username);
  res.send(user);
});

app.post('/register/venue', async ({ body }, res) => {
  const hash = bcrypt.hashSync(body.password, 10);
  const registration = await db.registerVenue(body.username, hash, body.email, body.venueName, body.address, body.city, body.state, body.capacity);//eslint-disable-line
  if (registration === 'username already exists') {
    return res.send('username already exists');
  } if (registration === 'username already exists') {
    return res.send('email already exists');
  }
  // helpers.sendEmail(body.username, body.email)
  const user = await db.getUser(body.username);
  res.send(user);
});

// app.post('/login', passport.authenticate('local-login'), (req, res) => {
//   console.log(req.body)
//   res.status(200).json({
//     user_id: req.user.user_id,
//     username: req.user.username,
//     session_id: req.sessionID
//   });
// });

app.post('/login', async ({ body }, res) => {
  const userInfo = await db.checkCredentials(body.username);
  if (userInfo.length) {
    const checkUser = userInfo[0];
    if (bcrypt.compareSync(body.password, checkUser.password)) {
      // Passwords match
      const user = await db.getUser(body.username);
      return res.send(user);
    }
    // Passwords don't match
    return res.send('your passwords dont match');
  }
  res.send('Username does not exist');
});

app.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  res.clearCookie('connect.sid').status(200);
});

/** ****************************** Calendar ********************************** */
app.post('/calendar', async (req, res) => {
  await db.addBooking(req.body);
  res.status(200).end();
});

app.get('/artist/epk', async (req, res) => {
  console.log(req.query.username);
  const epkInfo = await db.getEpkData(req.query.username);
  res.json(epkInfo);
});

app.get('/artist/city', async (req, res) => {
  const artistList = await db.getArtistsByCity(req.query.city);
  res.json(artistList);
});

app.get('/venues', async (req, res) => {
  const { city } = req.query;
  const venues = await db.getVenues(city);
  res.status(200).send({ venues });
});

app.get('/venueCalendar', async (req, res) => {
  const { venue_id } = req.query;
  const venueCalendar = await db.getVenueBookings2(venue_id);
  res.status(200).send(venueCalendar);
});

app.patch('/booking', async ({ body }, res) => {
  await db.updateBooking(body);
  const bookings = await db.getVenueBookings2(body.venue_id);
  res.status(200).send({ bookings });
});

app.post('/epkImgUpload', async (req, res) => {
  res.status(200).send();
});

app.post('/updateEPK', async (req, res) => {
  console.log('hit server updateEPK');
  db.editEPK(req.body);
  res.status(200).send();
});

app.get('/epk', async (req, res) => {
  const epk = await db.getEpk(req.query.artistId);
  res.status(200).send({ epk });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/dist/index.html`));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port 3000!');
});
