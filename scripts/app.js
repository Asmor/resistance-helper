"use strict";

require([
	"scripts/config",
	"filters/translateAll",
	"modules/navBar/navBar",
	"modules/optionsList/optionsList",
	"modules/playerCount/playerCount",
	"modules/resOption/resOption",
	"modules/resScript/resScript",
	"modules/resSetup/resSetup",
	"modules/setLanguage/setLanguage",
	"services/game",
	"services/options",
	"services/RecursionHelper",
], function (config, translateAll, navBar, optionsList, playerCount, resOption, resScript, resSetup, setLanguage, game, options, RecursionHelper) {
	angular.module("resistanceHelperApp", [ "ngTouch", "pascalprecht.translate" ])
		.config(config)
		.filter("translateAll", translateAll)
		.directive("navBar", navBar)
		.directive("optionsList", optionsList)
		.directive("playerCount", playerCount)
		.directive("resOption", resOption)
		.directive("resScript", resScript)
		.directive("resSetup", resSetup)
		.directive("setLanguage", setLanguage)
		.factory("game", game)
		.factory("options", options)
		.factory("RecursionHelper", RecursionHelper)
	;
	angular.bootstrap(document, ["resistanceHelperApp"]);
});
