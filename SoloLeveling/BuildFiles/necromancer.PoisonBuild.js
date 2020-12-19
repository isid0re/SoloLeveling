/**
 *    @filename   necromancer.PoisonBuild.js
 *    @desc       poison necro build for after respecOne
 */

var build = {
	caster: true,
	skillstab: 17, //poison
	wantedskills: [92, 74], // poison nova, corpse explosion
	usefulskills: [66, 68, 91], //ampdamage, bone armor, lower resist
	stats: [
		["strength", 48], ["vitality", 165], ["strength", 61], ["vitality", 252], ["strength", 156], ["vitality", "all"]
	],
	skills: [
		[73, 1], // Poison Dagger
		[67, 1], // Teeth
		[74, 1], // Corpse Explosion
		[83, 1], // Poison Explosion
		[92, 20, false], // Poison Nova
		[83, 20, false], // poison explosion
		[73, 20, false], // Poison Dagger
		[68, 1], // Bone Armor
		[75, 1], // Clay Golem
		[79, 1], // Golem Mastery
		[89, 1], // Summon Resist
		[66, 1], // Amplified Damage
		[72, 1], // Weaken
		[77, 1], // Terror
		[87, 1], // Decrepify
		[76, 1], // Iron Maiden
		[82, 1], // Life Tap
		[91, 20, false], // lower resist
		[74, 20, false], // corpse explosion
	]
};
