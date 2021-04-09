/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		Solo leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*/

// Sequence Settings
var sequence = [
	"den", "bloodraven", "tristam", "countess", "jail", "smith", "pits", "andariel", "cows", // Act 1
	"radament", "cube", "amulet", "summoner", "beetleburst", "staff", "ancienttunnels", "tombs", "duriel", // Act 2
	"eye", "heart", "lamessen", "brain", "lowerkurast", "travincal", "mephisto", // Act 3
	"izual", "hellforge", "diablo", //Act 4
	"shenk", "savebarby", "anya", "pindle", "ancients", "baal", // Act 5
];

//---------------- Do Not Touch Below ----------------\\

if (!isIncluded("SoloLeveling/Functions/globals.js")) {
	include("SoloLeveling/Functions/globals.js");
}

if (!isIncluded("SoloLeveling/Tools/Developer.js")) {
	include("SoloLeveling/Tools/Developer.js");
}

if (!isIncluded("SoloLeveling/Tools/Tracker.js")) {
	include("SoloLeveling/Tools/Tracker.js");
}

SetUp.include();

function SoloLeveling () {
	if (Developer.logPerformance) {
		addEventListener("scriptmsg", Tracker.logLeveling);
	}

	this.setup = function () {
		print('ÿc9SoloLevelingÿc0: start run');
		me.overhead('starting run');
		print("ÿc9SoloLevelingÿc0: quest items loaded to Pickit");
		NTIP.arrayLooping(nipItems.Quest);
		print("ÿc9SoloLevelingÿc0: general items loaded to Pickit");
		NTIP.arrayLooping(nipItems.General);
		print("ÿc9SoloLevelingÿc0: valuable items to sell loaded to Pickit");
		NTIP.arrayLooping(nipItems.Selling);

		if (me.charlvl === 1) {
			let buckler = me.getItem(328);

			if (buckler) {
				if (buckler.location === 1) {
					buckler.drop();
				}
			}
		}

		if (me.hp / me.hpmax < 1) {
			Town.heal();
			me.cancel();
		}

		return true;
	};

	this.runsequence = function () {
		let j, k;

		for (k = 0; k < sequence.length; k += 1) {
			if (DataFile.updateStats("setDifficulty", Check.nextDifficulty())) {
				D2Bot.setProfile(null, null, null, Check.nextDifficulty());
			}

			if (!Check.Task(sequence[k])) {
				if (!isIncluded("SoloLeveling/Scripts/" + sequence[k] + ".js")) {
					include("SoloLeveling/Scripts/" + sequence[k] + ".js");
				}

				let tick = getTickCount();

				for (j = 0; j < 5; j += 1) {
					if (this[sequence[k]]()) {
						if (Developer.logPerformance) {
							Tracker.CurrScript = sequence[k];
							Tracker.Script(tick, Tracker.CurrScript);
						}

						break;
					}
				}

				if (j === 5) {
					me.overhead("sequence " + sequence[k] + " failed.");
				}
			}
		}
	};

	// Start Running Script
	this.setup();
	addEventListener("gamepacket", Misc.gamePacket);
	this.runsequence();
	removeEventListener("gamepacket", Misc.gamePacket);

	if (Developer.logPerformance) {
		removeEventListener("scriptmsg", Tracker.logLeveling);
	}

	scriptBroadcast('quit');

	return true;
}
