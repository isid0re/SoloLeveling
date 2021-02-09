/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		Solo leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*/

// Sequence Settings
var sequence = [
	["cows", 42], ["den", 1], ["bloodraven", 2], ["tristam", 4], ["countess", 5], ["pits", 6], ["andariel", 7], // Act 1
	["radament", 9], ["cube", 8], ["amulet", 11], ["summoner", 13], ["staff", 10], ["ancienttunnels", 12], ["tombs", 14], ["duriel", 15], // Act 2
	["eye", 16], ["heart", 18], ["tome", 17], ["brain", 20], ["lowerkurast", 21], ["travincal", 22], ["mephisto", 23], // Act 3
	["izual", 25], ["hellforge", 27], ["diablo", 26], //Act 4
	["shenk", 35], ["saveBarby", 36], ["anya", 37], ["pindle", 38], ["ancients", 39], ["baal", 40], // Act 5
];

//---------------- Do Not Touch Below ----------------\\

if (!isIncluded("SoloLeveling/Functions/globals.js")) { include("SoloLeveling/Functions/globals.js"); };
if (!isIncluded("SoloLeveling/Tools/Playtime.js")) { include("SoloLeveling/Tools/Playtime.js"); };
if (!isIncluded("SoloLeveling/Tools/Performance.js")) { include("SoloLeveling/Tools/Performance.js"); };

includeSoloLeveling();

if (!FileTools.exists("libs/SoloLeveling/Performance/" + me.profile + ".json") && shouldLog) {
	Performance.set();;
}

function SoloLeveling () {
	this.setup = function () {
		print('ÿc9SoloLevelingÿc0: start run');
		me.overhead('starting run');
		print("ÿc9SoloLevelingÿc0: quest items loaded to Pickit");
		NTIP.arrayLooping(questItems);
		print("ÿc9SoloLevelingÿc0: general items loaded to Pickit");
		NTIP.arrayLooping(generalItems);
		print("ÿc9SoloLevelingÿc0: valuable items to sell loaded to Pickit");
		NTIP.arrayLooping(valuableItems);
		Misc.setupMerc();

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
		let j, k,
			setDifficulty = nextDifficulty();

		for (k = 0; k < sequence.length; k += 1) {
			DataFile.updateStats("setDifficulty", setDifficulty);
			D2Bot.setProfile(null, null, null, setDifficulty);

			if (!completedTask(sequence[k][1])) {
				if (!isIncluded("SoloLeveling/Scripts/" + sequence[k][0] + ".js")) {
					include("SoloLeveling/Scripts/" + sequence[k][0] + ".js");
				}

				for (j = 0; j < 5; j += 1) {
					if (this[sequence[k][0]]()) {
						break;
					}
				}

				if (j === 5) {
					me.overhead("sequence " + sequence[k][0] + " failed.");
				}
			}
		}
	};

	// Start Running Script
	this.setup();
	addEventListener("gamepacket", Misc.gamePacket);
	this.runsequence();
	removeEventListener("gamepacket", Misc.gamePacket);
	scriptBroadcast('quit');

	return true;
}
