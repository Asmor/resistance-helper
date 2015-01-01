"use strict";

require([
	"modules/navBar/navBar",
	"modules/optionsList/optionsList",
	"modules/playerCount/playerCount",
	"modules/resOption/resOption",
	"modules/resSetup/resSetup",
	"services/game",
	"services/options",
	"services/RecursionHelper",
], function (navBar, optionsList, playerCount, resOption, resSetup, game, options, RecursionHelper) {
	angular.module("resistanceHelperApp", [ "ngTouch" ])
		.directive("navBar", navBar)
		.directive("optionsList", optionsList)
		.directive("playerCount", playerCount)
		.directive("resOption", resOption)
		.directive("resSetup", resSetup)
		.factory("game", game)
		.factory("options", options)
		.factory("RecursionHelper", RecursionHelper)
	;
	angular.bootstrap(document, ["resistanceHelperApp"]);
});
