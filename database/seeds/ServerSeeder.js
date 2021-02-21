"use strict";

const Config = use("Config");
const Player = use("App/Models/Player");
const servers = Config.get("constants").servers;

/*
|--------------------------------------------------------------------------
| ServerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class ServerSeeder {
  async run() {
    Object.values(servers).forEach(async (server) => {
      const seededServer = await Factory.model("App/Models/Server").create({
        name: server.name
      });
      const basePlayer = new Player()
      basePlayer.summoner_name = server.basePlayer;
      seededServer.players().save(basePlayer)
    })
  }
}

module.exports = ServerSeeder;
