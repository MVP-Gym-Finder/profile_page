const Info = require('./index.js');

const models = {
  get: (id) => {
    return Info.findOne({ where: { id: 0 } });
  },
  post: (info) => {
    return Info.create(info);
  },
  put: (id, content) => {
    return Info.update(content, { where: { id } });
  },
  delete: (id) => {
    return Info.destroy({ where: { id } });
  }
}

module.exports = models;