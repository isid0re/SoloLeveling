/*
 *    @filename   amazon.JavazonBuild.js
 *	  @author	  isid0re
 *    @desc       Javazon build
 */

var build = {
	caster: false,
	skillstab: 2, // Jav N Spear Skills
	wantedskills: [24, 34], // Charged Strike, Lightning Strike
	usefulskills: [9, 23, 32, 33], // Critical Strike, Penetrate, Valkyrie, Pierce
	mercAuraName: "Holy Freeze",
	mercAuraWanted: 114,
	mercDiff: 1,
	stats: [
		["str", 15], ["vit", 30], ["str", 25], ["vit", 45], ["str", 35], ["vit", 55], ["dex", 40], ["str", 45], ["vit", 75], ["dex", 55], ["str", 60], ["vit", 125], ["dex", 75], ["str", 85], ["vit", 150], ["str", 100], ["dex", 109], ["vit", 200], ["str", 125], ["vit", 225], ["str", 156], ["vit", "all"]
	],
	skills: [
		[35, 1, false], //lightning fury
		[33, 1, false], //pierce
		[32, 1, false], //valkyrie
		[35, 20, false], //max lightning fury
		[24, 20, true], //max charged strike
		[20, 20, false], //max lightning bolt
		[34, 20, false], //max lightning strike
		[14, 20, false] //max power strike
	],
	autoEquipTiers: [ // autoequip final gear
		//weapon
		"[name] == ceremonialjavelin && [quality] == unique && [flag] == ethereal # [javelinandspearskilltab] == 2 # [tier] == 100000 + tierscore(item)", //eth titans
		//Helmet
		"[name] == diadem && [quality] == unique && [flag] != ethereal # [fcr] == 25 # [tier] == 100000 + tierscore(item)", //griffons
		//boots
		"[name] == scarabshellboots && [quality] == unique && [flag] != ethereal # [strength]+[vitality] >= 20 # [tier] == 100000 + tierscore(item)", //sandstorm treks
		//belt
		"[name] == warbelt && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 160 # [tier] == 100000 + tierscore(item)", //thundergod's vigor
		//armor
		"[type] == armor && [flag] == runeword  && [flag] != ethereal # [fireresist] == 65 && [hpregen] == 7 # [tier] == 100000 + tierscore(item)", //CoH
		//shield
		"[type] == shield # [fcr] >= 35 && [maxmana] >= 89 # [tier] == 100000 + tierscore(item)", //spirit
		//ammy
		"[type] == amulet && [quality] == unique # [lightresist] == 35 # [tier] == 100000 + tierscore(item)", // highlords
		//rings
		"[type] == ring && [quality] == unique # [dexterity] == 20 && [tohit] == 250 # [tier] == # [tier] == 100000 + tierscore(item)", // raven frost
		"[name] == ring && [quality] == unique # [maxstamina] == 50 && [lifeleech] >= 5 # [tier] == 100000 + tierscore(item)", //bk ring
		//swap
		"([type] == sword || [type] == mace) # [plusskillbattleorders] >= 1 # [swaptier] == 100000", //CTA
		"[type] == shield # [fcr] >= 25 # [swaptier] == 100000", //spirit
		//merc
		"[type] == armor && [flag] == runeword # [enhanceddefense] >= 200 && [enhanceddamage] >= 300 # [merctier] == 100000", //Fortitude
		"[name] == demonhead && [quality] == unique # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 100000",	//Andy's
	]
};
