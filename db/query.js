const db = require('./connection');
const R = require('ramda');

module.exports = (function() {
  const relations = ['users', 'rooms', 'messages', 'block_users'];

  class Query {
    constructor(rel) {
      this.rel = rel;
    }

    all() {
      return db(this.rel);
    }

    one(id) {
      return db(this.rel)
        .where('id', id)
        .first()
    }

    by(field, val) {
      return db(this.rel)
        .where(field, val)
    }

    delete(id) {
      return db(this.rel)
        .where('id', id)
        .del();
    }

    update(id, info) {
      return db(this.rel)
        .where('id', id)
        .returning(this._infoToArr(info))
        .update(info)
        .then(R.head);
    }

    add(info) {
      return db(this.rel)
        .returning(this._infoToArr(info))
        .insert(info)
    }

    _infoToArr(info) {
      return R.append('id')(R.keys(R.dissoc('password', info)));
    }
  }

  const main = function (relation) {
    if (!R.contains(relation, relations)) {
      return Promise.reject(
        new Error('Unrecognized model name for query.')
      )
    } else {
      return new Query(relation);
    }
  }

  return main;
}());
