"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ConfigSchema extends Schema {
  up() {
    this.create("configs", (table) => {
      table.increments();
      table.boolean("running").notNullable().defaultsTo(false);
    });
  }

  down() {
    this.drop("configs");
  }
}

module.exports = ConfigSchema;
