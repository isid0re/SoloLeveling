//	/d2bs/kolbot/libs/config/Builds/Necromancer.Start.js

/**
*
* Instructions:	See /d2bs/kolbot/libs/config/Builds/README.txt
*
* Skill IDs:	See /d2bs/kolbot/sdk/skills.txt for a list of skill IDs.
*
* Stat IDs:
*
* 	Strength	= 0
* 	Energy		= 1
* 	Dexterity	= 2
* 	Vitality	= 3
*
*/
js_strict(true);

if (!isIncluded("common/Cubing.js")) {
	include("common/Cubing.js");
}

if (!isIncluded("common/Prototypes.js")) {
	include("common/Prototypes.js");
}

if (!isIncluded("common/Runewords.js")) {
	include("common/Runewords.js");
}

if (!isIncluded("common/Town.js")) {
	include("common/Town.js");
}

var AutoBuildTemplate = {

	1:	{
		//SkillPoints: [-1],								// This doesn't matter. We don't have skill points to spend at lvl 1
		//StatPoints: [-1,-1,-1,-1,-1],						// This doesn't matter. We don't have stat points to spend at lvl 1
		Update: function () {
			Config.AttackSkill = [-1, 0, 0, 0, 0, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
			Config.LowManaSkill = [0, 0];
		}
	},

	2:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 0, 0, 0, 0, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	3:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	4:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	5:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	6:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	7:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	8:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	9:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	10:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	11:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	12:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	13:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	14:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	15:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	16:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	17:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	18:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 84, -1, 84, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	19:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 84, -1, 84, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	20:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 84, -1, 84, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	21:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 84, -1, 84, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	22:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 84, -1, 84, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	23:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 84, -1, 84, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	24:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 84, -1, 84, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	25:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 84, -1, 84, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	26:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 84, -1, 84, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	27:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 84, -1, 84, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	28:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 84, -1, 84, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	29:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 84, -1, 84, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	30:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 84, -1, 84, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	31:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 84, -1, 84, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	32:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 84, -1, 84, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},
};
