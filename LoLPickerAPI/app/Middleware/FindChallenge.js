"use strict";

const Challenge = use("App/Models/Challenge");
const NotFoundException = use("App/Exceptions/NotFoundException");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindChallenge {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, params: { id } }, next) {
    let challengeId = id;
    if (!challengeId) {
      const { challenge_id } = request.only(["challenge_id"]);
      challengeId = challenge_id;
    }
    const challenge = await Challenge.find(challengeId);
    if (!challenge) {
      throw new NotFoundException("Challenge not found");
    }
    request.challenge = challenge;
    await next();
  }
}

module.exports = FindChallenge;
