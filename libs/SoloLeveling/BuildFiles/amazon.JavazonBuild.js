/*
 *    @filename   amazon.JavazonBuild.js
 *	  @author	  isid0re
 *    @desc       Javazon build for after respecOne
 */

var build = {
	caster: false,
	skillstab: 2, // Jav N Spear Skills
	wantedskills: [24, 34], // Charged Strike, Lightning Strike
	usefulskills: [9, 23, 32, 33], // Critical Strike, Penetrate, Valkyrie, Pierce
	mercAuraName: "Holy Freeze",
	mercAuraWanted: 114,
	mercDiff: 1,
	stats: [
		["str", 15], ["vit", 30], ["str", 25], ["vit", 45], ["str", 35], ["vit", 55], ["dex", 40], ["str", 45], ["vit", 75], ["dex", 55], ["str", 60], ["vit", 125], ["dex", 75], ["str", 85], ["vit", 150], ["str", 100], ["dex", 109], ["vit", 200], ["str", 125], ["vit", 225], ["str", 156], ["vit", "all"]
	],
	skills: [
		[35, 1, false], //lightning fury
		[33, 1, false], //pierce
		[32, 1, false], //valkyrie
		[35, 20, false], //max lightning fury
		[24, 20, true], //max charged strike
		[20, 20, false], //max lightning bolt
		[34, 20, false], //max lightning strike
		[14, 20, false] //max power strike
	]
};
