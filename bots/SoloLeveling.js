/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		Solo leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*/

// Sequence Settings
var sequence = [
	"den", "bloodraven", "tristam", "countess", "pits", "andariel", // Act 1
	"radament", "cube", "amulet", "summoner", "staff", "ancienttunnels", "tombs", "duriel", // Act 2
	"eye", "heart", "tome", "brain", "lowerkurast", "travincal", "mephisto", // Act 3
	"izual", "hellforge", "diablo", //Act 4
	"shenk", "saveBarby", "anya", "pindle", "ancients", "baal" // Act 5
];

//---------------- Do Not Touch Below ----------------\\

if (!isIncluded("common/Attack.js")) {
	include("common/Attack.js");
}

if (!isIncluded("SoloLeveling/Functions/AttackOverrides.js")) {
	include("SoloLeveling/Functions/AttackOverrides.js");
}

if (!isIncluded("common/Town.js")) {
	include("common/Town.js");
}

if (!isIncluded("SoloLeveling/Functions/TownOverrides.js")) {
	include("SoloLeveling/Functions/TownOverrides.js");
}

if (!isIncluded("common/Pather.js")) {
	include("common/Pather.js");
}

if (!isIncluded("SoloLeveling/Functions/PatherOverrides.js")) {
	include("SoloLeveling/Functions/PatherOverrides.js");
}

if (!isIncluded("common/Misc.js")) {
	include("common/Misc.js");
}

if (!isIncluded("SoloLeveling/Functions/MiscOverrides.js")) {
	include("SoloLeveling/Functions/MiscOverrides.js");
}

if (!isIncluded("NTItemParser.dbl")) {
	include("NTItemParser.dbl");
}

if (!isIncluded("SoloLeveling/Functions/NTIPOverrides.js")) {
	include("SoloLeveling/Functions/NTIPOverrides.js");
}

if (!isIncluded("SoloLeveling/Functions/Globals.js")) {
	include("SoloLeveling/Functions/Globals.js");
}

if (!isIncluded("SoloLeveling/Functions/Quest.js")) {
	include("SoloLeveling/Functions/Quest.js");
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

		if (me.charlvl === 1) {
			let buckler = me.getItem(328);

			if (buckler) {
				if (buckler.location === 1) {
					buckler.drop();
				}
			}
		}

		return true;
	};

	this.runsequence = function () {
		let j, k;

		for (k = 0; k < sequence.length; k += 1) {
			if (!isIncluded("SoloLeveling/Scripts/" + sequence[k] + ".js")) {
				include("SoloLeveling/Scripts/" + sequence[k] + ".js");
			}

			for (j = 0; j < 5; j += 1) {
				if (this[sequence[k]]()) {
					break;
				}
			}

			if (j === 5) {
				me.overhead("sequence " + sequence[k] + " failed.");
			}
		}
	};

	// Start Running Script
	this.setup();
	addEventListener("gamepacket", Misc.gamePacket);
	this.runsequence();
	removeEventListener("gamepacket", Misc.gamePacket);

	if (Misc.checkQuest(40, 0) || me.gametype === 0 && Misc.checkQuest(26, 0)) {
		D2Bot.printToConsole('SoloLeveling: ' + difficulty + ' difficulty completed. Character Level: ' + me.charlvl + '. Running script again!');
	} else {
		D2Bot.printToConsole('SoloLeveling: run completed. Character Level: ' + me.charlvl + '. Running script again!');
	}

	scriptBroadcast('quit');

	return true;
}
