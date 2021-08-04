/*
 *    @filename   	barbarian.WhirlwindBuild.js
 *	  @author	  	isid0re
 *    @desc       	Whirlwind build
 *    @credits		ebner20
 */

var build = {
	caster: me.charlvl === SetUp.respecTwo() ? false : true,
	skillstab: 32, // Barbarian Combat
	wantedskills: [126, 151], // Bash, Whirlwind
	usefulskills: [130, 138], // Howl, Shout
	mercAuraName: "Might",
	mercAuraWanted: 98,
	mercDiff: 1,
	stats: [
		["str", 118],
		["dex", 136],
		["vit", "all"]
	],
	skills: [
		[127, 1, false], //Sword Mastery
		[130, 1, false], //Howl
		[126, 1, false], //Bash
		[138, 1, false], //Shout
		[155, 1, false], //Battle Command
		[151, 1, false], //Whirlwind
		[153, 1, false], //Natural resistance
		[148, 1, false], //Increased Speed
		[145, 1, false], //Iron Skin
		[149, 20, false], //Max Battle orders
		[138, 20, false], //Max Shout
		[151, 10, false], //whirlwind
		[127, 10, false], //Sword Matery
		[153, 10, false], //Natural resistance
		[151, 20, false], //Max whirlwind
		[127, 20, false], //Max Sword Mastery
		[153, 16, false], //Natural resistance
		[145, 20, false] //Max iron Skin
	],
	autoEquipTiers: [ // autoequip final gear
		//weapon
		"[Type] == sword && [flag] == runeword # [ias] >= 30 # [tier] == 100000", //Grief dual weild
		"[Type] == sword && [flag] == runeword # [ias] >= 20 && [coldresist] >= 75 # [tier] == 100000", //Silence x2 dual weild
		//Helmet
		"[name] == slayerguard && [quality] == unique && [flag] != ethereal # [fhr] >= 30 # [tier] == 100000", //arreat's
		//belt
		"[name] == mithrilcoil && [quality] == unique && [flag] != ethereal # [fhr] >= 10 # [tier] == 100000", //verdungo's
		//boots
		"[name] == warboots && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 160 # [tier] == 100000", //gorerider's
		//armor
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [frw] >= 45 # [tier] == 100000", //Enigma
		//gloves
		"[name] == vambraces && [quality] == unique && [flag] != ethereal # [LifeLeech] >= 4 && [ManaLeech] >= 4 # [tier] == 100000", //soul drainer
		//ammy
		"[type] == amulet && [quality] == unique # [strength] == 5 && [coldresist] >= 25 # [tier] == 100000", //maras
		//rings
		"[type] == ring && [quality] == unique # [tohit] >= 180 && [dexterity] >= 15 # [tier] == 100000", // ravenfrost
		"[type] == ring && [quality] == unique # [lifeleech] >= 5 && [maxstamina] == 50 # [tier] == 100000", // bul-kathos' wedding band
		//merc
		"[type] == armor && [flag] == runeword # [enhanceddefense] >= 200 && [enhanceddamage] >= 300 # [merctier] == 100000",	//Fortitude
		"[name] == demonhead && [quality] == unique && [flag] == ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 50000",	//Eth Andy's
	]
};
