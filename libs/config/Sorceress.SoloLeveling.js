/*
Sorceress.SoloLeveling.js config file
	To select your finalbuild.
	1. Go into the D2BS console manager.
	2. Select the Bots profile
	3. In the info tag box enter one of the following choices:
		Meteorb
		Blizzard
		BlizzBaller
		Blova
	4. Save the profile and start
*/
function LoadConfig () {
	Scripts.UserAddon = false; // !!!YOU MUST SET THIS TO FALSE IF YOU WANT TO RUN BOSS/AREA SCRIPTS!!!
	Scripts.SoloLeveling = true; // *** Leveling Script turn off when done leveling ***

	//  *** Do not turn on Boss/area scripts while SoloLeveling is active!!!!! ***
	// *** act 1 ***
	Scripts.Corpsefire = false;
	Config.Corpsefire.ClearDen = false;
	Scripts.Mausoleum = false;
	Config.Mausoleum.KillBloodRaven = false;
	Config.Mausoleum.ClearCrypt = false;
	Scripts.Rakanishu = false;
	Config.Rakanishu.KillGriswold = true;
	Scripts.UndergroundPassage = false;
	Scripts.Coldcrow = false;
	Scripts.Tristram = false;
	Config.Tristram.WalkClear = false; // Disable teleport while clearing to protect leechers
	Config.Tristram.PortalLeech = false; // Set to true to open a portal for leechers.
	Scripts.Pit = false;
	Config.Pit.ClearPit1 = true;
	Scripts.Treehead = false;
	Scripts.Smith = false;
	Scripts.BoneAsh = false;
	Scripts.Countess = false;
	Config.Countess.KillGhosts = false;
	Scripts.Andariel = false;
	Scripts.Cows = false;
	// *** act 2 ***
	Scripts.Radament = false;
	Scripts.Coldworm = false;
	Config.Coldworm.KillBeetleburst = false;
	Config.Coldworm.ClearMaggotLair = false; // Clear all 3 levels
	Scripts.AncientTunnels = false;
	Config.AncientTunnels.OpenChest = false; // Open special chest in Lost City
	Config.AncientTunnels.KillDarkElder = false;
	Scripts.Summoner = false;
	Config.Summoner.FireEye = false;
	Scripts.Tombs = false;
	Scripts.Duriel = false;
	// *** act 3 ***
	Scripts.Stormtree = false;
	Scripts.KurastTemples = false;
	Scripts.Icehawk = false;
	Scripts.Endugu = false;
	Scripts.Travincal = false;
	Config.Travincal.PortalLeech = false; // Set to true to open a portal for leechers.
	Scripts.Mephisto = false;
	Config.Mephisto.MoatTrick = false;
	Config.Mephisto.KillCouncil = false;
	Config.Mephisto.TakeRedPortal = true;
	// *** act 4 ***
	Scripts.OuterSteppes = false;
	Scripts.Izual = false;
	Scripts.Hephasto = false;
	Config.Hephasto.ClearRiver = false; // Clear river after killing Hephasto
	Config.Hephasto.ClearType = 0xF; // 0xF = skip normal, 0x7 = champions/bosses, 0 = all
	Scripts.Vizier = false; // Intended for classic sorc, kills Vizier only.
	Scripts.FastDiablo = false;
	Scripts.Diablo = false;
	Config.Diablo.WalkClear = false; // Disable teleport while clearing to protect leechers
	Config.Diablo.Entrance = true; // Start from entrance
	Config.Diablo.SealWarning = "Leave the seals alone!";
	Config.Diablo.EntranceTP = "Entrance TP up";
	Config.Diablo.StarTP = "Star TP up";
	Config.Diablo.DiabloMsg = "Diablo";
	Config.Diablo.SealOrder = ["vizier", "seis", "infector"]; // the order in which to clear the seals. If seals are excluded, they won't be checked unless diablo fails to appear
	Scripts.SealLeader = false; // Clear a safe spot around seals and invite leechers in. Leechers should run SealLeecher script. Don't run with Diablo or FastDiablo.
	// *** act 5 ***
	Scripts.Pindleskin = false;
	Config.Pindleskin.UseWaypoint = false;
	Config.Pindleskin.KillNihlathak = true;
	Config.Pindleskin.ViperQuit = false; // End script if Tomb Vipers are found.
	Scripts.Nihlathak = false;
	Config.Nihlathak.ViperQuit = false; // End script if Tomb Vipers are found.
	Scripts.Eldritch = false;
	Config.Eldritch.OpenChest = true;
	Config.Eldritch.KillShenk = true;
	Config.Eldritch.KillDacFarren = true;
	Scripts.Eyeback = false;
	Scripts.SharpTooth = false;
	Scripts.ThreshSocket = false;
	Scripts.Abaddon = false;
	Scripts.Frozenstein = false;
	Config.Frozenstein.ClearFrozenRiver = true;
	Scripts.Bonesaw = false;
	Config.Bonesaw.ClearDrifterCavern = false;
	Scripts.Snapchip = false;
	Config.Snapchip.ClearIcyCellar = true;
	Scripts.Worldstone = false;
	Scripts.Baal = false;
	Config.Baal.HotTPMessage = "Hot TP!";
	Config.Baal.SafeTPMessage = "Safe TP!";
	Config.Baal.BaalMessage = "Baal!";
	Config.Baal.SoulQuit = false; // End script if Souls (Burning Souls) are found.
	Config.Baal.DollQuit = false; // End script if Dolls (Undead Soul Killers) are found.
	Config.Baal.KillBaal = true; // Kill Baal. Leaves game after wave 5 if false.

	// Pickit config. Default folder is kolbot/pickit.
	//	Config.PickitFiles.push("kolton.nip");
	//	Config.PickitFiles.push("LLD.nip");

	// Gambling config
	Config.Gamble = true;
	Config.GambleGoldStart = 2000000;
	Config.GambleGoldStop = 750000;

	// List of item names or classids for gambling. Check libs/NTItemAlias.dbl file for other item classids.
	Config.GambleItems.push("Amulet");
	Config.GambleItems.push("Ring");
	//	Config.GambleItems.push("Circlet");
	//	Config.GambleItems.push("Coronet");

	// Automule settings
	Config.AutoMule.Trigger = [];
	Config.AutoMule.Force = [];
	Config.AutoMule.Exclude = [
		"[name] >= elrune && [name] <= lemrune",
		"[Name] == Mephisto'sSoulstone",
		"[Name] == HellForgeHammer",
		"[Name] == ScrollOfInifuss",
		"[Name] == KeyToTheCairnStones",
		"[name] == BookOfSkill",
		"[Name] == HoradricCube",
		"[Name] == ShaftOfTheHoradricStaff",
		"[Name] == TopOfTheHoradricStaff",
		"[Name] == HoradricStaff",
		"[Name] == ajadefigurine",
		"[Name] == TheGoldenBird",
		"[Name] == potionoflife",
		"[Name] == lamesen'stome",
		"[Name] == Khalim'sEye",
		"[Name] == Khalim'sHeart",
		"[Name] == Khalim'sBrain",
		"[Name] == Khalim'sFlail",
		"[Name] == Khalim'sWill",
		"[Name] == ScrollofResistance",
	];

	// Town settings
	Config.HealHP = 99;
	Config.HealMP = 99;
	Config.HealStatus = true;
	Config.UseMerc = true;
	Config.MercWatch = true;
	Config.ClearInvOnStart = false;

	// Potion settings
	Config.UseHP = me.playertype ? 90 : 75;
	Config.UseRejuvHP = me.playertype ? 65 : 40;
	Config.UseMP = me.playertype ? 75 : 55;
	Config.UseMercHP = 75;
	Config.HPBuffer = 0;
	Config.MPBuffer = 0;
	Config.RejuvBuffer = 0;

	// Chicken settings
	Config.LifeChicken = me.playertype ? 60 : 10;
	Config.ManaChicken = 0;
	Config.MercChicken = 0;
	Config.TownHP = 0;
	Config.TownMP = 0;

	/* Inventory lock configuration. */
	Config.Inventory[0] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	Config.Inventory[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	Config.Inventory[2] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	Config.Inventory[3] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

	Config.StashGold = me.charlvl * 100;
	Config.LowGold = me.diff === 0 ? 25000 : me.diff === 1 ? 50000 : 100000;

	//AutoEquip
	Config.AutoEquip = true;

	// Pickit config.
	Config.PickRange = me.diff === 0 ? 20 : 40;
	Config.FastPick = true;
	Config.CainID.Enable = false;
	Config.FieldID = false;

	// General config
	Config.MinGameTime = 400;
	Config.MaxGameTime = 7200;
	Config.MiniShopBot = true;
	Config.PacketShopping = true; // Use packets to shop. Improves shopping speed.
	Config.TownCheck = me.findItem("tbk", 0, 3);
	Config.PingQuit = [{Ping: 600, Duration: 10}];
	Config.Silence = true;
	Config.OpenChests = me.diff === 2 ? 2 : true;

	// Shrine Scanner - scan for shrines while moving.
	Config.ScanShrines = [15, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14];

	// Primary Slot - Bot will try to determine primary slot if not used (non-cta slot that's not empty)
	Config.PrimarySlot = 0;

	// Fastmod config
	Config.FCR = me.getStat(105); // 0 - disable, 1 to 255 - set value of faster cast rate
	Config.FHR = me.getStat(99); // 0 - disable, 1 to 255 - set value of faster hit recovery
	Config.FBR = me.getStat(102); // 0 - disable, 1 to 255 - set value of faster block recovery
	Config.IAS = me.getStat(93); // 0 - disable, 1 to 255 - set value of increased attack speed
	Config.PacketCasting = 1; // 0 = disable, 1 = packet teleport, 2 = full packet casting.
	Config.WaypointMenu = true;

	// Monster skip config
	Config.SkipException = [getLocaleString(2851), getLocaleString(2852), getLocaleString(2853)]; // vizer, de seis, infector
	Config.SkipEnchant = [];
	Config.SkipAura = [];

	// Attack config
	Config.AttackSkill = [0, 0, 0, 0, 0, 0, 0];
	Config.LowManaSkill = [0, 0];

	Config.MinColumn = [ 3, 3, 0, 0];
	Config.BeltColumn = ["hp", "mp", "rv", "rv"];

	Config.MaxAttackCount = 1000;
	Config.BossPriority = me.diff === 0 ? true : false;
	Config.ClearType = 0;
	Config.ClearPath = {
		Range: 15,
		Spectype: 0,
	};

	//Runewords, Cubing, & Crafting
	Config.Cubing = me.gametype === 1 ? me.getItem(549) : false;
	Config.MakeRunewords = me.gametype === 1 ? true : false;

	//AutoStat
	Config.AutoStat.Enabled = true;
	Config.AutoStat.Save = 0;
	Config.AutoStat.BlockChance = 57;
	Config.AutoStat.UseBulk = true;

	//AutoSkill
	Config.AutoSkill.Enabled = true;
	Config.AutoSkill.Save = 0;

	//AutoBuild
	Config.AutoBuild.Enabled = true;

	// Class specific config
	Config.UseTelekinesis = !!me.getSkill(43, 0); // use telekensis if have skill
	Config.Dodge = !!me.getSkill(54, 0); // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
	Config.DodgeRange = 15; // Distance to keep from monsters.
	Config.DodgeHP = 100; // Dodge only if HP percent is less than or equal to Config.DodgeHP. 100 = always dodge.
	Config.TeleStomp = false; // Use merc to attack bosses if they're immune to attacks, but not to physical damage
	Config.CastStatic = 50;
	Config.StaticList = ["Duriel", "Mephisto", "Izual", "Diablo", "Baal"];

	/*-----------------------------------------*/
	//			DO NOT TOUCH BELOW 			   //
	/*-----------------------------------------*/
	if (Scripts.SoloLeveling === true) {
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

		//Debugging
		Config.ItemInfo = SoloSettings.debugging.logItems; 				// Log stashed, skipped (due to no space) or sold items.
		Config.LogExperience = SoloSettings.debugging.logExperience; 	// Print experience statistics in the manager.
		Config.AutoBuild.Verbose = SoloSettings.debugging.verbose;		// Allows script to print messages in console
		Config.AutoBuild.DebugMode = SoloSettings.debugging.verbose;	// logs activity to /logs/AutoBuild.CharacterName._MM_DD_YYYY.log

		// Manager Item Log Screen
		Config.LogKeys = true;
		Config.LogOrgans = true;
		Config.LogMiddleRunes = true;
		Config.LogHighRunes = true;
		Config.ShowCubingInfo = true;

		// Character Build Setup
		var respecTwo = respecTwoCheck();
		var chooseBuffer = me.charlvl < 5 ? 0 : me.charlvl < respecOne ? 1 : me.charlvl < respecTwo ? 2 : 3;
		var beltPots = [["hp", "hp", "hp", "hp"], ["hp", "hp", "mp", "mp"], ["hp", "hp", "mp", "mp"], ["hp", "mp", "mp", "rv"]][chooseBuffer];
		Config.BeltColumn = beltPots;
		Config.MinColumn[0] = Config.BeltColumn[0] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
		Config.MinColumn[1] = Config.BeltColumn[1] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
		Config.MinColumn[2] = Config.BeltColumn[2] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
		Config.MinColumn[3] = Config.BeltColumn[3] !== "rv" ? Math.max(1, Storage.BeltSize() - 1) : 0;
		var bufferHP = [4, 4, 4, 2][chooseBuffer];
		var bufferMP = [12, 10, 10, 4][chooseBuffer];
		var bufferRV = [0, 4, 4, 4][chooseBuffer];
		Config.HPBuffer = bufferHP;
		Config.MPBuffer = bufferMP;
		Config.RejuvBuffer = bufferRV;
		Config.AutoSkill.Build = specPush("skills");
		Config.AutoStat.Build = specPush("stats");
		Config.AutoBuild.Template = getBuild();

		var autoequipTiers = [ // autoequip setup
			//weapon
			"[name] == swirlingcrystal && [quality] == set && [flag] != ethereal # [skilllightningmastery]+[skillfiremastery]+[skillcoldmastery] >= 3 # [tier] == 100000", //tals orb
			"([type] == orb || [type] == wand && [Quality] >= Magic || [type] == sword && ([Quality] >= Magic || [flag] == runeword) || [type] == knife && [Quality] >= Magic) && [flag] != ethereal # [secondarymindamage] == 0 && [itemchargedskill] >= 0 # [tier] == tierscore(item)",
			//Helmet
			"[name] == deathmask && [quality] == set && [flag] != ethereal # [coldresist] == 15 && [lightresist] == 15 # [tier] == 100000", //tals mask
			"([type] == helm || [type] == circlet) && ([Quality] >= Magic || [flag] == runeword) && [flag] != ethereal #  [itemchargedskill] >= 0 # [tier] == tierscore(item)",
			//belt
			"[name] == meshbelt && [quality] == set && [flag] != ethereal # [itemmagicbonus] >= 10 # [tier] == 100000", //tals belt
			"[type] == belt && [Quality] >= Magic && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
			//boots
			"[Name] == SharkskinBoots && [Quality] == Unique && [Flag] != Ethereal # [MaxHP] >= 65 # [tier] == 100000", //waterwalks
			"[Type] == Boots && [Quality] >= Magic && [Flag] != Ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
			//armor
			"[name] == lacqueredplate && [quality] == set # [coldresist] >= 1 # [tier] == 100000", //tals armor
			"[type] == armor && ([Quality] >= Magic || [flag] == runeword) && [Flag] != Ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
			//shield
			"[name] == roundshield && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 180 # [tier] == 100000", //mosers
			"[type] == shield && ([Quality] >= Magic || [flag] == runeword) && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
			//gloves
			"[name] == lightgauntlets && [quality] == unique && [flag] != ethereal # [fcr] >= 20 # [tier] == 100000", //magefist
			"[Type] == Gloves && [Quality] >= Magic && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
			//ammy
			"[name] == amulet && [quality] == set # [lightresist] == 33 # [tier] == 100000", //tals ammy
			"[Type] == Amulet && [Quality] >= Magic # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
			//rings
			"[Type] == Ring && [Quality] == Unique # [ItemMagicBonus] >= 30 # [tier] == 99000", //nagelring
			"[Type] == Ring	&& [Quality] == Unique # [Dexterity] >= 20 # [tier] == 100000", //ravenfrost
			"[Type] == Ring && [Quality] >= Magic # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		];
		NTIP.arrayLooping(autoequipTiers);

		var autoequipmercTiers = [
			"([type] == circlet || [type] == helm) && ([Quality] >= Magic || [flag] == runeword) # [itemchargedskill] >= 0 # [Merctier] == mercscore(item)",
			"[Type] == armor && ([Quality] >= Magic || [flag] == runeword) # [itemchargedskill] >= 0 # [Merctier] == mercscore(item)",
			"[Type] == Polearm && ([Quality] >= rare || [flag] == runeword) # [itemchargedskill] >= 0 # [Merctier] == mercscore(item)",
			"me.diff !== 2 && [Type] == Polearm && [Quality] >= Magic && [Level] >= 22 # [itemchargedskill] >= 0 # [Merctier] == mercscore(item)"
		];
		NTIP.arrayLooping(autoequipmercTiers);

		if (me.gametype === 1) { //LOD game gear
			if (!haveItem("sword", "runeword", "Call To Arms")) {
				var CTA = [
					"[Name] == AmnRune # # [MaxQuantity] == 1",
					"[Name] == RalRune # # [MaxQuantity] == 1",
					"[Name] == MalRune",
					"[Name] == IstRune",
					"[Name] == OhmRune",
				];
				NTIP.arrayLooping(CTA);

				if (me.getItem(636)) { // have Ohm before collecting base
					NTIP.addLine("[Name] == CrystalSword && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 5 # [MaxQuantity] == 1");
				}

				Config.Runewords.push([Runeword.CallToArms, "Crystal Sword"]);
				Config.KeepRunewords.push("[type] == sword # [plusskillbattleorders] >= 1");
			}

			if (Item.getEquippedItem(1).tier < 315) { // Lore
				if (!haveItem("helm", "runeword", "Lore")) {
					var loreRunes = [
						"[Name] == OrtRune # # [MaxQuantity] == 1",
						"[Name] == SolRune # # [MaxQuantity] == 1",
					];
					NTIP.arrayLooping(loreRunes);

					Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
					Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
					Config.Recipes.push([Recipe.Rune, "Amn Rune"]);
				}

				var loreHelm = [
					"me.diff <= 1 && ([Name] == Crown || [Name] == BoneHelm || [Name] == FullHelm) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1",
					"([Name] == Casque || [Name] == Sallet || [Name] == DeathMask || [Name] == GrimHelm) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(loreHelm);

				Config.Runewords.push([Runeword.Lore, "Full Helm"]);
				Config.Runewords.push([Runeword.Lore, "Death Mask"]);
				Config.Runewords.push([Runeword.Lore, "Casque"]);
				Config.Runewords.push([Runeword.Lore, "Sallet"]);
				Config.Runewords.push([Runeword.Lore, "Bone Helm"]);
				Config.Runewords.push([Runeword.Lore, "Grim Helm"]);

				Config.KeepRunewords.push("([type] == circlet || [type] == helm) # [LightResist] >= 25");
			}

			if (Item.getEquippedItem(3).tier < 233) { // Stealth
				if (!haveItem("armor", "runeword", "Stealth") && me.diff !== 2) {
					var stealthRunes = [
						"[Name] == TalRune # # [MaxQuantity] == 1",
						"[Name] == EthRune # # [MaxQuantity] == 1",
					];
					NTIP.arrayLooping(stealthRunes);
				}

				var stealthArmor = [
					"me.diff <= 1 && ([Name] == StuddedLeather || [Name] == BreastPlate || [Name] == LightPlate) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1",
					"([Name] == GhostArmor || [Name] == SerpentskinArmor) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(stealthArmor);

				Config.Runewords.push([Runeword.Stealth, "Studded Leather"]);
				Config.Runewords.push([Runeword.Stealth, "Breast Plate"]);
				Config.Runewords.push([Runeword.Stealth, "Light Plate"]);
				Config.Runewords.push([Runeword.Stealth, "Ghost Armor"]);
				Config.Runewords.push([Runeword.Stealth, "Serpentskin Armor"]);

				Config.KeepRunewords.push("[type] == armor # [frw] == 25");
			}

			if (Item.getEquippedItem(3).tier < 634) { // Smoke
				if (!haveItem("armor", "runeword", "Smoke") && me.diff !== 2) {
					if (!me.getItem(626)) { // Cube to Lum Rune
						Config.Recipes.push([Recipe.Rune, "Io Rune"]); // cube Io to Lum
					}

					var smokeRunes = [
						"[Name] == NefRune # # [MaxQuantity] == 1",
						"[Name] == LumRune # # [MaxQuantity] == 1",
					];
					NTIP.arrayLooping(smokeRunes);
				}

				NTIP.addLine("([Name] == demonhidearmor || [Name] == DuskShroud || [Name] == GhostArmor ||[Name] == LightPlate || [Name] == MagePlate || [Name] == SerpentskinArmor || [Name] == trellisedarmor || [Name] == WyrmHide) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 2 # [MaxQuantity] == 1");

				Config.Runewords.push([Runeword.Smoke, "demonhide armor"]);
				Config.Runewords.push([Runeword.Smoke, "Dusk Shroud"]);
				Config.Runewords.push([Runeword.Smoke, "Ghost Armor"]);
				Config.Runewords.push([Runeword.Smoke, "Light Plate"]);
				Config.Runewords.push([Runeword.Smoke, "Mage Plate"]);
				Config.Runewords.push([Runeword.Smoke, "Serpentskin Armor"]);
				Config.Runewords.push([Runeword.Smoke, "trellised armor"]);
				Config.Runewords.push([Runeword.Smoke, "WyrmHide"]);

				Config.KeepRunewords.push("[type] == armor # [fireresist] == 50");
			}

			if (Item.getEquippedItem(5).tier < 500) { // Ancients' Pledge
				if (!haveItem("shield", "runeword", "Ancients' Pledge") && me.diff !== 2) {
					if (!me.getItem(618)) {
						Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
					}

					var apRunes = [
						"[Name] == RalRune # # [MaxQuantity] == 1",
						"[Name] == OrtRune # # [MaxQuantity] == 1",
						"[Name] == TalRune # # [MaxQuantity] == 1",
					];
					NTIP.arrayLooping(apRunes);
				}

				var apShields = [
					"me.diff === 0 && [Name] == LargeShield && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1",
					"me.diff <= 1 && [Name] == KiteShield && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1",
					"([Name] == DragonShield || [Name] == Scutum) && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(apShields);

				Config.Runewords.push([Runeword.AncientsPledge, "Large Shield"]);
				Config.Runewords.push([Runeword.AncientsPledge, "Kite Shield"]);
				Config.Runewords.push([Runeword.AncientsPledge, "Scutum"]);
				Config.Runewords.push([Runeword.AncientsPledge, "Dragon Shield"]);

				Config.KeepRunewords.push("([type] == shield || [type] == auricshields) # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 187");
			}

			var Treachery = [ // merc Treachery
				"([Name] == MagePlate || [Name] == HellforgePlate || [Name] == KrakenShell || [Name] == ArchonPlate || [Name] == BalrogSkin || [Name] == BoneWeave || [Name] == GreatHauberk || [Name] == LoricatedMail || [Name] == DiamondMail || [Name] == WireFleece || [Name] == ScarabHusk || [Name] == WyrmHide || [Name] == DuskShroud) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 3 # [MaxQuantity] == 1",
				"me.diff !== 0 && ([Name] == HellforgePlate || [Name] == KrakenShell || [Name] == ArchonPlate || [Name] == BalrogSkin || [Name] == BoneWeave || [Name] == GreatHauberk || [Name] == LoricatedMail || [Name] == DiamondMail || [Name] == WireFleece || [Name] == ScarabHusk || [Name] == WyrmHide || [Name] == DuskShroud) && [Quality] == Normal && [Flag] == Ethereal # [Sockets] == 0 # [MaxQuantity] == 1",
			];
			NTIP.arrayLooping(Treachery);

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
				if (Item.getEquippedItem(4).tier < 777) { // Spirit Sword
					if (!haveItem("sword", "runeword", "Spirit") && me.diff !== 2) {
						var SpiritSword = [
							"[Name] == TalRune # # [MaxQuantity] == 1",
							"[Name] == ThulRune # # [MaxQuantity] == 1",
							"[Name] == OrtRune # # [MaxQuantity] == 1",
							"[Name] == AmnRune # # [MaxQuantity] == 1",
						];
						NTIP.arrayLooping(SpiritSword);

						if (!me.getItem(620)) { //Amn Rune
							Config.Recipes.push([Recipe.Rune, "Ral Rune"]);
							Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
							Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
						}

						NTIP.addLine("([Name] == BroadSword || [Name] == CrystalSword) && [flag] != ethereal && [Quality] == Normal && [Level] >= 26 && [Level] <= 40 # [Sockets] == 0 # [MaxQuantity] == 1");

						Config.Recipes.push([Recipe.Socket.Weapon, "Crystal Sword", Roll.NonEth]);
						Config.Recipes.push([Recipe.Socket.Weapon, "Broad Sword", Roll.NonEth]);
					}

					NTIP.addLine("([Name] == BroadSword || [Name] == CrystalSword) && [flag] != ethereal && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1");
					Config.Runewords.push([Runeword.Spirit, "Crystal Sword"]);
					Config.Runewords.push([Runeword.Spirit, "Broad Sword"]);

					Config.KeepRunewords.push("[type] == sword # [fcr] >= 25 && [maxmana] >= 89");
				}

				if (Item.getEquippedItem(5).tier < 1000) { // Spirit shield
					if (!haveItem("shield", "runeword", "Spirit")) {
						var SpiritShield = [
							"[Name] == TalRune # # [MaxQuantity] == 1",
							"[Name] == ThulRune # # [MaxQuantity] == 1",
							"[Name] == OrtRune # # [MaxQuantity] == 1",
							"[Name] == AmnRune # # [MaxQuantity] == 1",
							"[Name] == Monarch && [Flag] != Ethereal && [Quality] >= Normal && [Quality] <= Superior # ([Sockets] == 0 || [Sockets] == 4) # [MaxQuantity] == 1",
						];
						NTIP.arrayLooping(SpiritShield);

						if (!me.getItem(620) && me.diff !== 2) { //Amn Rune
							Config.Recipes.push([Recipe.Rune, "Ort Rune"]);
							Config.Recipes.push([Recipe.Rune, "Thul Rune"]);
						}
					}

					Config.Recipes.push([Recipe.Socket.Shield, "Monarch", Roll.NonEth]);
					Config.Runewords.push([Runeword.Spirit, "Monarch"]);
					Config.KeepRunewords.push("([type] == shield || [type] == auricshields) # [fcr] >= 25 && [maxmana] >= 89");
				}

				// merc Insight
				var Insight = [
					"([Name] == thresher || [Name] == crypticaxe || [Name] == greatpoleaxe || [Name] == giantthresher) && [Flag] == Ethereal && [Quality] == Normal # [Sockets] == 0 # [MaxQuantity] == 1",
					"me.diff <= 1 && ([Name] == bill || [Name] == battlescythe || [Name] == partizan || [Name] == grimscythe) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1",
					"([Name] == thresher || [Name] == crypticaxe || [Name] == greatpoleaxe || [Name] == giantthresher) && [Quality] >= Normal && [Quality] <= Superior # [Sockets] == 4 # [MaxQuantity] == 1",
				];
				NTIP.arrayLooping(Insight);

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
		}
	}
}
