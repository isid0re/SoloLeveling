/*
 *    @filename   	barbarian.WhirlwindBuild.js
 *	  @author	  	isid0re
 *    @desc       	Whirlwind build
 *    @credits		ebner20
 */

var build = {
	caster: false,
	skillstab: 32, // Barbarian Combat
	wantedskills: [126, 151], // Bash, Whirlwind
	usefulskills: [130, 138], // Howl, Shout
	mercAuraName: "Might",
	mercAuraWanted: 98,
	mercDiff: 1,
	stats: [
		["vit", 40],
		["str", 60],
		["vit", 100],
		["str", 85],
		["vit", 150],
		["dex", 35],
		["str", 100],
		["vit", 180],
		["str", 125],
		["vit", 205],
		["str", 156],
		["vit", "all"]
	],
	skills: [
		[129, 1, false], //Mace Mastery
		[130, 1, false], //Howl
		[126, 1, false], //Bash
		[138, 1, false], //Shout
		[155, 1, false], //Battle Command
		[151, 1, false], //Whirlwind
		[153, 1, false], //Natural resistance
		[148, 1, false], //Increased Speed
		[145, 1, false], //Iron Skin
		[138, 9, false], //Level shout
		[149, 7, false], //Level Battle orders
		[149, 20, false], //Max Battle orders
		[138, 20, false], //Max Shout
		[151, 10, false], //whirlwind
		[129, 10, false], //Mace Matery
		[153, 10, false], //Natural resistance
		[151, 20, false], //Max whirlwind
		[129, 20, false], //Max Mace Matery
		[153, 16, false], //Natural resistance
		[145, 10, false], //Iron Skin
		[145, 20, false] //Max iron Skin
	]
};