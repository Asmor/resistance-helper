"use strict";

require([
	"modules/navBar/navBar",
	"modules/optionsList/optionsList",
	"modules/playerCount/playerCount",
	"modules/resOption/resOption",
	"modules/resScript/resScript",
	"modules/resSetup/resSetup",
	"services/game",
	"services/options",
	"services/RecursionHelper",
], function (navBar, optionsList, playerCount, resOption, resScript, resSetup, game, options, RecursionHelper) {
	angular.module("resistanceHelperApp", [ "ngTouch" ])
		.directive("navBar", navBar)
		.directive("optionsList", optionsList)
		.directive("playerCount", playerCount)
		.directive("resOption", resOption)
		.directive("resScript", resScript)
		.directive("resSetup", resSetup)
		.factory("game", game)
		.factory("options", options)
		.factory("RecursionHelper", RecursionHelper)
	;
	angular.bootstrap(document, ["resistanceHelperApp"]);
});
