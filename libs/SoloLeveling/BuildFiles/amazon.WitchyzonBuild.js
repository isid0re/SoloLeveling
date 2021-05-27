/*
 *    @filename   amazon.WitchyzonBuild.js
 *	  @author	  isid0re
 *    @desc       Witchwild String Bowazon build
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
		"[name] == diamondbow && [quality] == unique # [fireresist] == 40 # [tier] == 110000", // WitchWild String up'd
		//Helmet
		"[name] == casque && [quality] == unique  && [flag] != ethereal # [ias] == 10 && [lifeleech] >= 5 # [tier] == 110000", //griffons
		//boots
		"[name] == battleboots && [quality] == unique && [flag] != ethereal # [itemmagicbonus] >= 30 # [tier] == 100000", //war traveler
		//belt
		"[name] == vampirefangbelt && [quality] == unique && [flag] != ethereal # [lifeleech] >= 5 # [tier] == 110000", //arach's
		//armor
		"[type] == armor && [flag] == runeword  && [flag] != ethereal # [fireresist] == 65 && [hpregen] == 7 # [tier] == 110000", //CoH
		//shield - N/A
		//ammy
		"[type] == amulet && [quality] == unique # [dexterity] == 25 # [tier] == 110000", // cat's eye
		//rings
		"[type] == ring && [quality] == unique # [dexterity] == 20 && [tohit] == 250 # [tier] == # [tier] == 110000", // raven frost
		"[name] == ring && [quality] == unique # [maxstamina] == 50 && [lifeleech] >= 3 # [tier] == 110000", //bk ring
	]
};
