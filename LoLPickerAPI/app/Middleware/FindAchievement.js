"use strict";

const Achievement = use("App/Models/Achievement");
const NotFoundException = use("App/Exceptions/NotFoundException");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindAchievement {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, params: { id } }, next) {
    let achievementId = id;
    if (!achievementId) {
      const { achievement_id } = request.only(["achievement_id"]);
      achievementId = achievement_id;
    }
    const achievement = await Achievement.find(achievementId);
    if (!achievement) {
      throw new NotFoundException("Achievement not found");
    }
    request.achievement = achievement;
    await next();
  }
}

module.exports = FindAchievement;
