"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PlayerSchema extends Schema {
  up() {
    this.create("players", (table) => {
      table.increments();
      table.string("summoner_name").notNullable().unique();
      table
        .integer("server_id")
        .unsigned()
        .references("id")
        .inTable("servers");
      table.boolean("crawled").notNullable().defaultsTo(false);
    });
  }

  down() {
    this.drop("players");
  }
}

module.exports = PlayerSchema;
