"use strict";

define(function () {
	return ["$translate", "game", function ($translate, game) {
		return {
			restrict: "E",
			scope: {},
			templateUrl: "modules/setLanguage/setLanguage.html",
			link: function (scope) {
				scope.languages = [
					{ code: "en", name: "English (Resistance)" },
					{ code: "enAvalon", name: "English (Avalon)" },
					{ code: "it", name: "Italiano" },
				];

				scope.currentLanguage = $translate.use();

				scope.setLanguage = function (code) {
					$translate.use(code);
					scope.currentLanguage = code;
					// Make sure the script is regenerated
					game.dirty = true;
				};
			}
		};
	}];
});
