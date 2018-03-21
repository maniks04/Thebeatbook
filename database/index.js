
const config = require('./config.js');



knex = require('knex')({
  client: 'mysql',
  connection: config,
});


//LOGIN / AUTHENTICATION
const checkCredentials = (username) => {
  return knex.select().from('users')
    .where(knex.raw(`LOWER(username) = LOWER('${username}')`));
};

const addUsers = async (username, password, email, userType) => {
  const userQuery = await knex.select().from('users')
    .where(knex.raw(`LOWER(username) = LOWER('${username}')`));
  const emailQuery = await knex.select().from('users')
    .where(knex.raw(`LOWER(email) = LOWER('${email}')`));
  if (userQuery.length) {
    return 'username already exists';
  } else if (emailQuery.length) {
    return 'email already exists';
  } else {
     return await knex('users').insert({ username: username, password: password, email: email, user_type: userType});  //took out return 
  }
};


const registerArtist = async (username, password, email, city, state) => {
  let result = await addUsers(username, password, email, 'artist')
  if (result === 'username already exists' || result === 'email already exists') {
    return result;
  } else {
      const id = await getUserID(username)
      return await knex('artists').insert({artist_name: username, artist_city: city, artist_state: state, user_id: id})
  } 
}

const registerVenue = async (username, password, email, venueName, address, city, state, capacity) => {
  let result = await addUsers(username, password, email, 'venue')
  if (result === 'username already exists' || result === 'email already exists') {
    return result;
  } else {
      const id = await getUserID(username)
      return await knex('venues').insert({venue_name: venueName, venue_address: address, venue_city: city, venue_state: state, capacity: capacity, user_id: id})//id, name, capacity, city, state, address
  } 
}


const getUserID = async (username) => {
  let id = await knex.select('user_id').from('users').where('username', username);
  return id[0].user_id
}

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
  registerArtist,
  registerVenue,
  getUsername,
  getUser,
  checkCredentials,
  getArtistBookings
};
