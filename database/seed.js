const example = [{
  id: 0,
  username: 'christ123092',
  first_name: 'Christine',
  last_name: 'Ting',
  height: '5/5',
  weight: '130 lbs',
  age: 27,
  gender: 'Female',
  dob: '12/25/1992',
  zip: 90045,
  goal_w: '120 lbs',
  weekly_goal: 'Lose 0.5 lbs per week',
  activity_lvl: 'Active',
  workouts_per_wk: 3,
  min_per_workout: 60,
  image: 'https://mvpuploadimg.s3-us-west-1.amazonaws.com/IMG_3501-1583453260746.JPG'
}];

const Info = require('./index.js').Info;
Info.create(example[0]);
