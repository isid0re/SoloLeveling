// Sorceress.SoloLeveling.js config file
function LoadConfig () {
	Scripts.UserAddon = false; // !!!YOU MUST SET THIS TO FALSE IF YOU WANT TO RUN BOSS/AREA SCRIPTS!!!

	Scripts.SoloLeveling = true; // *** Leveling Script turn off when ready ***
	const finalBuild = "Meteorb";
	//const finalBuild = "Blizzard";
	//const finalBuild = "Lightning";
	//const finalBuild = "Blova";

	// Town settings
	Config.HealHP = 99;
	Config.HealMP = 99;
	Config.HealStatus = true;
	Config.UseMerc = true;
	Config.MercWatch = true;
	Config.ClearInvOnStart = false;

	// Potion settings
	Config.UseHP = 85;
	Config.UseRejuvHP = 65;
	Config.UseMP = 55;
	Config.UseMercHP = 75;
	Config.HPBuffer = 2;
	Config.MPBuffer = 10;
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
	Config.PickRange = 20;
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
	Config.LogExperience = false; // Print experience statistics in the manager.
	Config.PingQuit = [{Ping: 600, Duration: 10}];
	Config.Silence = true;
	Config.OpenChests = me.diff !== 0 ? true : false;

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
	Config.Dodge = !!me.getSkill(40, 0); // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
	Config.DodgeRange = 9; // Distance to keep from monsters.
	Config.DodgeHP = 85; // Dodge only if HP percent is less than or equal to Config.DodgeHP. 100 = always dodge.
	Config.TeleStomp = false; // Use merc to attack bosses if they're immune to attacks, but not to physical damage
	Config.CastStatic = 50;
	Config.StaticList = ["Izual", "Diablo", "Colenzo the Annihilator", "Achmel the Cursed", "Bartuc the Bloody", "Ventar the Unholy", "Lister the Tormentor", "Baal"];

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
				itemCHECK = !!(items[i].getFlag(NTIPAliasQuality.crafted));
				break;
			case 'runeword':
				itemCHECK = !!(items[i].getFlag(NTIPAliasFlag.runeword)) && items[i].fname.toLowerCase().includes(iName);
				break;
			}

			if (type) {
				itemCHECK = itemCHECK && (items[i].itemType === NTIPAliasType[type]);
			}
		}

		return itemCHECK;
	};

	// Character Build Setup
	const startBuild = "Start"; // build ends when reaching lvl 30
	const middleBuild = "Blizzard"; // starts at 30 ends when reaching lvl 75
	const startBelt = ["hp", "hp", "hp", "mp"];
	const middleBelt = ["hp", "hp", "mp", "mp"];
	const finalBelt = ["hp", "hp", "mp", "rv"];
	Config.BeltColumn = me.charlvl < respecOne ? startBelt : me.charlvl < respecTwo ? middleBelt : finalBelt;
	this.configBelt();

	Config.NoTele = me.charlvl < respecOne ? true : false;

	Config.AutoSkill.Build = specPush("skills");
	Config.AutoStat.Build = specPush("stats");
	Config.AutoBuild.Template = me.charlvl < respecOne ? startBuild : me.charlvl < respecTwo ? middleBuild : finalBuild;

	var tiers = [
		//weapon
		"[type] == wand # [fcr] == 10 # [Tier] == 1",
		"[type] == wand # [fcr] == 10 && [maxmana] >= 20 # [Tier] == 2",
		"[type] == wand # [fcr] == 20 && [maxmana] >= 20 && [fireresist]+[lightresist]+[coldresist] >= 0 # [Tier] == 3",
		"[type] == wand # [fcr] == 20 && [maxmana] >= 20 && [fireresist]+[lightresist]+[coldresist] >= 20 # [Tier] == 4",
		"[type] == wand # [fcr] == 20 && [maxmana] >= 20 && [fireresist]+[lightresist]+[coldresist] >= 30 # [Tier] == 5",
		"[type] == wand # [fcr] == 20 && [maxmana] >= 20 && [fireresist]+[lightresist]+[coldresist] >= 40 && [maxhp] >= 0 # [Tier] == 6",
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
		"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 # [tier] == 10",
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
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab] >= 1 && ([FireResist]+[ColdResist]+[LightResist] > 0 || [MaxMana]+[MaxHP] > 0 || [FCR] >= 10)# [tier] == 11",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab] >= 1 && ([FireResist]+[ColdResist]+[LightResist] > 10 || [MaxMana]+[MaxHP] > 10 || [FCR] >= 10)# [tier] == 12",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab] >= 1 && ([FireResist]+[ColdResist]+[LightResist] > 15 || [MaxMana]+[MaxHP] > 15 || [FCR] >= 10)# [tier] == 13",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab] >= 1 && ([FireResist]+[ColdResist]+[LightResist] > 20 || [MaxMana]+[MaxHP] > 20 || [FCR] >= 10)# [tier] == 14",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab] >= 1 && ([FireResist]+[ColdResist]+[LightResist] > 25 || [MaxMana]+[MaxHP] > 25 || [FCR] >= 10)# [tier] == 15",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab] >= 1 && [FCR] >= 10 && ([FireResist]+[ColdResist]+[LightResist] > 20 || [MaxMana]+[MaxHP] > 20)# [tier] == 16",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab] >= 1 && [FCR] >= 10 && ([FireResist]+[ColdResist]+[LightResist] > 25 || [MaxMana]+[MaxHP] > 25)# [tier] == 17",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab] >= 1 && [FCR] >= 10 && [FireResist]+[ColdResist]+[LightResist] > 25 && [MaxMana]+[MaxHP] > 0 # [tier] == 18",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab] >= 1 && [FCR] >= 10 && [FireResist]+[ColdResist]+[LightResist] > 25 && [MaxMana]+[MaxHP] > 10 # [tier] == 19",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab] >= 1 && [FCR] >= 10 && [FireResist]+[ColdResist]+[LightResist] > 25 && [MaxMana]+[MaxHP] > 15 # [tier] == 20",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab] >= 1 && [FCR] >= 10 && [FireResist]+[ColdResist]+[LightResist] > 25 && [MaxMana]+[MaxHP] > 20 # [tier] == 21",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab] >= 1 && [FCR] >= 10 && [FireResist]+[ColdResist]+[LightResist] > 25 && [MaxMana]+[MaxHP] > 25 # [tier] == 22",
		"[Type] == Amulet && [Quality] >= Magic # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab] >= 2 && [fcr] >= 10 && ([MaxMana] || [MaxHP]) > 30 && [fireresist]+[coldresist]+[lightresist] >= 30 # [tier] == 25",
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

		var expansionunderRespecOne = [
			//weapon
			"[Type] == Orb # [ItemAllSkills]+[SorceressSkills]+[lightningskilltab]+[skillchargedbolt] >= 1 # [Tier] == 7",
			"[Type] == Orb # [ItemAllSkills]+[SorceressSkills]+[lightningskilltab]+[skillchargedbolt] >= 1 && [FCR] >= 10 # [Tier] == 8",
			"[Type] == Orb # [ItemAllSkills]+[SorceressSkills]+[lightningskilltab]+[skillchargedbolt] >= 1 && [FCR] >= 20 # [Tier] == 9",
			"[Type] == Orb # [ItemAllSkills]+[SorceressSkills]+[lightningskilltab]+[skillchargedbolt] >= 2 && [FCR] >= 20 # [Tier] == 10",
		];
		NTIP.arrayLooping(expansionunderRespecOne);

		var expansionTiers = [
			//weapon
			"[Type] == Orb # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 # [Tier] == 11",
			"[Type] == Orb # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && [FCR] >= 10 # [Tier] == 12",
			"[Type] == Orb # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 2 && [FCR] >= 10 # [Tier] == 13",
			"[Type] == Orb # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 2 && [FCR] >= 20 # [Tier] == 14",
			"[Type] == Orb # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 4 # [Tier] == 15",
			"[Type] == Orb # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 4 && [FCR] >= 20 # [Tier] == 16",
			"[type] == sword && [flag] == runeword # [fcr] >= 25 && [maxmana] >= 89 # [tier] == 17",
			"[type] == sword && [flag] == runeword # [fcr] >= 35 && [maxmana] >= 89 # [tier] == 18",
			"[Name] == SwirlingCrystal && [Quality] == Set # [SkillColdMastery] == 2 # [Tier] == 19",
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
			"[name] == spiderwebsash && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 90 # [tier] == 15",
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
			"[type] == armor && [quality] == unique && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab] >= 1 # [tier] == 8",
			"[type] == armor && [flag] == runeword # [fireresist] == 50 # [tier] == 9", //smoke
			"[name] == serpentskinarmor && [quality] == unique && [flag] != ethereal # [fireresist] >= 30 # [tier] == 10",
			"[name] == lacqueredplate && [quality] == set && [flag] != ethereal # # [tier] == 11",
			"[type] == armor && [flag] == runeword # [strength] == 25 && [fireresist] == 30 # [tier] == 12", //lionheart
			//shield
			"[type] == shield && [flag] == runeword # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 187 # [tier] == 10", // AP
			"([type] == shield || [type] == auricshields) && [flag] == runeword # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 200 # [tier] == 11", // sanctuary
			"([type] == shield || [type] == auricshields) # [fcr] >= 35 && [maxmana] >= 89 # [tier] == 12", //spirit
			//gloves
			"[name] == heavybracers && [quality] == set && [flag] != ethereal # [fcr] >= 20 # [tier] == 10",
			//ammy
			"[Type] == Amulet && [Quality] >= Set # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab] == 2 # [Tier] == 23",
			"[type] == amulet && [quality] == unique # [strength] == 5 && [coldresist] >= 25 # [tier] == 24",
			//rings
			"[name] == ring && [quality] == unique # [maxhp] >= 40 && [magicdamagereduction] >= 12 # [tier] == 99",
			"[type] == ring && [quality] == unique # [itemmaxmanapercent] == 25 # [tier] == 100",
		];
		NTIP.arrayLooping(expansionTiers);

		if (me.diff === 0) { // Stealth & AP
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
				"([Name] == voulge || [Name] == poleaxe || [Name] == scythe || [Name] == warscythe || [Name] == halberd) && [Quality] == Normal # [Sockets] == 2 # [MaxQuantity] == 1",
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

			Config.KeepRunewords.push("[type] == polearm # [lifeleech] >= 7");
		}

		if (Item.getEquippedItem(5).tier < 11) { // Sanctuary
			if (!haveItem("shield", "runeword", "Sanctuary")) {
				var Sanctuary = [
					"[Name] == KoRune # # [MaxQuantity] == 2",
					"[Name] == MalRune",
					"[Name] == trollnest && [Flag] != Ethereal && [Quality] == Normal # ([Sockets] == 0 || [Sockets] == 3) # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(Sanctuary);

				if (!me.getItem(632)) { // Cube to Mal Rune
					Config.Recipes.push([Recipe.Rune, "Pul Rune"]);
					Config.Recipes.push([Recipe.Rune, "Um Rune"]);
				}

				Config.Recipes.push([Recipe.Socket.Shield, "Troll Nest"]);
				Config.Runewords.push([Runeword.Sanctuary, "Troll Nest"]);

				Config.KeepRunewords.push("[type] == shield # [fireresist] >= 50");
			}
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

		if (Item.getEquippedItem(3).tier < 12) { // Lionheart
			var Lionheart = [
				"[Name] == HelRune # # [MaxQuantity] == 1",
				"[Name] == LumRune # # [MaxQuantity] == 1",
				"[Name] == FalRune # # [MaxQuantity] == 1",
				"([Name] == MagePlate || [Name] == DuskShroud || [Name] == WyrmHide || [Name] == ScarabHusk) && [Flag] != Ethereal && [Quality] == Normal # ([Sockets] == 0 || [Sockets] == 3) # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(Lionheart);

			if (!me.getItem(624)) { // Cube to Hel Rune
				Config.Recipes.push([Recipe.Rune, "Shael Rune"]); // cube Shael to Dol
				Config.Recipes.push([Recipe.Rune, "Dol Rune"]); // cube Dol to Hel
			}

			if (!me.getItem(626)) { // Cube to Lum Rune
				Config.Recipes.push([Recipe.Rune, "Dol Rune"]); // cube Dol to Hel
				Config.Recipes.push([Recipe.Rune, "Hel Rune"]); // cube Hel to Io
				Config.Recipes.push([Recipe.Rune, "Io Rune"]); // cube Io to Lum
			}

			if (!me.getItem(628)) { // Cube to Fal Rune
				Config.Recipes.push([Recipe.Rune, "Ko Rune"]); // cube Ko to Fal
			}

			Config.Recipes.push([Recipe.Socket.Armor, "Mage Plate"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Dusk Shroud"]);
			Config.Recipes.push([Recipe.Socket.Armor, "WyrmHide"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Scarab Husk"]);

			Config.Runewords.push([Runeword.Lionheart, "Mage Plate"]);
			Config.Runewords.push([Runeword.Lionheart, "Dusk Shroud"]);
			Config.Runewords.push([Runeword.Lionheart, "WyrmHide"]);
			Config.Runewords.push([Runeword.Lionheart, "Scarab Husk"]);

			Config.KeepRunewords.push("[Type] == armor # [strength] == 25 && [fireresist] == 30");
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

		var Treachery = [ // merc Treachery
			"[Name] == ShaelRune # # [MaxQuantity] == 1",
			"[Name] == ThulRune # # [MaxQuantity] == 1",
			"[Name] == LemRune # # [MaxQuantity] == 1",
			"([Name] == ArchonPlate || [Name] == DuskShroud || [Name] == MagePlate || [Name] == WireFleece) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3",
		];
		NTIP.arrayLooping(Treachery);

		if (me.diff === 2) {
			NTIP.addLine("([Name] == ArchonPlate || [Name] == DuskShroud || [Name] == MagePlate || [Name] == WireFleece) && [Quality] == Normal && [Flag] == Ethereal # [Sockets] == 0");

			Config.Recipes.push([Recipe.Socket.Armor, "Archon Plate"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Mage Plate"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Wire Fleece"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Dusk Shroud"]);
		}

		Config.Runewords.push([Runeword.Treachery, "Archon Plate"]);
		Config.Runewords.push([Runeword.Treachery, "Mage Plate"]);
		Config.Runewords.push([Runeword.Treachery, "Wire Fleece"]);
		Config.Runewords.push([Runeword.Treachery, "Dusk Shroud"]);

		Config.KeepRunewords.push("[Type] == armor # [ias] == 45 && [coldresist] == 30");

		if (me.ladder > 0) { // Ladder runewords - Spirit Sword/Shield & Insight

			if (Item.getEquippedItem(4).tier < 18) { // Spirit Sword
				var SpiritSword = [
					"[Name] == TalRune # # [MaxQuantity] == 1",
					"[Name] == ThulRune # # [MaxQuantity] == 1",
					"[Name] == OrtRune # # [MaxQuantity] == 1",
					"[Name] == AmnRune # # [MaxQuantity] == 1",
					"([Name] == BroadSword || [Name] == CrystalSword) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(SpiritSword);

				if (me.diff === 2) {
					NTIP.addLine("([Name] == BroadSword || [Name] == CrystalSword) && [Quality] == Normal # [Sockets] == 0 # [MaxQuantity] == 1");

					Config.Recipes.push([Recipe.Socket.Weapon, "Crystal Sword"]);
					Config.Recipes.push([Recipe.Socket.Weapon, "Broad Sword"]);
				}

				if (!me.getItem(620)) { //Amn Rune
					Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
					Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
					Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
				}

				Config.Runewords.push([Runeword.Spirit, "Crystal Sword"]);
				Config.Runewords.push([Runeword.Spirit, "Broad Sword"]);
				Config.KeepRunewords.push("[type] == sword # [fcr] >= 25 && [maxmana] >= 89");
			}

			if (Item.getEquippedItem(5).tier < 12) { // Spirit shield
				if (!haveItem("shield", "runeword", "Spirit") || !haveItem("auricshields", "runeword", "Spirit")) {
					var SpiritShield = [
						"[Name] == TalRune # # [MaxQuantity] == 1",
						"[Name] == ThulRune # # [MaxQuantity] == 1",
						"[Name] == OrtRune # # [MaxQuantity] == 1",
						"[Name] == AmnRune # # [MaxQuantity] == 1",
						"[Name] == Monarch && [Flag] != Ethereal && [Quality] == Normal # ([Sockets] == 0 || [Sockets] == 4) # [MaxQuantity] == 1",
					];
					NTIP.arrayLooping(SpiritShield);

					Config.Recipes.push([Recipe.Socket.Shield, "Monarch", Roll.NonEth]);

					Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
					Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
					Config.Recipes.push([Recipe.Rune, "Thul Rune"]);

					Config.Runewords.push([Runeword.Spirit, "Monarch"]);
					Config.KeepRunewords.push("([type] == shield || [type] == auricshields) # [fcr] >= 35 && [maxmana] >= 89");
				}
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
				NTIP.addLine("([Name] == bill || [Name] == battlescythe || [Name] == partizan || [Name] == grimscythe) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1");

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
