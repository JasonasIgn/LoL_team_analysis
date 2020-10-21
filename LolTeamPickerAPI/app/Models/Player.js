"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Player extends Model {
  server() {
    return this.belongsTo("App/Models/Server");
  }
}

module.exports = Player;
