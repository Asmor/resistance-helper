"use strict";

define([ "data/en", "data/it", "data/en-avalon" ], function (en, it, enAvalon) {
	return ["$translateProvider", function ($translateProvider) {
		$translateProvider
			.translations('en', en)
			.translations('it', it)
			.translations('enAvalon', enAvalon)
			.preferredLanguage('en')
			.fallbackLanguage('en')
		;
	}];
});