// this file is not used if using graphQL
const models = require('../database/models.js');

const controllers = {
  get: (req, res) => {
    models.get()
    .then((info) => {
      res.status(200).send(info);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },
  put: (req, res) => {
    models.put(req.body)
      .then(() => {
        res.status(202).send('updated');
      })
      .catch((err) => {
        res.status(402).send(err);
      });
  }
};

module.exports = controllers;