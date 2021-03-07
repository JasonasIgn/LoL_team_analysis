'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServerSchema extends Schema {
  up () {
    this.create('servers', (table) => {
      table.increments()
      table.string("name").notNullable();
      table.boolean("missing_players").notNullable().defaultsTo(true);
    })
  }

  down () {
    this.drop('servers')
  }
}

module.exports = ServerSchema
