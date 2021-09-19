/**
 *  @filename   druid.RabiesBuild.js
 *  @author     isid0re
 *  @desc       Druid rabies build for final build
 *	@credits	https://d2.maxroll.gg/guides/rabies-druid-guide
 */

var build = {
	caster: false,
	skillstab: 41, // Shape-Shifting
	wantedskills: [223, 224, 238], // Werewolf, Lycanthropy, Rabies
	usefulskills: [247, 226, 232], // Summon Grizzly, Oak Sage, Feral Rage
	mercAuraName: "Might",
	mercAuraWanted: 98,
	mercDiff: 1,
	stats: [
		["dexterity", 136], ["strength", 106], ["vitality", "all"]
	],
	skills: [
		[226, 1], //Oak Sage
		[221, 1], //Raven
		[227, 1], //Summon Spirit Wolf
		[237, 1], //Summon Dire Wolf (Fenris)
		[247, 1], //Summon Grizzly
		[236, 1], //Heart of Wolverine
		[248, 1], //Fury
		[238, 1], // Rabies
		[222, 1], // Poison Creeper
		[223, 1], // Werewolf
		[224, 1], // Lycanthropy
		[232, 1], // Feral Rage
		[238, 20], // Rabies
		[222, 20], // Poison Creeper
		[223, 20], // Werewolf
		[224, 20], // Lycanthropy
		[232, 20], // Feral Rage
	],
	autoEquipTiers: [ // autoequip final gear
		//weapon
		"[Type] == sword && [flag] == runeword # [ias] >= 30 # [tier] == 100000 + tierscore(item)", //Grief
		//Helmet
		"[name] == totemicmask && [quality] == unique # [druidskills] == 2 # [tier] == 100000 + tierscore(item)", //Jalal's mane
		//belt
		"[name] == mithrilcoil && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 90 # [tier] == 100000 + tierscore(item)", //Verdungo's
		//boots
		"[name] == warboots && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 160 # [tier] == 100000 + tierscore(item)", //Gore Rider's
		//armor
		"[Type] == armor && [flag] == runeword # [fireresist] == 30 && [poisonresist] == 100 # [tier] == 100000 + tierscore(item)", //Bramble
		//shield
		"[Name] == TrollNest && [Flag] != Ethereal && [flag] == runeword # [fireresist] >= 50 # [tier] == 100000 + tierscore(item)", //Sanctuary
		//gloves
		"[name] == heavybracers && [quality] == set # [fcr] == 20 && [coldresist] == 30 # [tier] == 100000 + tierscore(item)", //Trang Oul's
		//ammy
		"[type] == amulet && [quality] == unique # [strength] == 5 && [coldresist] >= 30 # [tier] == 100000 + tierscore(item)", //Maras
		//rings
		"[type] == ring && [quality] == unique # [tohit] >= 180 && [dexterity] >= 15 # [tier] == 100000 + tierscore(item)", // ravenfrost
		"[type] == ring && [quality] == unique # [lifeleech] >= 5 && [maxstamina] == 50 # [tier] == 100000 + tierscore(item)", // bul-kathos' wedding band
		//merc
		"[type] == armor && [flag] == runeword # [enhanceddefense] >= 200 && [enhanceddamage] >= 300 # [merctier] == 100000", //Fortitude
		"[name] == demonhead && [quality] == unique # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 100000", //Andy's
		"[name] == thresher && [quality] == unique # [enhanceddamage] >= 190 && [lifeleech] >= 11 # [merctier] == 100000 + mercscore(item)", // Reaper's Toll
	]
};
