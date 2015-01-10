"use strict";

define([ "data/en", "data/en-avalon" ], function (en, enAvalon) {
	return ["$translateProvider", function ($translateProvider) {
		$translateProvider
			.translations('en', en)
			.translations('enAvalon', enAvalon)
			.preferredLanguage('en')
			.fallbackLanguage('en')
		;
	}];
});