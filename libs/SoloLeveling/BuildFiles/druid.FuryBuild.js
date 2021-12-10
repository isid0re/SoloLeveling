/**
 *  @filename   druid.FuryBuild.js
 *  @author     isid0re
 *  @desc       Druid fury build for final build
 *	@credits	https://d2.maxroll.gg/guides/werewolf-fury-druid
 */

var build = {
	caster: false,
	skillstab: 41, // Shape-Shifting
	wantedskills: [223, 224, 248], // Werewolf, Lycanthropy, Fury
	usefulskills: [247, 236, 232], // Summon Grizzly, Heart of Wolverine, Feral Rage
	mercAuraName: "Might",
	mercAuraWanted: 98,
	mercDiff: 1,
	stats: [
		["dexterity", 55], ["strength", 156], ["vitality", "all"]
	],
	skills: [
		[226, 1], //Oak Sage
		[221, 1], //Raven
		[227, 1], //Summon Spirit Wolf
		[237, 1], //Summon Dire Wolf (Fenris)
		[247, 1], //Summon Grizzly
		[236, 1], //Heart of Wolverine
		[223, 1], // Werewolf
		[224, 1], // Lycanthropy
		[232, 1], // Feral Rage
		[238, 1], // Rabies
		[248, 1], //Fury
		[223, 20], // Werewolf
		[224, 20], // Lycanthropy
		[232, 20], // Feral Rage
		[248, 20], //Fury
		[236, 20], //Heart of Wolverine
	],
	autoEquipTiers: [ // autoequip final gear
		//weapon
		"[Type] == axe && [flag] == runeword # [ias] == 50 # [tier] == 100000 + tierscore(item)", //Oath
		//Helmet
		"[name] == totemicmask && [quality] == unique # [druidskills] == 2 # [tier] == 100000 + tierscore(item)", //Jalal's mane
		//belt
		"[name] == demonhidesash && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 150 # [tier] == 100000 + tierscore(item)", //String of Ears
		//boots
		"[name] == warboots && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 160 # [tier] == 100000 + tierscore(item)", //Gore Rider's
		//armor
		"[type] == armor && [flag] == runeword  && [flag] != ethereal # [fireresist] == 65 && [hpregen] == 7 # [tier] == 100000 + tierscore(item)", //CoH
		//gloves
		"[name] == vampirebonegloves && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 90 # [tier] == 100000 + tierscore(item)", //Dracul's Grasp
		//ammy
		"[type] == amulet && [quality] == unique # [strength] == 5 && [coldresist] >= 30 # [tier] == 100000 + tierscore(item)", //Maras
		//rings
		"[type] == ring && [quality] == unique # [tohit] >= 180 && [dexterity] >= 15 # [tier] == 100000 + tierscore(item)", // ravenfrost
		"[type] == ring && [quality] == unique # [lifeleech] >= 5 && [maxstamina] == 50 # [tier] == 100000 + tierscore(item)", // bul-kathos' wedding band
		//swap
		"([type] == sword || [type] == mace) # [plusskillbattleorders] >= 1 # [swaptier] == 100000", //CTA
		"[type] == shield # [fcr] >= 25 # [swaptier] == 100000", //spirit
		//merc
		"[type] == armor && [flag] == runeword # [enhanceddefense] >= 200 && [enhanceddamage] >= 300 # [merctier] == 100000", //Fortitude
		"[name] == demonhead && [quality] == unique # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 100000", //Andy's
		"[name] == thresher && [quality] == unique # [enhanceddamage] >= 190 && [lifeleech] >= 11 # [merctier] == 100000 + mercscore(item)", // Reaper's Toll
	]
};
