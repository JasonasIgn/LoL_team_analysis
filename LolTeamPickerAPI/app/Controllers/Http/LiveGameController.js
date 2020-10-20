"use strict";
const Axios = use("axios");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ratings
 */
class LiveGameController {
  /**
   * Show a list of all ratings.
   * GET ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async getLiveData({ request, params: { name }, response }) {
    console.log(name)
    try {
      const res = await Axios.get(
        `https://euw1.api.riotgames.com/liveclientdata/playerlist?summonerName=Sethel`,
        {
          headers: {
            "X-Riot-Token": process.env.LOL_API_KEY,
          },
        }
      );

      const { data } = res;
      console.log(data)
      response.status(200).send({});
    } catch (e) {
      console.log(e.response)
      response.status(400).send({});
    }
  }
}

module.exports = LiveGameController;
