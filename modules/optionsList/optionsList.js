"use strict";

define(function () {
	return ["options", function (options) {
		return {
			restrict: "E",
			scope: {},
			templateUrl: "modules/optionsList/optionsList.html",
			link: function (scope) {
				scope.options = options.options;
			}
		};
	}];
});
