/*
*	@filename	SoloLevelingGlobals.js
*	@author		isid0re
*	@desc		Global variables Settings, general functions, and Dynamic tiers for SoloLeveling functionality
*/
if (!isIncluded("OOG.js")) {
	include("OOG.js");
}

//Configurable Settings for Overlay and Performance tracking
const shouldLog = false;	//Default should be false for people who aren't interested in performance statistics
const useOverlay = false;	//Default should be false for people who aren't interested in having the overlay

// general settings
var finalBuild = DataFile.getStats().finalBuild;
var middleBuild = ["Javazon", "BlizzBaller", "Explosion", "Hammerdin", "WhirlWind", "Wind", "Trapsin"][me.classid];
var difficulty = ['Normal', 'Nightmare', 'Hell'];

// Character Respecialization Variables
// ClassLevel = ["Amazon", "Sorceress", "Necromancer", "Paladin", "Barbarian", "Druid", "Assassin"][me.classid];
const respecOne = [ 0, 30, 26, 25, 0, 24, 30][me.classid];
const respecTwo = [ 0, 85, 75, 85, 0, 75, 100][me.classid];
var	levelcap = [35, 65, 100][me.diff];

// SoloLeveling Pickit Items
var valuableItems = [
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
];

var generalItems = [
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
];

var questItems = [
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
];

//Include function - theBGuy
var includeSoloLeveling = function () {
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
};

// General functions
var goldCheck = function () {
	let gold = me.getStat(14) + me.getStat(15);
	let goldLimit = [10000, 50000, 100000][me.diff];

	if (gold >= goldLimit) {
		return true;
	}

	me.overhead('low gold');

	return false;
};

var resCheck = function () {
	let resStatus,
		resPenalty = me.gametype === 0 ? [0, 20, 50, 50][me.diff + 1] : [ 0, 40, 100, 100][me.diff + 1],
		frRes = me.getStat(39) - resPenalty,
		lrRes = me.getStat(41) - resPenalty,
		crRes = me.getStat(43) - resPenalty;

	if ((frRes >= 0) && (lrRes >= 0) && (crRes >= 0)) {
		resStatus = true;
	} else {
		resStatus = false;
	}

	return {
		resistance: resStatus,
		FR: frRes,
		CR: crRes,
		LR: lrRes,
	};
};

var nextDifficulty = function () {
	let diffShift = me.diff;
	let lowRes = !resCheck().resistance;
	let lvlReq = me.charlvl >= levelcap ? true : false;
	let diffCompleted = me.gametype === 1 && Misc.checkQuest(40, 0) ? true : me.gametype === 0 && Misc.checkQuest(26, 0) ? true : false;

	if (diffCompleted) {
		if (lvlReq && !lowRes) {
			diffShift = me.diff + 1;
			D2Bot.printToConsole('SoloLeveling: next difficulty requirements met. Starting: ' + difficulty[diffShift]);
		} else if (lvlReq && lowRes) {
			D2Bot.printToConsole('SoloLeveling: ' + difficulty[diffShift + 1] + ' requirements not met. Negative resistance. FR: ' + resCheck().FR + ' | CR: ' + resCheck().CR + ' | LR: ' + resCheck().LR);

			if (me.charlvl >= levelcap + 5) {
				diffShift = me.diff + 1;
				D2Bot.printToConsole('SoloLeveling: Over leveled. Starting: ' + difficulty[diffShift]);
			}
		}
	}

	let nextDiff = difficulty[diffShift];

	return nextDiff;
};

