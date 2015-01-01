"use strict";

define([], ["game", function (game) {
	return {
		restrict: "E",
		scope: {},
		templateUrl: "modules/resScript/resScript.html",
		link: function (scope) {
			scope.getScript = function () {
				var phases = [], i, phase, a;

				for ( i = 0; i < game.things.script.order.length; i++ ) {
					phase = game.things.script[game.things.script.order[i]];
					a = [];

					if ( !phase.open ) {
						// All phases are for giving information to people... if nobody is opening
						// their, no reason to do this phase
						continue;
					}

					if ( phase.raise ) {
						a.push( smartConcat(phase.raise) );

						if ( phase.noRaise ) {
							a.push(", except " + smartConcat(phase.noRaise) );
						}

						a.push(", raise your thumbs. ");
					}

					a.push( smartConcat(phase.open) );

					if ( phase.noOpen ) {
						a.push(", except " + smartConcat(phase.noOpen) );
					}

					a.push(", open your eyes. ");

					a.push("Everyone close your eyes and lower your thumbs.");
					phases.push(a.join(""));
				}

				phases.push("Everyone open your eyes!");

				return phases;
			};

			scope.canSpeak = ( "speechSynthesis" in window );

			scope.speakScript = function () {
				if ( !scope.canSpeak ) {
					return;
				}

				var script = scope.getScript().join(" ");
				console.log(script);

				var msg = new window.SpeechSynthesisUtterance(script);
				window.speechSynthesis.speak(msg);
			};

			function smartConcat(a) {
				if ( a.length <= 2 ) {
					return a.join(" and ");
				} else {
					return a.slice(0, a.length - 1).join(", ") + ", and " + a[a.length - 1];
				}
			}
		}
	};
}]);
