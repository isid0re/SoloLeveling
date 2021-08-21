/**
 *    @filename   druid.WindBuild.js
 *	  @author	  isid0re
 *    @desc       Druid wind build for after respecOne
 */

var build = {
	caster: true,
	skillstab: 42, // elemental
	wantedskills: [245, 250], // tornado, hurricane
	usefulskills: [235], // cyclone armor
	mercAuraName: "Blessed Aim",
	mercAuraWanted: 108,
	mercDiff: 0,
	stats: [
		["strength", 48], ["vitality", 165], ["strength", 61], ["vitality", 252], ["strength", 156], ["vitality", "all"]
	],
	skills: [
		[221, 1, false], //Raven
		[227, 1, false], //Summon Spirit Wolf
		[226, 1, false], //Oak Sage
		[237, 1, false], //Summon Dire Wolf (Fenris)
		[247, 1, false], //Summon Grizzly
		[230, 1, false], //Arctic Blast
		[235, 1, false], //Cyclone Armor
		[240, 1, false], //Twister
		[245, 13, false], //Tornado
		[250, 6, false], //Hurricane
		[235, 12, false], //Cyclone Armor
		[245, 14, false], //Tornado
		[250, 7, false], //Hurricane
		[245, 15, false], //Tornado
		[250, 8, false], //Hurricane
		[245, 20, false], //Max tornado
		[250, 20, false], //Max hurricane
		[235, 20, false], //Max cyclone armor
		[226, 20, false], //Max oak Sage
		[240, 20], //Max twister
	],
	autoEquipTiers: [ // autoequip final gear
		//weapon
		"[Type] == mace && [flag] == runeword # [FCR] == 40 # [tier] == 100000 + tierscore(item)", // HotO
		//Helmet
		"[Name] == SkySpirit && [Quality] == Unique # [PassiveFirePierce] >= 10 # [tier] == 100000 + tierscore(item)", // ravenlore
		//belt
		"[name] == spiderwebsash && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 90 # [tier] == 100000 + tierscore(item)", //arach's
		//boots
		"[name] == battleboots && [quality] == unique && [flag] != ethereal # [itemmagicbonus] >= 50 # [tier] == 100000 + tierscore(item)", //war traveler
		//armor
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [frw] >= 45 # [tier] == 100000 + tierscore(item)", //Enigma
		//shield
		"[Name] == Monarch && [Flag] != Ethereal && [flag] == runeword # [fcr] >= 35 # [tier] == 100000 + tierscore(item)", //spirit shield
		//gloves
		"[name] == lightgauntlets && [quality] == unique && [flag] != ethereal # [fcr] >= 20 # [tier] == 100000 + tierscore(item)", //magefist
		//ammy
		"[type] == amulet && [quality] == unique # [strength] == 5 && [coldresist] >= 30 # [tier] == 100000 + tierscore(item)", //maras
		//rings
		"[type] == ring && [quality] == unique # [itemmaxmanapercent] == 25 # [tier] == 100000 + tierscore(item)", //soj
		//merc
		"[type] == armor && [flag] == runeword # [enhanceddefense] >= 200 && [enhanceddamage] >= 300 # [merctier] == 100000",	//Fortitude
		"[name] == demonhead && [quality] == unique # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 50000",	//Andy's
	]
};
