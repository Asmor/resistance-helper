"use strict";

define(["data/options"], function (options) {
	return function () {
		function setLevel(a, level) {
			level = level || 1;

			for ( var i = 0; i < a.length; i++ ) {
				a[i].level = level;
				if ( a[i].allows ) {
					setLevel(a[i].allows, level+1);
				}
			}
		}

		setLevel(options);

		return {
			options: options,
		};
	};
});
