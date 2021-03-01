"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class CrawledGame extends Model {
  static get createTimestamp() {
    return null;
  }
  static get updateTimestamp() {
    return null;
  }
  static get createdAtColumn () {
    return null
  }
  static get updatedAtColumn () {
    return null
  }
}

module.exports = CrawledGame;
