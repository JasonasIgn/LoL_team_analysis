'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlayerSchema extends Schema {
  up () {
    this.create('players', (table) => {
      table.increments();
      table
        .integer("server_id")
        .unsigned()
        .references("id")
        .inTable("servers");
      table.string("summoner_name").notNullable();
      table.boolean("crawled").notNullable().defaultsTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('players')
  }
}

module.exports = PlayerSchema
