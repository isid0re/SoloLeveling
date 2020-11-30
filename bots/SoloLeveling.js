/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers link tierCalculator to pickit and NTIP
*/

function SoloLeveling () {
	var sequence = [
		"den", "mausoleum", "tristam", "countess", "pits", "andariel", // Act 1
		"radament", "cube", "amulet", "summoner", "staff", "ancienttunnels", "tombs", "duriel", // Act 2
		"eye", "heart", "tome", "brain", "lowerkurast", "travincal", "mephisto", // Act 3
		"izual", "hellforge", "diablo", //Act 4
		"shenk", "saveBarby", "anya", "pindle", "ancients", "baal" // Act 5
	];

	// Scripts to execute for leveling
	this.startrun = function () {
		print('ÿc9SoloLevelingÿc0: setup SoloLeveling');
		me.overhead('setup SoloLeveling');
		Town.unfinishedQuests();
		Town.heal();
		Town.buyPotions();
		print("ÿc9SoloLevelingÿc0: quest items loaded to Pickit");

		var questItems = [
			"[Name] == ScrollOfInifuss",
			"[Name] == KeyToTheCairnStones",
			"[name] == BookOfSkill",
			"[Name] == HoradricCube",
			"[Name] == ShaftOfTheHoradricStaff",
			"[Name] == TopOfTheHoradricStaff",
			"[Name] == HoradricStaff",
			//"[Name] == ajadefigurine",
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
		NTIP.arrayLooping(questItems);

		print("ÿc9SoloLevelingÿc0: general items loaded to Pickit");

		var generalItems = [
			"[name] == tomeoftownportal",
			"[name] == gold # [gold] >= 500",
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
		NTIP.arrayLooping(generalItems);

		Town.reviveMerc();
		Misc.setupMerc();
		print('ÿc9SoloLevelingÿc0: starting run');
		me.overhead('starting run');

		return true;
	};

	this.den = function () {
		if (Misc.checkQuest(1, 0)) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting den');
		me.overhead("den");

		if (!Pather.checkWP(3)) {
			Pather.moveToExit([2, 8], false);

			if (!me.getItem(518)) {
				let tp = me.getItem(529);

				if (tp) {
					clickItem(1, tp);
				}
			} else {
				Pather.makePortal();
			}
		}

		if (me.charlvl < 3) {
			Attack.clearLevel();
		}

		if (!Pather.checkWP(3)) {
			Pather.getWP(3);
			Pather.useWaypoint(1);
		} else {
			Pather.getWP(3);
			Pather.useWaypoint(1);
		}

		Town.doChores();

		if (!Pather.usePortal(2, me.name)) {
			Pather.moveToExit(2, true);
		}

		Precast.doPrecast(true);
		Pather.moveToExit(8, true);
		Attack.clearLevel();

		if (!me.getItem(518)) {
			Pather.moveToExit([2, 3], true);
			Pather.useWaypoint(1);
		} else {
			Town.goToTown();
		}

		Town.npcInteract("akara");

		return true;
	};

	this.mausoleum = function () {
		if (me.diff === 0 && Misc.checkQuest(2, 0) || me.diff !== 0 && me.charlvl < respecTwo) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting blood raven');
		me.overhead("blood raven");

		if (!Pather.checkWP(3)) {
			Pather.getWP(3);
		} else {
			Pather.useWaypoint(3);
		}

		Precast.doPrecast(true);
		Pather.moveToExit(17, true);
		Pather.moveToPreset(17, 1, 805);

		try {
			let raven = getUnit(1, "Blood Raven");

			if (raven && raven.hp > 0) {
				Attack.kill(raven);
			}
		} catch (e) {
			print("ÿc9SoloLevelingÿc0: Failed to kill Blood Raven");
		}

		Pickit.pickItems();

		if (me.diff === 0) {
			Town.npcInteract("kashya");

			return true;
		}

		me.overhead("mausoleum");

		if (!Pather.moveToExit([17, 19], true)) {
			print("ÿc9SoloLevelingÿc0: Failed to move to Mausoleum");
		}

		Attack.clearLevel();

		return true;
	};

	this.tristam = function () {
		if (me.diff === 1 || Misc.checkQuest(4, 0)) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting cain');
		me.overhead("cain");

		if (!Misc.checkQuest(4, 4) && !me.getItem(525)) {
			if (!me.getItem(524)) {
				if (!Pather.checkWP(5)) {
					Pather.getWP(5);
				} else {
					Pather.useWaypoint(5);
				}

				Precast.doPrecast(true);

				if (!Pather.moveToPreset(me.area, 2, 30, 5, 5)) {
					print("ÿc9SoloLevelingÿc0: Failed to move to Tree of Inifuss");
				}

				Misc.getQuestItem(524, 30);
				Town.goToTown();
			}

			Town.npcInteract("akara");
		}

		if (!Pather.checkWP(4)) {
			Pather.getWP(4);
		} else {
			Pather.useWaypoint(4);
		}

		Precast.doPrecast(true);
		Pather.moveToPreset(me.area, 2, 17, 0, 0, false, true);
		Attack.clear(15, 0x7);

		if (me.getItem(525)) {
			let stone;

			for (let touch = 0; touch < 5; touch += 1) {
				for (let piece = 17; piece < 22; piece += 1) {
					stone = getUnit(2, piece);

					if (stone) {
						Misc.openChest(stone);
						Attack.clear(10);
					}
				}
			}
		}

		while (!Pather.usePortal(38)) {
			Attack.securePosition(me.x, me.y, 10, 1000);
		}

		Pather.moveTo(me.x, me.y + 6);
		let gibbet = getUnit(2, 26);

		if (!gibbet.mode) {
			if (!Pather.moveToPreset(me.area, 2, 26, 0, 0, true, true)) {
				print("ÿc9SoloLevelingÿc0: Failed to move to Cain's Gibbet");
			}

			Misc.openChest(gibbet);
		}

		if (me.diff === 0) {
			Attack.clearLevel();
		}

		return true;
	};

	this.countess = function () {
		if (me.diff === 0 && haveItem("shield", "runeword", "Ancients' Pledge") && haveItem("armor", "runeword", "Stealth") || me.diff === 2 && me.charlvl < respecTwo || me.diff === 2 && me.classid === 1) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting countess');
		me.overhead("countess");

		if (!Pather.checkWP(6)) {
			Pather.getWP(6);
		} else {
			Pather.useWaypoint(6);
		}

		Precast.doPrecast(true);

		try {
			Pather.moveToExit([20, 21, 22, 23, 24, 25], true);
			Pather.moveToPreset(me.area, 2, 580);
			Attack.clear(20, 0, getLocaleString(2875));
		} catch (err) {
			print('ÿc9SoloLevelingÿc0: Failed to kill Countess');
		}

		Pickit.pickItems();

		return true;
	};

	this.pits = function () {
		if (me.charlvl < respecTwo) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting pits');
		me.overhead("pits");

		if (!Pather.checkWP(6)) {
			Pather.getWP(6);
		} else {
			Pather.useWaypoint(6);
		}

		Precast.doPrecast(true);

		if (!Pather.moveToExit([7, 12], true)) {
			print("ÿc9SoloLevelingÿc0: Failed to move to Pit level 1");
		}

		Attack.clearLevel();

		if (!Pather.moveToExit(16, true)) {
			print("ÿc9SoloLevelingÿc0: Failed to move to Pit level 2");
		}

		Attack.clearLevel();
		Misc.openChestsInArea(16);

		return true;
	};

	this.andariel = function () {
		if (me.diff === 0 && Misc.checkQuest(6, 0)) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting andy');
		me.overhead("andy");

		if (!Pather.checkWP(35)) {
			Pather.getWP(35);
		} else {
			Pather.useWaypoint(35);
		}

		Precast.doPrecast(true);
		Pather.moveToExit([36, 37], true);
		Town.goToTown();
		Town.doChores();
		Town.buyPots(10, "Antidote"); // antidote
		Town.drinkPots();
		Pather.usePortal(37, me.name);
		Precast.doPrecast(true);
		Pather.moveTo(22572, 9635);
		Pather.moveTo(22554, 9618);
		Pather.moveTo(22542, 9600);
		Pather.moveTo(22572, 9582);
		Pather.moveTo(22554, 9566);
		Pather.moveTo(22546, 9554);
		Config.MercWatch = false;

		try {
			let andy = getUnit(1, "Andariel");

			if (andy && andy.hp > 0) {
				Attack.kill(andy);
			}

		} catch (err) {
			print('ÿc9SoloLevelingÿc0: Failed to kill Andy');
		}

		delay(2000 + me.ping); // Wait for minions to die.
		Pickit.pickItems();
		Config.MercWatch = true;
		Pather.changeAct();

		return true;
	};

	this.radament = function () {
		if (!Pather.accessToAct(2) || Misc.checkQuest(9, 0)) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting radament');
		me.overhead("radament");

		if (!Pather.checkWP(48)) {
			Pather.getWP(48);
		} else {
			Pather.useWaypoint(48);
		}

		Precast.doPrecast(true);

		Pather.moveToExit(49, true);
		Pather.moveToPreset(me.area, 2, 355);

		try {
			let radament = getUnit(1, "Radament");

			if (radament && radament.hp > 0) {
				Attack.kill(radament); // kill duriel
			}

		} catch (err) {
			print('ÿc9SoloLevelingÿc0: Failed to kill Radament');
		}

		Pickit.pickItems();
		Town.goToTown();
		Town.unfinishedQuests();
		Town.npcInteract("atma");

		return true;
	};

	this.cube = function () {
		if (!Pather.accessToAct(2) || me.getItem(549)) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting cube');
		me.overhead("cube");

		if (!Pather.checkWP(57)) {
			Pather.getWP(57);
		} else {
			Pather.useWaypoint(57);
		}

		Precast.doPrecast(true);
		Pather.moveToExit(60, true);
		Pather.moveToPreset(me.area, 2, 354);
		Attack.securePosition(me.x, me.y, 30, 3000, true);
		Misc.getQuestItem(549, 354);
		Town.goToTown();
		Misc.stashQuestItem(549);

		return true;
	};

	this.amulet = function () {
		if (!Pather.accessToAct(2) || me.getItem(91) || me.getItem(521) || Misc.checkQuest(10, 0)) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting amulet');
		me.overhead("amulet");

		if (!Pather.checkWP(44)) {
			Pather.getWP(44);
		} else {
			Pather.useWaypoint(44);
		}

		Precast.doPrecast(true);
		Pather.moveToExit([45, 58, 61], true);
		Precast.doPrecast(true);

		if (me.classid !== 1 || me.classid === 1 && me.charlvl <= respecOne) {
			Pather.moveTo(15065, 14047);
			Pather.moveTo(15063, 14066);
			Pather.moveTo(15051, 14066);
		}

		Pather.moveTo(15045, 14051);
		Misc.getQuestItem(521, 149);
		Town.goToTown();
		Town.npcInteract("drognan");
		Misc.stashQuestItem(521);

		return true;
	};

	this.summoner = function () {
		if (!Pather.accessToAct(2) || Misc.checkQuest(13, 0)) {
			return true;
		}

		var teleportPads = function () {
			if (me.getSkill(54, 0)) {

				return true;
			}

			let wpX = 25449;
			let wpY = 5449;
			let ntppPath = [[53, 2], [103, -3], [113, -68], [173, -58], [243, -73], [293, -58], [353, -68], [372, -62], [342, -17]];
			let stppPath = [[-56, 2], [-128, -7], [-98, 78], [-176, 62], [-243, 58], [-296, 62], [-372, 62], [-366, 12]];
			let etppPath = [[28, 52], [-12, 92], [53, 112], [72, 118], [88, 172], [54, 227], [43, 247], [88, 292], [82, 378], [-16, 332], [2, 353]];
			let wtppPath = [[-26, -63], [2, -121], [3, -133], [62, -117], [34, -183], [54, -228], [43, -243], [34, -303], [72, -351], [64, -368], [23, -338]];
			let stand = getPresetUnit(me.area, 2, 357);
			let tppPathX = stand.roomx * 5 + stand.x;
			let tppPathY = stand.roomy * 5 + stand.y;
			let tppPath;
			let tppID = [192, 304, 305, 306];

			switch (tppPathX) {
			case 25011:
				tppPath = ntppPath;
				break;
			case 25866:
				tppPath = stppPath;
				break;
			case 25431:
				switch (tppPathY) {
				case 5011:
					tppPath = etppPath;
					break;
				case 5861:
					tppPath = wtppPath;
					break;
				}

				break;
			}

			if (getPath(me.area, me.x, me.y, stand.roomx * 5 + stand.x, stand.roomy * 5 + stand.y, 0, 10).length === 0) {
				me.overhead('Using telepad layout');

				for (let i = 0; i < tppPath.length; i += 1) {
					for (let h = 0; h < 5; h += 1) {
						Pather.moveTo(wpX - tppPath[i][0], wpY - tppPath[i][1]);

						for (let activate = 0; activate < tppID.length; activate += 1) {
							let telepad = getUnit(2, tppID[activate]);

							if (telepad) {
								do {
									if (Math.abs((telepad.x - (wpX - tppPath[i][0]) + (telepad.y - (wpY - tppPath[i][1])))) <= 0) {
										delay(100 + me.ping);
										telepad.interact();
									}
								} while (telepad.getNext());
							}
						}
					}
				}
			}

			return true;
		};

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting summoner');
		me.overhead("summoner");

		if (!Pather.checkWP(74)) {
			Pather.getWP(74);
		} else {
			Pather.useWaypoint(74);
		}

		Precast.doPrecast(true);
		teleportPads();

		try {
			Pather.moveToPreset(me.area, 2, 357, -3, -3);
		} catch (err) {
			print('ÿc9SoloLevelingÿc0: Failed to reach Summoner. Retry');

			if (!Pather.moveToPreset(me.area, 2, 357, -3, -3)) {
				print('ÿc9SoloLevelingÿc0: Failed to reach summoner');

				return false;
			}
		}

		try {
			Attack.clear(15, 0, 250); // The Summoner
		} catch (e) {
			print('ÿc9SoloLevelingÿc0: Failed to kill summoner');

			return false;
		}

		let journal = getUnit(2, 357);

		if (journal) {
			while (!Pather.getPortal(46)) {
				Misc.openChest(journal);
				delay(1000 + me.ping);
				me.cancel();
			}
		}

		Pather.usePortal(46);

		if (!Pather.checkWP(46)) {
			Pather.getWP(46);
			Pather.useWaypoint(40);
		} else {
			Pather.useWaypoint(40);
		}

		return true;

	};

	this.ancienttunnels = function () {
		if (!Pather.accessToAct(2) || me.charlvl < respecTwo) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting ancient tunnels');
		me.overhead("ancient tunnels");

		if (!Pather.checkWP(44)) {
			Pather.getWP(44);
		} else {
			Pather.useWaypoint(44);
		}

		Precast.doPrecast(true);

		if (Pather.moveToPreset(me.area, 2, 580) && Misc.openChests(5)) {
			Pickit.pickItems();
		}

		if (getPresetUnit(me.area, 1, 751) && Pather.moveToPreset(me.area, 1, 751)) {
			try {
				Attack.clear(15, 0, getLocaleString(2886));
			} catch (err) {
				print('ÿc9SoloLevelingÿc0: Failed to kill Dark Elder');
			}
		}

		if (!Pather.moveToExit(65, true)) {
			print("ÿc9SoloLevelingÿc0: Failed to move to Ancient Tunnels");

			return false;
		}

		Attack.clearLevel();

		return true;
	};

	this.staff = function () {
		if (!Pather.accessToAct(2) || me.getItem(91) || me.getItem(92) || Misc.checkQuest(10, 0)) {
			return true;
		}

		if (!me.getItem(521)) {
			this.amulet();
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting staff');
		me.overhead("staff");

		if (!Pather.checkWP(43)) {
			Pather.getWP(43);
		} else {
			Pather.useWaypoint(43);
		}

		Precast.doPrecast(true);

		if (!Pather.moveToExit([62, 63, 64], true) || !Pather.moveToPreset(me.area, 2, 356)) {
			return false;
		}

		Misc.getQuestItem(92, 356);
		Town.goToTown();
		Misc.stashQuestItem(92);

		if (me.getItem(92) && me.getItem(521)) {
			Misc.cubeQuestItems(91, 92, 521);
		}

		return true;
	};

	this.tombs = function () {
		if (me.charlvl > 22) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting tombs');
		me.overhead("tombs");
		let tombID = [66, 67, 68, 69, 70, 71, 72];

		for (let number = 0; number < tombID.length; number += 1) {
			if (!Pather.checkWP(46)) {
				Pather.getWP(46);
			} else {
				Pather.useWaypoint(46);
			}

			Precast.doPrecast(true);
			Pather.moveToExit(tombID[number], true, true);

			if (me.area === tombID[number]) {
				for (let i = 0; i < 6; i += 1) {
					try {
						let gbox = getPresetUnit(me.area, 2, 397);
						let orifice = getPresetUnit(me.area, 2, 152);

						if (gbox) {
							if (Pather.moveToPreset(me.area, 2, 397, 0, 0, true)) {
								break;
							}
						} else if (orifice) {
							if (Pather.moveToPreset(me.area, 2, 152, 0, 0, true)) {
								break;
							}
						}
					} catch (e) {
						print('ÿc9SoloLevelingÿc0: Failed to move to ' + Pather.getAreaName(tombID[number]));
					}
				}

				Attack.clear(50);
				Pickit.pickItems();
				Town.goToTown();
				Town.doChores();
			}
		}

		return true;
	};

	this.duriel = function () {
		if (!Pather.accessToAct(2) || Misc.checkQuest(14, 0)) {
			return true;
		}

		if (!Misc.checkQuest(10, 0) && !me.getItem(91)) {
			if (!me.getItem(521)) {
				for (let getAmmy = 0; getAmmy < 5; getAmmy++) {
					try {
						this.amulet();
					} catch (err) {
						print('ÿc9SoloLevelingÿc0: Failed attempt to get amulet');
					}
				}
			}

			if (!me.getItem(92)) {
				for (let getStaff = 0; getStaff < 5; getStaff++) {
					try {
						this.staff();
					} catch (err) {
						print('ÿc9SoloLevelingÿc0: Failed attempt to get staff');
					}
				}
			}

			Misc.cubeQuestItems(91, 92, 521);
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting duriel');
		me.overhead("duriel");

		if (!Pather.checkWP(46)) {
			Pather.getWP(46);
		} else {
			Pather.useWaypoint(46);
		}

		Precast.doPrecast(true);
		Pather.moveToExit(getRoom().correcttomb, true);
		Pather.moveToPreset(me.area, 2, 152);
		Attack.securePosition(me.x, me.y, 30, 3000, true, me.diff === 2);

		if (!Misc.checkQuest(10, 0)) {
			Misc.placeStaff();
		}

		Town.goToTown();
		Town.doChores();
		Town.buyPots(10, "Thawing"); // thawing
		Town.drinkPots();
		Config.MercWatch = false;
		Pather.usePortal(null, me.name);
		delay(1000 + me.ping);

		try {
			Pather.useUnit(2, 100, 73);
			let duriel = getUnit(1, "Duriel");

			if (duriel && duriel.hp > 0) {
				Attack.kill(duriel); // kill duriel
			}
		} catch (err) {
			print('ÿc9SoloLevelingÿc0: Failed to kill Duriel');
		}

		Pickit.pickItems();

		if (!Misc.checkQuest(15, 0)) {
			Misc.tyraelTomb();
			Town.move("palace");
			Town.npcInteract("jerhyn");
			Pather.moveToExit(50, true);

			if (!me.inTown) {
				Town.goToTown();
			}
		}

		Pather.changeAct();
		Config.MercWatch = true;

		return true;
	};

	this.eye = function () {
		if (!Pather.accessToAct(3) || me.getItem(553) || me.getItem(174) || Misc.checkQuest(18, 0)) {
			return true;
		} // skip eye

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting eye');
		me.overhead("eye");

		if (!Pather.checkWP(76)) {
			Pather.getWP(76);
		} else {
			Pather.useWaypoint(76);
		}

		Precast.doPrecast(true);

		if (!Pather.moveToExit([76, 85], true)) {
			print('ÿc9SoloLevelingÿc0: Failed to get the eye');
		}

		Town.goToTown();
		Town.doChores();
		Town.buyPots(10, "Antidote"); // antidote
		Town.drinkPots();
		Pather.usePortal(85, me.name);
		Pather.moveToPreset(me.area, 2, 407);
		Attack.clear(0x7);
		Misc.getQuestItem(553, 407);
		Town.goToTown();
		Misc.stashQuestItem(553);

		return true;
	};

	this.heart = function () {
		if (!Pather.accessToAct(3) || me.getItem(554) || me.getItem(174) || Misc.checkQuest(18, 0)) {
			return true;
		} // skip heart

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting heart');
		me.overhead("heart");

		if (!Pather.checkWP(80)) {
			Pather.getWP(80);
		} else {
			Pather.useWaypoint(80);
		}

		Precast.doPrecast(true);

		if (!Pather.moveToExit([80, 92, 93], true) || !Pather.moveToPreset(me.area, 2, 405)) {
			print('ÿc9SoloLevelingÿc0: Failed to get the heart');
		}

		Attack.clear(0x7); // clear level
		Misc.getQuestItem(554, 405);
		Town.goToTown();
		Misc.stashQuestItem(554);

		return true;
	};

	this.tome = function () {
		if (!Pather.accessToAct(3) || Misc.checkQuest(17, 0)) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting tome');
		me.overhead("tome");

		if (!Pather.checkWP(80)) {
			Pather.getWP(80);
		} else {
			Pather.useWaypoint(80);
		}

		Precast.doPrecast(true);

		if (!Pather.moveToExit(94, true) || !Pather.moveToPreset(me.area, 2, 193)) {
			print('ÿc9SoloLevelingÿc0: Failed to get LamEssen Tome');
		}

		Misc.getQuestItem(548, 193);
		Town.goToTown();
		Town.unfinishedQuests();

		return true;
	};

	this.brain = function () {
		if (!Pather.accessToAct(3) || me.getItem(555) || me.getItem(174) || Misc.checkQuest(18, 0)) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting brain');
		me.overhead("brain");

		if (!Pather.checkWP(78)) {
			Pather.getWP(78);
		} else {
			Pather.useWaypoint(78);
		}

		Precast.doPrecast(true);

		if (!Pather.moveToExit([88, 89, 91], true) || !Pather.moveToPreset(me.area, 2, 406)) {
			print('ÿc9SoloLevelingÿc0: Failed to get the Brain');
		}

		Attack.clear(0x7);
		Misc.getQuestItem(555, 406);
		Town.goToTown();
		Misc.stashQuestItem(555);

		return true;
	};

	this.lowerkurast = function () {
		if (!Pather.accessToAct(3) || me.diff === 0) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting lower kurast');
		me.overhead("lower kurast");

		if (!Pather.checkWP(79)) {
			Pather.getWP(79);
		} else {
			Pather.useWaypoint(79);
		}

		Precast.doPrecast(true);
		Misc.openChestsInArea(79);

		return true;
	};

	this.travincal = function () {
		if (!Pather.accessToAct(3) || me.diff <= 0 && Misc.checkQuest(18, 0)) {
			return true;
		}

		if (!me.getItem(553)) {
			this.eye();
		}

		if (!me.getItem(554)) {
			this.heart();
		}

		if (!me.getItem(555)) {
			this.brain();
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting travincal');
		me.overhead("travincal");

		if (!Pather.checkWP(83)) {
			Pather.getWP(83);
		} else {
			Pather.useWaypoint(83);
		}

		Precast.doPrecast(true);
		let ismail = getUnit(1, "Ismail Vilehand");

		if (ismail && !Attack.canAttack(ismail)) { // exit if ismail immune
			print("ÿc9SoloLevelingÿc0: Failed Travincal. Ismail is immune.");

			return true;
		}

		let council = {
			x: me.x + 76,
			y: me.y - 67
		};

		Pather.moveToUnit(council);

		try {
			if (ismail && ismail.hp > 0) {
				Attack.kill(ismail);
			}

		} catch (error) {
			try {
				Attack.clear(30);
			} catch (err) {
				print('ÿc9SoloLevelingÿc0: Failed to kill ismail');

				return false;
			}
		}

		Pickit.pickItems();

		if (!Misc.checkQuest(18, 0)) { // khalim's will quest not complete
			Pather.moveToUnit(council);
			Pickit.pickItems();

			if (!Pather.moveToPreset(83, 2, 404)) { // go to orb
				print('ÿc9SoloLevelingÿc0: Failed to move to compelling orb');
			}

			Attack.clear(5); // clear area around orb

			if (!me.inTown) { // go to town
				Town.goToTown();
			}

			if (!me.getItem(174) && me.getItem(173)) { // cube flail to will
				Misc.cubeQuestItems(174, 553, 554, 555, 173);
				delay(250 + me.ping);
			}

			Misc.equipQuestItem(174, 4);
			delay(250 + me.ping);

			if (!Pather.usePortal(83, me.name)) { // return to Trav
				print("ÿc9SoloLevelingÿc0: Failed to go back to Travincal and smash orb");
			}

			Misc.smashSomething(404); // smash orb
			Item.autoEquip(); // equip previous weapon

			if (!me.inTown) { // go to town
				Town.goToTown();
			}

			Town.doChores();

			if (!Pather.usePortal(83, me.name)) { // return to Trav
				print("ÿc9SoloLevelingÿc0: Failed to go back to Travincal and take entrance");
			}

			if (!Pather.moveToExit(100, true)) {
				delay(250 + me.ping * 2);
				Pather.moveToExit(100, true);
			}

			if (!Pather.checkWP(101)) {
				Pather.getWP(101);
			}
		}

		return true;
	};

	this.mephisto = function () {
		if (!Pather.accessToAct(3) || me.diff === 0 && Misc.checkQuest(22, 0)) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting mephisto');
		me.overhead("mephisto");

		if (!Pather.checkWP(101)) {
			Pather.getWP(101);
		} else {
			Pather.useWaypoint(101);
		}

		Precast.doPrecast(true);
		Pather.moveToExit(102, true);
		Town.goToTown();
		Town.doChores();
		Town.buyPots(10, "Thawing"); // thawing
		Town.drinkPots();
		Town.buyPots(10, "Antidote"); // antidote
		Town.drinkPots();
		Pather.usePortal(102, me.name);
		Precast.doPrecast(true);
		Pather.moveTo(17692, 8048);
		Pather.moveTo(17563, 8072);
		Config.MercWatch = false;

		try {
			let mephisto = getUnit(1, "Mephisto");

			if (mephisto && mephisto.hp > 0) {
				Attack.kill(mephisto);
			}
		} catch (err) {
			print('ÿc9SoloLevelingÿc0: Failed to kill Mephisto');
		}

		Config.MercWatch = true;
		Pickit.pickItems();
		Pather.moveTo(17581, 8070);
		delay(250 + me.ping * 2);
		Pather.usePortal(null);

		return true;
	};

	this.izual = function () {
		if (Misc.checkQuest(25, 0) || !Pather.accessToAct(4)) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting izual');
		me.overhead("izual");

		if (!Pather.checkWP(106)) {
			Pather.getWP(106);
		} else {
			Pather.useWaypoint(106);
		}

		Precast.doPrecast(true);

		if (!Misc.checkQuest(25, 1)) {
			Pather.moveToPreset(105, 1, 256);

			try {
				let izual = getUnit(1, "Izual");

				if (izual && izual.hp > 0) {
					Attack.kill(izual);
				}
			} catch (err) {
				print('ÿc9SoloLevelingÿc0: Failed to kill Izual');
			}
		}

		Town.goToTown();
		Town.npcInteract("tyrael");

		return true;
	};

	this.hellforge = function () {
		if (!Pather.accessToAct(4) || Misc.checkQuest(27, 0)) {
			return true;
		}

		NTIP.addLine("[name] == hellforgehammer");
		NTIP.addLine("[name] == mephisto'ssoulstone");
		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting hellforge');
		me.overhead("hellforge");

		if (!Pather.checkWP(107)) {
			Pather.getWP(107);
		} else {
			Pather.useWaypoint(107);
		}

		Precast.doPrecast(true);

		if (!Pather.moveToPreset(me.area, 2, 376)) {
			print("ÿc9SoloLevelingÿc0: Failed to move to Hephasto");
		}

		try {
			Attack.clear(20, 0, getLocaleString(1067)); // Hephasto The Armorer
		} catch (err) {
			print('ÿc9SoloLevelingÿc0: Failed to kill Hephasto');
		}

		if (!me.inTown) { // go to town
			Town.goToTown();
		}

		Town.doChores();
		Town.npcInteract("cain");

		if (me.getItem(90)) {
			Misc.equipQuestItem(90, 4);
		}

		Pather.usePortal(null, me.name);

		if (!me.getItem(90)) {
			Pickit.pickItems();
			Misc.equipQuestItem(90, 4);
		}

		if (!Pather.moveToPreset(me.area, 2, 376)) {
			print('ÿc9SoloLevelingÿc0: Failed to move to forge');
		}

		Attack.clear(15);
		let forge = getUnit(2, 376);
		Misc.openChest(forge);
		delay(250 + me.ping * 2);
		Misc.smashSomething(376);
		Item.autoEquip();
		delay(2500 + me.ping);
		Pickit.pickItems();

		if (!me.inTown) { // go to town
			Town.goToTown();
		}

		Town.npcInteract("cain");

		return true;
	};

	this.diablo = function () {
		if (!Pather.accessToAct(4)) {
			return true;
		}

		if (!Misc.checkQuest(25, 0)) { // Izual quest completion check
			Town.npcInteract("tyrael");
		}

		this.getLayout = function (seal, value) {// Start Diablo Quest
			let sealPreset = getPresetUnit(108, 2, seal);

			if (!seal) {
				print("ÿc9SoloLevelingÿc0: Seal preset not found");
			}

			if (sealPreset.roomy * 5 + sealPreset.y === value || sealPreset.roomx * 5 + sealPreset.x === value) {
				return 1;
			}

			return 2;
		};

		this.initLayout = function () {
			this.vizLayout = this.getLayout(396, 5275);
			this.seisLayout = this.getLayout(394, 7773);
			this.infLayout = this.getLayout(392, 7893);
		};

		this.getBoss = function (name) {
			let glow = getUnit(2, 131);

			for (let bossbeating = 0; bossbeating < 24; bossbeating += 1) {
				let boss = getUnit(1, name);

				if (boss) {
					this.chaosPreattack(name, 8);

					try {
						if (boss && boss.hp > 0) {
							Attack.kill(name);
						}
					} catch (e) {
						Attack.clear(10, 0, name);
					}

					Pickit.pickItems();

					return true;
				}

				delay(250 + me.ping);
			}

			return !!glow;
		};

		this.chaosPreattack = function (name, amount) {
			let target, position;

			switch (me.classid) {
			case 0:
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				target = getUnit(1, name);

				if (!target) {
					return;
				}

				position = [[6, 11], [0, 8], [8, -1], [-9, 2], [0, -11], [8, -8]];

				for (let attackspot = 0; attackspot < position.length; attackspot += 1) {
					if (Attack.validSpot(target.x + position[attackspot][0], target.y + position[attackspot][1])) { // check if we can move there
						Pather.moveTo(target.x + position[attackspot][0], target.y + position[attackspot][1]);
						Skill.setSkill(Config.AttackSkill[2], 0);

						for (let n = 0; n < amount; n += 1) {
							Skill.cast(Config.AttackSkill[1], 1);
						}

						break;
					}
				}

				break;
			case 4:
				break;
			case 5:
				break;
			case 6:
				break;
			}
		};

		this.diabloPrep = function () {
			let tick = getTickCount();

			while (getTickCount() - tick < 17500) {
				if (getTickCount() - tick >= 8000) {
					switch (me.classid) {
					case 1: // Sorceress
						if ([56, 59, 64].indexOf(Config.AttackSkill[1]) > -1) {
							if (me.getState(121)) {
								delay(500 + me.ping);
							} else {
								Skill.cast(Config.AttackSkill[1], 0, 7793, 5293);
							}

							break;
						}

						delay(500 + me.ping);

						break;
					case 3: // Paladin
						Skill.setSkill(Config.AttackSkill[2]);
						Skill.cast(Config.AttackSkill[1], 1);

						break;
					case 5: // Druid
						if (Config.AttackSkill[1] === 245) {
							Skill.cast(Config.AttackSkill[1], 0, 7793, 5293);

							break;
						}

						delay(500 + me.ping);

						break;
					case 6: // Assassin
						if (Config.UseTraps) {
							let check = ClassAttack.checkTraps({x: 7793, y: 5293});

							if (check) {
								ClassAttack.placeTraps({x: 7793, y: 5293, classid: 243}, check);

								break;
							}
						}

						delay(500 + me.ping);

						break;
					default:
						delay(500 + me.ping);
					}
				} else {
					delay(500 + me.ping);
				}

				if (getUnit(1, 243)) {
					return true;
				}
			}

			return false;
		};

		this.openSeal = function (classid) {
			for (let sealspot = 0; sealspot < 5; sealspot += 1) {
				Pather.moveToPreset(108, 2, classid, classid === 394 ? 5 : 2, classid === 394 ? 5 : 0);

				if (sealspot > 1) {
					Attack.clear(15);
				}

				let seal = getUnit(2, classid);

				for (let z = 0; z < 3; z += 1) {

					if (seal) {
						break;
					}

					delay(100 + me.ping);
				}

				if (!seal) {
					print("ÿc9SoloLevelingÿc0: Seal not found (id " + classid + ")");
				}

				if (seal.mode) {
					return true;
				}

				if (classid === 394) {
					Misc.click(0, 0, seal);
				} else {
					seal.interact();
				}

				delay(classid === 394 ? 1000 + me.ping : 500 + me.ping);

				if (!seal.mode) {
					if (classid === 394 && Attack.validSpot(seal.x + 15, seal.y)) { // de seis optimization
						Pather.moveTo(seal.x + 15, seal.y);
					} else {
						Pather.moveTo(seal.x - 5, seal.y - 5);
					}

					delay(500 + me.ping);
				} else {
					return true;
				}
			}

			print("ÿc9SoloLevelingÿc0: Failed to open seal (id " + classid + ")");

			return true;
		};

		this.vizier = function () {
			this.openSeal(395);
			this.openSeal(396);

			if (this.vizLayout === 1) {
				Pather.moveTo(7691, 5292, 3, 30);
			} else {
				Pather.moveTo(7695, 5316, 3, 30);
			}

			if (!this.getBoss(getLocaleString(2851))) {
				print("ÿc9SoloLevelingÿc0: Failed Vizier");
			}
		};

		this.seis = function () {
			this.openSeal(394);

			if (this.seisLayout === 1) {
				Pather.moveTo(7771, 5196, 3, 30);
			} else {
				Pather.moveTo(7798, 5186, 3, 30);
			}

			if (!this.getBoss(getLocaleString(2852))) {
				print("ÿc9SoloLevelingÿc0: Failed Seis");
			}
		};

		this.infector = function () {
			this.openSeal(393);
			this.openSeal(392);

			if (this.infLayout === 1) {
				delay(1 + me.ping);
			} else {
				Pather.moveTo(7928, 5295, 3, 30); // temp
			}

			if (!this.getBoss(getLocaleString(2853))) {
				print("ÿc9SoloLevelingÿc0: Failed Infector");
			}
		};

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting diablo');
		me.overhead("diablo");

		if (!Pather.checkWP(107)) {
			Pather.getWP(107);
		} else {
			Pather.useWaypoint(107);
		}

		Precast.doPrecast(true);
		Pather.moveToExit(108, true);
		Attack.clearLevel();
		this.initLayout();
		this.vizier();
		this.seis();
		this.infector();
		Config.MercWatch = false;
		Pather.moveTo(7788, 5292, 3, 30);
		this.diabloPrep();
		let diablo = getUnit(1, 243);

		if (!diablo) {
			print("ÿc9SoloLevelingÿc0: Diablo not found. Checking seal bosses.");
			this.infector();
			this.seis();
			this.vizier();
			Pather.moveTo(7788, 5292, 3, 30);
			this.diabloPrep();
		}

		if (diablo) {
			while ( diablo.hp > 0) {
				Attack.kill(diablo);
			}
		}

		Pickit.pickItems();

		if (me.gametype === 0) {
			return true;
		}

		Config.MercWatch = true;
		Town.goToTown();

		if (Misc.checkQuest(28, 0)) {
			Pather.changeAct();
		} else {
			Town.npcInteract("tyrael");
			delay(500 + me.ping);
			Pather.useUnit(2, 566, 109);
		}

		return true;
	};

	this.shenk = function () {
		if (me.gametype === 0 || !Pather.accessToAct(5) || me.diff === 0 && Misc.checkQuest(35, 1) || me.diff === 1 && Misc.checkQuest(35, 1)) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting shenk');
		me.overhead("shenk");

		if (!Pather.checkWP(111)) {
			Pather.getWP(111);
		} else {
			Pather.useWaypoint(111);
		}

		Precast.doPrecast(true);

		if (!Misc.checkQuest(35, 1)) {
			Pather.moveTo(3883, 5113);
			Attack.kill(getLocaleString(22435));
		}

		Pickit.pickItems();

		return true;
	};

	this.saveBarby = function () {
		if (me.gametype === 0 || !Pather.accessToAct(5) || Misc.checkQuest(36, 0)) {
			return true;
		}

		let coords = [];
		let barbies = [];

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting barbies');
		me.overhead("barbies");

		if (!Pather.checkWP(111)) {
			Pather.getWP(111);
		} else {
			Pather.useWaypoint(111);
		}

		Precast.doPrecast(true);
		barbies = getPresetUnits (me.area, 2, 473);

		if (!barbies) {
			return false;
		}

		for ( let cage = 0 ; cage < barbies.length ; cage += 1) {
			coords.push({
				x: barbies[cage].roomx * 5 + barbies[cage].x - 3, //Dark-f: x-3
				y: barbies[cage].roomy * 5 + barbies[cage].y
			});
		}

		for ( let k = 0 ; k < coords.length ; k += 1) {
			me.overhead("come on Barby let's go party... " + (k + 1) + "/" + barbies.length);
			Pather.moveToUnit(coords[k], 2, 0);
			let door = getUnit(1, 434);

			if (door) {
				Pather.moveToUnit(door, 1, 0);

				for (let i = 0; i < 20 && door.hp; i += 1) {
					ClassAttack.doAttack(door);
				}
			}

			delay(1500 + me.ping);
		}

		Town.goToTown();
		Town.npcInteract("qual_kehk");

		return true;
	};

	this.anya = function () {
		if (me.gametype === 0 || !Pather.accessToAct(5) || Misc.checkQuest(37, 0)) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting anya');
		me.overhead("anya");

		if (!Pather.checkWP(113)) {
			Pather.getWP(113);
		} else {
			Pather.useWaypoint(113);
		}

		Precast.doPrecast(true);

		if (!Pather.moveToExit(114, true) || !Pather.moveToPreset(me.area, 2, 460)) {
			print("ÿc9SoloLevelingÿc0: Failed to move to Anya");
		}

		let frozenanya = getUnit(2, 558);

		if (frozenanya) {
			Pather.moveToUnit(frozenanya);
			sendPacket(1, 0x13, 4, 0x2, 4, frozenanya.gid);
			delay(1200 + me.ping);
			me.cancel();
		}

		Town.goToTown();
		Town.npcInteract("malah");
		Pather.usePortal(114, me.name);

		if (frozenanya) {
			while (!frozenanya.mode) {
				sendPacket(1, 0x13, 4, 0x2, 4, frozenanya.gid);
				delay(300 + me.ping);
			}
		}

		Town.goToTown();
		Town.clearJunk();
		Town.npcInteract("malah");
		Town.unfinishedQuests();
		Town.doChores();
		Town.npcInteract("anya");

		return true;
	};

	this.pindle = function () {
		if (me.gametype === 0 || !Pather.accessToAct(5) || !Misc.checkQuest(37, 0) || !Misc.checkQuest(37, 1)) {
			return true;
		}

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting pindle');
		me.overhead("Pindle");

		if (!Pather.getPortal(121)) {
			Town.npcInteract("anya");
		}

		if (!Pather.usePortal(121)) {
			return true;
		}

		try {
			Precast.doPrecast(true);
			Pather.moveTo(10058, 13234);
			let pindle = getUnit(1, getLocaleString(22497));

			if (pindle && pindle.hp > 0) {
				Attack.clear(15, 0, getLocaleString(22497));
			}
		} catch (e) {
			print("ÿc9SoloLevelingÿc0: Failed to kill Pindle");
		}

		Pickit.pickItems();

		return true;
	};

	this.ancients = function () {
		if (me.gametype === 0 || !Pather.accessToAct(5) || Misc.checkQuest(39, 0)) {
			return true;
		}

		let canAncients = function () { // ancients resists
			let ancient = getUnit(1);

			if (ancient) {
				do {
					if (!ancient.getParent() && !Attack.canAttack(ancient)) {
						return false;
					}
				} while (ancient.getNext());
			}

			return true;
		};

		let touchAltar = function () { // touch altar
			let tick = getTickCount();

			while (getTickCount() - tick < 5000) {
				if (getUnit(2, 546)) {
					break;
				}

				delay(20 + me.ping);
			}

			let altar = getUnit(2, 546);

			if (altar) {
				while (altar.mode !== 2) {
					Pather.moveToUnit(altar);
					altar.interact();
					delay(200 + me.ping);
					me.cancel();
				}

				return true;
			}

			return false;
		};

		let ancientsPrep = function () { // ancients prep
			Town.goToTown(); // prep to revised settings
			Town.fillTome(518);
			Town.buyPots(10, "Thawing");
			Town.drinkPots();
			Town.buyPots(10, "Antidote");
			Town.drinkPots();
			Town.buyPotions();
			Pather.usePortal(120, me.name);
		};

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting ancients');
		me.overhead("ancients");

		if (!Pather.checkWP(118)) {
			Pather.getWP(118);
		} else {
			Pather.useWaypoint(118);
		}

		Precast.doPrecast(true);
		Pather.moveToExit(120, true); // enter at ancients plateau
		let tempConfig = Misc.copy(Config); // save and update config settings
		let updateConfig = {
			TownCheck: false,
			MercWatch: false,
			HealStatus: false,
			TownHP: 0,
			TownMP: 0,
			MPBuffer: 15,
			HPBuffer: 15,
			UseMercRejuv: 25,
			LifeChicken: 5,
			ManaChicken: 0,
			MercChicken: 0
		};

		Town.goToTown();
		Town.townTasks();
		me.overhead('updated settings');
		Object.assign(Config, updateConfig);
		Town.buyPots(10, "Thawing"); // prep to revised settings
		Town.drinkPots();
		Town.buyPots(10, "Antidote");
		Town.drinkPots();
		Town.buyPotions();
		Pather.usePortal(120, me.name);
		Precast.doPrecast(true);

		if (!Pather.moveToPreset(me.area, 2, 546)) { // move to altar
			print("ÿc9SoloLevelingÿc0: Failed to move to ancients' altar");
		}

		touchAltar(); //activate altar

		while (!getUnit(1, 541)) { //wait for ancients to spawn
			delay(250 + me.ping);
		}

		while (!canAncients()) {// reroll ancients if unable to attack
			Pather.makePortal(true);
			ancientsPrep();
			Pather.usePortal(120, me.name);
			touchAltar();

			while (!getUnit(1, 542)) {
				delay(10 + me.ping);
			}
		}

		Attack.clear(50);
		Pather.moveTo(10048, 12628);
		me.cancel();
		me.overhead('restored settings');
		Object.assign(Config, tempConfig);
		Precast.doPrecast(true);

		try {
			Pather.moveToExit([128, 129], true);

			if (!Pather.checkWP(129)) {
				Pather.getWP(129);
			}
		} catch (err) {
			print('ÿc9SoloLevelingÿc0: Cleared Ancients. Failed to get WSK Waypoint');
		}

		return true;
	};

	this.baal = function () {
		let FR = me.getStat(39); // fire resist
		let LR = me.getStat(41); // lightning resist
		let CR = me.getStat(43); // cold resist
		let checkFR = me.diff === 0 ? 80 : 150; // cannot start next diff with negative resistances
		let checkLR = me.diff === 0 ? 80 : 150;
		let checkCR = me.diff === 0 ? 80 : 150;

		if (me.gametype === 0 || !Pather.accessToAct(5)) {
			return true;
		}

		if (!Misc.checkQuest(39, 0)) { // Check Ancients Quest
			this.ancients();
		}

		this.preattack = function () {// Start Baal
			switch (me.classid) {
			case 1: // Sorceress
				switch (Config.AttackSkill[3]) {
				case 49:
				case 53:
				case 56:
				case 59:
				case 64:
					if (me.getState(121)) {
						while (me.getState(121)) {
							delay(100 + me.ping);
						}
					} else {
						return Skill.cast(Config.AttackSkill[1], 0, 15094 + rand(-1, 1), 5028);
					}

					break;
				}

				break;
			case 3: // Paladin
				if (Config.AttackSkill[3] === 112) {
					if (Config.AttackSkill[4] > 0) {
						Skill.setSkill(Config.AttackSkill[4], 0);
					}

					return Skill.cast(Config.AttackSkill[3], 1);
				}

				break;
			case 5: // Druid
				if (Config.AttackSkill[3] === 245) {
					return Skill.cast(Config.AttackSkill[3], 0, 15094 + rand(-1, 1), 5028);
				}

				break;
			case 6: // Assassin
				if (Config.UseTraps) {
					let check = ClassAttack.checkTraps({x: 15094, y: 5028});

					if (check) {
						return ClassAttack.placeTraps({x: 15094, y: 5028}, 5);
					}
				}

				if (Config.AttackSkill[3] === 256) { // shock-web
					return Skill.cast(Config.AttackSkill[3], 0, 15094, 5028);
				}

				break;
			}

			return false;
		};

		this.checkThrone = function () {
			let monster = getUnit(1);

			if (monster) {
				do {
					if (Attack.checkMonster(monster) && monster.y < 5080) {
						switch (monster.classid) {
						case 23:
						case 62:
							return 1;
						case 105:
						case 381:
							return 2;
						case 557:
							return 3;
						case 558:
							return 4;
						case 571:
							return 5;
						default:
							Attack.getIntoPosition(monster, 10, 0x4);
							Attack.clear(15);

							return false;
						}
					}
				} while (monster.getNext());
			}

			return false;
		};

		this.clearThrone = function () {
			let monsterList = [];
			let position = [15094, 5022, 15094, 5041, 15094, 5060, 15094, 5041, 15094, 5022];

			if (Config.AvoidDolls) {
				let monster = getUnit(1, 691);

				if (monster) {
					do {
						if (monster.x >= 15072 && monster.x <= 15118 && monster.y >= 5002 && monster.y <= 5079 && Attack.checkMonster(monster) && Attack.skipCheck(monster)) {
							monsterList.push(copyUnit(monster));
						}
					} while (monster.getNext());
				}

				if (monsterList.length) {
					Attack.clearList(monsterList);
				}
			}

			for (let location = 0; location < position.length; location += 2) {
				Pather.moveTo(position[location], position[location + 1]);
				Attack.clear(25);
			}
		};

		this.checkHydra = function () {
			var hydra = getUnit(1, getLocaleString(3325));

			if (hydra) {
				do {
					if (hydra.mode !== 12 && hydra.getStat(172) !== 2) {
						Pather.moveTo(15072, 5002);

						while (hydra.mode !== 12) {
							delay(500 + me.ping);

							if (!copyUnit(hydra).x) {
								break;
							}
						}

						break;
					}
				} while (hydra.getNext());
			}

			return true;
		};

		Town.townTasks();
		print('ÿc9SoloLevelingÿc0: starting baal');
		me.overhead("baal");

		if (!Pather.checkWP(129)) {
			Pather.getWP(129);
		} else {
			Pather.useWaypoint(129);
		}

		Precast.doPrecast(true);
		Pather.moveToExit([130, 131], true);
		Pather.moveTo(15095, 5029);

		if (getUnit(1, 691)) {
			print("ÿc9SoloLevelingÿc0: Dolls found! NG.");
			me.overhead("Dolls found! NG.");

			return true;
		}

		if (getUnit(1, 641)) {
			print("ÿc9SoloLevelingÿc0: Souls found! NG.");
			me.overhead("Souls found! NG.");

			return true;
		}

		this.clearThrone();
		let tick = getTickCount();
		Pather.moveTo(15094, me.classid === 3 ? 5029 : 5038);

		MainLoop:
		while (true) {
			if (getDistance(me, 15094, me.classid === 3 ? 5029 : 5038) > 3) {
				Pather.moveTo(15094, me.classid === 3 ? 5029 : 5038);
			}

			if (!getUnit(1, 543)) {
				break MainLoop;
			}

			switch (this.checkThrone()) {
			case 1:
				Attack.clear(40);

				tick = getTickCount();

				Precast.doPrecast(true);

				break;
			case 2:
				Attack.clear(40);

				tick = getTickCount();

				break;
			case 4:
				Attack.clear(40);

				tick = getTickCount();

				break;
			case 3:
				Attack.clear(40);
				this.checkHydra();

				tick = getTickCount();

				break;
			case 5:
				Attack.clear(40);

				break MainLoop;
			default:
				if (getTickCount() - tick < 7e3) {
					if (me.getState(2)) {
						Skill.setSkill(109, 0);
					}

					break;
				}

				if (!this.preattack()) {
					delay(100 + me.ping);
				}

				break;
			}

			delay(10 + me.ping);
		}

		Pather.moveTo(15094, me.classid === 3 ? 5029 : 5038);
		Pickit.pickItems();

		if (me.charlvl < levelcap && (FR < checkFR || LR < checkLR || CR < checkCR)) {
			print('ÿc9SoloLevelingÿc0: missing requirements for next difficulty.');

			return true;
		}

		Pather.moveTo(15090, 5008);
		delay(5000 + me.ping);
		Precast.doPrecast(true);

		while (getUnit(1, 543)) {
			delay(500 + me.ping);
		}

		let portal = getUnit(2, 563);

		if (portal) {
			Pather.usePortal(null, null, portal);
		} else {
			print("ÿc9SoloLevelingÿc0: Couldn't access portal.");
		}

		Pather.moveTo(15134, 5923);

		try {
			Attack.kill(544); // Baal
		} catch (err) {
			print('ÿc9SoloLevelingÿc0: Failed to kill Baal');
		}

		Pickit.pickItems();

		return true;
	};

	this.runsequence = function () {
		let j, k;
		addEventListener("gamepacket", Misc.gamePacket);

		for (k = 0; k < sequence.length; k += 1) {
			if (!me.inTown) {
				Town.goToTown();
			}

			for (j = 0; j < 3; j += 1) {
				if (this[sequence[k]]()) {
					break;
				}
			}

			if (j === 3) {
				me.overhead("sequence " + sequence[k] + " failed.");
			}
		}

		removeEventListener("gamepacket", Misc.gamePacket);
	};

	// Start Running Script
	this.startrun();
	this.runsequence();
	let level = ['Normal', 'Nightmare', 'Hell'][me.diff];

	if (Misc.checkQuest(40, 0) || me.gametype === 0 && Misc.checkQuest(26, 0)) {
		D2Bot.printToConsole('SoloLeveling: ' + level + ' difficulty completed. Character Level: ' + me.charlvl + '. Running script again!');
	} else {
		D2Bot.printToConsole('SoloLeveling: run completed. Character Level: ' + me.charlvl + '. Running script again!');
	}

	scriptBroadcast('quit');

	return true;
}

// Start Global Functions
if (!isIncluded("common/Town.js")) {
	include("common/Town.js");
}

if (!isIncluded("common/Pather.js")) {
	include("common/Pather.js");
}

if (!isIncluded("common/Misc.js")) {
	include("common/Misc.js");
}

if (!isIncluded("NTItemParser.dbl")) {
	include("NTItemParser.dbl");
}

// Global variables
var merc, mercId = [],
	levelcap = [40, 70, 100][me.diff];

// Character Respecialization Variables
// ClassLevel = ["Amazon", "Sorceress", "Necromancer", "Paladin", "Barbarian", "Druid", "Assassin"][me.classid];
const respecOne = [ 0, 27, 26, 25, 0, 0, 0][me.classid];
const respecTwo = [ 0, 85, 85, 85, 0, 0, 0][me.classid];

// Customized Functions
Town.townTasks = function () {
	if (!me.inTown) {
		Town.goToTown();
	}

	let prevTown;

	switch (me.area) {
	case 1:
		prevTown = 1;

		break;
	case 40:
		prevTown = 40;

		break;
	case 75:
		prevTown = 75;

		break;
	case 103:
		prevTown = 103;

		break;
	case 109:
		prevTown = 109;

		break;
	}

	Attack.weaponSwitch(Attack.getPrimarySlot());
	this.unfinishedQuests();
	Cubing.doCubing();
	Runewords.makeRunewords();
	Item.autoEquip();
	this.equipSWAP();
	Misc.equipMerc();
	this.stash();
	this.heal();
	this.identify();
	this.clearInventory();
	this.buyPotions();
	this.fillTome(518);
	this.shopItems();
	this.buyKeys();
	this.repair(true);
	this.shopItems();
	this.clearInventory();
	this.gamble();
	this.reviveMerc();
	Misc.hireMerc();
	Misc.equipMerc();
	Item.autoEquip();
	this.clearJunk();
	this.organizeStash();
	Town.stash();
	Town.organizeInventory();
	this.characterRespec();

	if ((me.classid !== 1 || me.classid === 1 && !me.getSkill(54, 0)) && (me.area === 40 || me.area === 75)) {
		Town.buyPots(8, "Stamina");
		Town.drinkPots();
	}

	if (me.inTown && me.area !== prevTown) {
		Pather.useWaypoint(prevTown);
	}

	Config.NoTele = me.diff === 0 && me.gold < 10000 ? true : me.diff !== 0 && me.gold < 50000 ? true : false;
	Config.Dodge = me.classid === 1 ? !Config.NoTele : false;

	return true;
};

Town.doChores = function (repair = false) {
	if (!me.inTown) {
		this.goToTown();
	}

	let i,
		cancelFlags = [0x01, 0x02, 0x04, 0x08, 0x14, 0x16, 0x0c, 0x0f, 0x19, 0x1a];

	Attack.weaponSwitch(Attack.getPrimarySlot());
	Cubing.doCubing();
	Runewords.makeRunewords();
	Item.autoEquip();
	this.equipSWAP();
	Misc.equipMerc();
	this.stash();
	this.heal();
	this.identify();
	this.clearInventory();
	this.buyPotions();
	this.fillTome(518);

	if (Config.FieldID) {
		this.fillTome(519);
	}

	this.shopItems();
	this.buyKeys();
	this.repair(repair);
	this.shopItems();
	this.clearInventory();
	this.gamble();
	this.reviveMerc();
	Misc.equipMerc();
	Item.autoEquip();
	this.stash();
	this.clearScrolls();
	this.characterRespec();

	for (i = 0; i < cancelFlags.length; i += 1) {
		if (getUIFlag(cancelFlags[i])) {
			delay(500 + me.ping);
			me.cancel();

			break;
		}
	}

	me.cancel();
	Config.NoTele = me.diff === 0 && me.gold < 10000 ? true : me.diff !== 0 && me.gold < 50000 ? true : false;
	Config.Dodge = me.classid === 1 ? !Config.NoTele : false;

	return true;
};

Town.buyPotions = function () {
	let TPtomes = me.getItem(518);

	if (!TPtomes) { // no town portal book
		return false;
	}

	var i, j, npc, useShift, col, beltSize, pot,
		needPots = false,
		needBuffer = true,
		buffer = {
			hp: 0,
			mp: 0
		};

	beltSize = Storage.BeltSize();
	col = this.checkColumns(beltSize);

	if (Config.HPBuffer > 0 || Config.MPBuffer > 0) {
		pot = me.getItem(-1, 0);

		if (pot) {
			do {
				if (pot.location === 3) {
					switch (pot.itemType) {
					case 76:
						buffer.hp += 1;

						break;
					case 77:
						buffer.mp += 1;

						break;
					}
				}
			} while (pot.getNext());
		}
	}

	for (i = 0; i < 4; i += 1) {
		if (["hp", "mp"].indexOf(Config.BeltColumn[i]) > -1 && col[i] > (beltSize - Math.min(Config.MinColumn[i], beltSize))) {
			needPots = true;
		}
	}

	if (buffer.mp < Config.MPBuffer || buffer.hp < Config.HPBuffer) {
		for (i = 0; i < 4; i += 1) {
			if (col[i] >= beltSize && (!needPots || Config.BeltColumn[i] === "rv")) {
				needBuffer = false;

				break;
			}
		}
	}

	if (buffer.mp >= Config.MPBuffer && buffer.hp >= Config.HPBuffer) {
		needBuffer = false;
	}

	if (!needPots && !needBuffer) {
		return true;
	}

	if (me.diff === 0 && Pather.accessToAct(4) && me.act < 4) {
		this.goToTown(4);
	}

	npc = this.initNPC("Shop", "buyPotions");

	if (!npc) {
		return false;
	}

	for (i = 0; i < 4; i += 1) {
		if (col[i] > 0) {
			useShift = this.shiftCheck(col, beltSize);
			pot = this.getPotion(npc, Config.BeltColumn[i]);

			if (pot) {
				if (useShift) {
					pot.buy(true);
				} else {
					for (j = 0; j < col[i]; j += 1) {
						pot.buy(false);
					}
				}
			}
		}

		col = this.checkColumns(beltSize);
	}

	if (needBuffer && buffer.hp < Config.HPBuffer) {
		for (i = 0; i < Config.HPBuffer - buffer.hp; i += 1) {
			pot = this.getPotion(npc, "hp");

			if (Storage.Inventory.CanFit(pot)) {
				pot.buy(false);
			}
		}
	}

	if (needBuffer && buffer.mp < Config.MPBuffer) {
		for (i = 0; i < Config.MPBuffer - buffer.mp; i += 1) {
			pot = this.getPotion(npc, "mp");

			if (Storage.Inventory.CanFit(pot)) {
				pot.buy(false);
			}
		}
	}

	return true;
};

Town.unfinishedQuests = function () {
	//Radament skill book
	let book = me.getItem(552);

	if (book) {
		if (book.location === 7) {
			this.openStash();
			delay(300 + me.ping);
		}

		if (!book.interact()) {
			clickItem(1, book);
		}

		if (book.interact() || clickItem(1, book)) {
			print('ÿc9SoloLevelingÿc0: used Radament skill book');
		}
	}

	// golden bird
	if (me.getItem(546)) { // golden bird
		Town.goToTown(3);
		Town.npcInteract("meshif");
	}

	if (me.getItem(547)) { // ashes
		Town.goToTown(3);
		Town.npcInteract("alkor");
	}

	if (me.getItem(545)) { // potion of life
		let pol = me.getItem(545);

		if (pol.location === 7) {
			this.openStash();
			delay(300 + me.ping);
		}

		if (!pol.interact()) {
			clickItem(1, pol);
		}

		if (pol.interact() || clickItem(1, pol)) {
			print('ÿc9SoloLevelingÿc0: used potion of life');
		}
	}

	//LamEssen's Tome
	let tome = me.getItem(548);

	if (tome) {
		if (tome.location === 7) {
			Town.move('stash');
			Storage.Inventory.MoveTo(tome);
			delay(300 + me.ping);
		}

		Town.goToTown(3);
		Town.npcInteract("alkor");
		print('ÿc9SoloLevelingÿc0: LamEssen Tome completed');
	}

	//remove Khalim's Will if quest not completed and restarting run.
	let kw = me.getItem(174);

	if (kw) {
		if (Item.getEquippedItem(4).classid === 174) {

			Town.clearInventory();
			delay(500 + me.ping * 2);

			clickItem(4, 4); //remove khalim's will
			delay(500 + me.ping * 2);

			let cursorItem = getUnit(100);

			if (cursorItem) { // place in inventory
				Storage.Inventory.MoveTo(cursorItem);
			}

			Misc.stashQuestItem(174);
			print('ÿc9SoloLevelingÿc0: removed khalims will');
		}
	}

	// drop hellforge hammer at startup to avoid selling and d/c
	let hammer = me.getItem(90);

	if (hammer) {
		Town.goToTown(1);

		if (hammer.location === 7) {
			Town.move('stash');
			Storage.Inventory.MoveTo(hammer);
			delay(300 + me.ping);
			me.cancel();
		}

		hammer.drop();
	}

	// anya scroll of resistance
	let scroll = me.getItem(646);

	if (scroll) {
		if (scroll.location === 7) {
			this.openStash();
			delay(250 + me.ping);
		}

		if (!scroll.interact()) {
			clickItem(1, scroll);
		}

		if (scroll.interact() || clickItem(1, scroll)) {
			print('ÿc9SoloLevelingÿc0: used scroll of resistance');
		}
	}

	return true;
};

Town.equipSWAP = function () {
	let spirit = me.getItems()
		.filter(item =>
			item.getPrefix(20635) // The spirit shield prefix
			&& item.classid !== 29 // no broad sword
			&& item.classid !== 30 // no crystal sword
			&& item.classid !== 31 // no long sword
			&& [3, 6, 7].indexOf(item.location) > -1 // Needs to be on either of these locations
		)
		.sort((a, b) => a.location - b.location) // Sort on location, low to high. So if you have one already equiped, it comes first
		.first();

	if (spirit) {
		if (Item.getEquippedItem(12).tier < 0) {
			Town.move('stash');
			Storage.Inventory.MoveTo(spirit);
			Attack.weaponSwitch(); // switch to slot 2
			spirit.equip();
			Attack.weaponSwitch();
		}
	}

	let cta = me.getItems()
		.filter(item =>
			item.getPrefix(20519) // The call to arms prefix
			&& [1, 3, 6, 7].indexOf(item.location) > -1 // Needs to be on one these locations
		)
		.sort((a, b) => a.location - b.location) // Sort on location, low to high. So if you have one already equiped, it comes first
		.first();

	if (cta) {
		if (cta.location === 1) {
			return true;
		} else {
			Town.move('stash');
			Storage.Inventory.MoveTo(cta);
			Attack.weaponSwitch(); // switch to slot 2
			cta.equip();
			Attack.weaponSwitch();
		}
	}

	return true;
};

Town.buyPots = function (quantity, type) {
	let npc, jugs;

	switch (me.area) {
	case 1:
		Town.move(NPC.Akara);
		npc = getUnit(1, NPC.Akara);
		break;
	case 40:
		Town.move(NPC.Lysander);
		npc = getUnit(1, NPC.Lysander);
		break;
	case 75:
		Town.move(NPC.Alkor);
		npc = getUnit(1, NPC.Alkor);
		break;
	case 103:
		Town.move(NPC.Jamella);
		npc = getUnit(1, NPC.Jamella);
		break;
	case 109:
		Town.move(NPC.Malah);
		npc = getUnit(1, NPC.Malah);
		break;
	}

	if (!npc || !npc.openMenu()) {
		return false;
	}

	Misc.useMenu(0x0D44);

	switch (type) {
	case "Thawing":
		jugs = npc.getItem("wms");

		break;
	case "Stamina":
		jugs = npc.getItem("vps");

		break;
	case "Antidote":
		jugs = npc.getItem("yps");

		break;
	}

	print('ÿc9SoloLevelingÿc0: buying ' + quantity + ' ' + type + ' Potions');

	for (let totalspecialpotions = 0; totalspecialpotions < quantity; totalspecialpotions++) {

		if (jugs) {
			jugs.buy(false);
		}
	}

	me.cancel();

	return true;
};

Town.drinkPots = function () {
	let classIds = ["yps", "wms", "vps", ];

	for (let totalpots = 0; totalpots < classIds.length; totalpots++) {
		let chugs = me.getItem(classIds[totalpots]);

		if (chugs) {
			do {
				delay(300 + me.ping);
				chugs.interact();
			} while (chugs.getNext());
		}
	}

	print('ÿc9SoloLevelingÿc0: drank Special Potions');

	return true;
};

Town.organizeStash = function () {
	if (Storage.Stash.UsedSpacePercent() < 85) {
		return true;
	}

	Town.move('stash');
	let stashFit = { sizex: 6, sizey: 8 };

	if (!Storage.Stash.CanFit(stashFit)) {
		me.cancel();
		me.overhead('organize stash');

		let sorted, items = me.findItems(-1, 0, 7);

		items.sort(function (a, b) {
			return (b.sizex * b.sizey - a.sizex * a.sizey);
		});

		for (sorted = 0; sorted < items.length; sorted += 1) {
			Storage.Stash.MoveTo(items[sorted]);
		}
	}

	return true;
};

Town.organizeInventory = function () {
	let invfit = { sizex: 4, sizey: 4 };

	if (!Storage.Inventory.CanFit(invfit)) {
		me.cancel();
		me.overhead('organize inventory');

		let inv, items = me.findItems(-1, 0, 3);

		items.sort(function (a, b) {
			return (b.sizex * b.sizey - a.sizex * a.sizey);
		});

		for (inv = 0; inv < items.length; inv += 1) {
			Storage.Inventory.MoveTo(items[inv]);
		}
	}

	return true;
};

Town.clearJunk = function () {
	let junk = me.getItems();

	for (let count = 0; count < junk.length; count += 1) {
		// unwanted items runes / bad bases
		if ((junk[count].location === 7 || junk[count].location === 3) && // stash or inventory
		(Pickit.checkItem(junk[count]).result === 0 || Pickit.checkItem(junk[count]).result === 4) && // drop unwanted
		!(junk[count].classid >= 630 && junk[count].classid <= 642) && // Don't throw good runes
		!Cubing.keepItem(junk[count]) && // Don't throw cubing ingredients
		!Runewords.keepItem(junk[count]) && // Don't throw runeword ingredients
		!CraftingSystem.keepItem(junk[count]) // Don't throw crafting system ingredients
		) {
			if (junk[count].drop()) {
				me.overhead('cleared junk');
				delay(250 + me.ping);
			}
		}

		// unwanted tier'ed autoequip
		let stashtier = NTIP.GetTier(junk[count]);
		let bodyLoc = Item.getBodyLoc(junk[count]);

		if (stashtier > 0 && bodyLoc) {
			for (let bodypart = 0; bodypart < bodyLoc.length; bodypart += 1) {
				let equippedTier = Item.getEquippedItem(bodyLoc[bodypart]).tier;

				if ((junk[count].location === 7 || junk[count].location === 3) && // stash or inventory
					stashtier <= equippedTier // drop same tier or less items
				) {
					if (junk[count].drop()) {
						me.overhead('cleared autoequip junk');
						delay(250 + me.ping);
					}
				}
			}
		}

		// unwanted tier'ed merc autoequip
		if (getMercFix()) {
			let merctier = NTIP.GetMercTier(junk[count]);
			let mercbodyLoc = Item.getBodyLocMerc(junk[count]);

			if (merctier > 0 && mercbodyLoc) {
				for (let mercbodypart = 0; mercbodypart < mercbodyLoc.length; mercbodypart += 1) {
					let mercequippedTier = Item.getEquippedItemMerc(mercbodyLoc[mercbodypart]).tier;

					if ((junk[count].location === 7 || junk[count].location === 3) && // stash or inventory
						merctier <= mercequippedTier // drop same merctier or less items
					) {
						if (junk[count].drop()) {
							me.overhead('cleared merc junk');
							delay(250 + me.ping);
						}
					}
				}
			}
		}
	}

	return true;
};

Town.characterRespec = function () {// Akara reset for build change
	if (Misc.checkQuest(41, 0)) {
		return true;
	}

	if (me.charlvl === respecOne || me.charlvl === respecTwo) {
		Precast.doPrecast(true);
		Town.goToTown(1);
		Town.npcInteract("akara");
		delay(10 + me.ping * 2);

		if (!Misc.useMenu(0x2ba0) || !Misc.useMenu(3401)) {
			return false;
		}

		delay(1000 + me.ping * 2);

		Town.clearBelt();
		me.overhead('time to respec');

		delay(250 + me.ping);

		let script = getScript("default.dbj");
		script.stop();
		load("default.dbj");
	}

	return true;

};

Town.npcInteract = function (name) {
	let npc;

	if (!me.inTown) {
		Town.goToTown();
	}

	switch (name) {
	case "akara":
		Town.move(NPC.Akara);
		npc = getUnit(1, NPC.Akara);

		break;
	case "warriv":
		Town.move(NPC.Warriv);
		npc = getUnit(1, NPC.Warriv);

		break;
	case "meshif":
		Town.move(NPC.Meshif);
		npc = getUnit(1, NPC.Meshif);

		break;
	case "tyrael":
		Town.move(NPC.Tyrael);
		npc = getUnit(1, NPC.Tyrael);

		break;
	case "jerhyn":
		Town.move(NPC.Jerhyn);
		npc = getUnit(1, NPC.Jerhyn);

		if (!npc) {
			me.cancel();
			Pather.moveTo(5166, 5206);
		}

		break;
	case "alkor":
		Town.move(NPC.Alkor);
		npc = getUnit(1, NPC.Alkor);

		break;
	case "atma":
		Town.move(NPC.Atma);
		npc = getUnit(1, NPC.Atma);

		break;
	case "kashya":
		Town.move(NPC.Kashya);
		npc = getUnit(1, NPC.Kashya);

		break;
	case "drognan":
		Town.move(NPC.Drognan);
		npc = getUnit(1, NPC.Drognan);

		break;
	case "cain":
		Town.move(NPC.Cain);
		npc = getUnit(1, NPC.Cain);

		break;
	case "qual_kehk":
		Town.move(NPC.Qual_Kehk);
		npc = getUnit(1, NPC.Qual_Kehk);

		break;
	case "malah":
		Town.move(NPC.Malah);
		npc = getUnit(1, NPC.Malah);

		break;
	case "anya":
		Town.move(NPC.Anya);
		npc = getUnit(1, NPC.Anya);

		break;
	}

	Packet.flash(me.gid);
	delay(1 + me.ping * 2);

	if (!npc || !npc.openMenu()) {
		me.cancel();
	}

	Packet.flash(me.gid);

	return true;
};

Misc.gamePacket = function (bytes) {// Merc hiring and golden bird qeust
	let id;

	switch (bytes[0]) {
	case 0x4e: // merc list packet
		id = (bytes[2] << 8) + bytes[1];

		if (mercId.indexOf(id) !== -1) {
			mercId.length = 0;
		}

		mercId.push(id);
		break;
	case 0x5d: // golden bird quest
		if (!Misc.checkQuest(20, 0)) {
			let jadefigurine = getUnit(4, 546);

			if (jadefigurine) {
				Pickit.pickItem(jadefigurine);
			}

			if (me.getItem(546)) {
				print("ÿc9SoloLevelingÿc0: starting jade figurine");
				me.overhead('jade figurine');

				if (!me.inTown) {
					Town.goToTown();
				}

				Town.unfinishedQuests();
				Town.heal();
				Town.move("portalspot");
				Pather.usePortal(null, me.name);
			}
		}

		break;
	}
};

Misc.hireMerc = function () {
	//  classorder =   ["Amazon", "Sorceress", "Necromancer", "Paladin", "Barbarian", "Druid", "Assassin"][me.classid];
	let mercAuraName = ["Holy Freeze", "Holy Freeze", "Might", "Holy Freeze", "Defiance", "Blessed Aim", "Holy Freeze"][me.classid];
	let mercAuraWanted = [114, 114, 98, 114, 104, 108, 114][me.classid];
	let tempMercAura = 99; //prayer only one not used -- replaciing merc will bug out if changed.
	// mercdiff = ["Nightmare", "Nightmare", "Nightmare", "Nightmare", "Normal", "Normal", "Nightmare"][me.classid];
	let mercDiff = [1, 1, 1, 1, 0, 0, 1][me.classid];
	let mercAura = [[104, 99, 108], [103, 98, 114]];

	function getmercAura () {
		merc = getMercFix();

		if (!merc) {
			return null;
		}

		for (let range = 0; range < mercAura.length; range++) {
			if (Array.isArray(mercAura[range])) {
				for (let selection = 0; selection < mercAura[range].length; selection++) {
					if (merc.getSkill(mercAura[range][selection], 1)) {
						return mercAura[range][selection];
					}
				}
			} else if (merc.getSkill(mercAura[range], 1)) {
				return mercAura[range];
			}
		}

		return true;
	}

	if (me.gametype === 0 || !Pather.accessToAct(2) || me.diff === 2) { // don't hire if classic, no access to act 2, or if in hell
		return true;
	}

	let mercSelected = getmercAura();

	if (mercSelected === mercAuraWanted || me.diff === 0 && mercSelected === tempMercAura) {
		return true;
	}

	if (me.diff !== mercDiff && me.diff === 0 && me.gold < 25000 || me.diff === mercDiff && (me.diff === 0 && me.gold < 25000 || me.gold < 100000)) {
		print('ÿc9SoloLevelingÿc0: not enough gold to hire merc.');

		return true;
	}

	Pather.getWP(me.area);
	me.overhead('getting merc');
	Town.goToTown(2);
	Pather.moveTo(5041, 5055);
	Town.move(NPC.Greiz);

	if (mercSelected !== mercAuraWanted && me.diff === mercDiff || mercSelected !== tempMercAura && me.diff === 0) { // replace merc
		me.overhead('replacing merc');
		Item.removeItemsMerc(); // strip temp merc gear
		delay(500 + me.ping);
	}

	let greiz = getUnit(1, NPC.Greiz);

	if (greiz && greiz.openMenu()) {
		while (mercId.length > 0) {
			Misc.useMenu(0x0D45);
			sendPacket(1, 0x36, 4, greiz.gid, 4, mercId[0]);
			delay(500 + me.ping);
			merc = getMercFix();

			if (me.diff === mercDiff) {
				if (merc.getSkill(mercAuraWanted, 1)) {
					print('ÿc9SoloLevelingÿc0: ' + mercAuraName + ' merc hired.');

					break;
				}
			}

			if (me.diff !== mercDiff && me.diff === 0) {
				if (merc.getSkill(tempMercAura, 1)) {
					print('ÿc9SoloLevelingÿc0: prayer merc hired.');

					break;
				}
			}
		}
	}

	if (me.diff !== mercDiff && me.diff === 0 && !merc.getSkill(tempMercAura, 1)) {
		print('ÿc9SoloLevelingÿc0: temp merc not available. will try later');
	}

	if (me.diff === mercDiff && !merc.getSkill(mercAuraWanted, 1)) {
		print('ÿc9SoloLevelingÿc0: ' + mercAuraName + ' merc not available. try later.');
	}

	Misc.setupMerc();
	Misc.equipMerc();
	Pickit.pickItems(); // safetycheck for merc items on ground
	Misc.equipMerc();

	return true;
};

Misc.setupMerc = function () {
	if (me.gametype === 0) {
		return true;
	}

	if (!getMercFix()) {
		return true;
	}

	me.overhead('Pickit: added merc items');
	print("ÿc9SoloLevelingÿc0: merc items loaded to Pickit");

	var mercHelm = [
		"([type] == circlet || [type] == helm) # [enhanceddefense] >= 100 && [lifeleech] >= 8 && [ias] >= 20 # [Merctier] == 18",
		"([type] == circlet || [type] == helm) # [enhanceddefense] >= 100 && [lifeleech] >= 6 && [magicdamagereduction] >= 10 # [Merctier] == 17",
		"([type] == circlet || [type] == helm) # [enhanceddefense] >= 120 && [fhr] >= 30 && [ItemCrushingBlow] >= 35 # [Merctier] == 16",
		"([type] == circlet || [type] == helm) # [enhanceddefense] >= 200 && [lifeleech] >= 5 && [fhr] >= 10 && [ias] >= 10 # [Merctier] == 15",
		"([type] == circlet || [type] == helm) # [enhanceddefense] >= 160 && [lifeleech] >= 9 && [fireresist] >= 33 # [Merctier] == 14",
		"([type] == circlet || [type] == helm) # [enhanceddefense] >= 160 && [lightresist] >= 20 && [coldresist] >= 20 && [fireresist] >= 20 # [Merctier] == 13",
		"([type] == circlet || [type] == helm) # [lifeleech] >= 10 && [lightresist] >= 15 && [coldresist] >= 15 && [fireresist] >= 15 # [Merctier] == 12",
		"([type] == circlet || [type] == helm) # [lifeleech] >= 5 # [Merctier] == 11",
		"([type] == helm || [type] == circlet) && [flag] != ethereal && [flag] == runeword # [defense] >= 120 && [LightResist] >= 25 # [Merctier] == 10",
		"([type] == helm || [type] == circlet) && [flag] != ethereal && [flag] == runeword # [defense] >= 110 && [LightResist] >= 25 # [Merctier] == 9",
		"([type] == helm || [type] == circlet) && [flag] != ethereal && [flag] == runeword # [defense] >= 100 && [LightResist] >= 25 # [Merctier] == 8",
		"([type] == helm || [type] == circlet) && [flag] != ethereal && [flag] == runeword # [defense] >= 90 && [LightResist] >= 25 # [Merctier] == 7",
		"([type] == helm || [type] == circlet) && [flag] != ethereal && [flag] == runeword # [defense] >= 80 && [LightResist] >= 25 # [Merctier] == 6",
		"([type] == helm || [type] == circlet) && [flag] != ethereal && [flag] == runeword # [defense] >= 70 && [LightResist] >= 25 # [Merctier] == 5",
		"([type] == helm || [type] == circlet) && [flag] != ethereal && [flag] == runeword # [defense] >= 60 && [LightResist] >= 25 # [Merctier] == 4",
		"([type] == helm || [type] == circlet) && [flag] != ethereal && [flag] == runeword # [defense] >= 50 && [LightResist] >= 25 # [Merctier] == 3",
		"([type] == helm || [type] == circlet) && [flag] != ethereal && [flag] == runeword # [defense] >= 30 && [LightResist] >= 25 # [Merctier] == 2",
		"([type] == helm || [type] == circlet) && [flag] != ethereal && [flag] == runeword # [defense] >= 20 && [LightResist] >= 25 # [Merctier] == 1",
	];
	NTIP.arrayLooping(mercHelm);

	var mercArmor = [
		"[Type] == armor && [flag] == runeword # [defense] >= 1800 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 62",
		"[Type] == armor && [flag] == runeword # [defense] >= 1775 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 61",
		"[Type] == armor && [flag] == runeword # [defense] >= 1750 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 60",
		"[Type] == armor && [flag] == runeword # [defense] >= 1725 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 59",
		"[Type] == armor && [flag] == runeword # [defense] >= 1700 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 58",
		"[Type] == armor && [flag] == runeword # [defense] >= 1675 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 56",
		"[Type] == armor && [flag] == runeword # [defense] >= 1650 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 55",
		"[Type] == armor && [flag] == runeword # [defense] >= 1625 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 54",
		"[Type] == armor && [flag] == runeword # [defense] >= 1600 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 53",
		"[Type] == armor && [flag] == runeword # [defense] >= 1575 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 52",
		"[Type] == armor && [flag] == runeword # [defense] >= 1550 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 51",
		"[Type] == armor && [flag] == runeword # [defense] >= 1525 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 50",
		"[Type] == armor && [flag] == runeword # [defense] >= 1500 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 49",
		"[Type] == armor && [flag] == runeword # [defense] >= 1450 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 48",
		"[Type] == armor && [flag] == runeword # [defense] >= 1400 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 47",
		"[Type] == armor && [flag] == runeword # [defense] >= 1300 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 46",
		"[Type] == armor && [flag] == runeword # [defense] >= 1200 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 45",
		"[Type] == armor && [flag] == runeword # [defense] >= 1100 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 44",
		"[Type] == armor && [flag] == runeword # [defense] >= 1000 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 43",
		"[Type] == armor && [flag] == runeword # [defense] >= 800 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 42",
		"[Type] == armor && [flag] == runeword # [defense] >= 775 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 41",
		"[Type] == armor && [flag] == runeword # [defense] >= 750 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 40",
		"[Type] == armor && [flag] == runeword # [defense] >= 725 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 39",
		"[Type] == armor && [flag] == runeword # [defense] >= 700 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 38",
		"[Type] == armor && [flag] == runeword # [defense] >= 675 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 37",
		"[Type] == armor && [flag] == runeword # [defense] >= 650 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 36",
		"[Type] == armor && [flag] == runeword # [defense] >= 625 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 35",
		"[Type] == armor && [flag] == runeword # [defense] >= 600 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 34",
		"[Type] == armor && [flag] == runeword # [defense] >= 575 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 33",
		"[Type] == armor && [flag] == runeword # [defense] >= 550 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 32",
		"[Type] == armor && [flag] == runeword # [defense] >= 525 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 31",
		"[Type] == armor && [flag] == runeword # [defense] >= 500 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 30",
		"[Type] == armor && [flag] == runeword # [defense] >= 475 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 29",
		"[Type] == armor && [flag] == runeword # [defense] >= 450 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 28",
		"[Type] == armor && [flag] == runeword # [defense] >= 425 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 27",
		"[Type] == armor && [flag] == runeword # [defense] >= 400 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 26",
		"[Type] == armor && [flag] == runeword # [defense] >= 375 && [ias] == 45 && [coldresist] == 30 # [Merctier] == 25",
		"[Type] == armor && [flag] == runeword # [ias] == 45 && [coldresist] == 30 # [Merctier] == 24",
		"[Name] == KrakenShell && [Quality] == Unique # [enhanceddefense] >= 170 && [strength] >= 40 # [Merctier] == 23",
		"([Name] == Cuirass || [Name] == MeshArmor) && [Quality] == Unique # [enhanceddefense] >=160 && ([maxhp] == 60 || [coldresist] == 50) # [Merctier] == 22",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 900 && [fireresist] == 50 # [Merctier] == 21",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 875 && [fireresist] == 50 # [Merctier] == 20",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 850 && [fireresist] == 50 # [Merctier] == 19",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 825 && [fireresist] == 50 # [Merctier] == 18",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 800 && [fireresist] == 50 # [Merctier] == 17",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 780 && [fireresist] == 50 # [Merctier] == 16",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 740 && [fireresist] == 50 # [Merctier] == 15",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 700 && [fireresist] == 50 # [Merctier] == 14",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 650 && [fireresist] == 50 # [Merctier] == 13",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 610 && [fireresist] == 50 # [Merctier] == 12",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 390 && [fireresist] == 50 # [Merctier] == 11",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 240 && [fireresist] == 50 # [Merctier] == 10",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 213 && [fireresist] == 50 # [Merctier] == 9",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 194 && [fireresist] == 50 # [Merctier] == 8",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 178 && [fireresist] == 50 # [Merctier] == 7",
		"[type] == armor # [enhanceddefense] >= 150 && [ias] >= 15 && [fhr] >= 15 && [dexterity] >= 15 # [Merctier] == 6",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 111 && [frw] == 25 && [fcr] == 25 # [Merctier] == 5",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 102 && [frw] == 25 && [fcr] == 25 # [Merctier] == 4",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 90 && [frw] == 25 && [fcr] == 25 # [Merctier] == 3",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [defense] >= 65 && [frw] == 25 && [fcr] == 25 # [Merctier] == 2",
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [frw] == 25 && [fcr] == 25 # [Merctier] == 1",
	];
	NTIP.arrayLooping(mercArmor);

	var mercWeapon = [
		"[type] == polearm && [flag] == runeword && [flag] == ethereal # [meditationaura] >= 17 # [Merctier] == 22",
		"[name] == thresher && [quality] == unique # [enhanceddamage] >= 190 && [lifeleech] >= 11 # [Merctier] == 21",
		"[type] == polearm && [flag] == runeword # [meditationaura] >= 17 # [Merctier] == 20",
		"[type] == polearm && [flag] == runeword # [meditationaura] >= 16 # [Merctier] == 19",
		"[type] == polearm && [flag] == runeword # [meditationaura] >= 15 # [Merctier] == 18",
		"[type] == polearm && [flag] == runeword # [meditationaura] >= 14 # [Merctier] == 17",
		"[type] == polearm && [flag] == runeword # [meditationaura] >= 13 # [Merctier] == 16",
		"[type] == polearm && [flag] == runeword # [meditationaura] >= 12 # [Merctier] == 15",
		"[name] == yari && [quality] == unique # [enhanceddamage] >= 160 && [itemcrushingblow] >= 45 # [Merctier] == 14",
		"[name] == fuscina && [quality] == unique # [enhanceddamage] >= 140 && [fireresist] >= 50 # [Merctier] == 13",
		"[name] == halberd && [flag] == runeword # [lifeleech] >= 7 # [Merctier] == 12",
		"[name] == poleaxe && [flag] == runeword # [lifeleech] >= 7 # [Merctier] == 11",
		"[name] == warscythe && [flag] == runeword # [lifeleech] >= 7 # [Merctier] == 10",
		"[name] == scythe && [flag] == runeword # [lifeleech] >= 7 # [Merctier] == 9",
		"[name] == voulge && [flag] == runeword # [lifeleech] >= 7 # [Merctier] == 8",
	];
	NTIP.arrayLooping(mercWeapon);

	var mercPrep = [
		"[Type] == Polearm # [EnhancedDamage] >= 65 && [LifeLeech] >= 7 # [MaxQuantity] == 1 && [Merctier] == 7",
		"[Type] == Polearm # [EnhancedDamage] >= 40 && [LifeLeech] >= 7 # [MaxQuantity] == 1 && [Merctier] == 6",
		"[Type] == Polearm # [LifeLeech] >= 7 # [MaxQuantity] == 1 && [Merctier] == 5",
		"[Type] == Polearm # [LifeLeech] >= 6 # [MaxQuantity] == 1 && [Merctier] == 4",
		"[Type] == Polearm # [LifeLeech] >= 6 # [MaxQuantity] == 1 && [Merctier] == 3",
		"[Type] == Polearm # [lifeleech] >= 4 # [MaxQuantity] == 1 && [Merctier] == 2",
		"[Type] == Polearm # [lifeleech] >= 3 # [MaxQuantity] == 1 && [Merctier] == 1",
	];

	if (me.diff === 0) {
		NTIP.arrayLooping(mercPrep);
	}

	return true;
};

Misc.equipMerc = function () {
	if (me.gametype === 1) {
		Item.autoEquipMerc();
	}

	return true;
};

Misc.checkQuest = function (id, state) {
	sendPacket(1, 0x40);
	delay(500 + me.ping);

	return me.getQuest(id, state);
};

Misc.openChests = function (range) {
	var unit,
		unitList = [],
		containers = [ "loose rock", "hidden stash", "loose boulder", "chest", "chest3", "armorstand", "holeanim", "weaponrack"],
		pita = ["barrel", "largeurn", "jar3", "jar2", "jar1", "urn"]; // pain in the ass

	if (!range) {
		range = 15;
	}

	// Testing all container code
	if (Config.OpenChests === 2) {
		containers = [
			"chest", "loose rock", "hidden stash", "loose boulder", "corpseonstick", "casket", "armorstand", "weaponrack", "barrel", "holeanim", "tomb2", "tomb3", "roguecorpse", "ratnest", "corpse", "goo pile", "largeurn", "urn", "chest3", "jug", "skeleton", "guardcorpse", "sarcophagus", "object2", "cocoon", "basket", "stash", "hollow log", "hungskeleton", "pillar", "skullpile", "skull pile", "jar3", "jar2", "jar1", "bonechest", "woodchestl", "woodchestr", "barrel wilderness", "burialchestr", "burialchestl", "explodingchest", "chestl", "chestr", "groundtomb", "icecavejar1", "icecavejar2", "icecavejar3", "icecavejar4", "deadperson", "deadperson2", "evilurn", "tomb1l", "tomb3l", "groundtombl"
		];
	}

	unit = getUnit(2);

	if (unit) {
		do {
			if (unit.name && unit.mode === 0 && getDistance(me.x, me.y, unit.x, unit.y) <= range && containers.indexOf(unit.name.toLowerCase()) > -1) {
				unitList.push(copyUnit(unit));
			}

			if (unit.name && getDistance(me.x, me.y, unit.x, unit.y) <= 2 && pita.indexOf(unit.name.toLowerCase()) > -1) {
				unitList.push(copyUnit(unit));
			}

		} while (unit.getNext());
	}

	while (unitList.length > 0) {
		unitList.sort(Sort.units);
		unit = unitList.shift();

		if (unit && (Pather.useTeleport() || !checkCollision(me, unit, 0x4)) && this.openChest(unit)) {
			Pickit.pickItems();
		}
	}

	return true;
};

Misc.cubeQuestItems = function (outcome, ...classids) {
	if (me.getItem(outcome) || me.act === 2 && Misc.checkQuest(10, 0) || me.act === 3 && Misc.checkQuest(18, 0)) {
		return true;
	}

	if (!me.inTown) {
		Town.goToTown();
	}

	if (outcome === 91) {
		me.overhead('cubing staff');
	} else {
		me.overhead('cubing flail');
	}

	Town.clearInventory();
	Town.openStash();

	if (me.findItems(-1, -1, 6)) {
		Cubing.emptyCube();
	}

	let cubingItem;

	for (let classid of classids) {
		cubingItem = me.getItem(classid);

		if (!cubingItem || !Storage.Cube.MoveTo(cubingItem)) {
			return false;
		}
	}

	while (!Cubing.openCube()) {
		delay(1 + me.ping * 2);
		Packet.flash(me.gid);
	}

	let wantedItem;
	let tick = getTickCount();

	while (getTickCount() - tick < 5000) {
		sendPacket(1, 0x4f, 2, 0x18, 2, 0, 2, 0);
		delay(50 + me.ping);

		wantedItem = me.getItem(outcome);

		if (wantedItem) {
			Storage.Inventory.MoveTo(wantedItem);

			if (Storage.Stash.CanFit(wantedItem)) {
				Storage.Stash.MoveTo(wantedItem);
			}

			break;
		}
	}

	for (let i = 0; i < 15; i += 1) {
		sendPacket(1, 0x4f, 2, 0x17, 2, 0, 2, 0); // close cube
		me.cancel();

		if (!getUIFlag(0x1A)) {
			break;
		}

		delay(50 + me.ping);
	}

	return me.getItem(outcome);
};

Misc.placeStaff = function () {
	let tick = getTickCount();
	let orifice = getUnit(2, 152);
	let hstaff = me.getItem(91);

	if (Misc.checkQuest(10, 0)) {
		return true;
	}

	if (!orifice) {
		return false;
	}

	if (hstaff) {
		if (hstaff.location === 7) {
			Town.goToTown();
			Storage.Inventory.MoveTo(hstaff);
			me.cancel();
			Pather.usePortal(null, me.name);
		}

		if (hstaff.location === 6) {
			Town.goToTown();
			Cubing.openCube();
			Storage.Inventory.MoveTo(hstaff);
			me.cancel();
			Pather.usePortal(null, me.name);
		}
	}

	Misc.openChest(orifice);

	if (!hstaff) {
		if (getTickCount() - tick < 500) {
			delay(500 + me.ping);
		}

		return false;
	}

	hstaff.toCursor();
	submitItem();
	delay(750 + me.ping);

	// unbug cursor
	let item = me.findItem(-1, 0, 3);

	if (item && item.toCursor()) {
		Storage.Inventory.MoveTo(item);
	}

	delay(750 + me.ping);

	return true;
};

Misc.tyraelTomb = function () {
	Pather.moveTo(22629, 15714);
	Pather.moveTo(22609, 15707);
	Pather.moveTo(22579, 15704);
	Pather.moveTo(22577, 15649, 10);
	Pather.moveTo(22577, 15609, 10);

	let tyrael = getUnit(1, NPC.Tyrael);

	if (!tyrael) {
		return false;
	}

	for (let talk = 0; talk < 3; talk += 1) {
		if (getDistance(me, tyrael) > 3) {
			Pather.moveToUnit(tyrael);
		}

		tyrael.interact();
		delay(1000 + me.ping);
		me.cancel();

		if (Pather.getPortal(null)) {
			me.cancel();
			break;
		}
	}

	if (!Pather.usePortal(null)) {
		Town.goToTown();
	}

	return true;
};

Misc.stashQuestItem = function (classid) {
	if (!me.getItem(classid)) {
		return false;
	}

	if (!me.inTown) {
		Town.goToTown();
	}

	let questItem = me.getItem(classid);
	Town.move("stash");
	Town.openStash();

	while (questItem.location !== 7) {
		Storage.Stash.MoveTo(questItem);
		delay(1 + me.ping);

		questItem = me.getItem(classid);
	}

	return true;
};

Misc.getQuestItem = function (classid, chestID) {
	if (me.getItem(classid)) {
		return true;
	}

	if (chestID !== undefined) {
		let chest = getUnit(2, chestID);

		if (!chest) {
			return false;
		}

		Misc.openChest(chest);
	}

	let questItem;
	let tick = getTickCount();

	while (getTickCount() - tick < 2000) {
		questItem = getUnit(4, classid);

		if (questItem) {
			break;
		}

		delay(50 + me.ping);
	}

	if (!Pickit.pickItem(questItem)) {
		Pickit.pickItems();
	}

	return me.getItem(classid);
};

Misc.equipQuestItem = function (item, loc) {
	let newitem = me.getItem(item);

	if (newitem) {
		if (newitem.location === 7) {
			Town.move("stash");
			delay(250 + me.ping);
			Town.openStash();
			Storage.Inventory.MoveTo(newitem);
			me.cancel();
		}

		if (!Item.equip(newitem, loc)) {
			Pickit.pickItems();
			print("ÿc9SoloLevelingÿc0: failed to equip item.(Misc.equipQuestItem)");
		}
	} else {
		print("ÿc9SoloLevelingÿc0: Lost item before trying to equip it. (Misc.equipQuestItem)");
	}

	if (me.itemoncursor) {
		let olditem = getUnit(100);

		if (olditem) {
			if (Storage.Inventory.CanFit(olditem)) {
				print("ÿc9SoloLevelingÿc0: Keeping weapon");

				Storage.Inventory.MoveTo(olditem);
			} else {
				me.cancel();
				print("ÿc9SoloLevelingÿc0: No room to keep weapon");

				olditem.drop();
			}
		}
	}

	delay(750 + me.ping);

	Pickit.pickItems();

	return true;
};

Misc.smashSomething = function (smashable) {
	let something, tool;

	switch (smashable) {
	case 404:
		something = getUnit(2, 404);
		tool = 174;

		break;
	case 376:
		something = getUnit(2, 376);
		tool = 90;

		break;
	}

	while (me.getItem(tool)) {
		Pather.moveToUnit(something, 0, 0, Config.ClearType, false);
		Skill.cast(0, 0, something);
		something.interact();

		delay(750 + me.ping);
	}

	return !me.getItem(tool);
};

NTIP.addLine = function (itemString) { //NTIP INJECTOR
	let info = {
		line: 1,
		file: "SoloLeveling",
		string: line
	};

	let line = NTIP.ParseLineInt(itemString, info);

	if (line) {
		NTIP_CheckList.push(line);
		stringArray.push(info);
	}

	return true;
};

NTIP.arrayLooping = function (arraytoloop) {
	for (let q = 0; q < arraytoloop.length; q += 1) {
		NTIP.addLine(arraytoloop[q]);
	}

	return true;
};

Pather.killMonsters = function (arg) { // summoner targeting provided by penguins0690
	var monList;

	if (Config.Countess.KillGhosts && [21, 22, 23, 24, 25].indexOf(me.area) > -1) {
		monList = Attack.getMob(38, 0, 30);

		if (monList) {
			Attack.clearList(monList);
		}
	}

	if ([8, 3, 38, 6, 27, 28, 33, 34, 35, 37, 56, 57, 60, 45, 58, 61, 66, 67, 68, 69, 70, 71, 72].indexOf(me.area) > -1) {
		monList = Attack.getMob([58, 59, 60, 61, 101, 102, 103, 104], 0, 30);

		if (monList) {
			Attack.clearList(monList);
		}
	}

	if ((typeof Config.ClearPath === "number" || typeof Config.ClearPath === "object") && arg.clearPath === false) {
		switch (typeof Config.ClearPath) {
		case "number":
			Attack.clear(30, Config.ClearPath);

			break;
		case "object":
			if (!Config.ClearPath.hasOwnProperty("Areas") || Config.ClearPath.Areas.length === 0 || Config.ClearPath.Areas.indexOf(me.area) > -1) {
				Attack.clear(Config.ClearPath.Range, Config.ClearPath.Spectype);
			}

			break;
		}
	}

	if (arg.clearPath !== false) {
		Attack.clear(15, typeof arg.clearPath === "number" ? arg.clearPath : 0);
	}
};

Pather.checkWP = function (area) {
	if (!getWaypoint(Pather.wpAreas.indexOf(area))) {
		if (me.inTown) {
			Town.move("waypoint");
		}

		let wp;

		for (let i = 0; i < 15; i += 1) {
			wp = getUnit(2, "waypoint");

			if (wp && wp.area === me.area) {
				if (!me.inTown && getDistance(me, wp) > 7) {
					Pather.moveToUnit(wp);
				}

				Misc.click(0, 0, wp);

				let tick = getTickCount();

				while (getTickCount() - tick < Math.max(Math.round((i + 1) * 1000 / (i / 5 + 1)), (1 + me.ping * 2))) {
					if (getUIFlag(0x14)) { // Waypoint screen is open
						delay(500 + me.ping);
						break;
					}

					delay(50 + me.ping);
				}
			}

			if (getUIFlag(0x14)) { // Waypoint screen is open
				me.cancel();
				break;
			}
		}
	}

	return getWaypoint(Pather.wpAreas.indexOf(area));
};

Pather.openDoors = function (x, y) { //fixed monsterdoors/walls in act 5
	if (me.inTown) {
		return false;
	}

	// Regular doors
	var i, tick,
		door = getUnit(2, "door", 0);

	if (door) {
		do {
			if ((getDistance(door, x, y) < 4 && getDistance(me, door) < 9) || getDistance(me, door) < 4) {
				for (i = 0; i < 3; i += 1) {
					Misc.click(0, 0, door);
					//door.interact();

					tick = getTickCount();

					while (getTickCount() - tick < 1000) {
						if (door.mode === 2) {
							me.overhead("Opened a door!");

							return true;
						}

						delay(10 + me.ping);
					}
				}
			}
		} while (door.getNext());
	}

	// Monsta doors (Barricaded)
	var p,
		monstadoor1 = getUnit(1, 432), //barricaded door 1
		monstadoor2 = getUnit(1, 433), //barricaded door 2
		monstawall1 = getUnit(1, 524), //barricaded wall 1
		monstawall2 = getUnit(1, 525); //barricaded wall 2

	if (monstadoor1) {
		do {
			if ((getDistance(monstadoor1, x, y) < 4 && getDistance(me, monstadoor1) < 9) || getDistance(me, monstadoor1) < 4) {

				for (p = 0; p < 20 && monstadoor1.hp; p += 1) {
					ClassAttack.doAttack(monstadoor1);
				}

				me.overhead("Broke a barricaded door!");
			}
		} while (monstadoor1.getNext());
	}

	if (monstadoor2) {
		do {
			if ((getDistance(monstadoor2, x, y) < 4 && getDistance(me, monstadoor2) < 9) || getDistance(me, monstadoor2) < 4) {

				for (p = 0; p < 20 && monstadoor2.hp; p += 1) {
					ClassAttack.doAttack(monstadoor2);
				}

				me.overhead("Broke a barricaded door!");
			}
		} while (monstadoor2.getNext());
	}

	if (monstawall1) {
		do {
			if ((getDistance(monstawall1, x, y) < 4 && getDistance(me, monstawall1) < 9) || getDistance(me, monstawall1) < 4) {

				for (p = 0; p < 20 && monstawall1.hp; p += 1) {
					ClassAttack.doAttack(monstawall1);
				}

				me.overhead("Broke a barricaded wall!");
			}
		} while (monstawall1.getNext());
	}

	if (monstawall2) {
		do {
			if ((getDistance(monstawall2, x, y) < 4 && getDistance(me, monstawall2) < 9) || getDistance(me, monstawall2) < 4) {

				for (p = 0; p < 20 && monstawall2.hp; p += 1) {
					ClassAttack.doAttack(monstawall2);
				}

				me.overhead("Broke a barricaded wall!");
			}
		} while (monstawall2.getNext());
	}

	return false;
};

Pather.changeAct = function () {
	let npc, code,	prevAct = me.act;

	if (!me.inTown) {
		Town.goToTown();
	}

	switch (prevAct) {
	case 1:
		Town.move(NPC.Warriv);
		npc = getUnit(1, NPC.Warriv);
		code = 0x0D36;

		break;
	case 2:
		Town.move(NPC.Meshif);
		npc = getUnit(1, NPC.Meshif);
		code = 0x0D38;

		break;
	case 4:
		Town.move(NPC.Tyrael);
		npc = getUnit(1, NPC.Tyrael);
		code = 0x58D2;

		break;
	}

	Packet.flash(me.gid);
	delay(1 + me.ping * 2);

	if (!npc || !npc.openMenu() || !Misc.useMenu(code)) {
		me.cancel();
		delay(1000 + me.ping * 2);
	}

	return true;
};

Unit.prototype.getItems = function (...args) {
	let items = this.getItems.apply(this, args);

	if (!items.length) {
		return [];
	}

	return items;
};

Item.getBodyLoc = function (item) {
	var bodyLoc;

	switch (item.itemType) {
	case 2: // Shield
	case 70: // Auric Shields
	case 69: // Voodoo Heads
		bodyLoc = 5;

		break;
	case 3: // Armor
		bodyLoc = 3;

		break;
	case 5: // Arrows
	case 6: // Bolts
		bodyLoc = 5;

		break;
	case 10: // Ring
		bodyLoc = [6, 7];

		break;
	case 12: // Amulet
		bodyLoc = 2;

		break;
	case 15: // Boots
		bodyLoc = 9;

		break;
	case 16: // Gloves
		bodyLoc = 10;

		break;
	case 19: // Belt
		bodyLoc = 8;

		break;
	case 37: // Helm
	case 71: // Barb Helm
	case 75: // Circlet
	case 72: // Druid Pelts
		bodyLoc = 1;

		break;
	case 24: //
	case 25: //
	case 26: //
	case 27: //
	case 28: //
	case 29: //
	case 30: //
	case 31: //
	case 32: //
	case 33: //
	case 34: //
	case 35: //
	case 36: //
	case 42: //
	case 43: //
	case 44: //
	case 67: // Handtohand (Assasin Claw)
	case 68: //
	case 85: //
	case 86: //
	case 87: //
	case 88: //
		bodyLoc = 4;

		break;
	default:
		return false;
	}

	if (typeof bodyLoc === "number") {
		bodyLoc = [bodyLoc];
	}

	return bodyLoc;
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

// DYNAMIC TIERS prep
var casterCheck = function () {
	function getBuildTemplate () {
		let buildType = finalBuild;
		let build = buildType + "Build" ;
		let classname = ["Amazon", "Sorceress", "Necromancer", "Paladin", "Barbarian", "Druid", "Assassin"][me.classid];
		let template = "config/Builds/SoloLeveling/" + classname + "." + build + ".js";

		return template.toLowerCase();
	}

	var template = getBuildTemplate();

	if (!include(template)) {
		print("ÿc9SoloLevelingÿc0: getskills Failed to include template: " + template);
	}

	let castercheck = build.caster;

	return castercheck;
};

var isCaster = casterCheck();

//	MERC AUTO EQUIP - modified from dzik's
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

Item.hasMercTier = function (item) {
	return Config.AutoEquip && NTIP.GetMercTier(item) > 0 && !me.classic;
};

Item.canEquipMerc = function (item, bodyLoc) {
	if (item.type !== 4 || me.classic) { // Not an item
		return false;
	}

	let mercenary = getMercFix();

	if (!mercenary) { // dont have merc or he is dead
		return false;
	}

	if (!item.getFlag(0x10)) { // Unid item
		return false;
	}

	let curr = Item.getEquippedItemMerc(bodyLoc);

	if (item.getStat(92) > mercenary.getStat(12) || item.dexreq > mercenary.getStat(2) - curr.dex || item.strreq > mercenary.getStat(0) - curr.str) { // Higher requirements
		return false;
	}

	return true;
};

Item.equipMerc = function (item, bodyLoc) {
	if (!Item.canEquipMerc(item, bodyLoc)) {
		return false;
	}

	if (item.mode === 1 && item.bodylocation === bodyLoc) { // Already equipped in the right slot
		return true;
	}

	var i, cursorItem;

	if (item.location === 7) {
		if (!Town.openStash()) {
			return false;
		}
	}

	for (i = 0; i < 3; i += 1) {
		if (item.toCursor()) {
			clickItem(4, bodyLoc);
			delay(500 + me.ping * 2);

			if (item.bodylocation === bodyLoc) {
				if (getCursorType() === 3) {
					cursorItem = getUnit(100);

					if (cursorItem) {
						if (NTIP.CheckItem(cursorItem).result === 1) {
							if (Storage.Inventory.CanFit(cursorItem)) {
								Storage.Inventory.MoveTo(cursorItem);
							}
						}

						cursorItem = getUnit(100);

						if (cursorItem) {
							cursorItem.drop();
						}
					}
				}

				return true;
			}
		}
	}

	return false;
};

Item.getEquippedItemMerc = function (bodyLoc) {
	let mercenary = getMercFix();
	var item = mercenary.getItem();

	if (item) {
		do {
			if (item.bodylocation === bodyLoc && item.location === 1) {
				return {
					classid: item.classid,
					tier: NTIP.GetMercTier(item),
					name: item.fname,
					str: item.getStatEx(0),
					dex: item.getStatEx(2)
				};
			}
		} while (item.getNext());
	}

	return { // Don't have anything equipped in there
		classid: -1,
		tier: -1,
		name: "none",
		str: 0,
		dex: 0
	};
};

Item.getBodyLocMerc = function (item) {
	var bodyLoc = false, mercenary = getMercFix();

	switch (item.itemType) {
	case 3: // Armor
		bodyLoc = 3;

		break;
	case 37: // Helm
	case 75: // Circlet
		bodyLoc = 1;

		break;
	case 27:
		if (mercenary.classid === 271) {
			bodyLoc = 4;
		}

		break;
	case 33: //
	case 34: //
		if (mercenary.classid === 338) {
			bodyLoc = 4;
		}

		break;
	default:
		return false;
	}

	if (typeof bodyLoc === "number") {
		bodyLoc = [bodyLoc];
	}

	return bodyLoc;
};

Item.autoEquipCheckMerc = function (item) {
	if (!Config.AutoEquip) {
		return true;
	}

	if (Config.AutoEquip && !getMercFix()) {
		return false;
	}

	var i,
		tier = NTIP.GetMercTier(item),
		bodyLoc = Item.getBodyLocMerc(item);

	if (tier > 0 && bodyLoc) {
		for (i = 0; i < bodyLoc.length; i += 1) {
			var oldTier = Item.getEquippedItemMerc(bodyLoc[i]).tier; // Low tier items shouldn't be kept if they can't be equipped

			if (tier > oldTier && (Item.canEquipMerc(item) || !item.getFlag(0x10))) {
				return true;
			}
		}
	}

	return false;
};

Item.autoEquipMerc = function () {
	if (!Config.AutoEquip || !getMercFix()) {
		return true;
	}

	var i, j, tier, bodyLoc, tome, scroll,
		items = me.findItems(-1, 0);

	if (!items) {
		return false;
	}

	function sortEq (a, b) {
		if (Item.canEquipMerc(a) && Item.canEquipMerc(b)) {
			return NTIP.GetMercTier(b) - NTIP.GetMercTier(a);
		}

		if (Item.canEquipMerc(a)) {
			return -1;
		}

		if (Item.canEquipMerc(b)) {
			return 1;
		}

		return 0;
	}

	me.cancel();

	for (i = 0; i < items.length; i += 1) {
		if (NTIP.GetMercTier(items[i]) === 0) {
			items.splice(i, 1);

			i -= 1;
		}
	}

	while (items.length > 0) {
		items.sort(sortEq);

		tier = NTIP.GetMercTier(items[0]);
		bodyLoc = Item.getBodyLocMerc(items[0]);

		if (tier > 0 && bodyLoc) {
			for (j = 0; j < bodyLoc.length; j += 1) {
				if ([3, 7].indexOf(items[0].location) > -1 && tier > Item.getEquippedItemMerc(bodyLoc[j]).tier) { // khalim's will adjustment
					if (!items[0].getFlag(0x10)) { // unid
						tome = me.findItem(519, 0, 3);
						scroll = me.findItem(530, 0, 3);

						if ((tome && tome.getStat(70) > 0) || scroll) {
							if (items[0].location === 7) {
								Town.openStash();
							}

							Town.identifyItem(items[0], scroll ? scroll : tome);
						}
					}

					if (Item.equipMerc(items[0], bodyLoc[j])) {
						print("ÿc9SoloLevelingÿc0: equipped merc item.");

					}

					let cursorItem = getUnit(100);

					if (cursorItem) {
						cursorItem.drop();
					}

					break;
				}
			}
		}

		items.shift();
	}

	return true;
};

Item.removeItemsMerc = function () {
	let cursorItem;
	let mercenary = getMercFix();

	if (!mercenary) {
		return true;
	}

	let items = mercenary.getItems();

	if (items) {
		for (var i = 0; i < items.length; i++) {
			clickItem(4, items[i].bodylocation);
			delay(500 + me.ping * 2);

			cursorItem = getUnit(100);

			if (cursorItem) {
				if (Storage.Inventory.CanFit(cursorItem)) {
					Storage.Inventory.MoveTo(cursorItem);
				} else {
					cursorItem.drop();
				}
			}
		}
	}

	return !!mercenary.getItem();
};
