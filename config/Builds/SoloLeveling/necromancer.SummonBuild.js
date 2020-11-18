/**
 *    @filename   necromancer.FishyMancerBuild.js
 *    @desc       summon necro build for after respecOne
 */

var build = {
	caster: true,
	stats: [
		["strength", 48], ["vitality", 165], ["strength", 61], ["vitality", 252], ["strength", 156], ["vitality", "all"]
	],
	skills: [
		[66, 1, false], //Amplify damage
		[70, 2, false], //Raise Skeleton
		[69, 1, false], //Skeleton Mastery
		[67, 1, false], //Teeth
		[74, 1, false], //Corpse Explosion
		[75, 1, false], //Clay Golem
		[87, 1, false], //Decrepify
		[89, 1, false], //Summon Resist
		[70, 20, false], //Max Raise Skeleton
		[69, 20, false], //Max Skeleton Mastery
		[95, 1, false], //Revive
		[74, 10, false], //level Corpse Explosion
		[80, 20, false], //Max Skeletal mage
		[74, 20, false], //Max Corpse Explosion
		[95, 20, false] //Max Revive
	]
};
