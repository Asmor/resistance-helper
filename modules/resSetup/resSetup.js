"use strict";

define([], ["game", function (game) {
	return {
		restrict: "E",
		scope: {},
		templateUrl: "modules/resSetup/resSetup.html",
		link: function (scope) {
			scope.game = game;
			scope.sides = [
				{ name: "Resistance", className: "role-list__res", key: "res" },
				{ name: "Spies", className: "role-list__spy", key: "spy" },
			];
			scope.showCards = function () {
				return Object.keys(game.things.decks).length;
			};

			window.scope = scope;
		}
	};
}]);
