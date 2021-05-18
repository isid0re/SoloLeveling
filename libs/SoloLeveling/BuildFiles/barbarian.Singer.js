/*
 *    @filename   	barbarian.Singer.js
 *	  @author	  	isid0re
 *    @desc       	Warcry (Singer/Shout) build
 *    @credits		ebner20
 */

var build = {
	caster: false,
	skillstab: 32, // Combat
	wantedskills: [154, 138], //warcry, shout
	usefulskills: [148, 153], //increased speed, natural resistance
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
		[130, 1, false], // Howl
		[131, 1, false], //Find Potion
		[138, 6, false], //Shout
		[142, 1, false], //Find Item
		[141, 1, false], //Increased Stamina level
		[138, 11, false], //Shout
		[145, 1, false], //Iron Skin
		[138, 15, false], //Shout
		[149, 1, false], //Battle Orders
		[148, 1, false], //Increased Speed
		[149, 5, false], //Battle Orders
		[154, 1, false], //War Cry
		[155, 1, false], //Battle Command
		[153, 1, false], //Natural Resistance
		[149, 20, false], //Max battle orders
		[138, 20, false], //Max shout
		[153, 11, false], //Natural Resistance
		[148, 5, false], //Increased Speed
		[145, 20, false], //Iron Skin
		[142, 10, false], //Find Item
		[155, 20, false] //Battle Command
	]
};