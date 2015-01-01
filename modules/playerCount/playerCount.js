"use strict";

define(function () {
	return ["game", function (game) {
		return {
			restrict: "E",
			scope: {},
			templateUrl: "modules/playerCount/playerCount.html",
			link: function (scope) {
				scope.game = game;
			}
		};
	}];
});