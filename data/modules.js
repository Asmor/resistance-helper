"use strict";

define([], [
	{
		name: "Assassin Module",
		required: [
			{ side: "res", name: "Commander" },
			{ side: "spy", name: "Assassin" },
		],
		optional: [
			{ side: "spy", name: "Blind Spy" },
			{ side: "spy", name: "Deep Cover" },
			{ side: "res", name: "Bodyguard", allows: [
				{ side: "spy", name: "False Commander" },
			]},
		],
	},
	{
		name: "Hunter Module",
		required: [
			{ side: "res", name: "Resistance Chief" },
			{ side: "res", name: "Resistance Chief", condition: function (gameInfo) {
				return (gameInfo.players >= 8);
			}},
			{ side: "res", name: "Resistance Hunter" },
			{ side: "spy", name: "Spy Chief" },
			{ side: "spy", name: "Spy Chief", condition: function (gameInfo) {
				return (gameInfo.players >= 10);
			}},
			{ side: "spy", name: "Spy Hunter" },
		],
		optional: [
			{ side: "res", name: "Resistance Dummy Agent" },
			{ side: "res", name: "Resistance Coordinator" },
			{ side: "spy", name: "Spy Deep Agent", allows: [
				{ side: "res", name: "Resistance Pretender" },
			]},
		]
	}
]);
// 	Hunter Module
// 		Spy Chief (2 @ 10)
// 		Spy Hunter
// 		Rebel Chief (2 @ 8)
// 		Rebel Hunter
// 			Resistance Dummy Agent
// 			Resistance Coordinator
// 			Spy Deep Agent
// 				Resistance Pretender
// 					Blame
// 		Other Materials
// 			Investigation token
// 			Loyalty Cards:
// 				Not a Chief
// 				5-6:
// 					Chief
// 				7+:
// 					Rebel Chief
// 					Spy Chief
// 			Chief Fail cards
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