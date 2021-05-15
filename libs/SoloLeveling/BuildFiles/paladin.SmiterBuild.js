/**
 *    @filename   paladin.SmiterBuild.js
 *	  @author	  isid0re
 *    @desc       End-game smiter build
 */

var build = {
	caster: false,
	skillstab: 24, //combat
	wantedskills: [97, 122], //smite, fanaticism
	usefulskills: [117, 125], //holy shield, salvation
	mercAuraName: "Holy Freeze",
	mercAuraWanted: 114,
	mercDiff: 1,
	stats: [
		["strength", 115], ["dexterity", 136], ["vitality", 300], ["dexterity", "block"], ["vitality", "all"]
	],
	skills: [
		[97, 20], //smite
		[101, 1], // holy bolt
		[107, 1], // charge
		[112, 1], //blessed hammer
		[117, 20], // holy shield
		[98, 1], // might
		[108, 1], //blessed aim
		[113, 1], //concentration
		[122, 20], // fanaticism
		[125, 5], // salvation
		[110, 15], // resist lightning
		[100, 14], // resist fire
		[105, 10] // resist cold
	]
};
