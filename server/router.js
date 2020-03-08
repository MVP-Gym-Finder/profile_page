// this file is not used if using graphQL

const router = require('express').Router();
const controllers = require('./controllers.js');
const fileUpload = require('./fileUpload.js');

router
  .route('/')
  .get(controllers.get)
  .put(controllers.put);

router
  .route('/upload')
  .post(fileUpload);

module.exports = router;