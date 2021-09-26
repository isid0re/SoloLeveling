/**
 *      @filename   Barbarian.LevelingBuild.js
 *      @author     isid0re
 *      @desc       Barbarian leveling build
 */

var build = {
	caster: true,
	skillstab: 32, // Combat
	wantedskills: [129, 147, 154], // Mace Mastery, Concentrate, WarCry
	usefulskills: [149, 153], // Battle Orders, Natural Resist
	mercAuraName: "Might",
	mercAuraWanted: 98,
	mercDiff: 1,
	stats: [
		["dexterity", 35], ["strength", 61], ["vitality", 127],
		["dexterity", 60], ["strength", 96], ["vitality", 177],
		["dexterity", 136], ["strength", 118], ["vitality", "all"]
	],
	skills: [
		[130, 1], // Howl
		[138, 1], // Shout
		[137, 10], // Taunt
		[146, 1], // Battle Cry
		[149, 1], // Battle Orders
		[155, 1], // Battle Command
		[154, 3], // War Cry
		[129, 1], // Mace Mastery
		[127, 1], // Sword Mastery
		[145, 1], // Iron Skin
		[153, 1], // Natural Resistance
		[126, 1], // Bash
		[133, 9], // Double Swing
		[140, 1], // Double Throw
		[147, 1], // Frenzy
		[154, 20, false], // War Cry
		[149, 20, false], // Battle Orders
		[147, 20, false], // Frenzy
		[137, 20, false], // Taunt
		[146, 20, false], // Battle Cry
	],
};
