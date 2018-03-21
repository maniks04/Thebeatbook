const express = require('express');
const bodyParser = require('body-parser');
const url = require ('url');
const request = require('request')
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../database/index.js');
const passport = require('passport')
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

app.post('/register/artist', async (req, res) => {
  var hash = bcrypt.hashSync(req.body.password, 10);
  const registration = await db.registerArtist(req.body.username, hash, req.body.email, req.body.city, req.body.state);
  if (registration === 'username already exists') {
     return res.send('username already exists')
  } if (registration === 'email already exists') {
     return res.send('email already exists')
  } else {
    res.send('added')
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
    res.send('added')
  }
})


// app.post('/login', passport.authenticate('local-login'), (req, res) => {
//   console.log(req.body)
//   res.status(200).json({
//     user_id: req.user.user_id,
//     username: req.user.username,
//     session_id: req.sessionID
//   });
// });


app.post('/login', async (req, res) => {
  let userInfo = await db.checkCredentials(req.body.username);
  if (userInfo.length) {
    let user = userInfo[0]
    if(bcrypt.compareSync(req.body.password, user.password)) {
      // Passwords match
      let user = await db.getUser(req.body.username)
      console.log(user)
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

app.post('/calendar', (req, res) => {
  let userId = 1
  let title = req.body.title;
  let description = req.body.description;
  let start = req.body.start;
  let end = req.body.end;
  //db.addEvent(userId, title, description, start, end);

  res.status(200).end()
})

app.post('/dragAndDrop', (req, res) => {
  let id = 1;
  let eventId = req.body.eventId;
  let timeChange = req.body.timeChange;
  //db.eventChange()
  res.status(200).end()
})

app.get('/calendar', (req, res) => {
  //db.getEvents(1)
  testData = [
    {
      title: 'Tumble22',
      start: '2018-03-22T12:30:00',
      end: '2018-03-22T13:30:00',
      description: 'OG Southern Chicken Sandwhich, Dang hot, with a side of chips, for here please.',
      id: 1
    },
    {
      title: 'Happy Chick',
      start: '2018-03-23T11:30:00',
      end: '2018-03-23T12:30:00',
      description: 'Classic Chic, spicy, with honey siracha and ranch, to go please.',
      id: 2
    },
  ]
  res.status(200).send(testData).end()
})

/*****************************************************************************/

//BOOKINGS

app.get('/bookings', async (req, res) => {
  const Id = req.query.userId;
  const type = req.query.user;
  let events = await db.getBookings(Id, type);
  res.status(200).send({events : events})
});

app.get('/user', async (req, res) => {
  const Id = req.query.userId;
  const type = req.query.user;
  let user = await db.getBookings(Id, type);
  res.status(200).send({events : events})
});


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/dist' + '/index.html'))
})

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port 3000!');
});
