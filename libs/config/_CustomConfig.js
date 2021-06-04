/* Format:
	var CustomConfig = {
		"Config_Filename_Without_Extension": ["array", "of", "profiles"]

		Multiple entries are separated by commas


	};
*/

var CustomConfig, configCheck = me.profile.toUpperCase().split("-");

if (getScript("D2BotSoloLevelingEntry.dbj") && !!configCheck[1]) {
	if (me.amazon && configCheck[1].toString().substring(0, 3).includes("ZON")) {
		CustomConfig = {
			"Amazon.SoloLeveling": me.profile,
		};
	}

	if (me.sorceress && configCheck[1].toString().substring(0, 3).includes("SOR")) {
		CustomConfig = {
			"Sorceress.SoloLeveling": me.profile,
		};
	}

	if (me.necromancer && configCheck[1].toString().substring(0, 3).includes("NEC")) {
		CustomConfig = {
			"Necromancer.SoloLeveling": me.profile,
		};
	}

	if (me.paladin && configCheck[1].toString().substring(0, 3).includes("PAL")) {
		CustomConfig = {
			"Paladin.SoloLeveling": me.profile,
		};
	}

	if (me.barbarian && configCheck[1].toString().substring(0, 3).includes("BAR")) {
		CustomConfig = {
			"Barbarian.SoloLeveling": me.profile,
		};
	}

	if (me.druid && configCheck[1].toString().substring(0, 3).includes("DRU")) {
		CustomConfig = {
			"Druid.SoloLeveling": me.profile,
		};
	}

	if (me.assassin && configCheck[1].toString().substring(0, 3).includes("SIN")) {
		CustomConfig = {
			"Assassin.SoloLeveling": me.profile,
		};
	}
}
