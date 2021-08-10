/**
 *      @filename   Barbarian.LevelingBuild.js
 *      @author     isid0re
 *      @desc       Barbarian leveling build
 */

var build = {
	caster: true,
	skillstab: 32, // Combat
	wantedskills: [129, 144, 154], // Mace Mastery, Concentrate, WarCry
	usefulskills: [149, 153], // Battle Orders, Natural Resist
	mercAuraName: "Might",
	mercAuraWanted: 98,
	mercDiff: 1,
	stats: [
		["vitality", 40], ["dexterity", 35], ["strength", 61],
		["vitality", 60], ["dexterity", 44], ["strength", 96],
		["vitality", 96], ["dexterity", 77], ["strength", 118],
		["dexterity", 136], ["vitality", "all"]
	],
	skills: [
		[130, 1], // Howl
		[137, 1], // Taunt
		[138, 1], // Shout
		[146, 1], // Battle Cry
		[149, 1], // Battle Orders
		[155, 1], // Battle Command
		[154, 1], // War Cry
		[129, 1], // Mace Mastery
		[141, 1], // Increased Stamina
		[148, 1], // Increased Speed
		[145, 1], // Iron Skin
		[153, 1], // Natural Resistance
		[126, 1], // Bash
		[139, 1], // Stun
		[144, 1], // Concentrate
		[152, 1], // Berserk
		[133, 1], // Double Swing
		[140, 1], // Double Throw
		[147, 1], // Frenzy
		[153, 4], // Natural Resistance
		[133, 6], // Double Swing
		[137, 9], // Taunt
		[149, 5], // Battle Orders
		[154, 20], // War Cry
		[146, 20], // Battle Cry
		[137, 20], // Taunt
		[130, 20], // Howl
	],
};
