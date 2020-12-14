/**
 *    @filename   necromancer.SummonBuild.js
 *    @desc       FishyMancer build for after respecOne
 */

var build = {
	caster: true,
	skillstab: 18, //summon
	wantedskills: [70, 74], // raise skelly, corpse explosion
	usefulskills: [66, 69, 68, 87], //ampdamage, skelly mastery, bone armor, decrepify
	stats: [
		["strength", 48], ["vitality", 165], ["strength", 61], ["vitality", 252], ["strength", 156], ["vitality", "all"]
	],
	skills: [
		[66, 1, false], //Amplify damage
		[70, 1, false], //Raise Skeleton
		[69, 1, false], //Skeleton Mastery
		[75, 1, false], //Clay Golem
		[79, 1, false], //Golem Mastery
		[89, 1, false], //Summon Resist
		[72, 1, false], //Weaken
		[77, 1, false], //Terror
		[87, 1, false], //Decrepify
		[67, 1, false], //Teeth
		[74, 1, false], //Corpse Explosion
		[68, 1, false], //Bone Armor
		[70, 20, false], //Max Raise Skeleton
		[69, 20, false], //Max Skeleton Mastery
		[74, 20, false], //Corpse Explosion
		[66, 20, false], //Amplify damage
		[95, 20, false], //Max Revive
	]
};
