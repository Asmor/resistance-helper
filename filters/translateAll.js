"use strict";

define([], ["$filter", function ($filter) {
	return function (input) {
		var split = input.split(/\b/),
			i;

		for ( i = 0; i < input.length; i++ ) {
			if ( split[i] && split[i].match(/^[A-Z_]+$/) ) {
				split[i] = $filter("translate")(split[i]);
			}
		}

		return split.join("");
	};
}]);
