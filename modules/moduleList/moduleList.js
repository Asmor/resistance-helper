"use strict";

define(function () {
	return ["moduleProvider", function (moduleProvider) {
		return {
			restrict: "E",
			scope: {},
			templateUrl: "modules/moduleList/moduleList.html",
			link: function (scope) {
				scope.modules = moduleProvider.modules;
			}
		};
	}];
});