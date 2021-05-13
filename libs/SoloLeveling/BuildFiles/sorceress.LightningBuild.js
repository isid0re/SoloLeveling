/**
 *    @filename   	Sorceress.LightningBuild.js
 *	  @author	  	theBGuy
 *    @desc     	Sorceress lightning build for after respecTwo
 */

var build = {
	caster: true,
	skillstab: 9, //light
	wantedskills: [53, 49], // Chain-light, lightning
	usefulskills: [63, 38, 48], // light-mastery, charged bolt, nova
	mercAuraName: "Holy Freeze",
	mercAuraWanted: 114,
	mercDiff: 1,
	stats: [
		["strength", 156], ["dexterity", 35], ["vitality", "all"]
	],
	skills: [
		[37, 1], // warmth
		[42, 1], // Static
		[43, 1], // telekensis
		[54, 1], //Teleport
		[40, 1], // Frozen Armor
		[57, 1], // Thunder-Storm
		[63, 1], // light-mastery
		[49, 20, false], // lightning
		[53, 20, false], // chain lightning
		[63, 20], // light-mastery
		[48, 20], // nova
		[38, 20], // charged bolt
	]
};
