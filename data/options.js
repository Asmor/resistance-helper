"use strict";

define([], [
	{
		name: "Assassin Module",
		tags: [ "scenario", "named roles" ],
		exclusive: [ "assassin", "scenario" ],
		includes: [
			{ type: "role", side: "res", name: "Commander" },
			{ type: "role", side: "spy", name: "Assassin" },
			{ type: "script", phase: "commander", subphase: "raise", name: "Spies" },
			{ type: "script", phase: "commander", subphase: "open", name: "Commander" },
		], allows: [
			{ name: "Blind Spy", includes: [
				{ type: "role", side: "spy", name: "Blind Spy" },
				{ type: "script", phase: "spies", subphase: "noOpen", name: "Blind Spy" },
			]},
			{ name: "Deep Cover", includes: [
				{ type: "role", side: "spy", name: "Deep Cover" },
				{ type: "script", phase: "commander", subphase: "noRaise", name: "Deep Cover" },
			]},
			{ name: "Body Guard", includes: [
				{ type: "role", side: "res", name: "Body Guard" },
				{ type: "script", phase: "bodyguard", subphase: "raise", name: "Commander" },
				{ type: "script", phase: "bodyguard", subphase: "open", name: "Body Guard" },
			], allows: [
				{ name: "False Commander", includes: [
					{ type: "role", side: "spy", name: "False Commander" },
					{ type: "script", phase: "bodyguard", subphase: "raise", name: "False Commander" },
				]}
			]},
		],
	},
	{
		name: "Hunter Module",
		tags: [ "scenario", "named roles" ],
		exclusive: [ "scenario" ],
		includes: [
			{ type: "token", name: "Investigation token" },
			{ type: "card", deck: "Hunter Loyalty Cards", name: "Not a Chief" },
			{ type: "card", deck: "Hunter Loyalty Cards", name: "Chief", conditions: { playerCountAtMost: 6 } },
			{ type: "card", deck: "Hunter Loyalty Cards", name: "Resistance Chief", conditions: { playerCountAtLeast: 7 } },
			{ type: "card", deck: "Hunter Loyalty Cards", name: "Spy Chief", conditions: { playerCountAtLeast: 7 } },
			{ type: "card", deck: "Extra Mission Cards", name: "Chief Fail" },
			{ type: "role", side: "res", name: "Chief" },
			{ type: "role", side: "res", name: "Hunter" },
			{ type: "role", side: "spy", name: "Chief" },
			{ type: "role", side: "spy", name: "Hunter" },
			{ type: "role", side: "res", name: "Chief", conditions: { playerCountAtLeast: 8 } },
			{ type: "role", side: "spy", name: "Chief", conditions: { playerCountAtLeast: 10 } },
			{ type: "script", phase: "spies", subphase: "raise", name: "Spy Chiefs" },
			{ type: "script", phase: "chiefs", subphase: "open", name: "Resistance Chiefs" },
		], allows: [
			{ name: "Dummy Agent", includes: [
				{ type: "role", side: "res", name: "Dummy Agent" },
			]},
			{ name: "Coordinator", includes: [
				{ type: "role", side: "res", name: "Coordinator" },
				{ type: "script", phase: "chiefs", subphase: "raise", name: "Coordinator" },
			]},
			{ name: "Deep Agent", includes: [
				{ type: "role", side: "spy", name: "Deep Agent" },
				{ type: "script", phase: "spies", subphase: "raise", name: "Deep Agent" },
				{ type: "script", phase: "spies", subphase: "noOpen", name: "Deep Agent" },
			], allows: [
				{ name: "Pretender", includes: [
					{ type: "role", side: "res", name: "Pretender" },
					{ type: "script", phase: "spies", subphase: "raise", name: "Pretender" },
				], allows: [
					{ name: "Blame", includes: [
						{ type: "rule", name: "Blame" },
					]},
				]},
			]},
		]
	},
	{
		name: "Defector role cards",
		hidden: true,
		required_if: { hasAny: [ "defector" ] },
		includes: [
			{ type: "role", side: "res", name: "Defector" },
			{ type: "role", side: "spy", name: "Defector" },
		],
	},
	{
		name: "Defectors know each other",
		tags: [ "defector", "named roles" ],
		includes: [
			{ type: "rule", name: "Defectors know each other" },
			{ type: "script", phase: "defector", subphase: "open", name: "Defectors" },
		],
	},
	{
		name: "Defectors switch roles",
		tags: [ "defector", "named roles" ],
		includes: [
			{ type: "other", name: "Defector Switch Cards" },
			{ type: "script", phase: "spies", subphase: "raise", name: "Spy Defector" },
			{ type: "script", phase: "spies", subphase: "noOpen", name: "Spy Defector" },
		],
	},
	{
		name: "Inquisitor",
		includes: [
			{ type: "token", name: "Inquisitor token" },
			{ type: "card", deck: "Inquisitor Loyalty Cards", name: "Spy", conditions: { hasAny: [ "named roles" ] } },
			{ type: "card", deck: "Inquisitor Loyalty Cards", name: "Resistance", conditions: { hasAny: [ "named roles" ] } },
		],
	},
	{
		name: "The Plot Thickens",
		includes: [
			{ type: "other", name: "Plot deck" },
		],
	},
	{
		name: "Reverser Mission Cards",
		hidden: true,
		required_if: { hasAny: [ "reverser" ] },
		includes: [
			{ type: "card", deck: "Extra Mission Cards", name: "Reverse" },
		],
	},
	{
		name: "Reverser (Resistance)",
		tags: [ "reverser", "named roles" ],
		includes: [
			{ type: "role", side: "res", name: "Reverser" },
		],
	},
	{
		name: "Reverser (Spy)",
		tags: [ "reverser", "named roles" ],
		includes: [
			{ type: "role", side: "spy", name: "Reverser" },
		],
	},
	{
		name: "Rogue (Resistance)",
		tags: [ "rogue agent", "named roles" ],
		includes: [
			{ type: "role", side: "res", name: "Rogue" },
			{ type: "token", name: "Watch token" },
			{ type: "card", deck: "Extra Mission Cards", name: "Rogue Success" },
		],
	},
	{
		name: "Rogue (Spy)",
		tags: [ "rogue agent", "named roles" ],
		includes: [
			{ type: "role", side: "spy", name: "Rogue" },
			{ type: "script", phase: "spies", subphase: "noOpen", name: "Rogue" },
			{ type: "script", phase: "commander", subphase: "noRaise", name: "Rogue", condition: { hasAny: [ "assassin" ] } },
		],
	},
	{
		name: "Sergeant",
		includes: [
			{ type: "token", name: "Sergeant token" },
		],
	},
	{
		name: "Trapper",
		includes: [
			{ type: "other", name: "Additional set of mission cards" },
		],
	},
]);
