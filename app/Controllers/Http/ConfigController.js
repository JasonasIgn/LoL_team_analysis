"use strict";
const Config = use("App/Models/Config");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ratings
 */
class ConfigController {
  /**
   * Show a list of all ratings.
   * GET ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async setGameId({ request, response }) {
    const data = request.only(["gameId"]);
    const config = await Config.first();
    config.gameId = data.gameId;
    await config.save();
  }
}

module.exports = ConfigController;
