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
  booking_date DATETIME,
  booking_description VARCHAR(8000),

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
--   (username, password)
-- VALUES
--   ('yaboi', '$2a$10$MCRlmB8bUswMTqKG.kURCu2pu8ipopli2LLaO5OODNokt44cpLZ56'),
--   ('Gepeto', '$2a$10$pKgnmkFU5W7D70ekyEurruql72IonF7c5MiPlfnHrc9ywjrAF89Ou'),
--   ('Zanbato', '$2a$10$pKgnmkFU5W7D70ekyEurruql72IonF7c5MiPlfnHrc9ywjrAF89Ou'),
--   ('Colonel', '$2a$10$pKgnmkFU5W7D70ekyEurruql72IonF7c5MiPlfnHrc9ywjrAF89Ou'),
--   ('Hipster', '$2a$10$pKgnmkFU5W7D70ekyEurruql72IonF7c5MiPlfnHrc9ywjrAF89Ou');

-- insert into posts
--   (user_id, title, code, summary, solution_id)
-- VALUES
--   (1, 'Get to the Choppa', 'aslkdjfleaf', 'Get to the choppa or die', 123456),
--   (2, 'He is a real boy', 'hello world', 'Turn puppet into real boy', null),
--   (3, 'A really big sword', 'chop chop its all in the mind', 'the ultimate onion chopper', null),
--   (4, 'How do you pronounce my name?', 'some military guy', 'Did not know how to say this till I was 25', null),
--   (5, 'I hate everything', 'Your music sucks', 'Going to drink some IPAs', 234567);

-- insert into comments
--   (user_id, post_id, message, votes)
-- VALUES
--   (1, 1, 'Guns Blazing', 5),
--   (2, 1, 'Think of the children!', 2),
--   (3, 1, 'sword = shield', 525),
--   (4, 1, 'Pulls out rocket launcher', 15),
--   (5, 1, 'I used those before they were cool', 0);
