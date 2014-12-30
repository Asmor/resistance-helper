"use strict";

define(function () {
	return [function () {
		return {
			restrict: "E",
			scope: {
				module: "=module",
			},
			templateUrl: "modules/resistanceModule/resistanceModule.html",
		};
	}];
});