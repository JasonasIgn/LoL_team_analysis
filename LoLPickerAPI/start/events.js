"use strict";

/** @type {typeof import('@adonisjs/framework/src/Event')} */
const Event = use("Event");

/** @type {typeof import('adonisjs-queue/src/Queue')} */
const Queue = use("Queue");

const CollectMatchup = use("App/Jobs/CollectMatchup");

Event.on("collect", async () => {
    console.log("EVENT CATCHED ")
  await Queue.dispatch(new CollectMatchup());
});
