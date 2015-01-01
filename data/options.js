"use strict";

define([], [
	{
		name: "Assassin Module",
		tags: [ "scenario", "named role" ],
		exclusive: [ "scenario" ],
		includes: [
			{ type: "role", side: "res", name: "Commander" },
			{ type: "role", side: "spy", name: "Assassin" },
		], allows: [
			{ name: "Blind Spy", includes: [
				{ type: "role", side: "spy", name: "Blind Spy" },
			]},
			{ name: "Deep Cover", includes: [
				{ type: "role", side: "spy", name: "Deep Cover" },
			]},
			{ name: "Bodyguard", includes: [
				{ type: "role", side: "res", name: "Body Guard" },
			], allows: [
				{ name: "False Commander", includes: [
					{ type: "role", side: "spy", name: "False Commander" },
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
			{ type: "card", deck: "Loyalty Cards", name: "Not a Chief" },
			{ type: "card", deck: "Loyalty Cards", name: "Chief", condition: { playerCountAtMost: 6 } },
			{ type: "card", deck: "Loyalty Cards", name: "Resistance Chief", condition: { playerCountAtLeast: 7 } },
			{ type: "card", deck: "Loyalty Cards", name: "Spy Chief", condition: { playerCountAtLeast: 7 } },
			{ type: "card", deck: "Mission Cards", name: "Chief Fail" },
			{ type: "role", side: "res", name: "Chief" },
			{ type: "role", side: "res", name: "Hunter" },
			{ type: "role", side: "spy", name: "Chief" },
			{ type: "role", side: "spy", name: "Hunter" },
			{ type: "role", side: "res", name: "Chief", condition: { playerCountAtLeast: 8 } },
			{ type: "role", side: "spy", name: "Chief", condition: { playerCountAtLeast: 10 } },
		], allows: [
			{ name: "Dummy Agent", includes: [
				{ type: "role", side: "res", name: "Dummy Agent" },
			]},
			{ name: "Coordinator", includes: [
				{ type: "role", side: "res", name: "Coordinator" },
			]},
			{ name: "Deep Agent", includes: [
				{ type: "role", side: "spy", name: "Deep Agent" },
			], allows: [
				{ name: "Pretender", includes: [
					{ type: "role", side: "res", name: "Pretender" },
				], allows: [
					{ name: "Blame", includes: [
						{ type: "rule", name: "Blame" },
					]},
				]},
			]},
		]
	},
	{
		name: "Defector Module",
		tags: [ "named role" ],
		includes: [
			{ type: "other", name: "Defector Loyalty Cards" },
			{ type: "role", side: "res", name: "Defector" },
			{ type: "role", side: "spy", name: "Defector" },
		],
	},
	{
		name: "Trapper Module",
		includes: [
			{ type: "other", name: "Additional set of mission cards" },
		],
	},
	{
		name: "Inquisitor Module",
		includes: [
			{ type: "token", name: "Inquisitor token" },
			{ type: "card", deck: "Loyalty Cards", name: "Spy", condition: { has_any: [ "named role" ] } },
			{ type: "card", deck: "Loyalty Cards", name: "Resistance", condition: { has_any: [ "named role" ] } },
		],
	},
	{
		name: "Reverser Mission Cards",
		hidden: true,
		required_if: { has_any: [ "reverser" ] },
		includes: [
			{ type: "card", deck: "Mission Cards", name: "Reverse" },
		],
	},
	{
		name: "Resistance Reverser",
		tags: [ "reverser", "named role" ],
		includes: [
			{ type: "role", side: "res", name: "Reverser" },
		],
	},
	{
		name: "Spy Reverser",
		tags: [ "reverser", "named role" ],
		includes: [
			{ type: "role", side: "spy", name: "Reverser" },
		],
	},
	{
		name: "Resistance Rogue Agent",
		tags: [ "rogue agent", "named role" ],
		includes: [
			{ type: "role", side: "res", name: "Rogue" },
			{ type: "token", name: "Watch token" },
			{ type: "card", deck: "Mission Cards", name: "Rogue Success" },
		],
	},
	{
		name: "Spy Rogue Agent",
		tags: [ "rogue agent", "named role" ],
		includes: [
			{ type: "role", side: "spy", name: "Rogue" },
		],
	},
	{
		name: "The Plot Thickens",
		includes: [
			{ type: "other", name: "Plot deck" },
		],
	}
]);
