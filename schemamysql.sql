-- CREATE DATABASE beatbook;

USE beatbook;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS venues;
DROP TABLE IF EXISTS artists;
DROP TABLE IF EXISTS bookings;

CREATE TABLE users
(
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(25) NOT NULL,
  password VARCHAR(60) NOT NULL,
  email VARCHAR(255) DEFAULT NULL,
  facebook_id VARCHAR(255) DEFAULT NULL,
  is_venue boolean DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id)
);


CREATE TABLE venues
(
  venue_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  venue_name VARCHAR(50) NOT NULL,
  venue_description VARCHAR(8000) DEFAULT NULL,
  capacity INT NOT NULL,
  venue_city VARCHAR(25),
  venue_state VARCHAR(25),
  venue_address VARCHAR (25),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (venue_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);


CREATE TABLE artists
(
  artist_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  artist_name VARCHAR(50) NOT NULL,
  artist_description VARCHAR(8000) DEFAULT NULL,
  artist_city VARCHAR(25),
  artist_state VARCHAR(25),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (artist_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE bookings
(
  booking_id INT NOT NULL AUTO_INCREMENT,
  artist_id INT NOT NULL,
  venue_id INT NOT NULL,
  start_time DATETIME,
  end_time DATETIME,
  booking_description VARCHAR(8000),
  confirmed boolean DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (booking_id),
  FOREIGN KEY (artist_id) REFERENCES artists (artist_id),
  FOREIGN KEY (venue_id) REFERENCES venues (venue_id)
);

-- POSSIBLY MAKE CITY/STATE TABLES FOR CATEGORIZATION AND REFERENCE CITY_id AND STATE_id IN VENUES TABLE

-- ---
-- Test Data
--
-- ---

-- insert into users
--   (user_id, username, password)
-- VALUES
--   (1, 'yaboi', '$2a$10$MCRlmB8bUswMTqKG.kURCu2pu8ipopli2LLaO5OODNokt44cpLZ56'),
--   (2, 'Gepeto', '$2a$10$pKgnmkFU5W7D70ekyEurruql72IonF7c5MiPlfnHrc9ywjrAF89Ou');

-- insert into artists
--   (artist_id, user_id, artist_name, artist_description)
-- VALUES
--   (1, 1, 'Trouble', 'turbofunk');

-- insert into bookings
--   (booking_id, artist_id, venue_id, start_time, end_time, booking_description)
-- VALUES
--   (1, 1, 1, '2018-03-22T14:30:00', '2018-03-22T16:30:00', 'SXSW Free show!');

-- insert into venues
--   (venue_id, user_id, venue_name, venue_description, capacity)
-- VALUES
--   (1, 2, 'Vulcan', 'sixth street venue', 700);
