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

		compile();

		return game;

		function compile() {
			var scripts = [],
				things = {
					roles: {
						res: [],
						spy: [],
					},
					tokens: [],
					decks: {},
					rules: [],
					other: [],
				};

			checkDependencies();
			checkRequirements();

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
					} else if ( thing.type === "script" ) {
						scripts.push(thing);
					}
				}
			});

			things.script = parseScript(scripts);

			game.things = clean(things);
		}

		function clean(things) {
			var resistance, spies = 2;

			if (game.playerCount >= 10) {
				spies = 4;
			} else if (game.playerCount >= 7) {
				spies = 3;
			}

			resistance = game.playerCount - spies;

			things.roles.res = normalize(things.roles.res, "Blank", resistance);
			things.roles.spy = normalize(things.roles.spy, "Blank", spies);

			return things;
		}

		function normalize(a, name, count) {
			a.sort();

			if (a.length > count) {
				console.log("Warning! Too many of something!");
			}

			while ( a.length < count ) {
				// Pad the array out with the supplied generic value so it's the last thing in there after sorting
				a.push(name);
			}

			var index = 0, qty;

			while ( index < a.length ) {
				// Condense duplicates
				qty = 1;

				while ( a[index] === a[index+1] ) {
					// Duplicate found! Increment qty and remove it!
					qty++;
					a.splice(index+1, 1);
				}

				if ( qty > 1 ) {
					a[index] = qty + "x " + a[index];
				}

				index++;
			}

			return a;
		}

		function checkConditions(thing) {
			var conditions = thing.conditions,
				hasAny,
				minCount,
				maxCount;

			if ( !conditions ) {
				return true;
			}

			hasAny = conditions.hasAny;
			minCount = conditions.playerCountAtLeast;
			maxCount = conditions.playerCountAtMost;

			if ( minCount && ( game.playerCount < minCount ) ) {
				return false;
			}

			if ( maxCount && ( game.playerCount > maxCount ) ) {
				return false;
			}

			if ( hasAny && !checkHasAny(hasAny) ) {
				return false;
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

		function checkRequirements() {
			// Check top-level options to see if they're required for this setup
			for ( var i = 0; i < options.tree.length; i++ ) {
				var option = options.tree[i];

				if ( !option.required_if ) {
					continue;
				}

				// Remove required_if ones first and then re-check
				game.options[option.name] = false;

				var hasAny = option.required_if.hasAny;

				if ( hasAny && checkHasAny(hasAny) ) {
					// We need this, so add it
					game.options[option.name] = true;
				}
			}
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

		function checkHasAny(tags) {
			for ( var i = 0; i < tags.length; i++ ) {
				if ( has(tags[i]) ) {
					return true;
				}
			}

			return false;
		}

		function parseScript(scripts) {
			var i, current,
				script = {
					spies: {
						open: [ "Spies" ],
					},
					order: []
				};

			for ( i = 0; i < scripts.length; i++ ) {
				current = scripts[i];

				script[current.phase] = script[current.phase] || {};
				script[current.phase][current.subphase] = script[current.phase][current.subphase] || [];
				script[current.phase][current.subphase].push(current.name);
			}

			if ( script.spies ) {
				script.order.push("spies");
			}

			if ( script.bodyguard ) {
				script.order.push("bodyguard");
			}

			if ( script.defector ) {
				script.order.push("defector");
			}

			if ( script.commander ) {
				script.order.push("chiefs");
			}

			if ( script.commander ) {
				script.order.push("commander");
			}

			return script;
		}
	}];
});
