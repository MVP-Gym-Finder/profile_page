DROP DATABASE IF EXISTS profile;

CREATE DATABASE profile;

\c profile;

DROP TABLE IF EXISTS info;

CREATE TABLE info (
  id SERIAL,
  username VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  height VARCHAR NOT NULL,
  weight VARCHAR NOT NULL,
  age INT NOT NULL,
  gender VARCHAR NOT NULL,
  dob VARCHAR NOT NULL,
  zip INT NOT NULL,
  current_w VARCHAR NOT NULL,
  goal_w VARCHAR NOT NULL,
  weekly_goal VARCHAR NOT NULL,
  activity_lvl VARCHAR NOT NULL,
  workouts_per_wk INT NOT NULL,
  min_per_workout INT NOT NULL,
  image VARCHAR NOT NULL
)