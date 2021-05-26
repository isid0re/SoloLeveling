/*
 *    @filename   amazon.LevelingBuild.js
 *	  @author	  isid0re
 *    @desc       customized javazon for nm and hell before final respec
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
		["strength", 34], ["vitality", 30], ["dexterity", 47], 
		["vitality", 45], ["strength", 47], ["dexterity", 65],
		["vitality", 65], ["strength", 53], ["dexterity", 118], 
		["vitality", 100], ["strength", 118], ["dexterity", 151], 
		["strength", 156], ["vitality", "all"],
	],
	skills: [
		[9, 1], // Critical Strike
		[23, 1], // Penetrate
		[33, 5], // Pierce
		[10, 1], // Jab
		[14, 1], // Power Strike
		[15, 1], // Poison Javelin
		[20, 1], // Lightning Bolt
		[25, 1], // Plague Javelin
		[35, 5], // Lightning Fury
		[24, 17], // Charged Strike
		[35, 6], // Lightning Fury
		[24, 18], // Charged Strike
		[35, 7], // Lightning Fury
		[24, 19], // Charged Strike
		[35, 8], // Lightning Fury
		[24, 20], // Charged Strike
		[35, 20], // Lightning Fury
		[14, 12], // Power Strike
		[13, 1], // Dodge
		[18, 1], // Avoid
		[32, 1, false], // Valkyrie
		[29, 1], // Evade
		[14, 20], // Power Strike
		[34, 20], // Lightning Strike
		[20, 20], // Lightning Bolt
	]
};
