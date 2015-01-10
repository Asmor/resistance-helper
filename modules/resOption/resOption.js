"use strict";

define(function () {
	return ["RecursionHelper", "game", function (RecursionHelper, game) {
		return {
			restrict: "E",
			scope: {
				option: "=option",
			},
			templateUrl: "modules/resOption/resOption.html",
			link: function (scope) {
				scope.game = game;
			},
			compile: function(element) {
				// Use the compile function from the RecursionHelper,
				// And return the linking function(s) which it returns
				return RecursionHelper.compile(element, function (scope) {
					scope.game = game;
				});
			}

		};
	}];
});