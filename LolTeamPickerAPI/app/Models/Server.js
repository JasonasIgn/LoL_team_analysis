"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Server extends Model {

  players() {
    return this.hasMany("App/Models/Player");
  }
}

module.exports = Server;
