"use strict";

define([], [
	{ name: "Assassin Module", includes: [
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
			{ type: "role", side: "res", name: "Bodyguard" },
		], allows: [
			{ name: "False Commander", includes: [
				{ type: "role", side: "spy", name: "False Commander" },
			]}
		]},
	]},
	{ name: "Hunter Module", includes: [
		{ type: "token", name: "Investigation token" },
		{ type: "card", deck: "Loyalty Cards", name: "Not a Chief" },
		{ type: "card", deck: "Loyalty Cards", name: "Chief", condition: { playerCountAtMost: 6 } },
		{ type: "card", deck: "Loyalty Cards", name: "Resistance Chief", condition: { playerCountAtLeast: 7 } },
		{ type: "card", deck: "Loyalty Cards", name: "Spy Chief", condition: { playerCountAtLeast: 7 } },
		{ type: "card", deck: "Mission Cards", name: "Chief Fail" },
		{ type: "role", side: "res", name: "Resistance Chief" },
		{ type: "role", side: "res", name: "Resistance Hunter" },
		{ type: "role", side: "spy", name: "Spy Chief" },
		{ type: "role", side: "spy", name: "Spy Hunter" },
		{ type: "role", side: "res", name: "Resistance Chief", condition: { playerCountAtLeast: 8 } },
		{ type: "role", side: "spy", name: "Spy Chief", condition: { playerCountAtLeast: 10 } },
	], allows: [
		{ name: "Resistance Dummy Agent", includes: [
			{ type: "role", side: "res", name: "Resistance Dummy Agent" },
		]},
		{ name: "Resistance Coordinator", includes: [
			{ type: "role", side: "res", name: "Resistance Coordinator" },
		]},
		{ name: "Spy Deep Agent", includes: [
			{ type: "role", side: "spy", name: "Spy Deep Agent" },
		], allows: [
			{ name: "Resistance Pretender", includes: [
				{ type: "role", side: "res", name: "Resistance Pretender" },
			], allows: [
				{ type: "rule", name: "Blame" },
			]},
		]},
	]},
]);
// 	Defector Module
// 		Resistance Defector
// 		Spy Defector
// 		Other Materials:
// 			5 Defector loyalty cards
// 	Trapper Module
// 		Other Materials:
// 			Extra mission set
// 	Inquisitor Module
// 		Other Materials:
// 			Inquisitor token
// 			If using Assassin, Hunter, Reverser, or Rogue Agent modules:
// 				Inquisitor Loyalty cards
// 	Reverser Module
// 		At least one of:
// 			Resistance Reverser
// 			Spy Reverser
// 		Other Materials:
// 			Reverse cards
// 	Rogue Agent Module
// 		At least one of:
// 			Resistance Rogue
// 			Spy Rogue

// ]);