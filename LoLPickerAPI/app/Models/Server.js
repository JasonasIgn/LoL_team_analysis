"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Server extends Model {
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
  players() {
    return this.hasMany("App/Models/Player");
  }

  crawledGames() {
    return this.hasMany("App/Models/CrawledGame");
  }
}

module.exports = Server;
