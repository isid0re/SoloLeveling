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
		["dexterity", 45], ["strength", 45], ["vitality", 100], ["dexterity", 55], ["strength", 55], ["vitality", 115], ["dexterity", 80], ["strength", 90], ["vitality", 145], ["dexterity", 90], ["strength", 107], ["vitality", 175], ["dexterity", 110], ["vitality", 210], ["dexterity", 120], ["vitality", 250], ["dexterity", 147], ["vitality", "all"]
	],
	skills: [
		[9, 1], // Critical Strike
		[23, 1], // Penetrate
		[10, 1], // Jab
		[14, 1], // Power Strike
		[15, 1], // Poison Javelin
		[20, 1], // Lightning Bolt
		[25, 1], // Plague Javelin
		[24, 13, false], // Charged Strike
		[14, 12, false], // Power Strike
		[33, 1], // Pierce
		[35, 1], // Lightning Fury
		[33, 2], // Pierce
		[35, 2], // Lightning Fury
		[33, 3], // Pierce
		[35, 3], // Lightning Fury
		[33, 5], // Pierce
		[35, 20], // Lightning Fury
		[24, 20], // Charged Strike
		[13, 1], // Dodge
		[18, 1], // Avoid
		[29, 1], // Evade
		[8, 1], // inners sight
		[17, 1], // slow missiles
		[28, 1], // decoy
		[32, 1], // Valkyrie
		[14, 20], // Power Strike
		[34, 20], // Lightning Strike
		[20, 20], // Lightning Bolt
	]
};
