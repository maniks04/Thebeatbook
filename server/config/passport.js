const LocalStrategy = require('passport-local').Strategy;
const db = require('../../database/index.js');
const bcrypt = require('bcrypt');
// const bodyParser = require('body-parser');

module.exports = (passport) => {
  passport.serializeUser((user, done) => { // creating sessions
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  // LOCAL LOGIN STRATEGY
  passport.use('local-login', new LocalStrategy( //eslint-disable-line
    async (username, password, cb) => {
      const userInfo = await db.checkCredentials(username);

      if (userInfo.length) {
        const user = userInfo[0];
        bcrypt.compare(password, user.password, (err) => {
          if (err) {
            cb(err, null);
          } else {
            cb(null, user);
          }
        });
      } else {
        cb(null, false);
      }
    }));

  // LOCAL SIGNUP Strategy
  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, username, password, cb) => {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          cb(err, null);
        } else {
          const data = await db.addNewUser(req, username, hash);
          if (data === 'already exists') {
            cb(data, null);
          } else {
            const userInfo = await db.checkCredentials(username);
            cb(null, userInfo);
          }
        }
      });
    },
  ));
};
