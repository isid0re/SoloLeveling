/**
 *    @filename   assassin.StartBuild.js
 *    @desc       assassin build for before respecOne
 */

var build = {
	caster: false,
	skillstab: 48, // traps
	wantedskills: [251, 262], // fireblast, wake of fire
	usefulskills: [252], // claw mastery
	stats: [
		["vitality", 70],
		["strength", 35],
		["energy", 85],
		["vitality", "all"]
	],
	skills: [
		[251, 3], // fireblast
		[252, 1], // claw mastery
		[258, 2], // burst of speed
		[251, 4], // fireblast
		[258, 5], // burst of speed
		[262, 10], // wake of fire
		[251, 6], // fireblast
		[262, 20], // wake of fire
		[251, 10], // fireblast
	]
};
