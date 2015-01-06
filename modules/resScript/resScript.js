"use strict";

define([], ["game", function (game) {
	return {
		restrict: "E",
		scope: {},
		templateUrl: "modules/resScript/resScript.html",
		link: function (scope) {
			var _sections, currentSpeechTimestamp;

			scope.getScript = function () {
				if ( ! game.dirty ) {
					return _sections;
				}

				var sections = [], lines, line, i, phase,
					raisePause = 2,
					openPause = 10,
					closePause = 1;

				sections.push([{
					text: "Everyone close your eyes and stick out your fists.",
					type: "start",
					pause: 3,
				}]);

				for ( i = 0; i < game.things.script.order.length; i++ ) {
					phase = game.things.script[game.things.script.order[i]];
					lines = [];

					if ( !phase.open ) {
						// All phases are for giving information to people... if nobody is opening
						// their, no reason to do this phase
						continue;
					}

					sections.push(lines);

					if ( phase.raise ) {
						line = smartConcat(phase.raise);

						if ( phase.noRaise ) {
							line += ", except " + smartConcat(phase.noRaise);
						}

						line += ", raise your thumbs. ";

						lines.push({
							text: line,
							type: "raise",
							pause: raisePause,
						});
					}

					line = smartConcat(phase.open);

					if ( phase.noOpen ) {
						line += ", except " + smartConcat(phase.noOpen);
					}

					line += ", open your eyes.";

					lines.push({
						text: line,
						type: "open",
						pause: openPause,
					});

					lines.push({
						text: "Everyone close your eyes and lower your thumbs.",
						type: "close",
						pause: closePause,
					});
				}

				sections.push([{
					text: "Everyone open your eyes!",
					type: "end",
					pause: 0,
				}]);

				// Only recompile this if the game has changed
				_sections = sections;
				game.dirty = false;

				return sections;
			};

			function smartConcat(a) {
				if ( a.length <= 2 ) {
					return a.join(" and ");
				} else {
					return a.slice(0, a.length - 1).join(", ") + ", and " + a[a.length - 1];
				}
			}

			scope.canSpeak = false;

			if ( "speechSynthesis" in window ) {
				speechSynthesis.addEventListener("voiceschanged", setVoice, false);
			}

			scope.voiceParams = {
				rate: 1,
			};

			scope.changeRate = function (amt) {
				scope.voiceParams.rate += amt;

				scope.voiceParams.rate = Math.round(Math.max(Math.min(scope.voiceParams.rate, 2), 0.2) * 10) / 10;
			};

			scope.speakScript = function () {
				if ( !scope.canSpeak ) {
					return;
				}

				if ( currentSpeechTimestamp ) {
					speechSynthesis.cancel();
					currentSpeechTimestamp = 0;
					return;
				}

				var script = scope.getScript(),
					flattened = [];

				flattened = flattened.concat.apply(flattened, script);
				currentSpeechTimestamp = new Date().getTime();

				speak(flattened, currentSpeechTimestamp);
			};

			function speak(lines, timestamp) {
				if ( !lines.length) {
					// We're done speaking. Set timestamp to 0 so button works on next press
					currentSpeechTimestamp = 0;
					return;
				}

				 if ( currentSpeechTimestamp !== timestamp ) {
					// We're done or we've been canceled
					return;
				}

				var line = lines.shift(),
					msg = new SpeechSynthesisUtterance(line.text);

				if ( scope.voiceParams.selectedVoice ) {
					// iOS doesn't seem to like setting selectedVoice to undefined, so make sure we
					// actually have a voice to use before explicitly setting it
					msg.voice = scope.voiceParams.selectedVoice;
				}

				msg.rate = scope.voiceParams.rate;

				// When we're done speaking, pause before speaking next line
				msg.addEventListener("end", function () {
					setTimeout(function () {
						speak(lines, timestamp);
					}, line.pause * 1000);
				}, false);

				speechSynthesis.speak(msg);
			}

			function setVoice() {
				scope.$apply(function () {
					var allVoices = speechSynthesis.getVoices(),
						voices = allVoices.filter(function (voice) {
							return voice.lang.match(/^en/);
						});

					if ( !voices.length ) {
						// iOS doesn't get any voices listed... I'm hoping it's just choking on the
						// language filter, so if we don't get any voices after filtering just use
						// all voices
						voices = allVoices;
					}

					if ( voices.length ) {
						scope.canSpeak = true;
					}

					scope.voiceParams.selectedVoice = voices.filter(function (voice) { return voice.default; })[0];

					scope.voices = voices;

					// console.table(voices);

					speechSynthesis.removeEventListener("voiceschanged", setVoice, false);
				});
			}
		}
	};
}]);
