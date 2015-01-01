"use strict";

require([
	"modules/navBar/navBar",
	"modules/optionsList/optionsList",
	"modules/playerCount/playerCount",
	"modules/resOption/resOption",
	"services/game",
	"services/options",
	"services/RecursionHelper",
], function (navBar, optionsList, playerCount, resOption, game, options, RecursionHelper) {
	angular.module("resistanceHelperApp", [ "ngTouch" ])
		.directive("navBar", navBar)
		.directive("optionsList", optionsList)
		.directive("playerCount", playerCount)
		.directive("resOption", resOption)
		.factory("game", game)
		.factory("options", options)
		.factory("RecursionHelper", RecursionHelper)
	;
	angular.bootstrap(document, ["resistanceHelperApp"]);
});
