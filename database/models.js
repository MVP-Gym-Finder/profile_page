const Info = require('./index.js').Info;

const models = {
  get: (id) => {
    return Info.findOne({ where: { id: 0 } });
  },
  post: (info) => {
    return Info.create(info);
  },
  put: (content) => {
    return Info.update(content, { where: { id: 0 } });
  },
  delete: (id) => {
    return Info.destroy({ where: { id } });
  },
  upload: (image) => {
    return Info.update({ image }, { where: { id: 0 } });
  }
}

module.exports = models;