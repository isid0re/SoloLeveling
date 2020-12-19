/**
 *    @filename   sorceress.startBuild.js
 *    @desc       sorceress build for before respecOne
 */

var build = {
	caster: true,
	skillstab: 9, //lightning
	wantedskills: [38, 42], // charged bolt, static
	usefulskills: [40, 49], // frozen armor, lightning
	stats: [
		["strength", 15],
		["vitality", 70],
		["strength", 35],
		["energy", 85],
		["vitality", "all"]
	],
	skills: [
		[38, 6], // charged Bolt
		[40, 1], // Frozen Armor
		[38, 20], // charged Bolt
		[42, 1], // Static
		[49, 20], // lightning
	]
};
