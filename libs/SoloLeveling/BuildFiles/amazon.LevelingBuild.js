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
		["vitality", 60], ["dexterity", 30], ["strength", 27], ["vitality", 91], ["dexterity", 47], ["strength", 30], ["vitality", 96], ["dexterity", 59], ["strength", 60], ["vitality", 109], ["dexterity", 77], ["strength", 89], ["vitality", 137], ["dexterity", 89], ["vitality", 173], ["dexterity", 103], ["vitality", 208], ["dexterity", 118], ["vitality", 243], ["dexterity", 133], ["vitality", 279], ["dexterity", 147], ["vitality", "all"]
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
		[33, 5, false], // Pierce
		[35, 8, false], // Lightning Fury
		[24, 20, false], // Charged Strike
		[35, 20, false], // Lightning Fury
		[14, 12], // Power Strike
		[13, 1], // Dodge
		[18, 1], // Avoid
		[29, 1], // Evade
		[32, 1, false], // Valkyrie
		[14, 20], // Power Strike
		[34, 20], // Lightning Strike
		[20, 20], // Lightning Bolt
	]
};
