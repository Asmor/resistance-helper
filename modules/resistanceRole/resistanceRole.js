"use strict";

define(function () {
	return ["RecursionHelper", function (RecursionHelper) {
		return {
			restrict: "E",
			scope: {
				role: "=role",
			},
			templateUrl: "modules/resistanceRole/resistanceRole.html",
			compile: function(element) {
				// Use the compile function from the RecursionHelper,
				// And return the linking function(s) which it returns
				return RecursionHelper.compile(element);
			}
		};
	}];
});