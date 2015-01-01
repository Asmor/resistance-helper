"use strict";

define(["data/options"], function (options) {
	return function () {
		var byName = {};

		parse(options);

		return {
			byName: byName,
			tree: options,
		};

		function parse(a, level, parentName) {
			level = level || 1;

			for ( var i = 0; i < a.length; i++ ) {

				a[i].level = level;
				byName[a[i].name] = a[i];

				if (parentName) {
					a[i].requires = parentName;
				}

				if ( a[i].allows ) {
					parse(a[i].allows, level+1, a[i].name);
				}
			}
		}
	};
});
