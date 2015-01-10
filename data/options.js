"use strict";

define([], [
	{
		name: "OPTION_ASSASSIN",
		tags: [ "scenario", "named roles" ],
		exclusive: [ "assassin", "scenario" ],
		includes: [
			{ type: "role", side: "res", name: "ROLE_COMMANDER" },
			{ type: "role", side: "spy", name: "ROLE_ASSASSIN" },
			{ type: "script", phase: "commander", subphase: "raise", name: "TEAM_SPY_PLURAL" },
			{ type: "script", phase: "commander", subphase: "open", name: "ROLE_COMMANDER" },
		], allows: [
			{ name: "ROLE_BLIND_SPY", includes: [
				{ type: "role", side: "spy", name: "ROLE_BLIND_SPY" },
				{ type: "script", phase: "spies", subphase: "noOpen", name: "ROLE_BLIND_SPY" },
			]},
			{ name: "ROLE_DEEP_COVER", includes: [
				{ type: "role", side: "spy", name: "ROLE_DEEP_COVER" },
				{ type: "script", phase: "commander", subphase: "noRaise", name: "ROLE_DEEP_COVER" },
			]},
			{ name: "ROLE_BODY_GUARD", includes: [
				{ type: "role", side: "res", name: "ROLE_BODY_GUARD" },
				{ type: "script", phase: "bodyguard", subphase: "raise", name: "ROLE_COMMANDER" },
				{ type: "script", phase: "bodyguard", subphase: "open", name: "ROLE_BODY_GUARD" },
			], allows: [
				{ name: "ROLE_FALSE_COMMANDER", includes: [
					{ type: "role", side: "spy", name: "ROLE_FALSE_COMMANDER" },
					{ type: "script", phase: "bodyguard", subphase: "raise", name: "ROLE_FALSE_COMMANDER" },
				]}
			]},
		],
	},
	{
		name: "OPTION_HUNTER",
		tags: [ "scenario", "named roles" ],
		exclusive: [ "scenario" ],
		includes: [
			{ type: "token", name: "OTHER_INVESTIGATION_TOKEN" },
			{ type: "card", deck: "OTHER_HUNTER_LOYALTY_CARDS", name: "OTHER_NOT_A_CHIEF" },
			{ type: "card", deck: "OTHER_HUNTER_LOYALTY_CARDS", name: "OTHER_CHIEF", conditions: { playerCountAtMost: 6 } },
			{ type: "card", deck: "OTHER_HUNTER_LOYALTY_CARDS", name: "OTHER_RESISTANCE_CHIEF", conditions: { playerCountAtLeast: 7 } },
			{ type: "card", deck: "OTHER_HUNTER_LOYALTY_CARDS", name: "OTHER_SPY_CHIEF", conditions: { playerCountAtLeast: 7 } },
			{ type: "card", deck: "OTHER_EXTRA_MISSION_CARDS", name: "OTHER_CHIEF_FAIL" },
			{ type: "role", side: "res", name: "ROLE_CHIEF" },
			{ type: "role", side: "res", name: "ROLE_HUNTER" },
			{ type: "role", side: "spy", name: "ROLE_CHIEF" },
			{ type: "role", side: "spy", name: "ROLE_HUNTER" },
			{ type: "role", side: "res", name: "ROLE_CHIEF", conditions: { playerCountAtLeast: 8 } },
			{ type: "role", side: "spy", name: "ROLE_CHIEF", conditions: { playerCountAtLeast: 10 } },
			{ type: "script", phase: "spies", subphase: "raise", name: "OTHER_SPY_CHIEFS" },
			{ type: "script", phase: "chiefs", subphase: "open", name: "OTHER_RESISTANCE_CHIEFS" },
		], allows: [
			{ name: "ROLE_DUMMY_AGENT", includes: [
				{ type: "role", side: "res", name: "ROLE_DUMMY_AGENT" },
			]},
			{ name: "ROLE_COORDINATOR", includes: [
				{ type: "role", side: "res", name: "ROLE_COORDINATOR" },
				{ type: "script", phase: "chiefs", subphase: "raise", name: "ROLE_COORDINATOR" },
			]},
			{ name: "ROLE_DEEP_AGENT", includes: [
				{ type: "role", side: "spy", name: "ROLE_DEEP_AGENT" },
				{ type: "script", phase: "spies", subphase: "raise", name: "ROLE_DEEP_AGENT" },
				{ type: "script", phase: "spies", subphase: "noOpen", name: "ROLE_DEEP_AGENT" },
			], allows: [
				{ name: "ROLE_PRETENDER", includes: [
					{ type: "role", side: "res", name: "ROLE_PRETENDER" },
					{ type: "script", phase: "spies", subphase: "raise", name: "ROLE_PRETENDER" },
				], allows: [
					{ name: "OTHER_BLAME", includes: [
						{ type: "rule", name: "OTHER_BLAME" },
					]},
				]},
			]},
		]
	},
	{
		name: "OTHER_DEFECTOR_ROLE_CARDS",
		hidden: true,
		required_if: { hasAny: [ "defector" ] },
		includes: [
			{ type: "role", side: "res", name: "ROLE_DEFECTOR" },
			{ type: "role", side: "spy", name: "ROLE_DEFECTOR" },
		],
	},
	{
		name: "OTHER_DEFECTORS_KNOW_EACH_OTHER",
		tags: [ "defector", "named roles" ],
		includes: [
			{ type: "rule", name: "OTHER_DEFECTORS_KNOW_EACH_OTHER" },
			{ type: "script", phase: "defector", subphase: "open", name: "ROLE_DEFECTOR_PLURAL" },
		],
	},
	{
		name: "OTHER_DEFECTORS_SWITCH_ROLES",
		tags: [ "defector", "named roles" ],
		includes: [
			{ type: "other", name: "OTHER_DEFECTORS_SWITCH_ROLES" },
			{ type: "script", phase: "spies", subphase: "raise", name: "ROLE_DEFECTOR_SPY" },
			{ type: "script", phase: "spies", subphase: "noOpen", name: "ROLE_DEFECTOR_SPY" },
		],
	},
	{
		name: "OTHER_INQUISITOR",
		includes: [
			{ type: "token", name: "OTHER_INQUISITOR_TOKEN" },
			{ type: "card", deck: "OTHER_INQUISITOR_LOYALTY_CARDS", name: "TEAM_SPY", conditions: { hasAny: [ "named roles" ] } },
			{ type: "card", deck: "OTHER_INQUISITOR_LOYALTY_CARDS", name: "TEAM_RESISTANCE", conditions: { hasAny: [ "named roles" ] } },
		],
	},
	{
		name: "OTHER_THE_PLOT_THICKENS",
		includes: [
			{ type: "other", name: "OTHER_PLOT_DECK" },
		],
	},
	{
		name: "OTHER_REVERSER_MISSION_CARDS",
		hidden: true,
		required_if: { hasAny: [ "reverser" ] },
		includes: [
			{ type: "card", deck: "OTHER_EXTRA_MISSION_CARDS", name: "OTHER_REVERSE" },
		],
	},
	{
		name: "OTHER_REVERSER_RESISTANCE",
		tags: [ "reverser", "named roles" ],
		includes: [
			{ type: "role", side: "res", name: "ROLE_REVERSER" },
		],
	},
	{
		name: "OTHER_REVERSER_SPY",
		tags: [ "reverser", "named roles" ],
		includes: [
			{ type: "role", side: "spy", name: "ROLE_REVERSER" },
		],
	},
	{
		name: "OTHER_ROGUE_RESISTANCE",
		tags: [ "rogue agent", "named roles" ],
		includes: [
			{ type: "role", side: "res", name: "ROLE_ROGUE" },
			{ type: "token", name: "OTHER_WATCH_TOKEN" },
			{ type: "card", deck: "OTHER_EXTRA_MISSION_CARDS", name: "OTHER_ROGUE_SUCCESS" },
		],
	},
	{
		name: "OTHER_ROGUE_SPY",
		tags: [ "rogue agent", "named roles" ],
		includes: [
			{ type: "role", side: "spy", name: "ROLE_ROGUE" },
			{ type: "script", phase: "spies", subphase: "noOpen", name: "ROLE_ROGUE" },
			{ type: "script", phase: "commander", subphase: "noRaise", name: "ROLE_ROGUE", condition: { hasAny: [ "assassin" ] } },
		],
	},
	{
		name: "OTHER_SERGEANT",
		includes: [
			{ type: "token", name: "OTHER_SERGEANT_TOKEN" },
		],
	},
	{
		name: "OTHER_TRAPPER",
		includes: [
			{ type: "other", name: "OTHER_ADDITIONAL_SET" },
		],
	},
]);
