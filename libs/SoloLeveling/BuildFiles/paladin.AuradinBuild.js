/**
 *    @filename   paladin.AuradinBuild.js
 *	  @author	  theGuy
 *    @desc       End-game Auradin build
 */

var build = {
	caster: false,
	skillstab: 24, //combat
	wantedskills: [106, 123], //Zeal, Conviction
	usefulskills: [117, 100, 110], //holy shield, Resist Fire, Resist Lighting
	mercAuraName: "Holy Freeze",
	mercAuraWanted: 114,
	mercDiff: 1,
	stats: [
		["strength", 103], ["dexterity", 136], ["vitality", 300], ["dexterity", "block"], ["vitality", "all"]
	],
	skills: [
		[123, 20], 	//Conviction
		[106, 4], 	// Zeal
		[110, 20], 	// Resist Lighting
		[125, 20], 	// Salvation
		[100, 20], 	// Resist Fire
		[124, 1], 	// Redemption
		[117, 15], 	// Holy Shield
		[106, 10], 	// Zeal
	],
	autoEquipTiers: [ // autoequip final gear
		//weapon
		"[Type] == sword && [flag] == runeword # [ias] >= 20 && [itempierceltng] >= 35 # [tier] == 110000", //Crescent Moon
		"[Type] == sword && [flag] == runeword # [holyfireaura] >= 16 # [tier] == 120000", //HoJ
		//helmet
		"[Type] == helm && [flag] == runeword # [holyshockaura] >= 15 # [tier] == 110000", //Dream Helm
		//belt
		"[name] == mithrilcoil && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 90 && [damageresist] >= 10  # [tier] == 110000 + tierscore(item)", //Verdungos
		//boots
		"[name] == warboots && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 160 # [tier] == 110000 + tierscore(item)", //Gore Rider
		//armor
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [holyfireaura] >= 14 # [tier] == 110000", //Dragon
		//shield
		"[type] == auricshields && [flag] != ethereal && [flag] == runeword # [holyshockaura] >= 15 # [tier] == 110000", //Dream
		//gloves
		"[name] == bramblemitts && [quality] == set && [flag] != ethereal # [ias] >= 20 # [tier] == 110000", // Laying of Hand's
		//ammy
		"[type] == amulet && [quality] == unique # [lightresist] == 35 # [tier] == 100000", //highlords
		//rings
		"[type] == ring && [quality] == unique # [tohit] >= 180 && [dexterity] >= 15 # [tier] == 100000", // ravenfrost
		"[type] == ring && [quality] == unique # [lifeleech] >= 5 && [maxstamina] == 50 # [tier] == 100000", // bul-kathos' wedding band
	]
};
