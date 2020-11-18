//	/d2bs/kolbot/libs/config/Builds/Necromancer.Summon.js

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
			Config.LowManaSkill = [0, 0];
			Config.AttackSkill = [-1, 0, 0, 0, 0, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
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
			Config.AttackSkill = [-1, 0, 0, 0, 0, -1, -1];
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
			Config.AttackSkill = [-1, 0, 0, 0, 0, -1, -1];
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
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
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
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
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
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
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
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
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
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
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
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
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
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
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
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
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
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
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
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
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
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
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
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
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
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
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
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
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
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	},

	33:	{
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

	34:	{
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

	35:	{
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

	36:	{
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

	37:	{
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

	38:	{
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

	39:	{
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

	40:	{
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

	41:	{
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

	42:	{
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

	43:	{
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

	44:	{
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

	45:	{
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

	46:	{
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

	47:	{
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

	48:	{
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

	49:	{
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

	50:	{
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

	51:	{
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

	52:	{
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

	53:	{
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

	54:	{
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

	55:	{
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

	56:	{
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

	57:	{
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

	58:	{
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

	59:	{
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

	60:	{
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

	61:	{
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

	62:	{
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

	63:	{
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

	64:	{
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

	65:	{
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

	66:	{
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

	67:	{
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

	68:	{
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

	69:	{
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

	70:	{
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

	71:	{
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

	72:	{
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

	73:	{
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

	74:	{
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

	75:	{
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

	76:	{
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

	77:	{
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

	78:	{
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

	79:	{
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

	80:	{
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

	81:	{
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

	82:	{
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

	83:	{
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

	84:	{
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

	85:	{
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

	86:	{
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

	87:	{
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

	88:	{
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

	89:	{
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

	90:	{
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

	91:	{
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

	92:	{
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

	93:	{
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

	94:	{
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

	95:	{
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

	96:	{
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

	97:	{
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

	98:	{
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

	99:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 67, -1, 67, -1, -1, -1];
			Config.Curse[0] = me.getSkill(87, 0) ? 87 : me.getSkill(66, 0) ? 66 : 0; // Boss curse.
			Config.Curse[1] = me.getSkill(66, 0) ? 66 : 0; // Other monsters curse.

			Config.ExplodeCorpses = me.getSkill(74, 0) ? 74 : me.getSkill(83, 0) ? 83 : 0; // Explode corpses.
			Config.Golem = me.getSkill(75, 0) ? "Clay" : "None"; // Golem.
		}
	}
};
