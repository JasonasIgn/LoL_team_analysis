'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MatchupSchema extends Schema {
  up () {
    this.create('matchups', (table) => {
      table.increments()
      table.integer("team1_top").notNullable();
      table.integer("team1_jungle").notNullable();
      table.integer("team1_mid").notNullable();
      table.integer("team1_adc").notNullable();
      table.integer("team1_support").notNullable();
      table.integer("team2_top").notNullable();
      table.integer("team2_jungle").notNullable();
      table.integer("team2_mid").notNullable();
      table.integer("team2_adc").notNullable();
      table.integer("team2_support").notNullable();
      table.integer("team1_wins").defaultsTo(0);
      table.integer("team2_wins").defaultsTo(0);
    })
  }

  down () {
    this.drop('matchups')
  }
}

module.exports = MatchupSchema
