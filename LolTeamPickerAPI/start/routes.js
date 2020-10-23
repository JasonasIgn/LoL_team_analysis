"use strict";

const { validator } = use("Validator");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("matchup/collect", "MatchupController.collect");

Route.post("matchup/whatDoIPlay", "MatchupController.whatDoIPlay");

Route.get("livegame/:name", "LiveGameController.getLiveData");

Route.post("config/gameId", "ConfigController.setGameId");
