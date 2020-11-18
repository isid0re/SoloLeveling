//	/d2bs/kolbot/libs/config/Builds/Sorceress.Start.js

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
		//SkillPoints: [-1],			// This doesn't matter. We don't have skill points to spend at lvl 1
		//StatPoints: [-1,-1,-1,-1,-1],	// This doesn't matter. We don't have stat points to spend at lvl 1
		Update: function () {
			Config.AttackSkill = [-1, 36, -1, 36, -1, 0, 0];
			Config.LowManaSkill = [0, 0];
			Config.SkipImmune = ["lightning"];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	2:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.LowManaSkill = [0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	3:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	4:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	5:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	6:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	7:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
		}
	},

	8:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	9:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	10:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	11:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	12:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	13:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	14:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	15:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	16:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	17:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	18:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	19:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	20:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	21:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	22:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	23:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	24:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	25:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},
	26:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},
	27:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},
	28:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},
	29:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},
	30:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},
	31:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 38, -1, 38, -1, 0, 0];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},
};
