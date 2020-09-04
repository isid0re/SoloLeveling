// Paladin.Hammerdin.js config file
function LoadConfig () {
	Scripts.UserAddon = false; // !!!YOU MUST SET THIS TO FALSE IF YOU WANT TO RUN BOSS/AREA SCRIPTS!!!

	Scripts.SoloLeveling = true; // *** Leveling Script turn off when ready ***
		//const finalBuild = "Auradin";
		const finalBuild = "Hammerdin";
		//const finalBuild = "Smiter";
		//const finalBuild = "Zealot";

	// Town settings
	Config.HealHP = 65;
	Config.HealMP = 65;
	Config.HealStatus = true;
	Config.UseMerc = true;
	Config.MercWatch = true;

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
	Config.PickRange = 12;
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
	Config.TownCheck = true;
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
	Config.PacketCasting = 2; // 0 = disable, 1 = packet teleport, 2 = full packet casting.
	Config.WaypointMenu = true;
	
	// Monster skip config
	Config.SkipImmune = [];
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
	Config.Cubing = me.getItem(549);
	Config.MakeRunewords = true;
	
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

		iName = iName.toLowerCase();
		let items = me.getItems();
		let itemCHECK = false;

		for (let i = 0; i < items.length && !itemCHECK; i++) {
		
			switch(flag) {
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
	const respecOne = 25;
	const respecTwo = 85;
	//const respecTwo = global.respec2;
	//D2Bot.printToConsole(respecLevel);
	const startBuild = "Start"; // build ends when reaching lvl 25
	const middleBuild = "Hammerdin"; // starts at 25 ends when reaching lvl 85
	const startBelt = ["hp", "hp", "hp", "hp"]; 
	const middleBelt = ["hp", "hp", "mp", "mp"]; 
	const finalBelt = ["hp", "hp", "mp", "rv"]; 
	Config.BeltColumn = me.charlvl < respecOne ? startBelt : me.charlvl < respecTwo ? middleBelt : finalBelt;
	this.configBelt();
	
	Config.AutoSkill.Build = specPush("skills");
	Config.AutoStat.Build = specPush("stats");
	Config.AutoBuild.Template = me.charlvl < respecOne ? startBuild : me.charlvl < respecTwo ? middleBuild : finalBuild;

	var TiersTillRespecOne = [
		"([type] == circlet || [type] == helm) && [flag] != ethereal # ([fireresist] || [lightresist] || [coldresist] || [poisonresist]) > 0 # [tier] == 1",
		"([type] == circlet || [type] == helm) && [flag] != ethereal # ([fireresist] || [lightresist]) >= 10 # [tier] == 2",
		"([type] == circlet || [type] == helm) && [flag] != ethereal # ([fireresist] || [lightresist]) >= 20 # [tier] == 3",
		"[type] == amulet && [quality] <= rare # ([fireresist] || [lightresist]) > 0 # [tier] == 1",
		"[type] == amulet && [quality] <= rare # ([fireresist] || [lightresist]) > 20 # [tier] == 2",
		"[type] == armor && [flag] != ethereal # [maxhp] > 0 # [tier] == 1",
		"[type] == armor && [flag] != ethereal # ([maxhp] || [fireresist] || [lightresist] ||[coldresist]) >= 10 # [tier] == 2",
		"[type] == armor && [flag] != ethereal # ([maxhp] || [fireresist] || [lightresist] ||[coldresist]) >= 20 # [tier] == 3",
		"[type] == armor && [flag] == runeword # [frw] == 25 && [poisonresist] == 30 # [tier] == 4",
		"[type] == scepter && [flag] != ethereal # [enhanceddamage] >= 10 # [tier] == 1",
		"[type] == scepter && [flag] != ethereal # [enhanceddamage] >= 20 # [tier] == 2",
		"[type] == mace && [flag] == runeword # [ias] >= 25 # [tier] == 30",
		"[type] == shield && [flag] != ethereal # [fireresist]+[lightresist]+[coldresist] > 0 # [tier] == 1",
		"[type] == shield && [flag] != ethereal # [fireresist]+[lightresist]+[coldresist] > 10 # [tier] == 2",
		"[type] == shield && [flag] != ethereal # [fireresist]+[lightresist]+[coldresist] > 20 # [tier] == 3",
		"[type] == ring # ([fireresist] || [lightresist]) > 0 # [tier] == 1",
		"[type] == ring # ([fireresist] || [lightresist]) > 20 # [tier] == 2",
		"[type] == belt && [flag] != ethereal # [maxhp] > 0 # [tier] == 1",
		"[type] == belt && [flag] != ethereal # [maxhp] > 10 # [tier] == 2",
		"[type] == belt && [flag] != ethereal # [maxhp] > 20 # [tier] == 3",
		"[type] == boots && [flag] != ethereal # [fireresist] > 0 # [tier] == 1",
		"[type] == boots && [flag] != ethereal # [fireresist] > 10 # [tier] == 2",
		"[type] == gloves && [flag] != ethereal # ([fireresist] || [lightresist]) > 0 # [tier] == 1",
		"[type] == gloves && [flag] != ethereal # ([fireresist] || [lightresist]) > 10 # [tier] == 2",
	];
		
	var tiers = [
		//weapon
		"[type] == scepter && [flag] != ethereal # [skillconcentration] >= 1 && [skillblessedhammer] >= 1 # [tier] == 3",
		"[type] == scepter && [flag] != ethereal # [skillconcentration] >= 2 && [skillblessedhammer] >= 2 # [tier] == 4",
		"[type] == sword && [flag] == runeword # [fcr] >= 25 && [maxmana] >= 89 # [tier] == 5",
		//helmet
		"[type] == helm && [flag] == runeword # [itemallskills] == 1 && [LightResist] >= 30 # [tier] == 4",
		"[type] == circlet && [flag] != ethereal && [quality] == rare # [paladinskills] >= 1 && [fcr] >= 10 && ([fireresist]+[lightresist] || [fireresist]+[coldresist] || [coldresist]+[lightresist]) >= 40 # [tier] == 5",
		"[name] == shako && [quality] == unique && [flag] != ethereal # [defense] >= 100 # [tier] == 6",
		"[type] == circlet && [flag] != ethereal && [quality] == rare # [paladinskills] >= 2 && [fcr] >= 20 && ([maxhp] >= 15 || [maxmana] >= 30) && ([fireresist]+[lightresist] || [fireresist]+[coldresist] || [coldresist]+[lightresist]) >= 40 # [tier] == 7",
		//belt
		"([type] == belt || [name] == demonhidesash || [name] == sharkskinbelt || [name] == meshbelt || [name] == vampirefangbelt) && [quality] >= magic && [flag] != ethereal # [maxhp] > 0 && [fireresist]+[lightresist] >= 30 # [tier] == 4",
		"([type] == belt || [name] == demonhidesash || [name] == sharkskinbelt || [name] == meshbelt || [name] == vampirefangbelt) && [quality] >= magic && [flag] != ethereal # [fhr] > 0 && [maxhp] > 0 && [fireresist]+[lightresist] >= 40 # [tier] == 5",
		"([type] == belt || [name] == demonhidesash || [name] == sharkskinbelt || [name] == meshbelt || [name] == vampirefangbelt) && [quality] >= magic && [flag] != ethereal # [fhr] >= 20 && [maxhp] > 30 && [fireresist]+[lightresist]+[coldresist] >= 45 # [tier] == 6",
		//boots
		"[type] == boots && [flag] != ethereal # [fireresist] > 20 # [tier] == 3",
		"[type] == boots && [flag] != ethereal && [quality] >= magic # [frw] >= 10 && [fireresist] >= 30 # [tier] == 4",
		"[type] == boots && [flag] != ethereal && [quality] >= magic # [frw] >= 10 && [fireresist]+[lightresist] >= 40 # [tier] == 5",
		"[type] == boots && [flag] != ethereal && [quality] >= magic # [frw] >= 10 && ([fireresist]+[coldresist]+[lightresist] >= 60 || [maxhp] >= 45) && [dexterity] >= 5 # [tier] == 6",
		"[type] == boots && [quality] >= set && [flag] != ethereal # [frw] >= 20 && [maxhp] >= 35 && [fireresist]+[coldresist]+[lightresist] >= 40 # [tier] == 7",
		"[type] == boots && [quality] >= set && [flag] != ethereal # [frw] >= 20 && [maxhp] >= 45 && ([dexterity] == 15 || [fireresist] >= 40) # [tier] == 8",
		//armor
		"[name] == serpentskinarmor && [quality] == unique && [flag] != ethereal # [fireresist] >= 30 # [tier] == 5",
		"[type] == armor && [flag] == runeword # [fireresist] == 50 # [tier] == 6",
		"[type] == armor && [flag] == runeword # [FRW] >= 45 # [tier] == 100",
		//shield
		"([type] == shield || [type] == auricshields) && [flag] == runeword # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 187 # [tier] == 4",
		"([type] == shield || [type] == auricshields) && [flag] == runeword  # [fcr] >= 25 && [maxmana] >= 89 # [tier] == 5",
		"[Name] == GildedShield && [Quality] == unique # [EnhancedDefense] >= 185 # [tier] == 100",
		//gloves
		"[type] == gloves && [flag] != ethereal # ([fireresist] || [lightresist]) > 20 # [tier] == 3",
		"[name] == gauntlets && [quality] == unique && [flag] != ethereal  # [itemmaxmanapercent] == 40 # [tier] == 4",
		"[name] == lightgauntlets && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 30 # [tier] == 5",
		"[type] == gloves && [flag] != ethereal && [quality] <= unique # [strength] >= 5 && [dexterity] >= 5 && [maxhp] >= 20 && [fireresist]+[coldresist] >= 40 # [tier] == 6",
		//ammy
		"[type] == amulet && [quality] <= rare # ([fireresist] || [lightresist]) > 30 # [tier] == 3",
		"[type] == amulet && [quality] <= rare # [fcr] >= 10 && ([fireresist] || [lightresist]) >= 0 # [tier] == 4",
		"[type] == amulet && [quality] <= rare # [fcr] >= 10 && ([fireresist] || [lightresist]) > 10 # [tier] == 5",
		"[type] == amulet && [quality] <= rare # [fcr] >= 10 && ([fireresist] || [lightresist]) > 20 # [tier] == 6",
		"[type] == amulet && [quality] <= rare # [fcr] >= 10 && [maxhp] > 10 && ([fireresist] || [lightresist]) >= 20 # [tier] == 8",
		"[type] == amulet && [quality] <= rare # [fcr] >= 10 && [maxhp] > 20 && ([fireresist] || [lightresist]) >= 20 # [tier] == 8",
		"[type] == amulet && [quality] <= rare # [fcr] >= 10 && [maxhp] > 30 && ([fireresist] || [lightresist]) >= 20 # [tier] == 9",
		"[type] == amulet && [quality] <= rare # [fcr] >= 10 && [maxhp] > 10 && ([fireresist]+[lightresist] || [fireresist]+[coldresist] || [coldresist]+[lightresist]) >= 40 # [tier] == 10",
		"[type] == amulet && [quality] <= rare # [fcr] >= 10 && [maxhp] > 20 && ([fireresist]+[lightresist] || [fireresist]+[coldresist] || [coldresist]+[lightresist]) >= 40 # [tier] == 11",
		"[type] == amulet && [quality] <= rare # [fcr] >= 10 && [maxhp] > 30 && ([fireresist]+[lightresist] || [fireresist]+[coldresist] || [coldresist]+[lightresist]) >= 40 # [tier] == 12",
		"[type] == amulet && [quality] <= rare # [paladinskills] >= 1 && [fcr] >= 10 && [maxhp] > 10 && ([fireresist]+[lightresist] || [fireresist]+[coldresist] || [coldresist]+[lightresist]) >= 40 # [tier] == 13",
		"[type] == amulet && [quality] <= rare # [paladinskills] >= 1 && [fcr] >= 10 && [maxhp] > 20 && ([fireresist]+[lightresist] || [fireresist]+[coldresist] || [coldresist]+[lightresist]) >= 40 # [tier] == 14",
		"[type] == amulet && [quality] <= rare # [paladinskills] >= 1 && [fcr] >= 10 && [maxhp] > 30 && ([fireresist]+[lightresist] || [fireresist]+[coldresist] || [coldresist]+[lightresist]) >= 40 # [tier] == 15",
		//rings
		"[type] == ring # ([fireresist] || [lightresist]) > 30 # [tier] == 3",
		"[type] == ring # [fcr] >= 10 && ([fireresist] || [lightresist]) >= 0 # [tier] == 4",
		"[type] == ring # [fcr] >= 10 && ([fireresist] || [lightresist]) > 10 # [tier] == 5",
		"[type] == ring # [fcr] >= 10 && ([fireresist] || [lightresist]) > 20 # [tier] == 6",
		"[type] == ring # [fcr] >= 10 && [maxhp] > 10 && ([fireresist] || [lightresist]) >= 20 # [tier] == 8",
		"[type] == ring # [fcr] >= 10 && [maxhp] > 20 && ([fireresist] || [lightresist]) >= 20 # [tier] == 8",
		"[type] == ring # [fcr] >= 10 && [maxhp] > 30 && ([fireresist] || [lightresist]) >= 20 # [tier] == 9",
		"[type] == ring # [fcr] >= 10 && [maxhp] > 10 && ([fireresist]+[lightresist] || [fireresist]+[coldresist] || [coldresist]+[lightresist]) >= 40 # [tier] == 10",
		"[type] == ring # [fcr] >= 10 && [maxhp] > 20 && ([fireresist]+[lightresist] || [fireresist]+[coldresist] || [coldresist]+[lightresist]) >= 40 # [tier] == 11",
		"[type] == ring # [fcr] >= 10 && [maxhp] > 30 && ([fireresist]+[lightresist] || [fireresist]+[coldresist] || [coldresist]+[lightresist]) >= 40 # [tier] == 12",
		"[name] == ring && [quality] == unique # [maxhp] >= 40 && [magicdamagereduction] >= 12 # [tier] == 99",
	];
	NTIP.arrayLooping(tiers);
	
	if (me.charlvl < respecOne){
		NTIP.arrayLooping(TiersTillRespecOne);				
	}	

	if(Item.getEquippedItem(1).tier < 4) {// Lore
			var Lore = [
				"[Name] == OrtRune # # [MaxQuantity] == 1",
				"[Name] == SolRune # # [MaxQuantity] == 1",
				"([Name] == Circlet || [Name] == FullHelm || [Name] == Mask || [Name] == Crown || [Name] == BoneVisage) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1"
			];
			NTIP.arrayLooping(Lore);
					
			if (!me.getItem(618)) {
			Config.Recipes.push([Recipe.Rune, "Ral Rune"]); 
			}
			
			if (!me.getItem(621)) {
				Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
				Config.Recipes.push([Recipe.Rune, "Amn Rune"]); 
			}
			
			Config.Runewords.push([Runeword.Lore, "Circlet"]);
			Config.Runewords.push([Runeword.Lore, "Full Helm"]);
			Config.Runewords.push([Runeword.Lore, "Mask"]);
			Config.Runewords.push([Runeword.Lore, "Crown"]);
			Config.Runewords.push([Runeword.Lore, "Bone Visage"]);
			Config.KeepRunewords.push("[type] == helm # [LightResist] >= 25");
		}

	if(Item.getEquippedItem(4).tier < 3) {// Steel
		var steel = [
			"[Name] == TirRune # # [MaxQuantity] == 1",
			"[Name] == ElRune # # [MaxQuantity] == 1",
			"[name] == mace && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1"
		];
		NTIP.arrayLooping(steel);
	
		Config.Runewords.push([Runeword.Steel, "Mace"]);
		Config.KeepRunewords.push("[type] == mace # [plusmindamage] >= 3 && [plusmaxdamage] >= 3");
	}	

	if(Item.getEquippedItem(4).tier < 5) {// Spirit Sword
		var SpiritSword = [
			"[Name] == TalRune # # [MaxQuantity] == 1",
			"[Name] == ThulRune # # [MaxQuantity] == 1", 
			"[Name] == OrtRune # # [MaxQuantity] == 1",
			"[Name] == AmnRune # # [MaxQuantity] == 1",
			"([Name] == BroadSword || [Name] == CrystalSword) && [Quality] == Normal && [level] >= 26 # ([Sockets] == 0 || [Sockets] == 4)# [MaxQuantity] == 1",
		];
		NTIP.arrayLooping(SpiritSword);

		if (!me.getItem(618)) {
			Config.Recipes.push([Recipe.Rune, "Ral Rune"]); 
		}
		
		if (!me.getItem(620)) {
			Config.Recipes.push([Recipe.Rune, "Thul Rune"]); 
		}
	
		Config.Recipes.push([Recipe.Socket.Weapon, "Crystal Sword"]);
		Config.Recipes.push([Recipe.Socket.Weapon, "Broad Sword"]);
	
		Config.Runewords.push([Runeword.Spirit, "Crystal Sword"]);
		Config.Runewords.push([Runeword.Spirit, "Broad Sword"]);
		Config.KeepRunewords.push("[type] == sword # [fcr] >= 33 && [maxmana] >= 89");
	}

	if (me.getItem(636)) {// CTA need Ohm first 
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

	if(Item.getEquippedItem(5).tier < 4) {// Ancients' Pledge
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
	
	if(Item.getEquippedItem(5).tier < 5) {// Spirit shield
		var SpiritShield = [
			"[Name] == TalRune # # [MaxQuantity] == 1",
			"[Name] == ThulRune # # [MaxQuantity] == 1", 
			"[Name] == OrtRune # # [MaxQuantity] == 1",
			"[Name] == AmnRune # # [MaxQuantity] == 1",
			"([Name] == Targe || [Name] == Rondache || [Name] == HeraldicShield || [Name] == AerinShield || [Name] == CrownShield || [Name] == AkaranTarge || [Name] == AkaranRondache || [Name] == GildedShield ||[Name] == ProtectorShield || [Name] == SacredTarge) && [Flag] != Ethereal && [Quality] == Normal # [fireresist] >= 20 && ([Sockets] == 0 || [Sockets] == 4) # [MaxQuantity] == 1",
		];
		NTIP.arrayLooping(SpiritShield);
		
		Config.Recipes.push([Recipe.Socket.Shield, "Targe", Roll.NonEth]);
		Config.Recipes.push([Recipe.Socket.Shield, "Rondache", Roll.NonEth]);
		Config.Recipes.push([Recipe.Socket.Shield, "Heraldic Shield", Roll.NonEth]);
		Config.Recipes.push([Recipe.Socket.Shield, "Aerin Shield", Roll.NonEth]);
		Config.Recipes.push([Recipe.Socket.Shield, "Crown Shield", Roll.NonEth]);
		Config.Recipes.push([Recipe.Socket.Shield, "Akaran Targe", Roll.NonEth]);
		Config.Recipes.push([Recipe.Socket.Shield, "Akaran Rondache", Roll.NonEth]);
		Config.Recipes.push([Recipe.Socket.Shield, "Gilded Shield", Roll.NonEth]);
		Config.Recipes.push([Recipe.Socket.Shield, "Protector Shield", Roll.NonEth]);
		Config.Recipes.push([Recipe.Socket.Shield, "Sacred Targe", Roll.NonEth]);

		if (!me.getItem(618)) {
			Config.Recipes.push([Recipe.Rune, "Ral Rune"]); 
		}
		
		if (!me.getItem(620)) {
			Config.Recipes.push([Recipe.Rune, "Thul Rune"]); 
		}

		Config.Runewords.push([Runeword.Spirit, "Akaran Targe"]);
		Config.Runewords.push([Runeword.Spirit, "Akaran Rondache"]);
		Config.Runewords.push([Runeword.Spirit, "Sacred Targe"]);
		Config.Runewords.push([Runeword.Spirit, "Sacred Rondache"]);
		Config.Runewords.push([Runeword.Spirit, "Gilded Shield"]);
		Config.Runewords.push([Runeword.Spirit, "Protector Shield"]);
		Config.Runewords.push([Runeword.Spirit, "Kurast Shield"]);
		Config.Runewords.push([Runeword.Spirit, "Zakarum Shield"]);
		Config.KeepRunewords.push("[type] == auricshields # [fcr] >= 33 && [maxmana] >= 89");
	}

	if(Item.getEquippedItem(3).tier < 4) {// Stealth
		var stealth = [
			"[Name] == TalRune # # [MaxQuantity] == 1",
			"[Name] == EthRune # # [MaxQuantity] == 1",
			"[Name] == StuddedLeather && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1",
		];
		NTIP.arrayLooping(stealth);
	
		Config.Runewords.push([Runeword.Stealth, "Studded Leather"]);
		Config.KeepRunewords.push("[type] == armor # [frw] == 25 && [poisonresist] == 30");
	}
		
	if(Item.getEquippedItem(3).tier < 6) {// Smoke
		var Smoke = [
			"[Name] == NefRune # # [MaxQuantity] == 1",
			"[Name] == LumRune # # [MaxQuantity] == 1",
			"([Name] == GhostArmor || [Name] == SerpentskinArmor || [Name] == BreastPlate ||[Name] == LightPlate) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1",
		];
		NTIP.arrayLooping(Smoke);
	
		Config.Recipes.push([Recipe.Rune, "Hel Rune"]); // cube Hel to Io
		Config.Recipes.push([Recipe.Rune, "Io Rune"]); // cube Io to Lum
		
		Config.Runewords.push([Runeword.Smoke, "Ghost Armor"]);
		Config.Runewords.push([Runeword.Smoke, "Serpentskin Armor"]);
		Config.Runewords.push([Runeword.Smoke, "Breast Plate"]);
		Config.Runewords.push([Runeword.Smoke, "Light Plate"]);
		Config.KeepRunewords.push("[type] == armor # [fireresist] == 50");	
	}

	if(Item.getEquippedItem(3).tier < 100) {// Enigma
		var Enigma = [
			"[Name] == JahRune",
			"[Name] == IthRune # # [MaxQuantity] == 1",
			"[Name] == BerRune",
			"[Name] == MagePlate && [Flag] != Ethereal && [Quality] == Normal # ([Sockets] == 0 || [Sockets] == 3)",
		];
		NTIP.arrayLooping(Enigma);
		
		Config.Recipes.push([Recipe.Socket.Armor, "Mage Plate", Roll.NonEth]);

		Config.Runewords.push([Runeword.Enigma, "Mage Plate", Roll.NonEth]);
		Config.KeepRunewords.push("[type] == armor # [frw] >= 45");
	}
	
	switch (finalBuild) {
	case 'Smiter':
		Config.Recipes.push([Recipe.Blood.Gloves, "Vampirebone Gloves"]);
		Config.Recipes.push([Recipe.Blood.Belt, "Mesh Belt"]);
		Config.Recipes.push([Recipe.Blood.Belt, "mithril coil"]);
		
		var setupSMITER = [
			"[name] == lightplatedboots && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 50 # [tier] == 100",
			"[type] == ring && [quality] == unique # [tohit] >= 150 && [dexterity] >= 15 # [tier] == 100",
			"[type] == amulet && [quality] == unique # [strength] == 5 && [coldresist] >= 25 # [tier] == 100",
			"[Type] == Belt && [Quality] == Crafted # [ItemOpenWounds] >= 10 && [maxhp] > 30 && [fireresist]+[lightresist]+[coldresist] >= 45 && [strength] >= 0 && [dexterity] >= 0 # [tier] == 95",
			"[name] == warbelt && [quality] == unique && [flag] != ethereal # [strength] == 20 # [tier] == 100",
			"[name] == demonhidegloves && [quality] == unique && [flag] != ethereal # [poisonresist] >= 30 # [tier] == 90",
			"[Type] == Gloves && [Quality] == Crafted # [IAS] == 20 && [ItemCrushingBlow] >= 10 && [strength] >= 5 && [dexterity] >= 5 && [maxhp] >= 20 && [fireresist]+[coldresist] >= 40 # [tier] == 95",
			"[name] == vampirebonegloves && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 100 && [strength] >= 12 && [lifeleech] >= 9  # [tier] == 100", // drac's
			"[name] == wingedhelm && [quality] == set # [fhr] >= 30 # [tier] == 100", // gface				
		];
		NTIP.arrayLooping(setupSMITER);
		
		if (!haveItem("mace", "runeword", "Black")) {
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
		}
		
		if (me.charlvl >= respecTwo) {		
			NTIP.addLine("[Type] == mace && [flag] == runeword # [ias] == 15 && [itemcrushingblow] == 40 # [tier] == 100");
		}
				
		break;
	case 'Hammerdin':
		Config.Recipes.push([Recipe.Caster.Gloves, "Bramble Mitts"]);
		Config.Recipes.push([Recipe.Caster.Belt, "Sharkskin Belt"]);
		Config.Recipes.push([Recipe.Caster.Belt, "Vampirefang Belt"]);
		
		var setupHAMMERDIN = [
			"[type] == boots && [quality] == unique && [flag] != ethereal # [frw] >= 20 && [maxhp] >= 55 && [dexterity] == 15 # [tier] == 100",
			"[type] == ring && [quality] == unique # [itemmaxmanapercent] == 25 # [tier] == 100", //soj
			"[type] == amulet && [quality] == unique # [strength] == 5 && [coldresist] >= 25 # [tier] == 100", //maras
			"[Type] == Belt && [Quality] == Crafted && [flag] != ethereal # [FCR] >= 10 && [MaxHP] >= 15 && [fireresist] >= 20 && [lightresist] >= 20 # [tier] == 95", //caster belt
			"[name] == spiderwebsash && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 90 # [tier] == 100", //arach's
			"[Type] == Gloves && [Quality] == Crafted && [flag] != ethereal # [strength] >= 5 && [dexterity] >= 5 && [maxhp] >= 20 && [fireresist]+[coldresist] >= 40 # [tier] == 95", //crafted gloves
			"[name] == heavybracers && [quality] == set && [flag] != ethereal # [fcr] >= 20 # [tier] == 100",// trangs
			"[type] == circlet && [quality] == rare # [paladinskills] == 2 && [fcr] >= 20 && ([maxhp] >= 30 || [maxmana] >= 60) && [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 60 # [tier] == 100",
		];
		NTIP.arrayLooping(setupHAMMERDIN);
		
		if (!haveItem("mace", "runeword", "Heart of the Oak")) {
			var HotO = [
				"[Name] == ThulRune # # [MaxQuantity] == 1",
				"[Name] == PulRune",
				"[Name] == KoRune # # [MaxQuantity] == 1",
				"[Name] == VexRune",
				"[Name] == Flail || [Name] == Knout && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(HotO);
			
			if(!me.getItem(635)){
				Config.Recipes.push([Recipe.Rune, "Um Rune"]);
				Config.Recipes.push([Recipe.Rune, "Mal Rune"]);
				Config.Recipes.push([Recipe.Rune, "Ist Rune"]);
				Config.Recipes.push([Recipe.Rune, "Gul Rune"]);
			}
			
			Config.Runewords.push([Runeword.HeartoftheOak, "Flail"]);
			Config.Runewords.push([Runeword.HeartoftheOak, "Knout"]);
			Config.KeepRunewords.push("[Type] == mace # [FCR] == 40");
		}
					
		if (me.charlvl >= respecTwo) {		
			NTIP.addLine("[Type] == mace && [flag] == runeword # [FCR] == 40 # [tier] == 100");
		}
		
		break;
	}
}