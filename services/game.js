"use strict";

define(function () {
	return ["options", function (options) {
		var game = {
			options: {},
			toggle: function (option) {
				game.options[option] = !game.options[option];
				compile();
			},
			playerCount: 7,
			setCount: function (howMany) {
				game.playerCount = howMany;
				compile();
			}
		};

		return game;

		function compile() {
			var things = {
				roles: {
					res: [],
					spy: [],
				},
				tokens: [],
				decks: {},
				rules: [],
				other: []
			};

			checkDependencies();

			Object.keys(game.options).forEach(function (optionName) {
				var option = options.byName[optionName],
					i, thing;

				if ( !game.options[optionName] ) {
					// If this module isn't true, bail out
					return;
				}

				for ( i = 0; i < option.includes.length; i++ ) {
					// Add all the things this option includes
					thing = option.includes[i];

					if ( !checkConditions(thing) ) {
						continue;
					}

					if ( thing.type === "role" ) {
						things.roles[thing.side].push(thing.name);
					} else if ( thing.type === "card" ) {
						if ( ! things.decks[thing.deck] ) {
							things.decks[thing.deck] = [];
						}
						things.decks[thing.deck].push(thing.name);
					} else if ( thing.type === "rule" ) {
						things.rules.push(thing.name);
					} else if ( thing.type === "token" ) {
						things.tokens.push(thing.name);
					} else if ( thing.type === "other" ) {
						things.other.push(thing.name);
					} else {
						console.log(thing.type);
					}
				}

				window.things = things;
			});
		}

		function checkConditions(thing) {
			var conditions = thing.conditions,
				has_any,
				minCount,
				maxCount,
				tagFound,
				i;

			if ( !conditions ) {
				return true;
			}

			has_any = conditions.has_any;
			minCount = conditions.playerCountAtLeast;
			maxCount = conditions.playerCountAtMost;

			if ( minCount && ( game.playerCount < minCount ) ) {
				return false;
			}

			if ( maxCount && ( game.playerCount > maxCount ) ) {
				return false;
			}

			if ( has_any ) {
				for ( i = 0; i < has_any.length; i++ ) {
					if ( has(has_any[i]) ) {
						tagFound = true;
						break;
					}
				}

				if ( ! tagFound ) {
					return false;
				}
			}

			return true;
		}

		// Removes options which depend on options that aren't selected
		function checkDependencies() {
			Object.keys(game.options).forEach(function (optionName) {
				var option = options.byName[optionName],
					requires = option.requires;

				if ( requires && !game.options[requires] ) {
					// If we don't have the option this one depends on, remove it
					game.options[option.name] = false;
				}
			});
		}

		function has(tag, ignore) {
			var found = false;

			Object.keys(game.options).forEach(function (optionName) {
				if ( ! game.options[optionName] || optionName === ignore ) {
					return;
				}

				var option = options.byName[optionName];

				if ( ! option.tags ) {
					return;
				}

				found = found || option.tags.join().indexOf(tag) !== -1;
			});

			return found;
		}
	}];
});
