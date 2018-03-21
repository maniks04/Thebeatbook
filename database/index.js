const config = require('./config.js');

let knex;

knex = require('knex')({
  client: 'mysql',
  connection: config,
});


//LOGIN / AUTHENTICATION
const checkCredentials = (username) => {
  return knex.select().from('users')
    .where(knex.raw(`LOWER(username) = LOWER('${username}')`));
};

const addNewUser = async (username, password, email) => {
  const userQuery = await knex.select().from('users')
    .where(knex.raw(`LOWER(username) = LOWER('${username}')`));
  const emailQuery = await knex.select().from('users')
    .where(knex.raw(`LOWER(email) = LOWER('${email}')`));
  if (userQuery.length) {
    return 'username already exists';
  } else if (emailQuery.length) {
    return 'email already exists';
  } else {
    return await knex('users').insert({ username: username, password: password, email: email});
  }
};

const getUsername = async (id) => {
  let user = await knex.select('username').from('users').where('user_id', id);
  return user[0].username;
};

const getUserByName = async (username) => {
  let user = await knex.select('*').from('users').where('username', username);
  return user[0];
}

const getUser = async (id) => {
  let user = await knex.select('*').from('users').where('user_id', id);
  return user[0];
};



const getArtist = async (userId) => {
  let artist = await knex.select('*').from('artists').where('artists.user_id', id);
  return artist[0];

}

//BOOKINGS

const getArtistBookings = (artistId) => {
  return knex.select('*')
    .from('bookings')
    .where('bookings.artist_id', artistId)
    .orderBy('bookings.start_time', 'booking_description');
};

const getVenueBookings = (venueId) => {
  return knex.select('*')
    .from('bookings')
    .where('bookings.venue_id', venueId)
    .orderBy('bookings.start_time', 'booking_description');
};

module.exports = {
  addNewUser,
  getUsername,
  getUser,
  checkCredentials,
  getArtistBookings
};
