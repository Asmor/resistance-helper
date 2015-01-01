"use strict";

require([
	"modules/optionsList/optionsList",
	"modules/playerCount/playerCount",
	"modules/resOption/resOption",
	"services/game",
	"services/options",
	"services/RecursionHelper",
], function (optionsList, playerCount, resOption, game, options, RecursionHelper) {
	angular.module("resistanceHelperApp", [ "ngTouch" ])
		.directive("optionsList", optionsList)
		.directive("playerCount", playerCount)
		.directive("resOption", resOption)
		.factory("game", game)
		.factory("options", options)
		.factory("RecursionHelper", RecursionHelper)
	;
	angular.bootstrap(document, ["resistanceHelperApp"]);
});
