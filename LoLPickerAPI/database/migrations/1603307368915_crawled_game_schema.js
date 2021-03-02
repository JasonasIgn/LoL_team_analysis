'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CrawledGameSchema extends Schema {
  up () {
    this.create('crawled_games', (table) => {
      table.increments()
      table.bigInteger("gameId").notNullable().unique();
      table
        .integer("server_id")
        .unsigned()
        .references("id")
        .inTable("servers");
    })
  }

  down () {
    this.drop('crawled_games')
  }
}

module.exports = CrawledGameSchema
