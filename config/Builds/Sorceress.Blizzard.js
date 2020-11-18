//	/d2bs/kolbot/libs/config/Builds/Sorceress.Blizzard.js

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
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
			Config.LowManaSkill = [0, 0];
			Config.SkipImmune = ["cold"];
		}
	},

	2:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	3:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	4:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	5:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	6:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	7:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	8:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	9:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	10:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	11:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	12:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	13:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	14:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	15:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	16:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	17:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	18:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	19:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	20:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	21:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	22:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	23:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	24:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	25:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	26:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	27:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	28:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	29:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	30:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	31:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	32:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	33:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	34:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	35:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	36:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	37:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	38:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	39:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	40:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	41:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	42:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	43:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	44:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	45:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	46:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	47:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	48:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	49:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	50:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	51:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	52:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	53:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	54:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	55:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	56:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	57:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	58:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	59:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	60:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	61:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	62:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	63:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	64:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;
		}
	},

	65:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	66:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	67:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	68:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	69:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	70:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	71:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	72:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	73:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	74:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	75:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	76:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	77:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	78:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	79:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	80:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	81:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	82:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	83:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	84:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	85:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	86:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	87:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	88:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	89:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	90:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	91:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	92:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	93:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	94:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	95:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	96:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	97:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	98:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	},

	99:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 59, 45, 59, 55, -1, -1];
			Config.NoTele = me.charlvl < respecOne ? true : me.diff === 0 && me.gold < 25000 ? true : me.diff !== 0 && me.gold < 100000 ? true : false;

		}
	}
};
