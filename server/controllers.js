const models = require('../database/models.js');

const controllers = {
  get: (req, res) => {
    console.log('here')
    models.get()
    .then((info) => {
      res.status(200).send(info);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  },
  post: (req, res) => {
    models.post(req.body)
      .then(() => {
        res.status(201).send('posted');
      })
      .catch((err) => {
        res.status(401).send(err);
      });
  },
  put: (req, res) => {
    const { id } = req.params;
    models.put(req.body, { where: { id } })
      .then(() => {
        res.status(202).send('updated');
      })
      .catch((err) => {
        res.status(402).send(err);
      });
  },
  delete: (req, res) => {
    const { id } = req.params;
    models.delete(id)
      .then(() => {
        res.status(203).send('deleted');
      })
      .catch((err) => {
        res.status(403).send(err);
      });
  },
};

module.exports = controllers;