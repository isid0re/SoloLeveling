// Paladin.SoloLeveling.js config file
function LoadConfig () {
	Scripts.UserAddon = false; // !!!YOU MUST SET THIS TO FALSE IF YOU WANT TO RUN BOSS/AREA SCRIPTS!!!

	Scripts.SoloLeveling = true; // *** Leveling Script turn off when ready ***
	//const finalBuild = "Auradin";
	const finalBuild = "Hammerdin";
	//const finalBuild = "Smiter";
	//const finalBuild = "Zealot";

	// Town settings
	Config.HealHP = 99;
	Config.HealMP = 99;
	Config.HealStatus = true;
	Config.UseMerc = true;
	Config.MercWatch = true;
	Config.ClearInvOnStart = false;

	// Potion settings
	Config.UseHP = 75;
	Config.UseRejuvHP = 65;
	Config.UseMP = 15;
	Config.UseMercHP = 75;
	Config.HPBuffer = 4;
	Config.MPBuffer = 8;
	Config.RejuvBuffer = 4;

	// Chicken settings
	Config.LifeChicken = 10;
	Config.ManaChicken = 0;
	Config.MercChicken = 0;
	Config.TownHP = 0;
	Config.TownMP = 0;

	/* Inventory lock configuration. */
	Config.Inventory[0] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	Config.Inventory[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	Config.Inventory[2] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	Config.Inventory[3] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

	Config.StashGold = 1000;
	Config.LowGold = 250000;

	//AutoEquip
	Config.AutoEquip = true;

	// Pickit config.
	Config.PickRange = 15;
	Config.FastPick = true;
	Config.ItemInfo = true;
	Config.CainID.Enable = false;
	Config.FieldID = false;

	// Manager Item Log Screen
	Config.LogKeys = true;
	Config.LogOrgans = true;
	Config.LogMiddleRunes = true;
	Config.LogHighRunes = true;
	Config.ShowCubingInfo = true;

	// General config
	Config.MinGameTime = 400;
	Config.MaxGameTime = 7200;
	Config.MiniShopBot = true;
	Config.PacketShopping = true; // Use packets to shop. Improves shopping speed.
	Config.TownCheck = me.findItem("tbk", 0, 3);
	Config.LogExperience = true; // Print experience statistics in the manager.
	Config.PingQuit = [{Ping: 600, Duration: 10}];
	Config.Silence = true;
	Config.OpenChests = me.diff !== 2 ? false : true;

	// Shrine Scanner - scan for shrines while moving.
	Config.ScanShrines = [15, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14];

	// Primary Slot - Bot will try to determine primary slot if not used (non-cta slot that's not empty)
	Config.PrimarySlot = 0;

	// Fastmod config
	Config.FCR = 255; // 0 - disable, 1 to 255 - set value of faster cast rate
	Config.FHR = 255; // 0 - disable, 1 to 255 - set value of faster hit recovery
	Config.FBR = 255; // 0 - disable, 1 to 255 - set value of faster block recovery
	Config.IAS = 255; // 0 - disable, 1 to 255 - set value of increased attack speed
	Config.PacketCasting = 1; // 0 = disable, 1 = packet teleport, 2 = full packet casting.
	Config.WaypointMenu = true;

	// Monster skip config
	Config.SkipException = [getLocaleString(2851), getLocaleString(2852), getLocaleString(2853)]; // vizer, de seis, infector
	Config.SkipEnchant = [];
	Config.SkipAura = [];

	// Attack config
	Config.AttackSkill = [0, 0, 0, 0, 0, 0, 0];
	Config.LowManaSkill = [0, 0];

	Config.BossPriority = false;
	Config.ClearType = 0;
	Config.ClearPath = {
		Range: 9,
		Spectype: 0,
	};

	//Runewords, Cubing, & Crafting
	Config.Cubing = me.gametype === 1 ? me.getItem(549) : false;
	Config.MakeRunewords = me.gametype === 1 ? true : false;

	//AutoStat
	Config.AutoStat.Enabled = true;
	Config.AutoStat.Save = 0;
	Config.AutoStat.BlockChance = 75;
	Config.AutoStat.UseBulk = true;

	//AutoSkill
	Config.AutoSkill.Enabled = true;
	Config.AutoSkill.Save = 0;

	//AutoBuild
	Config.AutoBuild.Enabled = true;
	Config.AutoBuild.Verbose = true;
	Config.AutoBuild.DebugMode = true;

	// Class specific config
	Config.AvoidDolls = true;
	Config.Vigor = true;
	Config.Charge = true;
	Config.Redemption = [45, 25];

	/*-----------------------------------------*/
	//			DO NOT TOUCH BELOW 			   //
	/*-----------------------------------------*/

	if (!isIncluded("common/Storage.js")) {
		include("common/Storage.js");
	}

	if (!isIncluded("common/Misc.js")) {
		include("common/Misc.js");
	}

	if (!isIncluded("NTItemParser.dbl")) {
		include("NTItemParser.dbl");
	}

	if (!isIncluded("bots/SoloLeveling.js")) {
		include("bots/SoloLeveling.js");
	}

	this.configBelt = function () {
		let numColumns = Math.max(1, Storage.BeltSize() - 1);

		for (let i = 0; i < Config.BeltColumn.length; i++) {
			if (Config.BeltColumn[i] === "rv") {
				Config.MinColumn[i] = 0;
			} else {
				Config.MinColumn[i] = numColumns;
			}
		}
	};

	var specPush = function (specType) {
		function getBuildTemplate () {
			let buildType;

			if (me.charlvl < respecOne) {
				buildType = startBuild;
			}

			if (me.charlvl >= respecOne && me.charlvl < respecTwo) {
				buildType = middleBuild;
			}

			if (me.charlvl >= respecTwo) {
				buildType = finalBuild;
			}

			let build = buildType + "Build" ;
			const classname = ["Amazon", "Sorceress", "Necromancer", "Paladin", "Barbarian", "Druid", "Assassin"][me.classid];
			let template = "config/Builds/SoloLeveling/" + classname + "." + build + ".js";

			return template.toLowerCase();
		}

		var template = getBuildTemplate();

		if (!include(template)) {
			throw new Error("Failed to include template: " + template);
		}

		let specCheck = [];

		switch (specType) {
		case "skills":
			specCheck = JSON.parse(JSON.stringify(build.skills));	//push skills value from template file
			break;
		case "stats":
			specCheck = JSON.parse(JSON.stringify(build.stats)); //push stats value from template file
			break;
		}

		return specCheck;
	};

	var haveItem = function (type, flag, iName) {
		if (type && !NTIPAliasType[type]) {
			throw new Error("No alias for type '" + type + "'");
		}

		if (iName !== undefined) {
			iName = iName.toLowerCase();
		}

		let items = me.getItems();
		let itemCHECK = false;

		for (let i = 0; i < items.length && !itemCHECK; i++) {

			switch (flag) {
			case 'crafted':
				itemCHECK = !!(items[i].getFlag(NTIPAliasQuality["crafted"]));
				break;
			case 'runeword':
				itemCHECK = !!(items[i].getFlag(NTIPAliasFlag["runeword"])) && items[i].fname.toLowerCase().includes(iName);
				break;
			}

			if (type) {
				itemCHECK = itemCHECK && (items[i].itemType === NTIPAliasType[type]);
			}
		}

		return itemCHECK;
	};

	// Character Build Setup

	const startBuild = "Start"; // build ends when reaching lvl 25
	const middleBuild = "Hammerdin"; // starts at 25 ends when reaching lvl 85
	const playStyle = finalBuild !== 'Hammerdin' ? 'Melee' : 'Caster';
	const startBelt = ["hp", "hp", "hp", "mp"];
	const middleBelt = ["hp", "hp", "mp", "mp"];
	const finalBelt = ["hp", "hp", "mp", "rv"];
	Config.BeltColumn = me.charlvl < respecOne ? startBelt : me.charlvl < respecTwo ? middleBelt : finalBelt;
	this.configBelt();

	Config.AutoSkill.Build = specPush("skills");
	Config.AutoStat.Build = specPush("stats");
	Config.AutoBuild.Template = me.charlvl < respecOne ? startBuild : me.charlvl < respecTwo ? middleBuild : finalBuild;

	var tiers = [
		//weapon
		"([Type] == Hammer || [Type] == Mace || [Type] == Scepter) && [flag] != ethereal # [enhanceddamage] >= 10 # [tier] == 1",
		"([Type] == Hammer || [Type] == Mace || [Type] == Scepter) && [flag] != ethereal # [enhanceddamage] >= 20 # [tier] == 2",
		"[Name] == WarScepter && [Flag] != Ethereal && [Quality] == Set # # [tier] == 4",
		"([Type] == Hammer || [Type] == Mace || [Type] == Sword || [Type] == Scepter) && [Flag] != Ethereal && [Quality] >= Magic # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab]+[SkillBlessedHammer]+[SkillConcentration] >= 2 # [Tier] == 5",
		"([Type] == Hammer || [Type] == Mace || [Type] == Sword || [Type] == Scepter) && [Flag] != Ethereal && [Quality] >= Magic # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab]+[SkillBlessedHammer]+[SkillConcentration] >= 4 # [Tier] == 6",
		//helmet
		"([type] == helm || [type] == circlet) && [flag] != ethereal # [fireresist]+[lightresist]+[coldresist] > 20 # [tier] == 1",
		"([type] == helm || [type] == circlet) && [flag] != ethereal # [fireresist]+[lightresist]+[coldresist] > 25 # [tier] == 2",
		"([type] == helm || [type] == circlet) && [flag] != ethereal # [fireresist]+[lightresist]+[coldresist] > 30 # [tier] == 3",
		"([type] == helm || [type] == circlet) && [flag] != ethereal # [fireresist]+[lightresist]+[coldresist] > 35 # [tier] == 4",
		"([type] == helm || [type] == circlet) && [flag] != ethereal # [fireresist]+[lightresist]+[coldresist] > 40 # [tier] == 5",
		"([type] == helm || [type] == circlet) && [flag] != ethereal # [fireresist]+[lightresist]+[coldresist] > 45 # [tier] == 6",
		"([type] == helm || [type] == circlet) && [flag] != ethereal # [fireresist]+[lightresist]+[coldresist] > 50 # [tier] == 7",
		"([type] == helm || [type] == circlet) && [flag] != ethereal # [fireresist]+[lightresist]+[coldresist] > 60 # [tier] == 8",
		"([type] == helm || [type] == circlet) && [flag] != ethereal # [fireresist]+[lightresist]+[coldresist] > 65 # [tier] == 9",
		"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab] >= 1 # [tier] == 10",
		//belt
		"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 10 # [tier] == 1",
		"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 15 # [tier] == 2",
		"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 20 # [tier] == 3",
		"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 21 && [maxhp] >= 1 # [tier] == 4",
		"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 21 && [maxhp] >= 5 # [tier] == 5",
		"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 21 && [maxhp] >= 10 # [tier] == 6",
		"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 21 && [maxhp] >= 15 # [tier] == 7",
		"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 21 && [maxhp] >= 20 # [tier] == 8",
		//boots
		"[Type] == Boots && [Flag] != Ethereal # [FireResist]+[ColdResist]+[LightResist] >= 10 # [Tier] == 1",
		"[Type] == Boots && [Flag] != Ethereal # [FireResist]+[ColdResist]+[LightResist] >= 15 # [Tier] == 2",
		"[Type] == Boots && [Flag] != Ethereal # [FireResist]+[ColdResist]+[LightResist] >= 20 # [Tier] == 3",
		"[Type] == Boots && [Flag] != Ethereal # [FireResist]+[ColdResist]+[LightResist] >= 25 # [Tier] == 4",
		"[Type] == Boots && [Flag] != Ethereal # [FireResist]+[ColdResist]+[LightResist] >= 30 # [Tier] == 5",
		"[Type] == Boots && [Flag] != Ethereal # [FireResist]+[ColdResist]+[LightResist] >= 35 # [Tier] == 6",
		"[Type] == Boots && [Flag] != Ethereal # [FireResist]+[ColdResist]+[LightResist] >= 40 # [Tier] == 7",
		//armor
		"[type] == armor && [flag] != ethereal # [maxhp] > 0 # [tier] == 1",
		"[type] == armor && [flag] != ethereal # ([maxhp] || [fireresist] || [lightresist] ||[coldresist]) >= 10 # [tier] == 2",
		"[type] == armor && [flag] != ethereal # ([maxhp] || [fireresist] || [lightresist] ||[coldresist]) >= 20 # [tier] == 3",
		"[type] == armor && [flag] != ethereal # [fireresist]+[coldresist]+[lightresist]+[poisonresist] > 30 || [MaxMana]+[MaxHP] > 80 # [Tier] == 4",
		"[type] == armor && [flag] != ethereal # [fireresist]+[coldresist]+[lightresist]+[poisonresist] > 30 && [MaxMana]+[MaxHP] > 30 # [Tier] == 5",
		"[type] == armor && [flag] != ethereal # [fireresist]+[coldresist]+[lightresist]+[poisonresist] > 30 && [MaxMana]+[MaxHP] > 60 # [Tier] == 7",
		//shield
		"[Type] == Shield && [Flag] != Ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 10 || [MaxMana]+[MaxHP] > 10 # [Tier] == 1",
		"[Type] == Shield && [Flag] != Ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 20 || [MaxMana]+[MaxHP] > 20 # [Tier] == 2",
		"[Type] == Shield && [Flag] != Ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 30 || [MaxMana]+[MaxHP] > 30 # [Tier] == 3",
		"[Type] == Shield && [Flag] != Ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 40 || [MaxMana]+[MaxHP] > 40 # [Tier] == 4",
		"[Type] == Shield && [Flag] != Ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 50 || [MaxMana]+[MaxHP] > 50 # [Tier] == 5",
		"[Type] == Shield && [Flag] != Ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 50 && [MaxMana]+[MaxHP] > 20 # [Tier] == 6",
		"[Type] == Shield && [Flag] != Ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 50 && [MaxMana]+[MaxHP] > 30 # [Tier] == 7",
		"[Type] == Shield && [Flag] != Ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 50 && [MaxMana]+[MaxHP] > 40 # [Tier] == 8",
		"[Type] == Shield && [Flag] != Ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 50 && [MaxMana]+[MaxHP] > 50 # [Tier] == 9",
		//gloves
		"[type] == gloves && [flag] != ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 5  # [tier] == 1",
		"[type] == gloves && [flag] != ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 10 # [tier] == 2",
		"[type] == gloves && [flag] != ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 15 # [tier] == 3",
		"[type] == gloves && [flag] != ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 20 # [tier] == 4",
		"[type] == gloves && [flag] != ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 25 # [tier] == 5",
		"[type] == gloves && [flag] != ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 30 # [tier] == 6",
		"[type] == gloves && [flag] != ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 30 || [MaxMana]+[MaxHP] >= 20 # [tier] == 7",
		"[type] == gloves && [flag] != ethereal # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 40 || [MaxMana]+[MaxHP] >= 40 # [tier] == 8",
		"[name] == gauntlets && [quality] == unique && [flag] != ethereal  # [itemmaxmanapercent] == 40 # [tier] == 9",
		"[name] == lightgauntlets && [quality] == unique && [flag] != ethereal # [fcr] >= 20 # [tier] == 11",
		//ammy
		"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 10 || [MaxMana]+[MaxHP] > 10 # [Tier] == 1",
		"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 15 || [MaxMana]+[MaxHP] > 15 # [Tier] == 2",
		"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 20 || [MaxMana]+[MaxHP] > 20 # [Tier] == 3",
		"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 25 || [MaxMana]+[MaxHP] > 25 # [Tier] == 4",
		"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 30 || [MaxMana]+[MaxHP] > 30 # [Tier] == 5",
		"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 30 && [MaxMana]+[MaxHP] > 10 # [Tier] == 6",
		"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 30 && [MaxMana]+[MaxHP] > 15 # [Tier] == 7",
		"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 30 && [MaxMana]+[MaxHP] > 20 # [Tier] == 8",
		"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 30 && [MaxMana]+[MaxHP] > 25 # [Tier] == 9",
		"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 30 && [MaxMana]+[MaxHP] > 30 # [Tier] == 10",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab] >= 1 && ([FireResist]+[ColdResist]+[LightResist] > 0 || [MaxMana]+[MaxHP] > 0 || [FCR] >= 10)# [tier] == 11",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab] >= 1 && ([FireResist]+[ColdResist]+[LightResist] > 10 || [MaxMana]+[MaxHP] > 10 || [FCR] >= 10)# [tier] == 12",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab] >= 1 && ([FireResist]+[ColdResist]+[LightResist] > 15 || [MaxMana]+[MaxHP] > 15 || [FCR] >= 10)# [tier] == 13",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab] >= 1 && ([FireResist]+[ColdResist]+[LightResist] > 20 || [MaxMana]+[MaxHP] > 20 || [FCR] >= 10)# [tier] == 14",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab] >= 1 && ([FireResist]+[ColdResist]+[LightResist] > 25 || [MaxMana]+[MaxHP] > 25 || [FCR] >= 10)# [tier] == 15",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab] >= 1 && [FCR] >= 10 && ([FireResist]+[ColdResist]+[LightResist] > 20 || [MaxMana]+[MaxHP] > 20)# [tier] == 16",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab] >= 1 && [FCR] >= 10 && ([FireResist]+[ColdResist]+[LightResist] > 25 || [MaxMana]+[MaxHP] > 25)# [tier] == 17",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab] >= 1 && [FCR] >= 10 && [FireResist]+[ColdResist]+[LightResist] > 25 && [MaxMana]+[MaxHP] > 0 # [tier] == 18",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab] >= 1 && [FCR] >= 10 && [FireResist]+[ColdResist]+[LightResist] > 25 && [MaxMana]+[MaxHP] > 10 # [tier] == 19",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab] >= 1 && [FCR] >= 10 && [FireResist]+[ColdResist]+[LightResist] > 25 && [MaxMana]+[MaxHP] > 15 # [tier] == 20",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab] >= 1 && [FCR] >= 10 && [FireResist]+[ColdResist]+[LightResist] > 25 && [MaxMana]+[MaxHP] > 20 # [tier] == 21",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab] >= 1 && [FCR] >= 10 && [FireResist]+[ColdResist]+[LightResist] > 25 && [MaxMana]+[MaxHP] > 25 # [tier] == 22",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab] >= 2 && [fcr] >= 10 && ([MaxMana] || [MaxHP]) > 30 && [fireresist]+[coldresist]+[lightresist] >= 30 # [tier] == 25",
		//rings
		"[Type] == Ring # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 10 || [MaxMana]+[MaxHP] > 10 # [Tier] == 1",
		"[Type] == Ring # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 20 || [MaxMana]+[MaxHP] > 20 # [Tier] == 2",
		"[Type] == Ring # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 30 || [MaxMana]+[MaxHP] > 30 # [Tier] == 3",
		"[Type] == Ring # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 20 && [MaxMana]+[MaxHP] > 10 # [Tier] == 4",
		"[Type] == Ring # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 20 && [MaxMana]+[MaxHP] > 20 # [Tier] == 5",
		"[Type] == Ring # [FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 30 && [MaxMana]+[MaxHP] > 30 # [Tier] == 6",
		"[Type] == Ring # ([FireResist]+[ColdResist]+[LightResist]+[PoisonResist] > 30 || [MaxMana]+[MaxHP] > 30) && [FCR] >= 10 # [Tier] == 7",
	];
	NTIP.arrayLooping(tiers);

	if (me.gametype === 1) { //LOD game gear
		var expansionTiers = [
			//weapon
			"[type] == mace && [flag] == runeword # [ias] >= 25 # [tier] == 3",
			"[type] == sword && [flag] == runeword # [fcr] >= 25 && [maxmana] >= 89 # [tier] == 7",
			//helm
			"([type] == helm || [type] == circlet) && [flag] == runeword # [LightResist] >= 25 # [tier] == 11", //lore
			"[Name] == sallet && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 160 # [tier] == 12",
			"[name] == shako && [quality] == unique && [flag] != ethereal # [DamageResist] == 10 # [tier] == 13",
			//belt
			"[Name] == MithrilCoil && [Quality] == Unique && [Flag] != Ethereal # [DamageResist] >= 10 && [Vitality] >= 30 # [tier] == 9",
			"[Name] == MithrilCoil && [Quality] == Unique && [Flag] != Ethereal # [DamageResist] >= 13 && [Vitality] >= 30 # [tier] == 10",
			"[Name] == MithrilCoil && [Quality] == Unique && [Flag] != Ethereal # [DamageResist] >= 15 && [Vitality] >= 31 # [tier] == 11",
			"[Name] == MithrilCoil && [Quality] == Unique && [Flag] != Ethereal # [DamageResist] >= 15 && [Vitality] >= 34 # [tier] == 12",
			"[Name] == MithrilCoil && [Quality] == Unique && [Flag] != Ethereal # [DamageResist] >= 15 && [Vitality] >= 37 # [tier] == 13",
			"[Name] == MithrilCoil && [Quality] == Unique && [Flag] != Ethereal # [DamageResist] >= 15 && [Vitality] >= 40 # [tier] == 14",
			//boots
			"[name] == sharkskinboots && [quality] == unique && [flag] != ethereal # [maxhp] >= 45 # [Tier] == 8",
			"[name] == sharkskinboots && [quality] == unique && [flag] != ethereal # [maxhp] >= 48 # [Tier] == 9",
			"[name] == sharkskinboots && [quality] == unique && [flag] != ethereal # [maxhp] >= 51 # [Tier] == 10",
			"[name] == sharkskinboots && [quality] == unique && [flag] != ethereal # [maxhp] >= 54 # [Tier] == 11",
			"[name] == sharkskinboots && [quality] == unique && [flag] != ethereal # [maxhp] >= 57 # [Tier] == 12",
			"[name] == sharkskinboots && [quality] == unique && [flag] != ethereal # [maxhp] >= 60 # [Tier] == 13",
			"[name] == sharkskinboots && [quality] == unique && [flag] != ethereal # [maxhp] >= 63 # [Tier] == 14",
			"[name] == sharkskinboots && [quality] == unique && [flag] != ethereal # [maxhp] >= 64 # [Tier] == 15",
			"[name] == sharkskinboots && [quality] == unique && [flag] != ethereal # [maxhp] >= 65 # [Tier] == 16",
			//armor
			"[type] == armor && [flag] == runeword # [frw] == 25 && [fcr] == 25 # [tier] == 6", //stealth
			"[type] == armor && [quality] == unique && [flag] != ethereal # [ItemAllSkills]+[PaladinSkills]+[PaliCombatSkillTab] >= 1 # [tier] == 8",
			"[type] == armor && [flag] == runeword # [fireresist] == 50 # [tier] == 9", //smoke
			"[name] == serpentskinarmor && [quality] == unique && [flag] != ethereal # [fireresist] >= 30 # [tier] == 10",
			"[type] == armor && [flag] == runeword # [frw] >= 45 # [tier] == 100", //Enigma
			//shield
			"([type] == shield || [type] == auricshields) && [flag] == runeword # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 187 # [tier] == 10", //ap
			"([type] == shield || [type] == auricshields) && [flag] == runeword  # [fcr] >= 25 && [maxmana] >= 89 # [tier] == 5", // spirit
			"([type] == shield || [type] == auricshields) && [flag] == runeword  # [fcr] >= 25 && [maxmana] >= 89 && [fireresist] >= 10 # [tier] == 11", // spirit
			"([type] == shield || [type] == auricshields) && [flag] == runeword  # [fcr] >= 25 && [maxmana] >= 89 && [fireresist] >= 20 # [tier] == 12", // spirit
			"([type] == shield || [type] == auricshields) && [flag] == runeword  # [fcr] >= 25 && [maxmana] >= 89 && [fireresist] >= 25 # [tier] == 13", // spirit
			"([type] == shield || [type] == auricshields) && [flag] == runeword  # [fcr] >= 25 && [maxmana] >= 89 && [fireresist] >= 30 # [tier] == 14", // spirit
			"([type] == shield || [type] == auricshields) && [flag] == runeword  # [fcr] >= 25 && [maxmana] >= 89 && [fireresist] >= 35 # [tier] == 15", // spirit
			"([type] == shield || [type] == auricshields) && [flag] == runeword  # [fcr] >= 25 && [maxmana] >= 89 && [fireresist] >= 40 # [tier] == 16", // spirit
			"([type] == shield || [type] == auricshields) && [flag] == runeword  # [fcr] >= 25 && [maxmana] >= 89 && [fireresist] >= 45 # [tier] == 17", // spirit
			//gloves
			"[name] == heavybracers && [quality] == set && [flag] != ethereal # [fcr] >= 20 # [tier] == 10",
		];
		NTIP.arrayLooping(expansionTiers);

		if (me.diff === 0) { // Steel, Stealth & AP

			if (me.charlvl < respecOne) { //Steel
				NTIP.addLine("[type] == mace && [flag] == runeword # [ias] >= 25 # [tier] == 30");

				if (Item.getEquippedItem(4).tier < 3) { // Steel
					if (!haveItem("sword", "runeword", "Steel")) {
						var steel = [
							"[Name] == TirRune # # [MaxQuantity] == 1",
							"[Name] == ElRune # # [MaxQuantity] == 1",
							"[name] == mace && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1"
						];
						NTIP.arrayLooping(steel);

						Config.Runewords.push([Runeword.Steel, "Mace"]);
						Config.KeepRunewords.push("[type] == mace # [plusmindamage] >= 3 && [plusmaxdamage] >= 3");
					}
				}
			}

			if (Item.getEquippedItem(3).tier < 6) { // Stealth
				if (!haveItem("armor", "runeword", "Stealth")) {
					var stealth = [
						"[Name] == TalRune # # [MaxQuantity] == 1",
						"[Name] == EthRune # # [MaxQuantity] == 1",
						"[Name] == StuddedLeather && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1",
					];
					NTIP.arrayLooping(stealth);

					Config.Runewords.push([Runeword.Stealth, "Studded Leather"]);
					Config.KeepRunewords.push("[type] == armor # [frw] == 25");
				}
			}

			if (Item.getEquippedItem(5).tier < 10) { // Ancients' Pledge
				if (!haveItem("shield", "runeword", "Ancients' Pledge")) {
					var AncientsPledge = [
						"[Name] == RalRune # # [MaxQuantity] == 1",
						"[Name] == OrtRune # # [MaxQuantity] == 1",
						"[Name] == TalRune # # [MaxQuantity] == 1",
						"([Name] == LargeShield || [Name] == KiteShield || [Name] == BoneShield) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1",
					];
					NTIP.arrayLooping(AncientsPledge);

					if (!me.getItem(618)) {
						Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
					}

					Config.Runewords.push([Runeword.AncientsPledge, "Large Shield"]);
					Config.Runewords.push([Runeword.AncientsPledge, "Kite Shield"]);
					Config.Runewords.push([Runeword.AncientsPledge, "Bone Shield"]);
					Config.KeepRunewords.push("[type] == shield # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 187");
				}
			}
		}

		if (me.diff !== 2) { // Lore & Strength
			if (Item.getEquippedItem(1).tier < 11) { // Lore
				if (!haveItem("helm", "runeword", "Lore")) {
					var Lore = [
						"[Name] == OrtRune # # [MaxQuantity] == 1",
						"[Name] == SolRune # # [MaxQuantity] == 1",
						"([Name] == Circlet || [Name] == FullHelm || [Name] == Mask || [Name] == BoneHelm) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1"
					];
					NTIP.arrayLooping(Lore);

					if (!me.getItem(618)) { // Cube Ort Rune
						Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
					}

					if (!me.getItem(621)) { // Cube Sol Rune
						Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
						Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
						Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
						Config.Recipes.push([Recipe.Rune, "Amn Rune"]);
					}

					Config.Runewords.push([Runeword.Lore, "Circlet"]);
					Config.Runewords.push([Runeword.Lore, "Full Helm"]);
					Config.Runewords.push([Runeword.Lore, "Mask"]);
					Config.Runewords.push([Runeword.Lore, "Bone Helm"]);

					Config.KeepRunewords.push("([type] == circlet || [type] == helm) # [LightResist] >= 25");
				}
			}

			// merc Strength
			var Strength = [
				"[Name] == AmnRune # # [MaxQuantity] == 1",
				"[Name] == TirRune # # [MaxQuantity] == 1",
				"([Name] == voulge || [Name] == poleaxe || [Name] == scythe || [Name] == warscythe || [Name] == halberd || [Name] == battlescythe || [Name] == partizan || [Name] == grimscythe) && [Quality] == Normal # [Sockets] == 2 # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(Strength);

			if (!me.getItem(620)) { //Amn Rune
				Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
				Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
				Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
			}

			Config.Runewords.push([Runeword.Strength, "Voulge"]);
			Config.Runewords.push([Runeword.Strength, "Poleaxe"]);
			Config.Runewords.push([Runeword.Strength, "Scythe"]);
			Config.Runewords.push([Runeword.Strength, "War Scythe"]);
			Config.Runewords.push([Runeword.Strength, "Halberd"]);
			Config.Runewords.push([Runeword.Strength, "Battle Scythe"]);
			Config.Runewords.push([Runeword.Strength, "Partizan"]);
			Config.Runewords.push([Runeword.Strength, "Grim Scythe"]);

			Config.KeepRunewords.push("[type] == polearm # [lifeleech] >= 7");
		}

		if (Item.getEquippedItem(3).tier < 9) { // Smoke
			if (!haveItem("armor", "runeword", "Smoke")) {
				var Smoke = [
					"[Name] == NefRune # # [MaxQuantity] == 1",
					"[Name] == LumRune # # [MaxQuantity] == 1",
					"([Name] == LightPlate || [Name] == GhostArmor || [Name] == SerpentskinArmor || [Name] == demonhidearmor ||[Name] == trellisedarmor ||[Name] == MagePlate) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(Smoke);

				if (!me.getItem(626)) { // Cube to Lum Rune
					Config.Recipes.push([Recipe.Rune, "Hel Rune"]); // cube Hel to Io
					Config.Recipes.push([Recipe.Rune, "Io Rune"]); // cube Io to Lum
				}

				Config.Runewords.push([Runeword.Smoke, "Light Plate"]);
				Config.Runewords.push([Runeword.Smoke, "Ghost Armor"]);
				Config.Runewords.push([Runeword.Smoke, "Serpentskin Armor"]);
				Config.Runewords.push([Runeword.Smoke, "demonhide armor"]);
				Config.Runewords.push([Runeword.Smoke, "trellised armor"]);
				Config.Runewords.push([Runeword.Smoke, "Mage Plate"]);

				Config.KeepRunewords.push("[type] == armor # [fireresist] == 50");
			}
		}

		if (Item.getEquippedItem(3).tier < 100) { // Enigma
			var Enigma = [
				"[Name] == JahRune",
				"[Name] == IthRune # # [MaxQuantity] == 1",
				"[Name] == BerRune",
				"([Name] == MagePlate || [Name] == DuskShroud || [Name] == WyrmHide || [Name] == ScarabHusk) && [Flag] != Ethereal && [Quality] == Normal # ([Sockets] == 0 || [Sockets] == 3) # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(Enigma);

			if (me.diff === 2) {
				Config.Recipes.push([Recipe.Socket.Armor, "Mage Plate", Roll.NonEth]);
				Config.Recipes.push([Recipe.Socket.Armor, "DuskShroud", Roll.NonEth]);
				Config.Recipes.push([Recipe.Socket.Armor, "WyrmHide", Roll.NonEth]);
				Config.Recipes.push([Recipe.Socket.Armor, "ScarabHusk", Roll.NonEth]);
			}

			if (me.getItem(639) && me.getItem(640)) {
				Config.Runewords.push([Runeword.Enigma, "Mage Plate", Roll.NonEth]);
				Config.Runewords.push([Runeword.Enigma, "DuskShroud", Roll.NonEth]);
				Config.Runewords.push([Runeword.Enigma, "WyrmHide", Roll.NonEth]);
				Config.Runewords.push([Runeword.Enigma, "ScarabHusk", Roll.NonEth]);

				Config.KeepRunewords.push("[type] == armor # [frw] >= 45");
			}
		}

		if (me.getItem(636)) { // CTA need Ohm first
			if (!haveItem("sword", "runeword", "Call To Arms")) {

				var CTA = [
					"[Name] == AmnRune # # [MaxQuantity] == 1",
					"[Name] == RalRune # # [MaxQuantity] == 1",
					"[Name] == MalRune",
					"[Name] == IstRune",
					"[Name] == OhmRune",
					"([Name] == CrystalSword || [Name] == Flail) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 5 # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(CTA);

				Config.Runewords.push([Runeword.CallToArms, "Crystal Sword"]);
				Config.Runewords.push([Runeword.CallToArms, "flail"]);
				Config.KeepRunewords.push("[type] == sword || [type] == mace # [plusskillbattleorders] >= 1");
			}
		}

		switch(playStyle) {
		case 'Melee':
			if (!haveItem("mace", "runeword", "Black") && me.charlvl >= respecTwo) {
				var Black = [
					"[Name] == ThulRune # # [MaxQuantity] == 1",
					"[Name] == IoRune # # [MaxQuantity] == 1",
					"[Name] == NefRune # # [MaxQuantity] == 1",
					"([Name] == Flail || [Name] == Knout) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(Black);

				Config.Runewords.push([Runeword.Black, "Flail"]);
				Config.Runewords.push([Runeword.Black, "Knout"]);
				Config.KeepRunewords.push("[Type] == mace # [ias] == 15 && [itemcrushingblow] == 40");
				NTIP.addLine("[Type] == mace && [flag] == runeword # [ias] == 15 && [itemcrushingblow] == 40 # [tier] == 100");
			}

			var finalMELEE = [
				//weapon -- using Black runeword 
				//helmet
				"[name] == wingedhelm && [quality] == set # [fhr] >= 30 # [tier] == 100", // gface
				//belt -- using Dungo's
				//boots
				"[name] == lightplatedboots && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 50 # [tier] == 100", //gtoes
				//armor -- using Enigma
				//shield
				"[Name] == SacredRondache && [Quality] == unique # [EnhancedDefense] >= 180 && [PaladinSkills] >= 2 && [Enhanceddamage] >= 40 && [itemtohitpercent] >= 40 && [magicdamagereduction] >= 5", // alma negra
				"[Name] == GildedShield && [Quality] == unique # [EnhancedDefense] >= 185 # [tier] == 100", //hoz
				//gloves
				"[name] == vampirebonegloves && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 100 && [strength] >= 12 && [lifeleech] >= 9  # [tier] == 100", // drac's
				//ammy
				"[type] == amulet && [quality] == unique # [lightresist] == 35 # [tier] == 100", //highlords
				//rings
				"[type] == ring && [quality] == unique # [tohit] >= 180 && [dexterity] >= 15 # [tier] == 99", // ravenfrost
				'[type] == ring && [quality] == unique # [lifeleech] >= 3 && [maxstamina] == 50 # [tier] == 100', // bul-kathos' wedding band
			];
			NTIP.arrayLooping(finalMELEE);

			break;
		case 'Caster':
			if (!haveItem("mace", "runeword", "Heart of the Oak") && me.charlvl >= respecTwo) {
				var HotO = [
					"[Name] == ThulRune # # [MaxQuantity] == 1",
					"[Name] == PulRune",
					"[Name] == KoRune # # [MaxQuantity] == 1",
					"[Name] == VexRune",
					"[Name] == Flail && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(HotO);

				if (!me.getItem(635)) {
					Config.Recipes.push([Recipe.Rune, "Um Rune"]);
					Config.Recipes.push([Recipe.Rune, "Mal Rune"]);
					Config.Recipes.push([Recipe.Rune, "Ist Rune"]);
					Config.Recipes.push([Recipe.Rune, "Gul Rune"]);
				}

				Config.Runewords.push([Runeword.HeartoftheOak, "Flail"]);
				Config.KeepRunewords.push("[Type] == mace # [FCR] == 40");
				NTIP.addLine("[Type] == mace && [flag] == runeword # [FCR] == 40 # [tier] == 100");
			}

			var finalCASTER = [
				//weapon -- using HotO runeword
				//helmet -- shako
				//belt
				"[name] == spiderwebsash && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 90 # [tier] == 100", //arach's
				//boots
				"[name] == lightplatedboots && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 50 # [tier] == 100", //goblin toes
				//armor -- using Enigma
				//shield -- using Spirit runeword
				//gloves -- using magefist
				//ammy
				"[type] == amulet && [quality] == unique # [strength] == 5 && [coldresist] >= 30 # [tier] == 100", //maras
				//rings
				"[name] == ring && [quality] == unique # [maxhp] >= 40 && [magicdamagereduction] >= 12 # [tier] == 99", // dwarfstar
				"[type] == ring && [quality] == unique # [itemmaxmanapercent] == 25 # [tier] == 100", //soj
			];
			NTIP.arrayLooping(finalCASTER);

			break;
		}

		if (me.ladder > 0) { // Ladder runewords - Spirit Sword/Shield & Insight

			if (Item.getEquippedItem(4).tier < 7) { // Spirit Sword
				if (!haveItem("sword", "runeword", "Spirit")) {
					var SpiritSword = [
						"[Name] == TalRune # # [MaxQuantity] == 1",
						"[Name] == ThulRune # # [MaxQuantity] == 1",
						"[Name] == OrtRune # # [MaxQuantity] == 1",
						"[Name] == AmnRune # # [MaxQuantity] == 1",
						"([Name] == BroadSword || [Name] == CrystalSword || [Name] == LongSword) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1",
					];
					NTIP.arrayLooping(SpiritSword);

					if (me.diff === 2) {
						NTIP.addLine("([Name] == BroadSword || [Name] == CrystalSword || [Name] == LongSword) && [Quality] == Normal # [Sockets] == 0 # [MaxQuantity] == 1");

						Config.Recipes.push([Recipe.Socket.Weapon, "Crystal Sword"]);
						Config.Recipes.push([Recipe.Socket.Weapon, "Broad Sword"]);
						Config.Recipes.push([Recipe.Socket.Weapon, "Long Sword"]);
					}

					if (!me.getItem(620)) { //Amn Rune
						Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
						Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
						Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
					}

					Config.Runewords.push([Runeword.Spirit, "Crystal Sword"]);
					Config.Runewords.push([Runeword.Spirit, "Broad Sword"]);
					Config.Runewords.push([Runeword.Spirit, "Long Sword"]);
					Config.KeepRunewords.push("[type] == sword # [fcr] >= 25 && [maxmana] >= 89");
				}
			}

			if (Item.getEquippedItem(5).tier < 17) { // Spirit shield
				var SpiritShield = [
					"[Name] == TalRune # # [MaxQuantity] == 1",
					"[Name] == ThulRune # # [MaxQuantity] == 1",
					"[Name] == OrtRune # # [MaxQuantity] == 1",
					"[Name] == AmnRune # # [MaxQuantity] == 1",
					"([Name] == AkaranTarge || [Name] == AkaranRondache || [Name] == GildedShield ||[Name] == ProtectorShield || [Name] == SacredRondache || [Name] == SacredTarge) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [fireresist] > 0 && [Sockets] == 4 # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(SpiritShield);

				if (me.diff === 2) {
					NTIP.addLine("([Name] == AkaranTarge || [Name] == AkaranRondache || [Name] == GildedShield ||[Name] == ProtectorShield || [Name] == SacredRondache || [Name] == SacredTarge) && [Quality] == Normal #  # [fireresist] > 20 && [Sockets] == 0 # [MaxQuantity] == 1");

					Config.Recipes.push([Recipe.Socket.Shield, "Akaran Targe"]);
					Config.Recipes.push([Recipe.Socket.Shield, "Akaran Rondache"]);
					Config.Recipes.push([Recipe.Socket.Shield, "Gilded Shield"]);
					Config.Recipes.push([Recipe.Socket.Shield, "Protector Shield"]);
					Config.Recipes.push([Recipe.Socket.Shield, "Sacred Rondache"]);
					Config.Recipes.push([Recipe.Socket.Shield, "Sacred Targe"]);
				}

				if (!me.getItem(620)) { //Amn Rune
					Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
					Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
					Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
				}

				Config.Runewords.push([Runeword.Spirit, "Akaran Targe"]);
				Config.Runewords.push([Runeword.Spirit, "Akaran Rondache"]);
				Config.Runewords.push([Runeword.Spirit, "Sacred Targe"]);
				Config.Runewords.push([Runeword.Spirit, "Sacred Rondache"]);
				Config.Runewords.push([Runeword.Spirit, "Gilded Shield"]);
				Config.Runewords.push([Runeword.Spirit, "Protector Shield"]);
				Config.KeepRunewords.push("([type] == shield || [type] == auricshields) # [fcr] >= 25 && [maxmana] >= 89");
			}

			// merc Insight
			var Insight = [
				"[Name] == RalRune # # [MaxQuantity] == 1",
				"[Name] == TirRune # # [MaxQuantity] == 1",
				"[Name] == TalRune # # [MaxQuantity] == 1",
				"[Name] == SolRune # # [MaxQuantity] == 1",
				"([Name] == thresher || [Name] == crypticaxe || [Name] == greatpoleaxe || [Name] == giantthresher) && [Quality] == Normal # ([Sockets] == 0 || [Sockets] == 4) # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(Insight);

			if (me.diff !== 2) {
				NTIP.addLine("([Name] == warscythe || [Name] == bill || [Name] == battlescythe || [Name] == partizan || [Name] == grimscythe) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1");

				Config.Runewords.push([Runeword.Insight, "War Scythe"]);
				Config.Runewords.push([Runeword.Insight, "Bill"]);
				Config.Runewords.push([Runeword.Insight, "Battle Scythe"]);
				Config.Runewords.push([Runeword.Insight, "Partizan"]);
				Config.Runewords.push([Runeword.Insight, "Grim Scythe"]);
			}

			Config.Recipes.push([Recipe.Socket.Weapon, "thresher"]);
			Config.Recipes.push([Recipe.Socket.Weapon, "Cryptic Axe"]);
			Config.Recipes.push([Recipe.Socket.Weapon, "Great Poleaxe"]);
			Config.Recipes.push([Recipe.Socket.Weapon, "Giant Thresher"]);

			Config.Runewords.push([Runeword.Insight, "Thresher"]);
			Config.Runewords.push([Runeword.Insight, "Cryptic Axe"]);
			Config.Runewords.push([Runeword.Insight, "Great Poleaxe"]);
			Config.Runewords.push([Runeword.Insight, "Giant Thresher"]);

			Config.KeepRunewords.push("[type] == polearm # [meditationaura] >= 12");
		}
	}
}
