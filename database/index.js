const config = require('./config.js');

let knex;

knex = require('knex')({
  client: 'mysql',
  connection: config.mySql,
});


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
}


const getUser = async (id) => {
  let user = await knex.select('*').from('users').where('user_id', id);
  return user[0];
}


/****************************** Event Stuffs **********************************/

const addEvent = async (userId, title, description, start, end) => {
  console.log('hit addEvent');
}

const getEvents = async (userId) => {
  console.log('hit getEvents');
}

const eventChange = async (userId, timeChange /* eventId */) => {
  console.log('hit eventChang');

}


/******************************************************************************/
module.exports = {
  addNewUser,
  getUsername,
  getUser,
  checkCredentials,
  addEvent,
  getEvents,
  eventChange,
};
