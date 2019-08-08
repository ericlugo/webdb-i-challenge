const db = require('./dbConfig');

const accountHelper = (module.exports = {});

accountHelper.get = function(id) {
  if (id) {
    return db('accounts')
      .where('id', id)
      .first();
  }
  return db('accounts');
};

accountHelper.insert = function(account) {
  return db('accounts')
    .insert(account)
    .then(([id]) => this.get(id));
};

accountHelper.update = function(id, changes) {
  return db('accounts')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? this.get(id) : null));
};

accountHelper.remove = function(id) {
  return db('accounts')
    .where('id', id)
    .del();
};
