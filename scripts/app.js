"use strict";

require([
	"modules/optionsList/optionsList",
	"modules/resOption/resOption",
	"services/options",
	"services/RecursionHelper",
], function (optionsList, resOption, options, RecursionHelper) {
	angular.module("resistanceHelperApp", [ "ngTouch" ])
		.directive("optionsList", optionsList)
		.directive("resOption", resOption)
		.factory("options", options)
		.factory("RecursionHelper", RecursionHelper)
	;
	angular.bootstrap(document, ["resistanceHelperApp"]);
});