var runesCheck = function () {
	let haveRunes = false;

	switch (me.diff) {
	case 0: //normal
		//have items
		if (haveItem("shield", "runeword", "Ancients' Pledge") || haveItem("auricshields", "runeword", "Ancients' Pledge")) {
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
		if (!Misc.checkQuest(40, 0)) {
			haveRunes = true;
		}

		break;
	}

	return haveRunes;
};

var completedTask = function (taskID) {
	let dontQuest = false;
	let dontMF = me.gametype === 1 && !Misc.checkQuest(40, 0) ? true : me.gametype === 0 && !Misc.checkQuest(26, 0) ? true : false;
	let haveGold = goldCheck();
	let haveRunes = runesCheck();

	switch (taskID) {
	case 0:
		break;
	case 1: //den
		if (Misc.checkQuest(1, 0)) { //completed
			dontQuest = true;
		}

		break;
	case 2: //bloodaraven
		if (me.diff === 0 && Misc.checkQuest(2, 0) || me.diff === 1 && haveGold) { //complete raven normal || goldreq met
			dontQuest = true;
		}

		break;
	case 3: // imbue quest
		break;
	case 4: //tristam
		if (Misc.checkQuest(4, 0)) { //completed
			dontQuest = true;
		}

		break;
	case 5: //countess
		if (me.gametype === 0 && me.diff === 0 && Misc.checkQuest(5, 0) || haveRunes) { // classic quest completed normal || have runes for difficulty
			dontQuest = true;
		}

		break;
	case 6: //pits
		if (me.diff !== 2 && haveGold) {
			dontQuest = true;
		}

		break;
	case 7: //andy
		if (Misc.checkQuest(7, 0) && (me.diff === 0 || me.gametype === 0 && me.diff === 1)) {
			dontQuest = true;
		}

		break;
	case 8: //cube
		if (!Pather.accessToAct(2) || me.getItem(549)) {
			dontQuest = true;
		}

		break;
	case 9: //radament
		if (!Pather.accessToAct(2) || Misc.checkQuest(9, 0)) {
			dontQuest = true;
		}

		break;
	case 10: //staff
		if (!Pather.accessToAct(2) || me.getItem(91) || me.getItem(92) || Misc.checkQuest(10, 0)) { //have staff or quest completed
			dontQuest = true;
		}

		break;
	case 11: //ammy
		if (!Pather.accessToAct(2) || me.getItem(91) || me.getItem(521) || Misc.checkQuest(10, 0)) { //have staff or quest completed
			dontQuest = true;
		}

		break;
	case 12: // ancient tunnels
		if (!Pather.accessToAct(2) || me.diff === 2 && me.classid === 3 || me.diff !== 2 && haveGold) { // lowgold || no pally in hell mode magic immunes
			dontQuest = true;
		}

		break;
	case 13: //summoner
		if (!Pather.accessToAct(2) || Misc.checkQuest(13, 0)) {
			dontQuest = true;
		}

		break;
	case 14: //tombs
		if (!Pather.accessToAct(2) || haveGold) {
			dontQuest = true;
		}

		break;
	case 15: //duriel
		if (!Pather.accessToAct(2) || Misc.checkQuest(15, 0)) {
			dontQuest = true;
		}

		break;
	case 16: // eye
		if (!Pather.accessToAct(3) || me.getItem(553) || me.getItem(174) || Misc.checkQuest(18, 0)) {
			dontQuest = true;
		}

		break;
	case 17: // tome
		if (!Pather.accessToAct(3) || Misc.checkQuest(17, 0)) {
			dontQuest = true;
		}

		break;
	case 18: //heart
		if (!Pather.accessToAct(3) || me.getItem(554) || me.getItem(174) || Misc.checkQuest(18, 0)) {
			dontQuest = true;
		}

		break;
	case 19: //gidbinn
		break;
	case 20: //brain
		if (!Pather.accessToAct(3) || me.getItem(555) || me.getItem(174) || Misc.checkQuest(18, 0)) {
			dontQuest = true;
		}

		break;
	case 21: //lowerkurast
		if (!Pather.accessToAct(3) || me.diff !== 2 && haveGold) {
			dontQuest = true;
		}

		break;
	case 22: //travincal
		if (!Pather.accessToAct(3) || me.diff === 0 && me.charlvl > 24 || me.diff !== 0 && Misc.checkQuest(18, 0)) {
			dontQuest = true;
		}

		break;
	case 23: //mephisto
		if (!Pather.accessToAct(3) || !Misc.checkQuest(18, 0) || Misc.checkQuest(23, 0) && me.diff === 0) {
			dontQuest = true;
		}

		break;
	case 24:
	case 25: // izzy
		if (!Pather.accessToAct(4) || Misc.checkQuest(25, 0)) {
			dontQuest = true;
		}

		break;
	case 26: //diablo
		if (!Pather.accessToAct(4)) {
			dontQuest = true;
		}

		break;
	case 27: // hellforge
		if (me.gametype === 0 || me.diff === 0 || !Pather.accessToAct(4) || Misc.checkQuest(27, 0)) {
			dontQuest = true;
		}

		break;
	case 28:
	case 29:
	case 30:
	case 31:
	case 33:
	case 34:
	case 35: // shenk
		if (me.gametype === 0 || !Pather.accessToAct(5) || haveGold && dontMF) {
			dontQuest = true;
		}

		break;
	case 36: //barbies
		if (me.gametype === 0 || me.diff !== 0 || !Pather.accessToAct(5) || Misc.checkQuest(36, 0)) {
			dontQuest = true;
		}

		break;
	case 37: //anya
		if (me.gametype === 0 || !Pather.accessToAct(5) || Misc.checkQuest(37, 0)) {
			dontQuest = true;
		}

		break;
	case 38: //nith (pindle)
		if (me.gametype === 0 || !Pather.accessToAct(5) || !Misc.checkQuest(37, 0) || haveGold && dontMF) {
			dontQuest = true;
		}

		break;
	case 39: //ancients
		if (me.gametype === 0 || !Pather.accessToAct(5) || Misc.checkQuest(39, 0)) {
			dontQuest = true;
		}

		break;
	case 40: //baal
		if (me.gametype === 0 || !Pather.accessToAct(5) || !Misc.checkQuest(39, 0)) {
			dontQuest = true;
		}

		break;
	case 42: //cows
		if (me.gametype === 0 && !Misc.checkQuest(26, 0) || !Misc.checkQuest(40, 0) || Misc.checkQuest(4, 10)) {
			dontQuest = true;
		}

		break;
	}

	return dontQuest;
};

var isForQuest = function (name) {
	let forQuest = false;

	switch (name) {
	case "den": //den
		if (!Misc.checkQuest(1, 0)) {
			forQuest = true;
		}

		break;
	case "bloodraven": //bloodaraven
		if (!Misc.checkQuest(2, 0)) {
			forQuest = true;
		}

		break;
	case "tristam": //tristam
		if (!Misc.checkQuest(4, 0)) {
			forQuest = true;
		}

		break;
	case "countess": //countess
		if (!Misc.checkQuest(5, 0)) {
			forQuest = true;
		}

		break;
	case "andariel": //andy
		if (!Misc.checkQuest(6, 0)) {
			forQuest = true;
		}

		break;
	case "cube": //cube
		if (!me.getItem(549)) {
			forQuest = true;
		}

		break;
	case "radament": //radament
		if (!Misc.checkQuest(9, 0)) {
			forQuest = true;
		}

		break;
	case "staff": //staff
		if (!me.getItem(92)) {
			forQuest = true;
		}

		break;
	case "amulet": //ammy
		if (!Misc.checkQuest(11, 0)) {
			forQuest = true;
		}

		break;
	case "summoner": //summoner
		if (!Misc.checkQuest(13, 0)) {
			forQuest = true;
		}

		break;
	case "duriel": //duriel
		if (!Misc.checkQuest(14, 0)) {
			forQuest = true;
		}

		break;
	case "eye": // eye
		if (!me.getItem(553)) {
			forQuest = true;
		}

		break;
	case "tome": // tome
		if (!Misc.checkQuest(17, 0)) {
			forQuest = true;
		}

		break;
	case "heart": //heart
		if (!me.getItem(554)) {
			forQuest = true;
		}

		break;
	case "brain": //brain
		if (!me.getItem(555)) {
			forQuest = true;
		}

		break;
	case "travincal": //travincal
		if (!Misc.checkQuest(21, 0) && !Misc.checkQuest(22, 0)) {
			forQuest = true;
		}

		break;
	case "mephisto": //mephisto
		if (!Misc.checkQuest(22, 0)) {
			forQuest = true;
		}

		break;
	case "izual": // izzy
		if (!Misc.checkQuest(25, 0)) {
			forQuest = true;
		}

		break;
	case "diablo": //diablo
		if (!Misc.checkQuest(26, 0)) {
			forQuest = true;
		}

		break;
	case "hellforge": // hellforge
		if (!Misc.checkQuest(27, 0)) {
			forQuest = true;
		}

		break;
	case "shenk": // shenk
		if (!Misc.checkQuest(35, 1) || !Misc.checkQuest(35, 13)) {
			forQuest = true;
		}

		break;
	case "saveBarby": //barbies
		if (!Misc.checkQuest(36, 0)) {
			forQuest = true;
		}

		break;
	case "anya": //anya
		if (!Misc.checkQuest(37, 0)) {
			forQuest = true;
		}

		break;
	case "ancients": //ancients
		if (!Misc.checkQuest(39, 0)) {
			forQuest = true;
		}

		break;
	case "baal": //baal
		if (!Misc.checkQuest(40, 0)) {
			forQuest = true;
		}

		break;
	default:
		forQuest = false;

		break;
	}

	return forQuest;
};

//Checks if quest is finished. Tries to talk to specific NPCs to try and finish the quest if not
var isQuestFinished = function (name) {
	let questFinished = false;

	switch (name) {
	case "den": //den
		if (Misc.checkQuest(1, 0)) {
			questFinished = true;
		} else {
			if (!me.inTown) {
				Town.goToTown(1);
			}

			Town.npcInteract("akara"); //Try and finish quest

			if (Misc.checkQuest(1, 0)) { //Check again
				questFinished = true;
			}
		}

		break;
	case "bloodraven": //bloodaraven
		if (Misc.checkQuest(2, 0)) {
			questFinished = true;
		} else {
			if (!me.inTown) {
				Town.goToTown(1);
			}

			Town.npcInteract("kashya"); //Try and finish quest

			if (Misc.checkQuest(2, 0)) { //Check again
				questFinished = true;
			}
		}

		break;
	case "tristam": //tristam
		if (Misc.checkQuest(4, 0)) {
			questFinished = true;
		} else {
			if (!me.inTown) {
				Town.goToTown(1);
			}

			Town.npcInteract("akara"); //Try and finish quest

			if (Misc.checkQuest(4, 0)) { //Check again
				questFinished = true;
			}
		}

		break;
	case "countess": //countess
		if (Misc.checkQuest(5, 0)) {
			questFinished = true;
		}

		break;
	case "andariel": //andy
		if (Misc.checkQuest(6, 0)) {
			questFinished = true;
		}

		break;
	case "cube": //cube
		if (me.getItem(549)) {
			questFinished = true;
		}

		break;
	case "radament": //radament
		if (Misc.checkQuest(9, 0)) {
			questFinished = true;
		} else {
			if (!me.inTown) {
				Town.goToTown(2);
			}

			Town.npcInteract("atma"); //Try and finish quest

			if (Misc.checkQuest(9, 0)) { //Check again
				questFinished = true;
			}
		}

		break;
	case "staff": //staff
		if (me.getItem(92)) {
			questFinished = true;
		}

		break;
	case "amulet": //ammy
		if (Misc.checkQuest(11, 0)) {
			questFinished = true;
		} else {
			if (!me.inTown) {
				Town.goToTown(2);
			}

			Town.npcInteract("drognan"); //Try and finish quest

			if (Misc.checkQuest(9, 0)) { //Check again
				questFinished = true;
			}
		}

		break;
	case "summoner": //summoner
		if (Misc.checkQuest(13, 0)) {
			questFinished = true;
		} else {
			if (!me.inTown) {
				Town.goToTown(2);
			}

			Town.npcInteract("drognan"); //Try and finish quest

			if (Misc.checkQuest(9, 0)) { //Check again
				questFinished = true;
			}
		}

		break;
	case "duriel": //duriel
		if (Misc.checkQuest(14, 0)) {
			questFinished = true;
		}

		break;
	case "eye": // eye
		if (me.getItem(553)) {
			questFinished = true;
		}

		break;
	case "tome": // tome
		if (Misc.checkQuest(17, 0)) {
			questFinished = true;
		}

		break;
	case "heart": //heart
		if (me.getItem(554)) {
			questFinished = true;
		}

		break;
	case "brain": //brain
		if (me.getItem(555)) {
			questFinished = true;
		}

		break;
	case "travincal": //travincal
		if (Misc.checkQuest(21, 0) || Misc.checkQuest(22, 0)) {
			questFinished = true;
		} else {
			if (!me.inTown) {
				Town.goToTown(3);
			}

			Town.npcInteract("cain"); //Try and finish quest

			if (Misc.checkQuest(21, 0) || Misc.checkQuest(22, 0)) { //Check again
				questFinished = true;
			}
		}

		break;
	case "mephisto": //mephisto
		if (Misc.checkQuest(22, 0)) {
			questFinished = true;
		}

		break;
	case "izual": // izzy
		if (Misc.checkQuest(25, 0)) {
			questFinished = true;
		} else {
			if (!me.inTown) {
				Town.goToTown(4);
			}

			Town.npcInteract("tyrael"); //Try and finish quest

			if (Misc.checkQuest(25, 0)) { //Check again
				questFinished = true;
			}
		}

		break;
	case "diablo": //diablo
		if (Misc.checkQuest(26, 0)) {
			questFinished = true;
		} else {
			if (!me.inTown) {
				Town.goToTown(4);
			}

			Town.npcInteract("tyrael"); //Try and finish quest

			if (Misc.checkQuest(26, 0)) { //Check again
				questFinished = true;
			}
		}

		break;
	case "hellforge": // hellforge
		if (Misc.checkQuest(27, 0)) {
			questFinished = true;
		} else {
			if (!me.inTown) {
				Town.goToTown(4);
			}

			Town.npcInteract("cain"); //Try and finish quest

			if (Misc.checkQuest(26, 0)) { //Check again
				questFinished = true;
			}
		}

		break;
	case "shenk": // shenk
		if (Misc.checkQuest(35, 1) || Misc.checkQuest(35, 13)) {
			questFinished = true;
		} else {
			if (!me.inTown) {
				Town.goToTown(5);
			}

			Town.npcInteract("larzuk"); //Try and finish quest

			if (Misc.checkQuest(35, 1) || Misc.checkQuest(35, 13)) { //Check again
				questFinished = true;
			}
		}

		break;
	case "saveBarby": //barbies
		if (Misc.checkQuest(36, 0)) {
			questFinished = true;
		} else {
			if (!me.inTown) {
				Town.goToTown(5);
			}

			Town.npcInteract("qual_kehk"); //Try and finish quest

			if (Misc.checkQuest(36, 0)) { //Check again
				questFinished = true;
			}
		}

		break;
	case "anya": //anya
		if (Misc.checkQuest(37, 0)) {
			questFinished = true;
		} else {
			if (!me.inTown) {
				Town.goToTown(5);
			}

			Town.npcInteract("malah"); //Try and finish quest

			if (Misc.checkQuest(37, 0)) { //Check again
				questFinished = true;
				break;
			}

			Town.npcInteract("anya"); //Try and finish quest

			if (Misc.checkQuest(37, 0)) { //Check again
				questFinished = true;
			}
		}

		break;
	case "ancients": //ancients
		if (Misc.checkQuest(39, 0)) {
			questFinished = true;
		}

		break;
	case "baal": //baal
		if (Misc.checkQuest(40, 0)) {
			questFinished = true;
		} else {
			if (!me.inTown) {
				Town.goToTown(5);
			}

			Town.npcInteract("malah"); //Try and finish quest

			if (Misc.checkQuest(40, 0)) { //Check again
				questFinished = true;
			}
		}

		break;
	default:
		questFinished = false;
		break;
	}

	return questFinished;
};

var movetoInventory = function (item, sorting = false) {
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
};

var movetoStash = function (item, sorting = false) {
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
};

var haveItem = function (type, flag, iName) {
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

var getBuild = function () {
	let buildType;

	if (me.charlvl < respecOne) {
		buildType = "Start";
	}

	if (me.charlvl >= respecOne && me.charlvl < respecTwo) {
		buildType = middleBuild;
	}

	if (me.charlvl >= respecTwo) {
		buildType = finalBuild;
	}

	return buildType;
};

var specPush = function (specType) {
	function getBuildTemplate () {
		let buildType = getBuild();
		let build = buildType + "Build" ;
		let classname = ["Amazon", "Sorceress", "Necromancer", "Paladin", "Barbarian", "Druid", "Assassin"][me.classid];
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
};

// Dynamic Tiers
var buildCheck = function () {
	function getBuildTemplate () {
		let buildType = finalBuild;
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
	};
};

var isCaster = buildCheck().caster;

var mercscore = function (item) {
	var mercWeights = {
		IAS: 3.5,
		MINDMG:	3, // min damage
		MAXDMG: 3, // max damage
		SECMINDMG: 3, // secondary min damage
		SECMAXDMG: 3, // secondary max damage
		ELEDMG: 2, // elemental damage
		AR:	0.5, // attack rating
		CB: 3, // crushing blow
		LL: 1.5, //lifeleach
		// regen
		HPREGEN: 2,
		FHR: 3, // faster hit recovery
		DEF: 0.05, // defense
		HP:	2,
		STR: 1.5,
		DEX: 1.5,
		ALL: 180, // + all skills
		FR: 3.5, // fire resist
		LR: 4, // lightning resist
		CR: 2, // cold resist
		PR: 1, // poison resist
	};

	let mercRating = 1;
	mercRating += item.getStatEx(151, 120) * 100; // meditation aura
	mercRating += item.getStatEx(151, 123) * 1000; // conviction aura
	mercRating += item.getStatEx(93) * mercWeights.IAS; // add IAS
	mercRating += item.getStatEx(21) * mercWeights.MINDMG; // add MIN damage
	mercRating += item.getStatEx(22) * mercWeights.MAXDMG; // add MAX damage
	mercRating += item.getStatEx(23) * mercWeights.SECMINDMG; // add MIN damage	//Note: two-handed weapons i.e spears, polearms, ect use secondary min + max damage. Keeping regular min + max for a1 merc
	mercRating += item.getStatEx(24) * mercWeights.SECMAXDMG; // add MAX damage	//Note: two-handed weapons i.e spears, polearms, ect use secondary min + max damage. Keeping regular min + max for a1 merc
	mercRating += (item.getStatEx(48) + item.getStatEx(49) + item.getStatEx(50) + item.getStatEx(51) + item.getStatEx(52) + item.getStatEx(53) + item.getStatEx(54) + item.getStatEx(55) + (item.getStatEx(57) * 125 / 512)) * mercWeights.ELEDMG; // add elemental damage
	mercRating += item.getStatEx(19) * mercWeights.AR; // add AR
	mercRating += item.getStatEx(136) * mercWeights.CB; // add crushing blow
	mercRating += item.getStatEx(60) * mercWeights.LL; // add LL
	mercRating += item.getStatEx(74) * mercWeights.HPREGEN; // add hp regeneration
	mercRating += item.getStatEx(99) * mercWeights.FHR; // add faster hit recovery
	mercRating += item.getStatEx(31) * mercWeights.DEF; //	add Defense
	mercRating += (item.getStatEx(3) + item.getStatEx(7) + (item.getStatEx(216) / 2048 * me.charlvl)) * mercWeights.HP; // add HP
	mercRating += item.getStatEx(0) * mercWeights.STR; // add STR
	mercRating += item.getStatEx(2) * mercWeights.DEX; // add DEX
	mercRating += item.getStatEx(127) * mercWeights.ALL; // add all skills
	mercRating += item.getStatEx(39) * mercWeights.FR; // add FR
	mercRating += item.getStatEx(43) * mercWeights.CR; // add CR
	mercRating += item.getStatEx(41) * mercWeights.LR; // add LR
	mercRating += item.getStatEx(45) * mercWeights.PR; // add PR

	let rwBase;

	for (let x = 0; x < Config.Runewords.length; x += 1) {
		let sockets = Config.Runewords[x][0].length;
		let baseCID = Config.Runewords[x][1];

		if (item.classid === baseCID && item.quality < 4 && item.getStat(194) === sockets && !item.getFlag(NTIPAliasFlag["runeword"])) {
			rwBase = true;
		}
	}

	if (rwBase) {
		mercRating = -1;
	}

	return mercRating;
};

var tierscore = function (item) {
	var resistWeights = {
		FR: 3.5, // fire resist
		LR: 4, // lightning resist
		CR: 2, // cold resist
		PR: 1, // poison resist
		ABS: 2.5 // absorb damage (fire light magic cold)
	};

	var generalWeights = {
		CBF: 25, // cannot be frozen
		FRW: 1, // faster run/walk
		FHR: 3, // faster hit recovery
		DEF: 0.05, // defense
		ICB: 2, // increased chance to block
		BELTSLOTS: 1.25, //belt potion storage
		// base stats
		HP:	1.75,
		MANA: 0.8,
		STR: 1.5,
		DEX: 1.5,
	};

	var casterWeights = {
		//breakpoint stats
		FCR: 3.5,
		IAS: 0,
		// Attack
		MINDMG:	0, // min damage
		MAXDMG: 0, // max damage
		SECMINDMG: 0, // secondary min damage
		SECMAXDMG: 0, // secondary max damage
		ELEDMG: 0, // elemental damage
		AR:	0, // attack rating
		CB: 0, // crushing blow
		// leaching
		LL:	0, //lifeleach
		ML:	0, //manaleach
		// regen
		HPREGEN: 2,
		MANAREGEN: 2,
	};

	var meleeWeights = {
		//breakpoint stats
		FCR: 0,
		IAS: 3.5,
		// Attack
		MINDMG:	3, // min damage
		MAXDMG: 3, // max damage
		SECMINDMG: 3, // secondary min damage
		SECMAXDMG: 3, // secondary max damage
		ELEDMG: 2, // elemental damage
		AR:	0.5, // attack rating
		CB: 3, // crushing blow
		// leaching
		LL: 1.5, //lifeleach
		ML:	1.5, //manaleach
		// regen
		HPREGEN: 2,
		MANAREGEN: 2,
	};

	var skillsWeights = {
		ALL: 180, // + all skills
		CLASS: 175, // + class tab
		TAB: 100, // + skill tab
		WANTED: 30, // + wanted key skills
		USEFUL: 20 // + wanted supportive skills
	};

	this.generalScore = function (item) {
		// cannot be frozen
		let cbfItem = NTIPAliasStat["itemcannotbefrozen"],
			cbfRating = 0,
			needsCBF = !me.getSkill(54, 0),
			body = me.getItems()
				.filter(item => [1].indexOf(item.location) > -1 ) // limit search to equipped body parts
				.sort((a, b) => a.location - b.location); // Sort on body, low to high.

		if (needsCBF && item.getStatEx(cbfItem)) {
			let haveCBF = false;

			for (let part = 0; part < body.length; part++) { // total 10 body slots
				if (body[part].getStatEx(cbfItem)) {
					haveCBF = true;

					break;
				}
			}

			if (!haveCBF) {
				cbfRating = generalWeights.CBF;
			}
		}

		// faster run/walk
		let frwRating = 0,
			needsFrw = !me.getSkill(54, 0); // value FRW if no teleport

		if (needsFrw) {
			frwRating = item.getStatEx(96) * generalWeights.FRW;
		}

		// belt slots
		let beltRating = 0,
			isBelt = item.itemType === 19; // check if belt

		if (isBelt) {
			beltRating = Storage.BeltSize() * 4 * generalWeights.BELTSLOTS; // rows * columns * weight
		}

		//start generalRating
		let generalRating = 0;
		generalRating += cbfRating; // add cannot be frozen
		generalRating += frwRating; // add faster run walk
		generalRating += beltRating; // add belt slots
		generalRating += item.getStatEx(99) * generalWeights.FHR; // add faster hit recovery
		generalRating += item.getStatEx(31) * generalWeights.DEF; //	add Defense
		generalRating += (item.getStatEx(20) + item.getStatEx(102)) * generalWeights.ICB; //add increased chance to block
		generalRating += (item.getStatEx(3) + item.getStatEx(7) + (item.getStatEx(216) / 2048 * me.charlvl)) * generalWeights.HP; // add HP
		generalRating += (item.getStatEx(1) + item.getStatEx(9) + (item.getStatEx(217) / 2048 * me.charlvl)) * generalWeights.MANA;// add mana
		generalRating += item.getStatEx(0) * generalWeights.STR; // add STR
		generalRating += item.getStatEx(2) * generalWeights.DEX; // add DEX

		return generalRating;
	};

	this.resistScore = function (item) {
		let resistRating = 0;
		// current total resists
		let currFR = me.getStat(39); // current fire resist
		let currCR = me.getStat(43); // current cold resist
		let currLR = me.getStat(41); // current lite resist
		let currPR = me.getStat(45); // current poison resist
		// get item body location
		let itembodyloc = Item.getBodyLoc(item);

		if (!itembodyloc) {
			return resistRating;
		}

		let bodyloc = itembodyloc[0]; // extract bodyloc from array
		// get item resists stats from olditem equipped on body location
		let equippedItems = me.getItems()
			.filter(item =>
				item.bodylocation === bodyloc // filter equipped items to body location
				&& [1].indexOf(item.location) > -1); // limit search to equipped body parts
		let oldItem = equippedItems[0]; // extract oldItem from array
		let olditemFR = oldItem !== undefined ? oldItem.getStatEx(39) : 0; // equipped fire resist
		let olditemCR = oldItem !== undefined ? oldItem.getStatEx(43) : 0; // equipped cold resist
		let olditemLR = oldItem !== undefined ? oldItem.getStatEx(41) : 0; // equipped lite resist
		let olditemPR = oldItem !== undefined ? oldItem.getStatEx(45) : 0; // equipped poison resist
		// subtract olditem resists from current total resists
		let baseFR = currFR - olditemFR;
		let baseCR = currCR - olditemCR;
		let baseLR = currLR - olditemLR;
		let basePR = currPR - olditemPR;
		// if baseRes < max resists give score value upto max resists reached
		let maxRes = me.gametype === 1 ? 175 : 125;
		let FRlimit = Math.max(maxRes - baseFR, 0);
		let CRlimit = Math.max(maxRes - baseCR, 0);
		let LRlimit = Math.max(maxRes - baseLR, 0);
		let PRlimit = Math.max(maxRes - basePR, 0);
		// get new item stats
		let newitemFR = Math.max(item.getStatEx(39), 0); // fire resist
		let newitemCR = Math.max(item.getStatEx(43), 0); // cold resist
		let newitemLR = Math.max(item.getStatEx(41), 0); // lite resist
		let newitemPR = Math.max(item.getStatEx(45), 0); // poison resist
		// newitemRes upto reslimit
		let effectiveFR = Math.min(newitemFR, FRlimit);
		let effectiveCR = Math.min(newitemCR, CRlimit);
		let effectiveLR = Math.min(newitemLR, LRlimit);
		let effectivePR = Math.min(newitemPR, PRlimit);
		// sum resistRatings
		resistRating += effectiveFR * resistWeights.FR; // add fireresist
		resistRating += effectiveCR * resistWeights.CR; // add coldresist
		resistRating += effectiveLR * resistWeights.LR; // add literesist
		resistRating += effectivePR * resistWeights.PR; // add poisonresist
		resistRating += (item.getStatEx(142) + item.getStatEx(144) + item.getStatEx(146) + item.getStatEx(148)) * resistWeights.ABS; // add absorb damage

		return resistRating;
	};

	var buildWeights = isCaster ? casterWeights : meleeWeights;

	this.buildScore = function (item) {
		let buildRating = 0;
		buildRating += item.getStatEx(105) * buildWeights.FCR; // add FCR
		buildRating += item.getStatEx(93) * buildWeights.IAS; // add IAS
		buildRating += item.getStatEx(21) * buildWeights.MINDMG; // add MIN damage
		buildRating += item.getStatEx(22) * buildWeights.MAXDMG; // add MAX damage
		buildRating += item.getStatEx(23) * buildWeights.SECMINDMG; // add MIN damage
		buildRating += item.getStatEx(24) * buildWeights.SECMAXDMG; // add MAX damage
		buildRating += (item.getStatEx(48) + item.getStatEx(49) + item.getStatEx(50) + item.getStatEx(51) + item.getStatEx(52) + item.getStatEx(53) + item.getStatEx(54) + item.getStatEx(55) + (item.getStatEx(57) * 125 / 256)) * buildWeights.ELEDMG; // add elemental damage PSN damage adjusted for damage per frame (125/256)
		buildRating += item.getStatEx(19) * buildWeights.AR; // add AR
		buildRating += item.getStatEx(60) * buildWeights.LL; // add LL
		buildRating += item.getStatEx(62) * buildWeights.ML; // add ML
		buildRating += item.getStatEx(74) * buildWeights.HPREGEN; // add hp regeneration
		buildRating += item.getStatEx(26) * buildWeights.MANAREGEN; // add mana recovery

		return buildRating;
	},

	this.skillsScore = function (item) {
		let skillsRating = 0;
		skillsRating += item.getStatEx(127) * skillsWeights.ALL; // + all skills
		skillsRating += item.getStatEx(83, me.classid) * skillsWeights.CLASS; // + class skills
		skillsRating += item.getStatEx(188, buildCheck().tabSkills) * skillsWeights.TAB; // + TAB skills
		let selectedWeights = [skillsWeights.WANTED, skillsWeights.USEFUL];
		let selectedSkills = [buildCheck().wantedSkills, buildCheck().usefulSkills];

		for (let i = 0; i < selectedWeights.length; i++) {
			for (let j = 0; j < selectedSkills.length; j++) {
				for (let k = 0; k < selectedSkills[j].length; k++) {
					skillsRating += item.getStatEx(107, selectedSkills[j][k]) * selectedWeights[i];
				}
			}
		}

		return skillsRating;
	};

	let tier = 1; // set to 1 for native autoequip to use items.
	tier += this.generalScore(item);
	tier += this.resistScore(item);
	tier += this.buildScore(item);
	tier += this.skillsScore(item);

	let rwBase; // don't score runeword base armors
	let questItem, itemsList = [521, 92, 173, 174]; // don't score viper amulet, staff of kings, khalim's flail

	for (let y = 0; y < itemsList.length; y += 1) {
		if (item.classid === itemsList[y]) {
			questItem = true;
		}
	}

	for (let x = 0; x < Config.Runewords.length; x += 1) {
		let sockets = Config.Runewords[x][0].length;
		let baseCID = Config.Runewords[x][1];

		if (item.classid === baseCID && item.quality < 4 && item.getStat(194) === sockets && !item.getFlag(NTIPAliasFlag["runeword"])) {
			rwBase = true;
		}
	}

	if (rwBase || questItem) {
		tier = -1;
	}

	return tier;
};

var getMercFix = function () { // merc is null fix
	if (!Config.UseMerc) {
		return null;
	}

	merc = me.getMerc();

	for (var i = 0; i < 3; i++) {
		if (merc) {
			if (merc.mode === 0 || merc.mode === 12) {
				return null;
			}

			break;
		}

		delay(100 + me.ping);
		merc = me.getMerc();
	}

	return merc;
};

//prototypes
Unit.prototype.getItems = function (...args) {
	let items = this.getItems.apply(this, args);

	if (!items.length) {
		return [];
	}

	return items;
};

Unit.prototype.getStatEx = function (id, subid) {
	var i, temp, rval, regex;


	switch (id) {
	case 555: //calculates all res, doesnt exists trough
	{ // Block scope due to the variable declaration
		// Get all res
		let allres = [this.getStatEx(39), this.getStatEx(41), this.getStatEx(43), this.getStatEx(45)];

		// What is the minimum of the 4?
		let min = Math.min.apply(null, allres);

		// Cap all res to the minimum amount of res
		allres = allres.map(res => res > min ? min : res);

		// Get it in local variables, its more easy to read
		let [fire, cold, light, psn] = allres;

		return fire === cold && cold === light && light === psn ? min : 0;
	}

	case 9: // Max mana
		rval = this.getStat(9);

		if (rval > 446) {
			return rval - 16777216; // Fix for negative values (Gull knife)
		}

		return rval;
	case 20: // toblock
		switch (this.classid) {
		case 328: // buckler
			return this.getStat(20);
		case 413: // preserved
		case 483: // mummified
		case 503: // minion
			return this.getStat(20) - 3;
		case 329: // small
		case 414: // zombie
		case 484: // fetish
		case 504: // hellspawn
			return this.getStat(20) - 5;
		case 331: // kite
		case 415: // unraveller
		case 485: // sexton
		case 505: // overseer
			return this.getStat(20) - 8;
		case 351: // spiked
		case 374: // deefender
		case 416: // gargoyle
		case 486: // cantor
		case 506: // succubus
		case 408: // targe
		case 478: // akaran t
			return this.getStat(20) - 10;
		case 330: // large
		case 375: // round
		case 417: // demon
		case 487: // hierophant
		case 507: // bloodlord
			return this.getStat(20) - 12;
		case 376: // scutum
			return this.getStat(20) - 14;
		case 409: // rondache
		case 479: // akaran r
			return this.getStat(20) - 15;
		case 333: // goth
		case 379: // ancient
			return this.getStat(20) - 16;
		case 397: // barbed
			return this.getStat(20) - 17;
		case 377: // dragon
			return this.getStat(20) - 18;
		case 502: // vortex
			return this.getStat(20) - 19;
		case 350: // bone
		case 396: // grim
		case 445: // luna
		case 467: // blade barr
		case 466: // troll
		case 410: // heraldic
		case 480: // protector
			return this.getStat(20) - 20;
		case 444: // heater
		case 447: // monarch
		case 411: // aerin
		case 481: // gilded
		case 501: // zakarum
			return this.getStat(20) - 22;
		case 332: // tower
		case 378: // pavise
		case 446: // hyperion
		case 448: // aegis
		case 449: // ward
			return this.getStat(20) - 24;
		case 412: // crown
		case 482: // royal
		case 500: // kurast
			return this.getStat(20) - 25;
		case 499: // sacred r
			return this.getStat(20) - 28;
		case 498: // sacred t
			return this.getStat(20) - 30;
		}

		break;
	case 21: // plusmindamage
	case 22: // plusmaxdamage
		if (subid === 1) {
			temp = this.getStat(-1);
			rval = 0;

			for (i = 0; i < temp.length; i += 1) {
				switch (temp[i][0]) {
				case id: // plus one handed dmg
				case id + 2: // plus two handed dmg
					// There are 2 occurrences of min/max if the item has +damage. Total damage is the sum of both.
					// First occurrence is +damage, second is base item damage.

					if (rval) { // First occurence stored, return if the second one exists
						return rval;
					}

					if (this.getStat(temp[i][0]) > 0 && this.getStat(temp[i][0]) > temp[i][2]) {
						rval = temp[i][2]; // Store the potential +dmg value
					}

					break;
				}
			}

			return 0;
		}

		break;
	case 31: // plusdefense
		if (subid === 0) {
			if ([0, 1].indexOf(this.mode) < 0) {
				break;
			}

			switch (this.itemType) {
			case 58: // jewel
			case 82: // charms
			case 83:
			case 84:
				// defense is the same as plusdefense for these items
				return this.getStat(31);
			}

			if (!this.desc) {
				this.desc = this.description;
			}

			temp = this.desc.split("\n");
			regex = new RegExp("\\+\\d+ " + getLocaleString(3481).replace(/^\s+|\s+$/g, ""));

			for (i = 0; i < temp.length; i += 1) {
				if (temp[i].match(regex, "i")) {
					return parseInt(temp[i].replace(/ÿc[0-9!"+<;.*]/, ""), 10);
				}
			}

			return 0;
		}

		break;
	case 57:
		if (subid === 1) {
			return Math.round(this.getStat(57) * this.getStat(59) / 256);
		}

		break;
	case 83: // itemaddclassskills
		if (subid === undefined) {
			for (i = 0; i < 7; i += 1) {
				if (this.getStat(83, i)) {
					return this.getStat(83, i);
				}
			}

			return 0;
		}

		break;
	case 188: // itemaddskilltab
		if (subid === undefined) {
			temp = [0, 1, 2, 8, 9, 10, 16, 17, 18, 24, 25, 26, 32, 33, 34, 40, 41, 42, 48, 49, 50];

			for (i = 0; i < temp.length; i += 1) {
				if (this.getStat(188, temp[i])) {
					return this.getStat(188, temp[i]);
				}
			}

			return 0;
		}

		break;
	case 195: // itemskillonattack
	case 196: // itemskillonkill
	case 197: // itemskillondeath
	case 198: // itemskillonhit
	case 199: // itemskillonlevelup
	case 201: // itemskillongethit
	case 204: // itemchargedskill
		if (subid === 1) {
			temp = this.getStat(-2);

			if (temp.hasOwnProperty(id)) {
				if (temp[id] instanceof Array) {
					for (i = 0; i < temp[id].length; i += 1) {
						if (temp[id][i] !== undefined) {
							return temp[id][i].skill;
						}
					}
				} else {
					return temp[id].skill;
				}
			}

			return 0;
		}

		if (subid === 2) {
			temp = this.getStat(-2);

			if (temp.hasOwnProperty(id)) {
				if (temp[id] instanceof Array) {
					for (i = 0; i < temp[id].length; i += 1) {
						if (temp[id][i] !== undefined) {
							return temp[id][i].level;
						}
					}
				} else {
					return temp[id].level;
				}
			}

			return 0;
		}

		break;
	case 216: // itemhpperlevel (for example Fortitude with hp per lvl can be defined now with 1.5)
		return this.getStat(216) / 2048;
	}

	if (this.getFlag(0x04000000)) { // Runeword
		switch (id) {
		case 16: // enhanceddefense
			if ([0, 1].indexOf(this.mode) < 0) {
				break;
			}

			if (!this.desc) {
				this.desc = this.description;
			}

			temp = this.desc.split("\n");

			for (i = 0; i < temp.length; i += 1) {
				if (temp[i].match(getLocaleString(3520).replace(/^\s+|\s+$/g, ""), "i")) {
					return parseInt(temp[i].replace(/ÿc[0-9!"+<;.*]/, ""), 10);
				}
			}

			return 0;
		case 18: // enhanceddamage
			if ([0, 1].indexOf(this.mode) < 0) {
				break;
			}

			if (!this.desc) {
				this.desc = this.description;
			}

			temp = this.desc.split("\n");

			for (i = 0; i < temp.length; i += 1) {
				if (temp[i].match(getLocaleString(10038).replace(/^\s+|\s+$/g, ""), "i")) {
					return parseInt(temp[i].replace(/ÿc[0-9!"+<;.*]/, ""), 10);
				}
			}

			return 0;
		}
	}

	if (subid === undefined) {
		return this.getStat(id);
	}

	return this.getStat(id, subid);
};
