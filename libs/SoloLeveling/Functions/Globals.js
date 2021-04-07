/*
*	@filename	Globals.js
*	@author		isid0re
*	@desc		Global variables Settings, general functions for SoloLeveling functionality
*/

if (!isIncluded("OOG.js")) {
	include("OOG.js");
}

// general settings
var Difficulty = ['Normal', 'Nightmare', 'Hell'];

var SetUp = {
	include: function () {
		var folders = ["Functions"];
		folders.forEach( (folder) => {
			var files = dopen("libs/SoloLeveling/" + folder + "/").getFiles();
			files.forEach( (file) => {
				if (file.indexOf(".js") !== -1) {
					if (!isIncluded("SoloLeveling/" + folder + "/" + file)) {
						if (!include("SoloLeveling/" + folder + "/" + file)) {
							throw new Error("Failed to include " + "SoloLeveling/" + folder + "/" + file);
						}
					}
				}
			});
		});
	},

	levelCap: [35, 65, 100][me.diff],
	className: ["Amazon", "Sorceress", "Necromancer", "Paladin", "Barbarian", "Druid", "Assassin"][me.classid],
	finalBuild: DataFile.getStats().finalBuild,
	respecOne: [ 0, 28, 26, 25, 24, 24, 30][me.classid],

	respecTwo: function () {
		let respec;

		switch (me.gametype) {
		case 0:
			respec = [0, 75, 75, 85, 0, 75, 75][me.classid];
			break;

		case 1:
			switch (this.finalBuild) {
			case "Javazon":
			case "LightSorc":
			case "Blova":
				respec = Attack.checkInfinity() ? me.charlvl : 100;
				break;
			case "Meteorb":
			case "Blizzard":
			case "BlizzBaller":
				respec = (Item.getEquippedItem(1).tier + Item.getEquippedItem(2).tier +
						Item.getEquippedItem(3).tier + Item.getEquippedItem(4).tier) >= 400000 ? me.charlvl : 100;	//Tal ammy, belt, armor, and wep
				break;
			case "Bone":
			case "Poison":
			case "Summon":
			case "Hammerdin":
			case "Wind":
			case "Trapsin":
				respec = Check.haveItem("armor", "runeword", "Enigma") ? me.charlvl : 100;
				break;
			case "Smiter":
				respec = Check.haveItem("sword", "runeword", "Grief") ? me.charlvl : 100;
				break;
			case "Frenzy":
				respec = Check.haveItem("weapon", "runeword", "Grief") && Check.haveItem("weapon", "runeword", "Breath of the Dying") ? me.charlvl : 100;
				break;
			case "Wolf":
				respec = Check.haveItem("weapon", "runeword", "Breath of the Dying") ? me.charlvl : 100;
				break;
			}
		}

		return respec;
	},

	getBuild: function () {
		let buildType;

		if (me.charlvl < SetUp.respecOne) {
			buildType = "Start";
		} else if (me.charlvl >= SetUp.respecTwo()) {
			buildType = SetUp.finalBuild;
		} else {
			buildType = "Leveling";
		}

		return buildType;
	},

	specPush: function (specType) {
		function getBuildTemplate () {
			let buildType = SetUp.getBuild();
			let build = buildType + "Build" ;
			let classname = SetUp.className;
			let template = "SoloLeveling/BuildFiles/" + classname + "." + build + ".js";

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
	},
};

// SoloLeveling Pickit Items
var nipItems = {
	Selling: [
		'([type] == ring || [type] == amulet) && [quality] >= magic # [fcr] >= 600',
		'([type] == armor || [type] == boots || [type] == gloves || [type] == belt) && [quality] >= magic # [fcr] >= 600',
		'([type] == helm || [type] == circlet || [type] == primalhelm || [type] == pelt)&& [quality] >= magic # [fcr] >= 600',
		'([type] == anyshield || [type] == voodooheads) && [quality] >= magic # [fcr] >= 600',
		'([type] == javelin || [type] == amazonspear || [type] == amazonjavelin) && [quality] >= magic # [fcr] >= 600',
		'([type] == orb || [type] == wand || [type] == staff) && [quality] >= normal # [fcr] >= 600',
		'([type] == throwingaxe || [type] == axe || [type] == mace || [type] == club || [type] == scepter || [type] == hammer) && [quality] >= magic # [fcr] >= 600',
		'([type] == sword || [type] == knife || [type] == throwingknife) && [quality] >= magic # [fcr] >= 600',
		'([type] == bow || [type] == crossbow) && [quality] >= magic # [fcr] >= 600',
		'([type] == handtohand || [type] == assassinclaw) && [quality] >= magic  # [fcr] >= 600',
	],

	General: [
		"[name] == tomeoftownportal",
		"[name] == tomeofidentify",
		"[name] == gold # [gold] >= me.charlvl * 3 * me.diff",
		"[name] == minorhealingpotion",
		"[name] == lighthealingpotion",
		"[name] == healingpotion",
		"[name] == greaterhealingpotion",
		"[name] == superhealingpotion",
		"[name] == minormanapotion",
		"[name] == lightmanapotion",
		"[name] == manapotion",
		"[name] == greatermanapotion",
		"[name] == supermanapotion",
		"[name] == rejuvenationpotion",
		"[name] == fullrejuvenationpotion",
		"[name] == ScrollofTownPortal # # [MaxQuantity] == 20",
		"[name] == scrollofidentify # # [MaxQuantity] == 20",
		"[name] == key # # [maxquantity] == 12",
		"[name] == perfectamethyst # # [MaxQuantity] == 2",
		"[name] == perfectemerald # # [MaxQuantity] == 2",
		"[name] == perfecttopaz # # [MaxQuantity] == 2",
		"[name] == perfectdiamond # # [MaxQuantity] == 2",
		"[name] == perfectruby # # [MaxQuantity] == 2",
		"[name] == perfectsapphire # # [MaxQuantity] == 2",
		"[name] >= pulrune && [name] <= zodrune"
	],

	Quest: [
		"[Name] == ScrollOfInifuss",
		"[Name] == KeyToTheCairnStones",
		"[name] == BookOfSkill",
		"[Name] == HoradricCube",
		"[Name] == ShaftOfTheHoradricStaff",
		"[Name] == TopOfTheHoradricStaff",
		"[Name] == HoradricStaff",
		"[Name] == TheGoldenBird",
		"[Name] == potionoflife",
		"[Name] == lamesen'stome",
		"[Name] == Khalim'sEye",
		"[Name] == Khalim'sHeart",
		"[Name] == Khalim'sBrain",
		"[Name] == Khalim'sFlail",
		"[Name] == Khalim'sWill",
		"[Name] == ScrollofResistance",
	],
};

// General Game functions
var Check = {
	Task: function (sequenceName) {
		let questIdMap = {
			"spokeToWarriv": 0, "den": 1, "bloodRaven": 2, "tristram": 4, "countess": 5, "toolsOfTheTrade": 3, "sistersToTheSlaughter": 6, "andariel": 7,
			"spokeToJerhyn": 8, "radament": 9, "horadricStaff": 10, "taintedSun": 11, "arcaneSanctuary": 12, "summoner": 13, "sevenTombs": 14, "duriel": 15,
			"spokeToHratli": 16, "goldenBird": 20, "bladeOfTheOldReligion": 19, "khalimFlail": 18, "lamEsensTome": 17, "trvincal": 21, "mephisto": 22, "ableToGoToActIv": 23,
			"spokeToTyrael": 24, "izual": 25, "hellsForge": 27, "diablo": 26, "ableToGoToActV": 28,
			"seigeOnHaggorath": 35, "rescueOnMountArreat": 36, "anya": 37, "betrayalOfHaggorath": 38, "riteOfPassage": 39, "baal": 40
		};
		let dontRun = false;
		let dontMF = !me.classic && !Misc.checkQuest(questIdMap.baal, 0) ? true : me.classic && !Misc.checkQuest(questIdMap.diablo, 0) ? true : false;
		let haveGold = this.Gold();
		let haveRunes = this.Runes();

		switch (sequenceName.toLowerCase()) {
		case "den": //den
			if (Misc.checkQuest(questIdMap.den, 0)) { //completed
				dontRun = true;
			}

			break;
		case "bloodraven": //bloodaraven
			if (me.normal && Misc.checkQuest(questIdMap.bloodRaven, 0) || me.nightmare || me.hell) { //complete raven normal || goldreq met
				dontRun = true;
			}

			break;
		case "smith": //tools of the trade
			if (Misc.checkQuest(questIdMap.toolsOfTheTrade, 0) || Misc.checkQuest(questIdMap.toolsOfTheTrade, 1)) { // completed or needs to imbue
				dontRun = true;
			}

			break;
		case "tristam": //tristam
			if (me.charlvl > 11 && (me.classic && !Misc.checkQuest(questIdMap.diablo, 0) || !Misc.checkQuest(questIdMap.baal, 0)) || Misc.checkQuest(questIdMap.tristram, 0)) { //completed
				dontRun = true;
			}

			break;
		case "countess": //countess
			if (me.classic && me.normal && Misc.checkQuest(questIdMap.countess, 0) || haveRunes) { // classic quest completed normal || have runes for difficulty
				dontRun = true;
			}

			break;
		case "jail": //jail runs
			if (me.charlvl >= 18) {
				dontRun = true;
			}

			break;
		case "pits": //pits
			if (!me.hell || me.hell && dontMF) {
				dontRun = true;
			}

			break;
		case "andariel": //andy
			if (Misc.checkQuest(questIdMap.andariel, 0) && (me.normal || me.classic && me.nightmare)) {
				dontRun = true;
			}

			break;
		case "cube": //cube
			if (!Pather.accessToAct(2) || me.getItem(549)) {
				dontRun = true;
			}

			break;
		case "radament": //radament
			if (!Pather.accessToAct(2) || Misc.checkQuest(questIdMap.radament, 0)) {
				dontRun = true;
			}

			break;
		case "staff": //staff
			if (!Pather.accessToAct(2) || me.getItem(91) || me.getItem(92) || Misc.checkQuest(questIdMap.horadricStaff, 0)) { //have staff or quest completed
				dontRun = true;
			}

			break;
		case "amulet": //ammy
			if (!Pather.accessToAct(2) || me.getItem(91) || me.getItem(521) || Misc.checkQuest(questIdMap.horadricStaff, 0)) { //have staff or quest completed
				dontRun = true;
			}

			break;
		case "ancienttunnels": // ancient tunnels
			if (!Pather.accessToAct(2) || me.hell && me.classid === 3 || !me.hell && haveGold) { // lowgold || no pally in hell mode magic immunes
				dontRun = true;
			}

			break;
		case "summoner": //summoner
			if (!Pather.accessToAct(2) || Misc.checkQuest(questIdMap.summoner, 0)) {
				dontRun = true;
			}

			break;
		case "tombs": //tombs
			if (!Pather.accessToAct(2) || haveGold) {
				dontRun = true;
			}

			break;
		case "duriel": //duriel
			if (!Pather.accessToAct(2) || Misc.checkQuest(questIdMap.duriel, 0)) {
				dontRun = true;
			}

			break;
		case "eye": // eye
			if (!Pather.accessToAct(3) || me.getItem(553) || me.getItem(174) || Misc.checkQuest(questIdMap.khalimFlail, 0)) {
				dontRun = true;
			}

			break;
		case "lamessen": //lamessen tome
			if (!Pather.accessToAct(3) || Misc.checkQuest(17, 0)) {
				dontRun = true;
			}

			break;
		case "heart": //heart
			if (!Pather.accessToAct(3) || me.getItem(554) || me.getItem(174) || Misc.checkQuest(questIdMap.khalimFlail, 0)) {
				dontRun = true;
			}

			break;
		case "brain": //brain
			if (!Pather.accessToAct(3) || me.getItem(555) || me.getItem(174) || Misc.checkQuest(questIdMap.khalimFlail, 0)) {
				dontRun = true;
			}

			break;
		case "lowerkurast": //lowerkurast
			if (!Pather.accessToAct(3) || !me.hell && haveGold) {
				dontRun = true;
			}

			break;
		case "travincal": //travincal
			if (!Pather.accessToAct(3) || me.normal && me.charlvl > 24 || !me.normal && Misc.checkQuest(questIdMap.khalimFlail, 0)) {
				dontRun = true;
			}

			break;
		case "mephisto": //mephisto
			if (!Pather.accessToAct(3) || !Misc.checkQuest(questIdMap.khalimFlail, 0) || Misc.checkQuest(questIdMap.ableToGoToActIv, 0) && me.normal) {
				dontRun = true;
			}

			break;
		case "izual": // izzy
			if (!Pather.accessToAct(4) || Misc.checkQuest(questIdMap.izual, 0)) {
				dontRun = true;
			}

			break;
		case "diablo": //diablo
			if (!Pather.accessToAct(4)) {
				dontRun = true;
			}

			break;
		case "hellforge": // hellforge
			if (me.classic || me.normal || !Pather.accessToAct(4) || Misc.checkQuest(questIdMap.hellsForge, 0)) {
				dontRun = true;
			}

			break;
		case "shenk": // shenk
			if (me.classic || !Pather.accessToAct(5) || haveGold && dontMF) {
				dontRun = true;
			}

			break;
		case "savebarby": //barbies
			if (me.classic || !Pather.accessToAct(5) || Misc.checkQuest(questIdMap.rescueOnMountArreat, 0) || !me.normal) {
				dontRun = true;
			}

			break;
		case "anya": //anya
			if (me.classic || !Pather.accessToAct(5) || Misc.checkQuest(questIdMap.anya, 0)) {
				dontRun = true;
			}

			break;
		case "pindle": //nith (pindle)
			if (me.classic || !Pather.accessToAct(5) || !Misc.checkQuest(questIdMap.anya, 0) || haveGold && dontMF) {
				dontRun = true;
			}

			break;
		case "ancients": //ancients
			if (me.classic || !Pather.accessToAct(5) || Misc.checkQuest(questIdMap.riteOfPassage, 0)) {
				dontRun = true;
			}

			break;
		case "baal": //baal
			if (me.classic || !Pather.accessToAct(5) || !Misc.checkQuest(questIdMap.riteOfPassage, 0)) {
				dontRun = true;
			}

			break;
		case "cows": //cows
			if (me.classic && !Misc.checkQuest(questIdMap.diablo, 0) || !Misc.checkQuest(questIdMap.baal, 0) || Misc.checkQuest(questIdMap.tristram, 10)) {
				dontRun = true;
			}

			break;
		}

		return dontRun;
	},

	Gold: function () {
		let gold = me.getStat(14) + me.getStat(15);
		let goldLimit = [10000, 50000, 100000][me.diff];

		if (me.normal && !Pather.accessToAct(2) || gold >= goldLimit) {
			return true;
		}

		me.overhead('low gold');

		return false;
	},

	Resistance: function () {
		let resStatus,
			resPenalty = me.classic ? [0, 20, 50, 50][me.diff + 1] : [ 0, 40, 100, 100][me.diff + 1],
			frRes = me.getStat(39) - resPenalty,
			lrRes = me.getStat(41) - resPenalty,
			crRes = me.questIdMap.andarieletStat(43) - resPenalty;

		if ((frRes >= 0) && (lrRes >= 0) && (crRes >= 0)) {
			resStatus = true;
		} else {
			resStatus = false;
		}

		return {
			Status: resStatus,
			FR: frRes,
			CR: crRes,
			LR: lrResquestIdMap.radament
		};
	},

	nextDifficulty: function () {
		let diffShift = me.diff;
		let lowRes = !this.Resistance().Status;
		let lvlReq = me.charlvl >= SetUp.levelCap ? true : false;
		let diffCompleted = !me.classic && Misc.checkQuest(questIdMap.baal, 0) ? true : me.classic && Misc.checkQuest(questIdMap.diablo, 0) ? true : false;

		if (diffCompleted) {
			if (lvlReq && !lowRes) {
				diffShift = me.diff + 1;
				D2Bot.printToConsole('SoloLeveling: next difficulty requirements met. Starting: ' + Difficulty[diffShift]);
			} else if (lvlReq && lowRes) {
				D2Bot.printToConsolquestIdMap.countess('SoloLeveling: ' + Difficulty[diffShift + 1] + ' requirements not met. Negative resistance. FR: ' + Check.Resistance().FR + ' | CR: ' + Check.Resistance().CR + ' | LR: ' + Check.Resistance().LR);

				if (me.charlvl >= SetUp.levelCap + 5) {
					diffShift = me.diff + 1;
					D2Bot.printToConsole('SoloLeveling: Over leveled. Starting: ' + Difficulty[diffShift]);
				}
			}
		}

		let nextDiff = Difficulty[diffShift];

		return nextDiff;
	},

	Runes: function () {
		let haveRunes = false;

		switch (me.diff) {
		case 0: //normal
			//have items
			if (this.haveItem("shield", "runeword", "Ancients' Pledge") || this.haveItem("auricshields", "runeword", "Ancients' Pledge")) {
				haveRunes = true;
			}

			//have runes for "Ancients' Pledge"
			if (me.getItem("ralrune") && me.getItem("ortrune") && me.getItem("talrune")) {
				haveRunes = true;
			}

			break;
		case 1: //nightmare

			break;
		case 2: //hell
			if (!Misc.checkQuest(questIdMap.baal, 0)) {
				haveRunes = true;
			}

			break;
		}

		return haveRunes;
	},

	haveItem: function (type, flag, iName) {
		if (type && !NTIPAliasType[type]) {
			print("ÿc9SoloLevelingÿc0: No alias for type '" + type + "'");
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
	},

	Build: function () {
		function getBuildTemplate () {
			let buildType = SetUp.finalBuild;
			let build = buildType + "Build" ;
			let classname = ["Amazon", "Sorceress", "Necromancer", "Paladin", "Barbarian", "Druid", "Assassin"][me.classid];
			let template = "SoloLeveling/BuildFiles/" + classname + "." + build + ".js";

			return template.toLowerCase();
		}

		var template = getBuildTemplate();

		if (!include(template)) {
			throw new Error("buildCheck(): Failed to include template: " + template);
		}

		return {
			caster: build.caster,
			tabSkills: build.skillstab,
			wantedSkills: build.wantedskills,
			usefulSkills: build.usefulskills,
			mercAuraName: build.mercAuraName,
			mercAuraWanted: build.mercAuraWanted,
			mercDiff: build.mercDiff,
		};
	},
};

var moveTo = {
	Inventory: function (item, sorting = false) {
		if (item.mode === 3) {
			return false;
		}

		if (item.location === 3 && sorting === false) {
			return true;
		}

		let spot = Storage.Inventory.FindSpot(item);

		if (!spot) {
			return false;
		}

		if (item.location === 6) {
			while (!Cubing.openCube()) {
				delay(1 + me.ping * 2);
				Packet.flash(me.gid);
			}
		}

		if (Packet.itemToCursor(item)) {
			for (let i = 0; i < 15; i += 1) {
				sendPacket(1, 0x18, 4, item.gid, 4, spot.y, 4, spot.x, 4, 0x00);

				let tick = getTickCount();

				while (getTickCount() - tick < Math.max(1000, me.ping * 2 + 200)) {
					if (!me.itemoncursor) {
						return true;
					}

					delay(10 + me.ping);
				}
			}
		}

		return false;
	},

	Stash: function (item, sorting = false) {
		if (item.mode === 3) {
			return false;
		}

		if (item.location === 7 && sorting === false) {
			return true;
		}

		let spot = Storage.Stash.FindSpot(item);

		if (!spot) {
			return false;
		}

		while (!Town.openStash()) {
			Packet.flash(me.gid);
			delay(me.ping * 2);
		}

		if (Packet.itemToCursor(item)) {
			for (let i = 0; i < 15; i += 1) {
				sendPacket(1, 0x18, 4, item.gid, 4, spot.y, 4, spot.x, 4, 0x04);

				let tick = getTickCount();

				while (getTickCount() - tick < Math.max(1000, me.ping * 2 + 200)) {
					if (!me.itemoncursor) {
						return true;
					}

					delay(10 + me.ping);
				}
			}
		}

		return false;
	},
};

var indexOfMax = function (arr) {
	if (arr.length === 0) {
		return -1;
	}

	var max = arr[0];
	var maxIndex = 0;

	for (let index = 1; index < arr.length; index++) {
		if (arr[index] > max) {
			maxIndex = index;
			max = arr[index];
		}
	}

	return maxIndex;
};
