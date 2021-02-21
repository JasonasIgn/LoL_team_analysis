"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Player extends Model {
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

  server() {
    return this.belongsTo("App/Models/Server");
  }
}

module.exports = Player;
