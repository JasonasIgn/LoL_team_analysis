"use strict";

const Job = use("Job");
const Event = use("Event");
const Server = use("App/Models/Server");
const crawlHelpers = use("App/Helpers/crawlHelpers");
const roleIdentification = use("App/Helpers/roleIdentification");
const Config = use("App/Models/Config");

class CollectMatchup extends Job {
  constructor() {
    super();
    this.timeOut = 100000; // seconds: time out for queue
    this.retryCount = 0; // number of times to retry
    this.retryUntil = 200; // seconds: retry
    this.delayUntil = 0; // seconds: delay
  }

  get queue() {
    return "high";
  }

  async handle(link, done) {
    try {
      console.time('Collecting')
      let gamesCollected = 0;
      const championRoles = await roleIdentification.pullData();
      const config = await Config.first();
      const servers = await Server.all();
      if (!config.running) {
        throw Error("Job cancelled due to running flag = off");
      }
      await Promise.all(
        servers.rows.map(async (server) => {
          try {
            if (server.missing_players) {
              throw Error(`Missing players for server: ${server.name}`);
            }
            const player = await server
              .players()
              .where("crawled", false)
              .first();
            if (!player) {
              server.missing_players = true;
              await server.save();
              throw Error(`Missing players for server: ${server.name}`);
            }
            const collected = await crawlHelpers.crawlPlayer(
              player,
              server,
              championRoles
            );
            gamesCollected += collected;
          } catch (e) {
          }
        })
      );
    } catch (e) {
      // console.log(e);
      // throw e;
    }
    finally {
      console.timeEnd('Collecting')
    }
  }

  progress(progress) {
    console.log(
      `Job [${this.constructor.name}] - progress:${progress}%: status=running; id=${this.id} `
    );
  }

  failed(error) {
    console.log(
      `Job [${this.constructor.name}] - status:failed; id=${this.id} `,
      error.message
    );
    Event.fire("collect");
  }

  retrying(error) {
    console.log(
      `Job [${this.constructor.name}] - status:retrying; id=${this.id} `,
      error.message
    );
  }

  succeeded(result) {
    console.log(
      `Job [${this.constructor.name}] - status:succeeded; id=${this.id} `,
      result
    );
    Event.fire("collect");
  }
}

module.exports = CollectMatchup;
