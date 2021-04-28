/*
 *    @filename   	sorceress.startBuild.js
 *	  @author	  	isid0re
 *    @desc       	sorceress build for before respecOne
 */

var build = {
	caster: true,
	skillstab: 9, //lightning
	wantedskills: [38, 42], // charged bolt, static
	usefulskills: [40, 49], // frozen armor, lightning
	mercAuraName: "Holy Freeze",
	mercAuraWanted: 114,
	mercDiff: 1,
	stats: [
		["vitality", 25],
		["strength", 15],
		["energy", 50],
		["vitality", 50],
		["strength", 35],
		["vitality", "all"]
	],
	skills: [
		[38, 1], // charged Bolt
		[37, 1], // Warmth
		[44, 1, false], // Frost Nova
		[38, 6], // Charge Bolt
		[40, 1], // Frozen Armor
		[42, 1], // Static
		[54, 1, false], // Telekinesis
		//[54, 1, false], // Teleport
		[38, 20], // Charged Bolt
		[49, 20], // lightning
	]
};
