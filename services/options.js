"use strict";

define(["data/options"], function (options) {
	return function () {
		var byName = {};

		setLevel(options);

		return {
			byName: byName,
			tree: options,
		};

		function setLevel(a, level) {
			level = level || 1;

			for ( var i = 0; i < a.length; i++ ) {
				a[i].level = level;
				byName[a[i].name] = a[i];
				if ( a[i].allows ) {
					setLevel(a[i].allows, level+1);
				}
			}
		}
	};
});
