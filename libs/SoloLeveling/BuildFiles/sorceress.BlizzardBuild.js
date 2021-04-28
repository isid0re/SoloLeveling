/**
 *    @filename   	Sorceress.BlizzardBuild.js
 *	  @author	  	isid0re
 *    @desc     	Sorceress blizzard build for after respecOne
 */

var build = {
	caster: true,
	skillstab: 10, //cold
	wantedskills: [59, 65], // blizzard, cold mastery
	usefulskills: [55, 45, 42], // glacial spike, ice blast, static
	mercAuraName: "Holy Freeze",
	mercAuraWanted: 114,
	mercDiff: 1,
	stats: [
		["strength", 48], ["vitality", 165], ["strength", 61], ["vitality", 252], ["strength", 84], ["dexterity", "block"], ["vitality", "all"]
	],
	skills: [
		[37, 1], // warmth
		[42, 1], // Static
		[43, 1], // telekensis
		[54, 1], //Teleport
		[40, 1], // Frozen Armor
		[39, 1], // ice bolt
		[45, 1], // ice blast
		[55, 1], // gspike
		[44, 1], // Frost nova
		[45, 15], // ice blast
		[59, 20, false], // blizzard
		[65, 17, false], // cold mastery
		[45, 20], // ice blast
		[55, 20], // gspike
		[39, 20], // ice bolt
		[65, 20] // cold mastery
	]
};
