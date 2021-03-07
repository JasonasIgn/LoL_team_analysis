"use strict";
const Config = use("App/Models/Config");
const Event = use("Event");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ratings
 */
class ConfigController {
  /**
   * Get config
   * GET config
   * /config
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    const config = await Config.first();
    response.status(200).send(config);
  }

  /**
   * Toggle running flag
   * get /config/toggle-running
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async toggleRunningFlag({ request, response }) {
    const config = await Config.first();
    const flag = !config.running;
    if (flag) {
      console.log("EVENT FIRED")
      Event.fire("collect");
    }
    config.running = flag;
    await config.save();
    response.status(204);
  }
}

module.exports = ConfigController;
