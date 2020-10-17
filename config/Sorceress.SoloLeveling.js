// Sorceress.SoloLeveling.js config file
function LoadConfig () {
	Scripts.UserAddon = false; // !!!YOU MUST SET THIS TO FALSE IF YOU WANT TO RUN BOSS/AREA SCRIPTS!!!

	Scripts.SoloLeveling = true; // *** Leveling Script turn off when ready ***
	const finalBuild = "Meteorb";
	//const finalBuild = "Blizzard";
	//const finalBuild = "BLizzBaller";
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
	Config.LowGold = 500000;

	//AutoEquip
	Config.AutoEquip = true;

	// Pickit config.
	Config.PickRange = me.getSkill(54, 0) ? 40 : 20;
	Config.FastPick = false;
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
	Config.AutoStat.BlockChance = 55;
	Config.AutoStat.UseBulk = true;

	//AutoSkill
	Config.AutoSkill.Enabled = true;
	Config.AutoSkill.Save = 0;

	//AutoBuild
	Config.AutoBuild.Enabled = true;
	Config.AutoBuild.Verbose = true;
	Config.AutoBuild.DebugMode = true;

	// Class specific config
	Config.Dodge = !!me.getSkill(54, 0); // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
	Config.DodgeRange = 15; // Distance to keep from monsters.
	Config.DodgeHP = 95; // Dodge only if HP percent is less than or equal to Config.DodgeHP. 100 = always dodge.
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
	const startBuild = "Start"; // build ends when reaching lvl 30
	const middleBuild = "BlizzBaller"; // starts at 30 ends when reaching lvl 75
	const startBelt = ["hp", "hp", "hp", "mp"];
	const middleBelt = ["hp", "hp", "mp", "mp"];
	const finalBelt = ["hp", "hp", "mp", "rv"];
	Config.BeltColumn = me.charlvl < respecOne ? startBelt : me.charlvl < respecTwo ? middleBelt : finalBelt;
	this.configBelt();

	Config.NoTele = me.charlvl < respecOne ? true : false;

	Config.AutoSkill.Build = specPush("skills");
	Config.AutoStat.Build = specPush("stats");
	Config.AutoBuild.Template = me.charlvl < respecOne ? startBuild : me.charlvl < respecTwo ? middleBuild : finalBuild;

	if (me.gametype === 1) { //LOD game gear
		//weapon

		//weapon switch (prebuff)
		if (me.getItem(636)) { // CTA
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

		//helm
		if (Item.getEquippedItem(1).tier < 20) { // Lore
			var Lore = [
				"[Name] == OrtRune # # [MaxQuantity] == 1",
				"[Name] == SolRune # # [MaxQuantity] == 1",
				"([Name] == Circlet || [Name] == Coronet || [Name] == FullHelm || [Name] == BoneHelm || [Name] == Sallet || [Name] == Casque) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1"
			];
			NTIP.arrayLooping(Lore);

			if (!me.getItem(618) && me.diff !== 2) { // Cube Ort Rune
				Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
			}

			if (!me.getItem(621) && me.diff !== 2) { // Cube Sol Rune
				Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
				Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
				Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
				Config.Recipes.push([Recipe.Rune, "Amn Rune"]);
			}

			Config.Runewords.push([Runeword.Lore, "Circlet"]);
			Config.Runewords.push([Runeword.Lore, "Coronet"]);
			Config.Runewords.push([Runeword.Lore, "Full Helm"]);
			Config.Runewords.push([Runeword.Lore, "Bone Helm"]);
			Config.Runewords.push([Runeword.Lore, "Sallet"]);
			Config.Runewords.push([Runeword.Lore, "Casque"]);

			Config.KeepRunewords.push("([type] == circlet || [type] == helm) # [LightResist] >= 25");
		}

		//armor
		if (Item.getEquippedItem(3).tier < 15) { // Stealth
			var stealth = [
				"[Name] == TalRune # # [MaxQuantity] == 1",
				"[Name] == EthRune # # [MaxQuantity] == 1",
				"([Name] == StuddedLeather || [Name] == BreastPlate || [Name] == LightPlate || [Name] == GhostArmor || [Name] == SerpentskinArmor) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(stealth);

			Config.Runewords.push([Runeword.Stealth, "Studded Leather"]);
			Config.Runewords.push([Runeword.Stealth, "Breast Plate"]);
			Config.Runewords.push([Runeword.Stealth, "Light Plate"]);
			Config.Runewords.push([Runeword.Stealth, "Ghost Armor"]);
			Config.Runewords.push([Runeword.Stealth, "Serpentskin Armor"]);

			Config.KeepRunewords.push("[type] == armor # [frw] == 25");
		}

		if (Item.getEquippedItem(3).tier < 33) { // Smoke
			var Smoke = [
				"[Name] == NefRune # # [MaxQuantity] == 1",
				"[Name] == LumRune # # [MaxQuantity] == 1",
				"([Name] == LightPlate || [Name] == GhostArmor || [Name] == SerpentskinArmor || [Name] == demonhidearmor ||[Name] == trellisedarmor ||[Name] == MagePlate || [Name] == DuskShroud || [Name] == WyrmHide) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(Smoke);

			if (!me.getItem(626)) { // Cube to Lum Rune
				Config.Recipes.push([Recipe.Rune, "Dol Rune"]); // cube Hel to Io
				Config.Recipes.push([Recipe.Rune, "Hel Rune"]); // cube Hel to Io
				Config.Recipes.push([Recipe.Rune, "Io Rune"]); // cube Io to Lum
			}

			Config.Runewords.push([Runeword.Smoke, "Light Plate"]);
			Config.Runewords.push([Runeword.Smoke, "Ghost Armor"]);
			Config.Runewords.push([Runeword.Smoke, "Serpentskin Armor"]);
			Config.Runewords.push([Runeword.Smoke, "demonhide armor"]);
			Config.Runewords.push([Runeword.Smoke, "trellised armor"]);
			Config.Runewords.push([Runeword.Smoke, "Mage Plate"]);
			Config.Runewords.push([Runeword.Smoke, "Dusk Shroud"]);
			Config.Runewords.push([Runeword.Smoke, "WyrmHide"]);

			Config.KeepRunewords.push("[type] == armor # [fireresist] == 50");
		}

		if (Item.getEquippedItem(3).tier < 47) { // Lionheart
			var Lionheart = [
				"[Name] == HelRune # # [MaxQuantity] == 1",
				"[Name] == LumRune # # [MaxQuantity] == 1",
				"[Name] == FalRune # # [MaxQuantity] == 1",
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

			Config.Runewords.push([Runeword.Lionheart, "Mage Plate"]);
			Config.Runewords.push([Runeword.Lionheart, "Dusk Shroud"]);
			Config.Runewords.push([Runeword.Lionheart, "WyrmHide"]);
			Config.Runewords.push([Runeword.Lionheart, "Scarab Husk"]);

			Config.KeepRunewords.push("[Type] == armor # [strength] == 25 && [fireresist] == 30");
		}

		//shield
		if (Item.getEquippedItem(5).tier < 13) { // Ancients' Pledge
			var AncientsPledge = [
				"[Name] == RalRune # # [MaxQuantity] == 1",
				"[Name] == OrtRune # # [MaxQuantity] == 1",
				"[Name] == TalRune # # [MaxQuantity] == 1",
				"([Name] == LargeShield || [Name] == KiteShield || [Name] == BoneShield || [Name] == Scutum || [Name] == GrimShield || [Name] == DragonShield) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(AncientsPledge);

			if (!me.getItem(618)) {
				Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
			}

			Config.Runewords.push([Runeword.AncientsPledge, "Large Shield"]);
			Config.Runewords.push([Runeword.AncientsPledge, "Kite Shield"]);
			Config.Runewords.push([Runeword.AncientsPledge, "Bone Shield"]);
			Config.Runewords.push([Runeword.AncientsPledge, "Scutum"]);
			Config.Runewords.push([Runeword.AncientsPledge, "Grim Shield"]);
			Config.Runewords.push([Runeword.AncientsPledge, "Dragon Shield"]);

			Config.KeepRunewords.push("[type] == shield # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 187");
		}

		if (Item.getEquippedItem(5).tier < 18) { // Sanctuary
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

		// merc Strength
		if (me.diff !== 2) {
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

		var Treachery = [ // merc Treachery
			"[Name] == ShaelRune # # [MaxQuantity] == 1",
			"[Name] == ThulRune # # [MaxQuantity] == 1",
			"[Name] == LemRune # # [MaxQuantity] == 1",
			"([Name] == MagePlate || [Name] == HellforgePlate || [Name] == KrakenShell || [Name] == ArchonPlate || [Name] == BalrogSkin || [Name] == BoneWeave || [Name] == GreatHauberk || [Name] == LoricatedMail || [Name] == DiamondMail || [Name] == WireFleece || [Name] == ScarabHusk || [Name] == WyrmHide || [Name] == DuskShroud) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3",
		];
		NTIP.arrayLooping(Treachery);

		if (me.diff !== 0) {
			NTIP.addLine("([Name] == HellforgePlate || [Name] == KrakenShell || [Name] == ArchonPlate || [Name] == BalrogSkin || [Name] == BoneWeave || [Name] == GreatHauberk || [Name] == LoricatedMail || [Name] == DiamondMail || [Name] == WireFleece || [Name] == ScarabHusk || [Name] == WyrmHide || [Name] == DuskShroud) && [Quality] == Normal && [Flag] == Ethereal # [Sockets] == 0");

			Config.Recipes.push([Recipe.Socket.Armor, "Hellforge Plate"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Kraken Shell"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Archon Plate"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Balrog Skin"]);
			Config.Recipes.push([Recipe.Socket.Armor, "BoneWeave"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Great Hauberk"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Loricated Mail"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Diamond Mail"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Wire Fleece"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Scarab Husk"]);
			Config.Recipes.push([Recipe.Socket.Armor, "WyrmHide"]);
			Config.Recipes.push([Recipe.Socket.Armor, "Dusk Shroud"]);
		}

		Config.Runewords.push([Runeword.Treachery, "Mage Plate"]);
		Config.Runewords.push([Runeword.Treachery, "Hellforge Plate"]);
		Config.Runewords.push([Runeword.Treachery, "Kraken Shell"]);
		Config.Runewords.push([Runeword.Treachery, "Archon Plate"]);
		Config.Runewords.push([Runeword.Treachery, "Balrog Skin"]);
		Config.Runewords.push([Runeword.Treachery, "BoneWeave"]);
		Config.Runewords.push([Runeword.Treachery, "Great Hauberk"]);
		Config.Runewords.push([Runeword.Treachery, "Loricated Mail"]);
		Config.Runewords.push([Runeword.Treachery, "Diamond Mail"]);
		Config.Runewords.push([Runeword.Treachery, "Wire Fleece"]);
		Config.Runewords.push([Runeword.Treachery, "Scarab Husk"]);
		Config.Runewords.push([Runeword.Treachery, "WyrmHide"]);
		Config.Runewords.push([Runeword.Treachery, "Dusk Shroud"]);

		Config.KeepRunewords.push("[Type] == armor # [ias] == 45 && [coldresist] == 30");

		if (me.ladder > 0) { // Ladder runewords - Spirit Sword/Shield & Insight
			if (Item.getEquippedItem(4).tier < 23) { // Spirit Sword
				var SpiritSword = [
					"[Name] == TalRune # # [MaxQuantity] == 1",
					"[Name] == ThulRune # # [MaxQuantity] == 1",
					"[Name] == OrtRune # # [MaxQuantity] == 1",
					"[Name] == AmnRune # # [MaxQuantity] == 1",
					"([Name] == BroadSword || [Name] == CrystalSword) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(SpiritSword);

				if (me.diff === 1) {
					NTIP.addLine("([Name] == BroadSword || [Name] == CrystalSword) && [Quality] == Normal # [Sockets] == 0 # [MaxQuantity] == 1");

					Config.Recipes.push([Recipe.Socket.Weapon, "Crystal Sword"]);
					Config.Recipes.push([Recipe.Socket.Weapon, "Broad Sword"]);
				}

				if (!me.getItem(620) && me.diff !== 2) { //Amn Rune
					Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
					Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
					Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
				}

				Config.Runewords.push([Runeword.Spirit, "Crystal Sword"]);
				Config.Runewords.push([Runeword.Spirit, "Broad Sword"]);
				Config.KeepRunewords.push("[type] == sword # [fcr] >= 25 && [maxmana] >= 89");
			}

			if (Item.getEquippedItem(5).tier < 19) { // Spirit shield
				var SpiritShield = [
					"[Name] == TalRune # # [MaxQuantity] == 1",
					"[Name] == ThulRune # # [MaxQuantity] == 1",
					"[Name] == OrtRune # # [MaxQuantity] == 1",
					"[Name] == AmnRune # # [MaxQuantity] == 1",
					"[Name] == Monarch && [Flag] != Ethereal && [Quality] == Normal # ([Sockets] == 0 || [Sockets] == 4) # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(SpiritShield);

				Config.Recipes.push([Recipe.Socket.Shield, "Monarch", Roll.NonEth]);

				if (!me.getItem(620) && me.diff !== 2) { //Amn Rune
					Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
					Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
					Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
				}

				Config.Runewords.push([Runeword.Spirit, "Monarch"]);
				Config.KeepRunewords.push("([type] == shield || [type] == auricshields) # [fcr] >= 35 && [maxmana] >= 89");
			}

			// merc Insight
			var Insight = [
				"[Name] == RalRune # # [MaxQuantity] == 1",
				"[Name] == TirRune # # [MaxQuantity] == 1",
				"[Name] == TalRune # # [MaxQuantity] == 1",
				"[Name] == SolRune # # [MaxQuantity] == 1",
				"([Name] == thresher || [Name] == crypticaxe || [Name] == greatpoleaxe || [Name] == giantthresher) && [Flag] == Ethereal && [Quality] == Normal # [Sockets] == 0 # [MaxQuantity] == 1",
				"([Name] == thresher || [Name] == crypticaxe || [Name] == greatpoleaxe || [Name] == giantthresher) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(Insight);

			if (me.diff !== 2) {
				NTIP.addLine("([Name] == bill || [Name] == battlescythe || [Name] == partizan || [Name] == grimscythe) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1");
			}

			Config.Recipes.push([Recipe.Socket.Weapon, "thresher"]);
			Config.Recipes.push([Recipe.Socket.Weapon, "Cryptic Axe"]);
			Config.Recipes.push([Recipe.Socket.Weapon, "Great Poleaxe"]);
			Config.Recipes.push([Recipe.Socket.Weapon, "Giant Thresher"]);

			Config.Runewords.push([Runeword.Insight, "Bill"]);
			Config.Runewords.push([Runeword.Insight, "Battle Scythe"]);
			Config.Runewords.push([Runeword.Insight, "Partizan"]);
			Config.Runewords.push([Runeword.Insight, "Grim Scythe"]);
			Config.Runewords.push([Runeword.Insight, "Thresher"]);
			Config.Runewords.push([Runeword.Insight, "Cryptic Axe"]);
			Config.Runewords.push([Runeword.Insight, "Great Poleaxe"]);
			Config.Runewords.push([Runeword.Insight, "Giant Thresher"]);

			Config.KeepRunewords.push("[type] == polearm # [meditationaura] >= 12");
		}

		var autoequipTiers = [ // autoequip setup
			//weapon
			"([type] == wand || [type] == orb) # [fcr] == 10 # [Tier] == 1",
			"([type] == wand || [type] == orb) # [fcr] == 10 && [maxmana] >= 20 # [Tier] == 2",
			"([type] == wand || [type] == orb) # [fcr] == 10 && [maxmana] >= 20 && [fireresist]+[lightresist]+[coldresist] >= 0 # [Tier] == 3",
			"([type] == wand || [type] == orb) # [fcr] == 20 && [maxmana] >= 20 && [fireresist]+[lightresist]+[coldresist] >= 20 # [Tier] == 4",
			"([type] == wand || [type] == orb) # [fcr] == 20 && [maxmana] >= 20 && [fireresist]+[lightresist]+[coldresist] >= 30 # [Tier] == 5",
			"([type] == wand || [type] == orb) # [fcr] == 20 && [maxmana] >= 20 && [fireresist]+[lightresist]+[coldresist] >= 40 && [maxhp] >= 0 # [Tier] == 6",
			"[Type] == Orb # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 # [Tier] == 7",
			"[Type] == Orb # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && [FCR] >= 10 # [Tier] == 8",
			"[Type] == Orb # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 2 && [FCR] >= 10 # [Tier] == 9",
			"[Type] == Orb # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 2 && [FCR] >= 20 # [Tier] == 10",
			"[Type] == Orb # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 4 # [Tier] == 11",
			"[Type] == Orb # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 4 && [FCR] >= 20 # [Tier] == 12",
			"[type] == sword && [flag] == runeword # [fcr] >= 25 && [maxmana] >= 89 # [tier] == 13",
			"[type] == sword && [flag] == runeword # [fcr] >= 26 && [maxmana] >= 89 # [tier] == 14",
			"[type] == sword && [flag] == runeword # [fcr] >= 27 && [maxmana] >= 89 # [tier] == 15",
			"[type] == sword && [flag] == runeword # [fcr] >= 28 && [maxmana] >= 89 # [tier] == 16",
			"[type] == sword && [flag] == runeword # [fcr] >= 29 && [maxmana] >= 89 # [tier] == 17",
			"[type] == sword && [flag] == runeword # [fcr] >= 30 && [maxmana] >= 89 # [tier] == 18",
			"[type] == sword && [flag] == runeword # [fcr] >= 31 && [maxmana] >= 89 # [tier] == 19",
			"[type] == sword && [flag] == runeword # [fcr] >= 32 && [maxmana] >= 89 # [tier] == 20",
			"[type] == sword && [flag] == runeword # [fcr] >= 33 && [maxmana] >= 89 # [tier] == 21",
			"[type] == sword && [flag] == runeword # [fcr] >= 34 && [maxmana] >= 89 # [tier] == 22",
			"[type] == sword && [flag] == runeword # [fcr] >= 35 && [maxmana] >= 89 # [tier] == 23",
			"[Name] == SwirlingCrystal && [Quality] == Set # [SkillColdMastery] == 2 # [Tier] == 24",
			"[Name] == SwirlingCrystal && [Quality] == unique # [fcr] == 30 # [Tier] == 25", // occy
			//Helmet
			"([type] == helm || [type] == circlet) && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 5 # [tier] == 1",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 10 # [tier] == 2",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 15 # [tier] == 3",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 20 # [tier] == 4",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 25 # [tier] == 5",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 30 # [tier] == 6",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 35 # [tier] == 7",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 0 # [tier] == 8",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 5 # [tier] == 9",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 10 # [tier] == 10",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 15 # [tier] == 11",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 20 # [tier] == 12",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 25 # [tier] == 13",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 30 # [tier] == 14",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 35 # [tier] == 15",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 40 # [tier] == 16",
			"([type] == helm || [type] == circlet) && [flag] != ethereal && [flag] == runeword # [defense] >= 20 && [LightResist] >= 25 # [tier] == 17", // lore
			"([type] == helm || [type] == circlet) && [flag] != ethereal && [flag] == runeword # [defense] >= 30 && [LightResist] >= 25 # [tier] == 18", // lore
			"([type] == helm || [type] == circlet) && [flag] != ethereal && [flag] == runeword # [defense] >= 50 && [LightResist] >= 25 # [tier] == 19", // lore
			"([type] == helm || [type] == circlet) && [flag] != ethereal && [flag] == runeword # [defense] >= 60 && [LightResist] >= 25 # [tier] == 20", // lore
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 0 # [tier] == 21",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 5 # [tier] == 22",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 10 # [tier] == 23",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 15 # [tier] == 24",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 20 # [tier] == 25",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 25 # [tier] == 26",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 30 # [tier] == 27",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 35 # [tier] == 28",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 40 # [tier] == 29",
			"[Name] == sallet && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 160 # [tier] == 30", // rockstopper
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 2 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 0 # [tier] == 31",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 2 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 5 # [tier] == 32",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 2 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 10 # [tier] == 33",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 2 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 15 # [tier] == 34",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 2 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 20 # [tier] == 35",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 2 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 25 # [tier] == 36",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 2 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 30 # [tier] == 37",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 2 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 35 # [tier] == 38",
			"([type] == helm || [type] == circlet) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 2 && ([fireresist]+[lightresist]+[coldresist]) >= 40 && [maxhp] >= 40 # [tier] == 39",
			"[name] == shako && [quality] == unique && [flag] != ethereal # [DamageResist] == 10 # [tier] == 40", // harlequin's crest
			//belt
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 10 # [tier] == 1",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 15 # [tier] == 2",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 21 && [maxhp] >= 0 # [tier] == 3",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 21 && [maxhp] >= 5 # [tier] == 4",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 21 && [maxhp] >= 10 # [tier] == 5",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 21 && [maxhp] >= 15 # [tier] == 6",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 21 && [maxhp] >= 20 # [tier] == 7",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 21 && [maxhp] >= 25 # [tier] == 8",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 21 && [maxhp] >= 30 # [tier] == 9",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 21 && [maxhp] >= 35 # [tier] == 10",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 21 && [maxhp] >= 40 # [tier] == 11",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]) >= 20 && [maxhp] >= 40 # [tier] == 12",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]) >= 25 && [maxhp] >= 40 # [tier] == 13",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]) >= 30 && [maxhp] >= 40 # [tier] == 14",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]) >= 35 && [maxhp] >= 40 # [tier] == 15",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]) >= 40 && [maxhp] >= 40 # [tier] == 16",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]) >= 45 && [maxhp] >= 40 # [tier] == 17",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]) >= 50 && [maxhp] >= 40 # [tier] == 18",
			"[type] == belt && [flag] != ethereal # ([fireresist]+[lightresist]) >= 55 && [maxhp] >= 40 # [tier] == 19",
			"[Name] == MithrilCoil && [Quality] == Unique && [Flag] != Ethereal # [DamageResist] >= 10 && [Vitality] >= 30 # [tier] == 20",
			"[Name] == MithrilCoil && [Quality] == Unique && [Flag] != Ethereal # [DamageResist] >= 13 && [Vitality] >= 30 # [tier] == 21",
			"[Name] == MithrilCoil && [Quality] == Unique && [Flag] != Ethereal # [DamageResist] >= 15 && [Vitality] >= 31 # [tier] == 22",
			"[Name] == MithrilCoil && [Quality] == Unique && [Flag] != Ethereal # [DamageResist] >= 15 && [Vitality] >= 34 # [tier] == 23",
			"[Name] == MithrilCoil && [Quality] == Unique && [Flag] != Ethereal # [DamageResist] >= 15 && [Vitality] >= 37 # [tier] == 24",
			"[Name] == MithrilCoil && [Quality] == Unique && [Flag] != Ethereal # [DamageResist] >= 15 && [Vitality] >= 40 # [tier] == 25",
			"[name] == spiderwebsash && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 90 # [tier] == 26", // arach's
			//boots
			"[Type] == Boots && [Flag] != Ethereal # [FireResist] >= 10 # [Tier] == 1",
			"[Type] == Boots && [Flag] != Ethereal # [FireResist] >= 15 # [Tier] == 2",
			"[Type] == Boots && [Flag] != Ethereal # [FireResist] >= 20 # [Tier] == 3",
			"[Type] == Boots && [Flag] != Ethereal # [FireResist] >= 25 # [Tier] == 4",
			"[Type] == Boots && [Flag] != Ethereal # [FireResist] >= 30 # [Tier] == 5",
			"[Type] == Boots && [Flag] != Ethereal # [FireResist] >= 35 # [Tier] == 6",
			"[Type] == Boots && [Flag] != Ethereal # [FireResist] >= 40 # [Tier] == 7",
			"[name] == Boots && [Quality] == unique && [Flag] != ethereal # [EnhancedDefense] >= 10 # [Tier] == 8",
			"[type] == boots && [quality] == rare && [Flag] != Ethereal # [FireResist]+[LightResist] >= 40 # [tier] == 9",
			"[type] == boots && [quality] == rare && [Flag] != Ethereal # [FireResist]+[LightResist] >= 45 # [tier] == 10",
			"[type] == boots && [quality] == rare && [Flag] != Ethereal # [FireResist]+[LightResist] >= 50 # [tier] == 11",
			"[type] == boots && [quality] == rare && [Flag] != Ethereal # [FireResist]+[LightResist] >= 55 # [tier] == 12",
			"[type] == boots && [quality] == rare && [Flag] != Ethereal # [FireResist]+[LightResist] >= 60 # [tier] == 13",
			"[type] == boots && ([quality] == unique || [quality] == set) && [flag] != ethereal # [maxhp] >= 45 && ([FireResist] >= 40 || [dexterity] >= 15) # [tier] == 14",
			"[name] == sharkskinboots && [quality] == unique && [flag] != ethereal # [maxhp] >= 54 # [Tier] == 15",
			"[name] == sharkskinboots && [quality] == unique && [flag] != ethereal # [maxhp] >= 57 # [Tier] == 16",
			"[name] == sharkskinboots && [quality] == unique && [flag] != ethereal # [maxhp] >= 60 # [Tier] == 17",
			"[name] == sharkskinboots && [quality] == unique && [flag] != ethereal # [maxhp] >= 63 # [Tier] == 18",
			"[name] == sharkskinboots && [quality] == unique && [flag] != ethereal # [maxhp] >= 64 # [Tier] == 19",
			"[name] == sharkskinboots && [quality] == unique && [flag] != ethereal # [maxhp] >= 65 # [Tier] == 20",
			//armor
			"[type] == armor && [Flag] != Ethereal # ([coldresist] >= 5) + ([fireresist] >= 5) + ([lightresist] >= 5) >= 1 # [Tier] == 1",
			"[type] == armor && [Flag] != Ethereal # ([coldresist] >= 10) + ([fireresist] >= 10) + ([lightresist] >= 10) >= 1 # [Tier] == 2",
			"[type] == armor && [Flag] != Ethereal # ([coldresist] >= 15) + ([fireresist] >= 15) + ([lightresist] >= 15) >= 1 # [Tier] == 3",
			"[type] == armor && [Flag] != Ethereal # ([coldresist] >= 20) + ([fireresist] >= 20) + ([lightresist] >= 20) >= 1 # [Tier] == 4",
			"[type] == armor && [Flag] != Ethereal # ([coldresist] >= 20) + ([fireresist] >= 20) + ([lightresist] >= 20) >= 2 && [maxhp] >= 0 # [Tier] == 5",
			"[type] == armor && [Flag] != Ethereal # ([coldresist] >= 20) + ([fireresist] >= 20) + ([lightresist] >= 20) >= 2 && [maxhp] >= 5 # [Tier] == 6",
			"[type] == armor && [Flag] != Ethereal # ([coldresist] >= 20) + ([fireresist] >= 20) + ([lightresist] >= 20) >= 2 && [maxhp] >= 10 # [Tier] == 7",
			"[type] == armor && [Flag] != Ethereal # ([coldresist] >= 20) + ([fireresist] >= 20) + ([lightresist] >= 20) >= 2 && [maxhp] >= 15 # [Tier] == 8",
			"[type] == armor && [Flag] != Ethereal # ([coldresist] >= 20) + ([fireresist] >= 20) + ([lightresist] >= 20) >= 2 && [maxhp] >= 20 # [Tier] == 9",
			"[type] == armor && [Flag] != Ethereal # ([coldresist] >= 20) + ([fireresist] >= 20) + ([lightresist] >= 20) >= 2 && [maxhp] >= 25 # [Tier] == 10",
			"[type] == armor && [flag] != ethereal && [flag] == runeword # [frw] == 25 && [fcr] == 25 # [tier] == 11", //stealth
			"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 65 && [frw] == 25 && [fcr] == 25 # [tier] == 12", //stealth
			"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 90 && [frw] == 25 && [fcr] == 25 # [tier] == 13", //stealth
			"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 102 && [frw] == 25 && [fcr] == 25 # [tier] == 14", //stealth
			"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 111 && [frw] == 25 && [fcr] == 25 # [tier] == 15", //stealth
			"[type] == armor && [Flag] != Ethereal # ([coldresist] >= 20) + ([fireresist] >= 20) + ([lightresist] >= 20) >= 2 && [maxhp] >= 30 # [Tier] == 16",
			"[type] == armor && [Flag] != Ethereal # ([coldresist] >= 20) + ([fireresist] >= 20) + ([lightresist] >= 20) >= 2 && [maxhp] >= 35 # [Tier] == 17",
			"[type] == armor && [Flag] != Ethereal # ([coldresist] >= 20) + ([fireresist] >= 20) + ([lightresist] >= 20) >= 2 && [maxhp] >= 40 # [Tier] == 18",
			"[type] == armor && [Flag] != Ethereal # ([coldresist] >= 20) + ([fireresist] >= 20) + ([lightresist] >= 20) >= 2 && [maxhp] >= 45 # [Tier] == 19",
			"[type] == armor && [Flag] != Ethereal # ([coldresist] >= 20) + ([fireresist] >= 20) + ([lightresist] >= 20) >= 2 && [maxhp] >= 50 # [Tier] == 20",
			"[type] == armor && [Flag] != Ethereal # ([coldresist] >= 20) + ([fireresist] >= 20) + ([lightresist] >= 20) >= 2 && [maxhp] >= 55 # [Tier] == 21",
			"[type] == armor && [quality] == unique && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 # [tier] == 22",
			"[type] == armor && [flag] != ethereal && [flag] == runeword # [fireresist] == 50 # [tier] == 23", //smoke
			"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 102 && [fireresist] == 50  # [tier] == 24", //smoke
			"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 111 && [fireresist] == 50 # [tier] == 25", //smoke
			"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 122 && [fireresist] == 50 # [tier] == 26", //smoke
			"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 138 && [fireresist] == 50 # [tier] == 27", //smoke
			"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 225 && [fireresist] == 50 # [tier] == 28", //smoke
			"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 350 && [fireresist] == 50 # [tier] == 29", //smoke
			"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 375 && [fireresist] == 50 # [tier] == 30", //smoke
			"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 400 && [fireresist] == 50 # [tier] == 31", //smoke
			"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 425 && [fireresist] == 50 # [tier] == 32", //smoke
			"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 450 && [fireresist] == 50 # [tier] == 33", //smoke
			"[name] == serpentskinarmor && [quality] == unique && [flag] != ethereal # [fireresist] >= 30 # [tier] == 34", //vipermagi
			"[name] == serpentskinarmor && [quality] == unique && [flag] != ethereal # [fireresist] >= 31 # [tier] == 35", //vipermagi
			"[name] == serpentskinarmor && [quality] == unique && [flag] != ethereal # [fireresist] >= 32 # [tier] == 36", //vipermagi
			"[name] == serpentskinarmor && [quality] == unique && [flag] != ethereal # [fireresist] >= 33 # [tier] == 37", //vipermagi
			"[name] == serpentskinarmor && [quality] == unique && [flag] != ethereal # [fireresist] >= 34 # [tier] == 38", //vipermagi
			"[name] == serpentskinarmor && [quality] == unique && [flag] != ethereal # [fireresist] >= 35 # [tier] == 39", //vipermagi
			"[name] == lacqueredplate && [quality] == set && [flag] != ethereal # # [tier] == 40", //talrasha's
			"[type] == armor && [flag] == runeword && [flag] != ethereal # [strength] == 25 && [fireresist] == 30 # [tier] == 41", //lionheart
			"[type] == armor && [flag] == runeword && [flag] != ethereal # [defense] >= 240 && [strength] == 25 && [fireresist] == 30 # [tier] == 42", //lionheart
			"[type] == armor && [flag] == runeword && [flag] != ethereal # [defense] >= 350 && [strength] == 25 && [fireresist] == 30 # [tier] == 43", //lionheart
			"[type] == armor && [flag] == runeword && [flag] != ethereal # [defense] >= 375 && [strength] == 25 && [fireresist] == 30 # [tier] == 44", //lionheart
			"[type] == armor && [flag] == runeword && [flag] != ethereal # [defense] >= 400 && [strength] == 25 && [fireresist] == 30 # [tier] == 45", //lionheart
			"[type] == armor && [flag] == runeword && [flag] != ethereal # [defense] >= 425 && [strength] == 25 && [fireresist] == 30 # [tier] == 46", //lionheart
			"[type] == armor && [flag] == runeword && [flag] != ethereal # [defense] >= 450 && [strength] == 25 && [fireresist] == 30 # [tier] == 47", //lionheart
			//shield
			"[type] == shield && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 5 # [tier] == 1",
			"[type] == shield && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 10 # [tier] == 2",
			"[type] == shield && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 15 # [tier] == 3",
			"[type] == shield && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 20 # [tier] == 4",
			"[type] == shield && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 25 # [tier] == 5",
			"[type] == shield && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 30 # [tier] == 6",
			"[type] == shield && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 35 # [tier] == 7",
			"[type] == shield && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 40 # [tier] == 8",
			"[type] == shield && [flag] != ethereal # ([fireresist]+[lightresist]+[coldresist]) >= 45 # [tier] == 9",
			"([type] == shield || [type] == auricshields) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 # [tier] == 9",
			"([type] == shield || [type] == auricshields) && [flag] != ethereal # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 120 # [tier] == 10",
			"([type] == shield || [type] == auricshields) && [flag] != ethereal && [flag] == runeword # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 187 # [tier] == 11", //ap
			"([type] == shield || [type] == auricshields) && [flag] != ethereal && [flag] == runeword # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 187 && [defense] >= 24 # [tier] == 12", //ap
			"([type] == shield || [type] == auricshields) && [flag] != ethereal && [flag] == runeword # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 187 && [defense] >= 29 # [tier] == 13", //ap
			"([type] == shield || [type] == auricshields) && [flag] != ethereal && [flag] == runeword # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 187 && [defense] >= 53 # [tier] == 14", //ap
			"([type] == shield || [type] == auricshields) && [flag] != ethereal # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 187 && [defense] >= 59 # [tier] == 15",
			"([type] == shield || [type] == auricshields) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && [fcr] >= 20 # [tier] == 16",
			"([type] == shield || [type] == auricshields) && [flag] != ethereal # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 2 && ([fireresist]+[lightresist]+[coldresist]) >= 60 # [tier] == 17",
			"([type] == shield || [type] == auricshields) && [flag] != ethereal && [flag] == runeword # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 200 # [tier] == 18", // sanctuary
			"([type] == shield || [type] == auricshields) && [flag] != ethereal && [flag] == runeword  # [fcr] >= 35 && [maxmana] >= 89 # [tier] == 19", // spirit
			//gloves
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 10 # [Tier] == 1",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 15 # [Tier] == 2",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 20 && [strength] > 0 # [Tier] == 3",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 20 && [strength] >= 5 # [Tier] == 4",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 20 && [strength] >= 10 # [Tier] == 5",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 20 && [strength] >= 15 # [Tier] == 6",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 25 && [strength] >= 15 # [Tier] == 7",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 30 && [strength] >= 15 # [Tier] == 8",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 35 && [strength] >= 15 # [Tier] == 9",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 40 && [strength] >= 15 # [Tier] == 10",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 45 && [strength] >= 15 # [Tier] == 11",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 50 && [strength] >= 15 # [Tier] == 12",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 55 && [strength] >= 15 # [Tier] == 13",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 60 && [strength] >= 15 # [Tier] == 14",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 65 && [strength] >= 15 # [Tier] == 15",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 70 && [strength] >= 15 # [Tier] == 16",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 75 && [strength] >= 15 # [Tier] == 17",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 80 && [strength] >= 15 # [Tier] == 18",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 85 && [strength] >= 15 # [Tier] == 19",
			"[Type] == Gloves && [flag] != ethereal # ([FireResist]+[ColdResist]+[LightResist]) >= 90 && [strength] >= 15 # [Tier] == 20",
			"[name] == heavybracers && [quality] == set && [flag] != ethereal # [fcr] >= 20 # [tier] == 10",
			"[name] == lightgauntlets && [quality] == unique && [flag] != ethereal # [fcr] >= 20 # [tier] == 11",
			//ammy
			"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 5 # [Tier] == 1",
			"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 10 # [Tier] == 2",
			"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 15 # [Tier] == 3",
			"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 20 # [Tier] == 4",
			"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 25 # [Tier] == 5",
			"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 30 # [Tier] == 6",
			"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 35 # [Tier] == 7",
			"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 40 # [Tier] == 8",
			"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 45 # [Tier] == 9",
			"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 50 # [Tier] == 10",
			"[Type] == Amulet && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 55 # [Tier] == 11",
			"[Type] == Amulet && [Quality] == Rare # [FireResist]+[LightResist] >= 20 && [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] == 1 # [Tier] == 12",
			"[Type] == Amulet && [Quality] == Rare # [FireResist]+[LightResist] >= 25 && [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] == 1 # [Tier] == 13",
			"[Type] == Amulet && [Quality] == Rare # [FireResist]+[LightResist] >= 30 && [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && [maxhp] >= 0 # [Tier] == 14",
			"[Type] == Amulet && [Quality] == Rare # [FireResist]+[LightResist] >= 30 && [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && [maxhp] >= 5 # [Tier] == 15",
			"[Type] == Amulet && [Quality] == Rare # [FireResist]+[LightResist] >= 30 && [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && [maxhp] >= 10 # [Tier] == 16",
			"[Type] == Amulet && [Quality] == Rare # [FireResist]+[LightResist] >= 30 && [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && [maxhp] >= 15 # [Tier] == 17",
			"[Type] == Amulet && [Quality] == Rare # [FireResist]+[LightResist] >= 30 && [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && [maxhp] >= 20 && [fcr] >= 0 # [Tier] == 18",
			"[Type] == Amulet && [Quality] == Rare # [FireResist]+[LightResist] >= 30 && [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 1 && [maxhp] >= 20 && [fcr] >= 10 # [Tier] == 19",
			"[Type] == Amulet && [Quality] == Rare # [FireResist]+[LightResist] >= 30 && [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 2 && [maxhp] >= 20 && [fcr] >= 10 # [Tier] == 20",
			"[Type] == Amulet && [Quality] == Rare # [FireResist]+[LightResist] >= 30 && [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab]+[SkillBlizzard]+[SkillGlacialSpike] >= 3 && [maxhp] >= 20 && [fcr] >= 10 # [Tier] == 21",
			"[Type] == Amulet && [Quality] >= Set # [ItemAllSkills]+[SorceressSkills]+[ColdSkillTab] == 2 # [Tier] == 22",
			"[type] == amulet && [quality] == unique # [strength] == 5 && [coldresist] >= 25 # [tier] == 23",
			"[type] == amulet && [quality] == unique # [strength] == 5 && [coldresist] >= 26 # [tier] == 24",
			"[type] == amulet && [quality] == unique # [strength] == 5 && [coldresist] >= 27 # [tier] == 25",
			"[type] == amulet && [quality] == unique # [strength] == 5 && [coldresist] >= 28 # [tier] == 26",
			"[type] == amulet && [quality] == unique # [strength] == 5 && [coldresist] >= 29 # [tier] == 27",
			"[type] == amulet && [quality] == unique # [strength] == 5 && [coldresist] >= 30 # [tier] == 28",
			//rings
			"[Type] == Ring && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 10 # [Tier] == 1",
			"[Type] == Ring && [Quality] >= Magic # [FireResist]+[ColdResist]+[LightResist] >= 15 # [Tier] == 2",
			"[Type] == Ring && [Quality] >= Magic # [FireResist]+[LightResist] >= 20 # [Tier] == 3",
			"[Type] == Ring && [Quality] >= Magic # [FireResist]+[LightResist] >= 25 # [Tier] == 4",
			"[Type] == Ring && [Quality] >= Magic # [FireResist]+[LightResist] >= 30 # [Tier] == 5",
			"[Type] == Ring && [Quality] >= Magic # [FireResist]+[LightResist] >= 35 # [Tier] == 6",
			"[Type] == Ring && [Quality] >= Magic # [FireResist]+[LightResist] >= 40 # [Tier] == 7",
			"[Type] == Ring && [Quality] >= Magic # [FireResist]+[LightResist] >= 45 # [Tier] == 8",
			"[Type] == Ring && [Quality] >= Magic # [FireResist]+[LightResist] >= 50 # [Tier] == 9",
			"[Type] == Ring && [Quality] >= Magic # [FireResist]+[LightResist] >= 55 # [Tier] == 10",
			"[type] == ring && [quality] == rare # [fcr] == 10 && [fireresist]+[lightresist] >= 20 # tier == 11",
			"[type] == ring && [quality] == rare # [fcr] == 10 && [fireresist]+[lightresist] >= 25 # tier == 12",
			"[type] == ring && [quality] == rare # [fcr] == 10 && [fireresist]+[lightresist] >= 30 # tier == 13",
			"[type] == ring && [quality] == rare # [fcr] == 10 && [fireresist]+[lightresist] >= 35 # tier == 14",
			"[type] == ring && [quality] == rare # [fcr] == 10 && [fireresist]+[lightresist] >= 40 # tier == 15",
			"[type] == ring && [quality] == rare # [fcr] == 10 && [fireresist]+[lightresist] >= 45 # tier == 16",
			"[type] == ring && [quality] == rare # [fcr] == 10 && [fireresist]+[lightresist] >= 50 # tier == 17",
			"[type] == ring && [quality] == rare # [fcr] == 10 && [fireresist]+[lightresist] >= 55 # tier == 18",
			"[name] == ring && [quality] == unique # [maxhp] >= 40 && [magicdamagereduction] >= 12 # [tier] == 99",
			"[type] == ring && [quality] == unique # [itemmaxmanapercent] == 25 # [tier] == 100",
		];
		NTIP.arrayLooping(autoequipTiers);
	}
}
