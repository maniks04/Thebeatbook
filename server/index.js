const express = require('express');
const bodyParser = require('body-parser');
const url = require ('url');
const request = require('request')
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../database/index.js');
const passport = require('passport')
const helpers = require('./helpers.js')
require('../server/config/passport')(passport);
app.use(express.static(__dirname + '/../client/dist'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: process.env.SESSION_PASSWORD || 'supersecretsecret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).end('You must log in to do that!');
}

// Due to express, when you load the page, it doesnt make a get request to '/', it simply serves up the dist folder
app.post('/', function(req, res) {

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

app.post('/register/artist', async (req, res) => {
  var hash = bcrypt.hashSync(req.body.password, 10);
  const registration = await db.registerArtist(req.body.username, hash, req.body.email, req.body.city, req.body.state);
  if (registration === 'username already exists') {
     return res.send('username already exists')
  } if (registration === 'email already exists') {
     return res.send('email already exists')
  } else {
    // helpers.sendEmail(req.body.username, req.body.email)
    let user = await db.getUser(req.body.username)
    res.send(user)
  }
})

app.post('/register/venue', async (req, res) => {
  var hash = bcrypt.hashSync(req.body.password, 10);
  const registration = await db.registerVenue(req.body.username, hash, req.body.email, req.body.venueName, req.body.address, req.body.city, req.body.state, req.body.capacity);
  if (registration === 'username already exists') {
    return res.send('username already exists')
  } if (registration === 'username already exists') {
    return res.send('email already exists')
  } else {
    // helpers.sendEmail(req.body.username, req.body.email)
    let user = await db.getUser(req.body.username)
    res.send(user)
  }
})

app.post('/login', async (req, res) => {
  let userInfo = await db.checkCredentials(req.body.username);
  if (userInfo.length) {
    let user = userInfo[0]
    if(bcrypt.compareSync(req.body.password, user.password)) {
      // Passwords match
      let user = await db.getUser(req.body.username)
      return res.send(user)
     } else {
      // Passwords don't match
      return res.send('your passwords dont match')
    }
  }
   res.send('Username does not exist')
})


app.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  res.clearCookie('connect.sid').status(200);
});




/******************************** Calendar ***********************************/

app.post('/calendar', async (req, res) => {
  await db.addBooking(req.body)
  res.status(200).end()
})

app.get('/artist/epk', async (req, res) => {
  console.log(req.query.username)
  let epkInfo = await db.getEpkData(req.query.username)
  res.json(epkInfo)
})


app.get('/artist/city', async (req, res) => {
  let artistList = await db.getArtistsByCity(req.query.city)
  res.json(artistList)
})

/******************************Venue Stuff*************************************/

app.get('/venues', async (req, res) => {
  const city = req.query.city;
  let venues = await db.getVenues(city);
  res.status(200).send({venues : venues})
});

app.get('/venueCalendar', async (req, res) => {
  let venue_id = req.query.venue_id
  let venueCalendar = await db.getVenueBookings(venue_id);
  res.status(200).send(venueCalendar);
})

/********************************EPK STUFF ************************************/
app.get('/epk', async (req, res) => {
  let epk = await db.getEpk(req.query.artistId);
  res.status(200).send({epk : epk})
});

app.post('/updateEPK', async (req, res) => {
  console.log('hit server updateEPK', req.body)
  db.editEPK(req.body)
  res.status(200)
})



/******************************************************************************/

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/dist' + '/index.html'))
})

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port 3000!');
});
