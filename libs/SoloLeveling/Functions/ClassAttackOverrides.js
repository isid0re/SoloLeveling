/*
*	@filename	ClassAttackOverides.js
*	@author		isid0re
*	@desc		fixes to improve class attack functionality per class
*	@credits	Laz/Sonic for the doattack switch() framework
*				barbarian warcry skill rules based on https://diablo2.diablowiki.net/images/3/3b/Master_of_Kiai_strategy.png
*/

// Class Specific Attacks
switch (me.classid) {
case 0: // Amazon
	if (!isIncluded("common/Attacks/Amazon.js")) {
		include("common/Attacks/Amazon.js");
	}

	ClassAttack.doAttack = function (unit, preattack) {
		var index, checkSkill, casterList, mobAura, mobList, mobLoc, result, merc = Merc.getMercFix(), needRepair = Town.needRepair(), timedSkill = -1, untimedSkill = -1;

		if ((Config.MercWatch && Town.needMerc()) || needRepair.length > 0) {
			print("mercwatch");
			Town.visitTown();
		}

		index = ((unit.spectype & 0x7) || unit.type === 0) ? 1 : 3;
		casterList = [91, 92, 93, 94, 95, 118, 119, 120, 121, 131, 132, 133, 134, 135, 160, 161, 162, 163, 164, 170, 171, 172, 173, 174, 274, 275, 276, 277, 311, 312, 360, 361, 362, 373, 374, 375, 376, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 394, 395, 474, 475, 476, 477, 478, 558, 575, 576, 577, 578, 579, 610, 611, 612, 613, 614, 620, 621, 622, 623, 624, 625, 626, 635, 636, 627, 638, 639, 640, 641, 654, 655, 686, 687, 692, 693, 694, 696, 697, 701, 702];
		mobList = Attack.getMob(unit.classid, null, 8, unit);
		mobLoc = CollMap.getRandCoordinate(unit.x, -4, 4, unit.y, -4, 4);
		mobAura = mobList && mobList.filter(mob => mob.type === 1 && (mob.getState(28) || mob.getState(49) || mob.getState(43))) > 0 ? "true" : "false";

		switch (typeof Config.AttackSkill[0]) {
		case "object":
			for (let i = 0; i < Config.AttackSkill[0].length; i++) {
				if (preattack && Config.AttackSkill[0][i] > 0 && Attack.checkResist(unit, Config.AttackSkill[0][i]) && (!me.getState(121) || !Skill.isTimed(Config.AttackSkill[0][i]))) {
					if (me.getSkill(Config.AttackSkill[0][i], 1)) {
						if (Math.round(getDistance(me, unit)) > Skill.getRange(Config.AttackSkill[0][i]) || checkCollision(me, unit, 0x4)) {
							if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0][i]), 0x4)) {
								if (i + 1 === Config.AttackSkill[0].length) {
									return false;
								}
							}
						}

						if (Math.round(me.mp * 100 / me.mpmax) > 30) {
							switch (Config.AttackSkill[0][i]) {
							case 28: // use dopplezon
								if (mobList && mobList.length > 3 && (mobAura || Attack.getScarinessLevel(unit) > 3)) {
									Skill.cast(Config.AttackSkill[0][i], Skill.getHand(Config.AttackSkill[0][i]), mobLoc);
								} else if (Attack.getScarinessLevel(unit) === 4 && !Attack.checkResist(unit, Config.AttackSkill[index])) {
									Skill.cast(Config.AttackSkill[0][i], Skill.getHand(Config.AttackSkill[0][i]), mobLoc);
								}

								break;
							case 8: // use inner sight
								if (casterList.indexOf(unit.classid) === -1) {
									Skill.cast(Config.AttackSkill[0][i], Skill.getHand(Config.AttackSkill[0][i]), unit);
								}

								break;
							case 15:// use poison javalin
								if (!me.getSkill(25, 1) && mobList && (mobList.length > 3 || mobAura || Attack.getScarinessLevel(unit) > 3)) {
									Skill.cast(Config.AttackSkill[0][i], Skill.getHand(Config.AttackSkill[0][i]), unit);
								}

								break;
							case 17: // use slow missiles
								if (casterList.indexOf(unit.classid) > -1 && Attack.getScarinessLevel(unit) !== 4) {
									Skill.cast(Config.AttackSkill[0][i], Skill.getHand(Config.AttackSkill[0][i]), unit);
								}

								break;
							case 25: // use plague javalin
								if (mobList && (mobList.length > 3 || mobAura || Attack.getScarinessLevel(unit) > 3)) {
									Skill.cast(Config.AttackSkill[0][i], Skill.getHand(Config.AttackSkill[0][i]), unit);
								}

								break;
							default:
								Skill.cast(Config.AttackSkill[0][i], Skill.getHand(Config.AttackSkill[0][i]), unit);

								break;
							}
						}

						if (i + 1 === Config.AttackSkill[0].length) {
							return true;
						}
					}
				}
			}

			break;
		case "number":
		default:
			if (preattack && Config.AttackSkill[0] > 0 && Attack.checkResist(unit, Config.AttackSkill[0]) && (!me.getState(121) || !Skill.isTimed(Config.AttackSkill[0]))) {
				if (Math.round(getDistance(me, unit)) > Skill.getRange(Config.AttackSkill[0]) || checkCollision(me, unit, 0x4)) {
					if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0]), 0x4)) {
						return false;
					}
				}

				if (Math.round(me.mp * 100 / me.mpmax) > 30) {
					Skill.cast(Config.AttackSkill[0], Skill.getHand(Config.AttackSkill[0]), unit);
				}

				return true;
			}

			break;
		}

		// Get timed skill
		if (Attack.getCustomAttack(unit)) {
			checkSkill = Attack.getCustomAttack(unit)[0];
		} else {
			checkSkill = Config.AttackSkill[index];
		}

		if (Attack.checkResist(unit, checkSkill)) {
			switch (checkSkill) {
			case 35: // throttle lightning fury
				if (mobList.length > 3 && (Math.round(getDistance(me, unit)) > Skill.getRange(checkSkill) || checkCollision(me, unit, 0x4))) {
					timedSkill = checkSkill;
				}

				break;
			default:
				timedSkill = checkSkill;
				break;
			}
		} else if (Config.AttackSkill[5] > -1 && Attack.checkResist(unit, Config.AttackSkill[5]) && ([56, 59].indexOf(Config.AttackSkill[5]) === -1 || Attack.validSpot(unit.x, unit.y))) {
			timedSkill = Config.AttackSkill[5];
		}

		// Get untimed skill
		if (Attack.getCustomAttack(unit)) {
			checkSkill = Attack.getCustomAttack(unit)[1];
		} else {
			checkSkill = Config.AttackSkill[index + 1];
		}

		if (Attack.checkResist(unit, checkSkill)) {
			untimedSkill = checkSkill;
		} else if (Config.AttackSkill[6] > -1 && Attack.checkResist(unit, Config.AttackSkill[6]) && ([56, 59].indexOf(Config.AttackSkill[6]) === -1 || Attack.validSpot(unit.x, unit.y))) {
			untimedSkill = Config.AttackSkill[6];
		}

		// Low mana timed skill
		if (Config.LowManaSkill[0] > -1 && Skill.getManaCost(timedSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[0])) {
			timedSkill = Config.LowManaSkill[0];
		}

		// Low mana untimed skill
		if (Config.LowManaSkill[1] > -1 && Skill.getManaCost(untimedSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[1])) {
			untimedSkill = Config.LowManaSkill[1];
		}

		result = this.doCast(unit, timedSkill, untimedSkill);

		switch (result) {
		case 0: // Fail
			break;
		case 1: // Success
			return true;
		case 2: // Try to telestomp
			if (Config.TeleStomp && Attack.checkResist(unit, "physical") && Config.UseMerc) {
				while (Attack.checkMonster(unit)) {
					Misc.townCheck();

					if (!merc) {
						Town.visitTown();
					}

					if (getDistance(me, unit) > 3) {
						Pather.moveToUnit(unit);
					}

					this.doCast(unit, Config.AttackSkill[1], Config.AttackSkill[2]);
				}

				return true;
			}

			break;
		}

		return false;
	};

	break;
case 1: // Sorceress
	if (!isIncluded("common/Attacks/Sorceress.js")) {
		include("common/Attacks/Sorceress.js");
	}

	ClassAttack.doAttack = function (unit, preattack) {
		if (Config.MercWatch && Town.needMerc()) {
			print("mercwatch");
			Town.visitTown();
		}

		if (!me.getState(10) && me.getSkill(40, 1)) { // keep frozen armor up
			Skill.cast(40, 0);
		}

		switch (typeof Config.AttackSkill[0]) {
		case "object":
			for (let i = 0; i < Config.AttackSkill[0].length; i++) {
				if (preattack && Config.AttackSkill[0][i] > 0 && Attack.checkResist(unit, Config.AttackSkill[0][i]) && (!me.getState(121) || !Skill.isTimed(Config.AttackSkill[0][i]))) {
					if (me.getSkill(Config.AttackSkill[0][i], 1)) {
						if (Math.round(getDistance(me, unit)) > Skill.getRange(Config.AttackSkill[0][i]) || checkCollision(me, unit, 0x4)) {
							if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0][i]), 0x4)) {
								if (i + 1 === Config.AttackSkill[0].length) {
									return false;
								}
							}
						}

						if (Math.round(me.mp * 100 / me.mpmax) > 30) {
							Skill.cast(Config.AttackSkill[0][i], Skill.getHand(Config.AttackSkill[0][i]), unit);
						}

						if (i + 1 === Config.AttackSkill[0].length) {
							return true;
						}
					}
				}
			}

			break;
		case "number":
		default:
			if (preattack && Config.AttackSkill[0] > 0 && Attack.checkResist(unit, Config.AttackSkill[0]) && (!me.getState(121) || !Skill.isTimed(Config.AttackSkill[0]))) {
				if (Math.round(getDistance(me, unit)) > Skill.getRange(Config.AttackSkill[0]) || checkCollision(me, unit, 0x4)) {
					if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0]), 0x4)) {
						return false;
					}
				}

				if (Math.round(me.mp * 100 / me.mpmax) > 30) {
					Skill.cast(Config.AttackSkill[0], Skill.getHand(Config.AttackSkill[0]), unit);
				}

				return true;
			}

			break;
		}

		var index, staticRange, checkSkill, mark, result, merc = Merc.getMercFix(), timedSkill = -1, untimedSkill = -1;

		// Static
		if (Config.CastStatic < 100 && me.getSkill(42, 1) && Attack.checkResist(unit, "lightning") && Config.StaticList.some(
			function (id) {
				if (unit) {
					switch (typeof id) {
					case "number":
						if (unit.classid && unit.classid === id) {
							return true;
						}

						break;
					case "string":
						if (unit.name && unit.name.toLowerCase() === id.toLowerCase()) {
							return true;
						}

						break;
					default:
						throw new Error("Bad Config.StaticList settings.");
					}
				}

				return false;
			}
		) && Math.round(unit.hp * 100 / unit.hpmax) > Config.CastStatic) {
			staticRange = Math.floor((me.getSkill(42, 1) + 3) * 2 / 3); // adjusted static range (CuteBeast)

			while (!me.dead && Math.round(unit.hp * 100 / unit.hpmax) > Config.CastStatic && Attack.checkMonster(unit)) {
				Misc.townCheck();
				ClassAttack.doCast(unit, Config.AttackSkill[1], -1);

				if (getDistance(me, unit) > staticRange || checkCollision(me, unit, 0x4)) {
					if (!Attack.getIntoPosition(unit, staticRange, 0x4)) {
						return false;

					}
				}

				if (!Skill.cast(42, 0)) {
					break;
				}
			}
		}

		index = (unit.spectype !== 0 || unit.type === 0) ? 1 : 3;

		// Get timed skill
		if (Attack.getCustomAttack(unit)) {
			checkSkill = Attack.getCustomAttack(unit)[0];
		} else {
			checkSkill = Config.AttackSkill[index];
		}

		if (Attack.checkResist(unit, checkSkill) && ([56, 59].indexOf(checkSkill) === -1 || Attack.validSpot(unit.x, unit.y))) {
			timedSkill = checkSkill;
		} else if (Config.AttackSkill[5] > -1 && Attack.checkResist(unit, Config.AttackSkill[5]) && ([56, 59].indexOf(Config.AttackSkill[5]) === -1 || Attack.validSpot(unit.x, unit.y))) {
			timedSkill = Config.AttackSkill[5];
		}

		// Get untimed skill
		if (Attack.getCustomAttack(unit)) {
			checkSkill = Attack.getCustomAttack(unit)[1];
		} else {
			checkSkill = Config.AttackSkill[index + 1];
		}

		if (Attack.checkResist(unit, checkSkill) && ([56, 59].indexOf(checkSkill) === -1 || Attack.validSpot(unit.x, unit.y))) {
			untimedSkill = checkSkill;
		} else if (Config.AttackSkill[6] > -1 && Attack.checkResist(unit, Config.AttackSkill[6]) && ([56, 59].indexOf(Config.AttackSkill[6]) === -1 || Attack.validSpot(unit.x, unit.y))) {
			untimedSkill = Config.AttackSkill[6];
		}

		// Low mana timed skill
		if (Config.LowManaSkill[0] > -1 && Skill.getManaCost(timedSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[0])) {
			timedSkill = Config.LowManaSkill[0];
		}

		// Low mana untimed skill
		if (Config.LowManaSkill[1] > -1 && Skill.getManaCost(untimedSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[1])) {
			untimedSkill = Config.LowManaSkill[1];
		}

		result = ClassAttack.doCast(unit, timedSkill, untimedSkill);

		switch (result) {
		case 0: // Fail
			break;
		case 1: // Success
			return true;
		case 2: // Try to telestomp
			if (Config.TeleStomp && Attack.checkResist(unit, "physical") && Config.UseMerc) {
				while (Attack.checkMonster(unit)) {
					Misc.townCheck();

					if (!merc) {
						Town.visitTown();
					}

					if (getDistance(me, unit) > 3) {
						Pather.moveToUnit(unit);
					}

					if (Attack.checkResist(unit, "lightning") && me.getSkill(42, 1) && Math.round(unit.hp * 100 / unit.hpmax) > Config.CastStatic) {
						Skill.cast(42, 0);
					}

					mark = Attack.getNearestMonster(me);

					if (mark) {
						ClassAttack.doCast(mark, Config.AttackSkill[1], Config.AttackSkill[2]);
					} else if (me.getSkill(43, 0)) {
						Skill.cast(43, 0, unit.x, unit.y);
					}
				}

				return true;
			}

			break;
		}

		return false;
	};

	break;
case 2: // Necromancer
	if (!isIncluded("common/Attacks/Necromancer.js")) {
		include("common/Attacks/Necromancer.js");
	}

	ClassAttack.getCustomCurse = function (unit) {
		var i;

		// Check if unit got invalidated
		if (!unit || !unit.name || !copyUnit(unit).x) {
			return false;
		}

		for (i in Config.CustomCurse) {
			if (Config.CustomCurse.hasOwnProperty(i) && unit.name.toLowerCase() === i.toLowerCase()) {
				return Config.CustomCurse[i];
			}
		}

		return false;
	};

	ClassAttack.returnCurseState = function (curse) {
		var result;

		switch (curse) {
		case 66: //amplify damage
			result = 9;
			break;
		case 71: //dim vision
			result = 23;
			break;
		case 72: //weaken
			result = 19;
			break;
		case 76: //iron maiden
			result = 55;
			break;
		case 77: //terror
			result = 56;
			break;
		case 81: //confuse
			result = 59;
			break;
		case 82: //life tap
			result = 58;
			break;
		case 86: //attract
			result = 57;
			break;
		case 87: //decrepify
			result = 60;
			break;
		case 91: //lower resist
			result = 61;
			break;
		default: //nothing
			result = 0;
			break;
		}

		return result;
	};

	ClassAttack.initCurses = function (curses = Config.Curse) {
		var i, j;

		for (i = 0; i < curses.length; i += 1) {
			switch (typeof curses[i]) {
			case "object":
				this.curseState[i] = [];

				for (j = 0; j < curses[i].length; j += 1) {
					switch (curses[i][j]) {
					case 0: //nothing
						this.curseState[i].push(0);
						break;
					case 66: //amplify damage
						this.curseState[i].push(9);
						break;
					case 71: //dim vision
						this.curseState[i].push(23);
						break;
					case 72: //weaken
						this.curseState[i].push(19);
						break;
					case 76: //iron maiden
						this.curseState[i].push(55);
						break;
					case 77: //terror
						this.curseState[i].push(56);
						break;
					case 81: //confuse
						this.curseState[i].push(59);
						break;
					case 82: //life tap
						this.curseState[i].push(58);
						break;
					case 86: //attract
						this.curseState[i].push(57);
						break;
					case 87: //decrepify
						this.curseState[i].push(60);
						break;
					case 91: //lower resist
						this.curseState[i].push(61);
						break;
					default:
						Config.Curse[i] = 0;
						print("Invalid curse id");
						break;
					}
				}

				break;
			case "number":
			default:
				switch (curses[i]) {
				case 0: //nothing
					this.curseState[i] = 0;
					break;
				case 66: //amplify damage
					this.curseState[i] = 9;
					break;
				case 71: //dim vision
					this.curseState[i] = 23;
					break;
				case 72: //weaken
					this.curseState[i] = 19;
					break;
				case 76: //iron maiden
					this.curseState[i] = 55;
					break;
				case 77: //terror
					this.curseState[i] = 56;
					break;
				case 81: //confuse
					this.curseState[i] = 59;
					break;
				case 82: //life tap
					this.curseState[i] = 58;
					break;
				case 86: //attract
					this.curseState[i] = 57;
					break;
				case 87: //decrepify
					this.curseState[i] = 60;
					break;
				case 91: //lower resist
					this.curseState[i] = 61;
					break;
				default:
					Config.Curse[i] = 0;
					print("Invalid curse id");
					break;
				}

				break;
			}
		}

		this.cursesSet = true;
	};

	ClassAttack.isCursable = function (unit) {
		if (copyUnit(unit).name === undefined || unit.name.indexOf(getLocaleString(11086)) > -1) { // "Possessed"
			return false;
		}

		if (unit.getState(57)) { // attract can't be overridden
			return false;
		}

		switch (unit.classid) {
		case 190: // maggotegg1
		case 191: // maggotegg1
		case 192: // maggotegg1
		case 193: // maggotegg1
		case 194: // maggotegg1
		case 206: // Foul Crow Nest
		case 207: // BloodHawkNest
		case 208: // BlackVultureNest
		case 228: // sarcophagus
		case 258: // Water Watcher
		case 261: // Water Watcher
		case 266: // Flavie
		case 273: // gargoyle trap
		case 348: // Turret
		case 349: // Turret
		case 350: // Turret
		case 371: // lightning spire
		case 372: // firetower
		case 432: // Barricade Door
		case 433: // Barricade Door
		case 434: // Prison Door
		case 435: // Barricade Tower
		case 497: // catapult1
		case 498: // catapult2
		case 499: // catapult3
		case 500: // catapult4
		case 524: // Barricade Wall Right
		case 525: // Barricade Wall Left
		case 528: // Evil Demon Hut
		case 562: // baaltentacle1
		case 563: // baaltentacle2
		case 564: // baaltentacle3
		case 565: // baaltentacle4
		case 566: // baaltentacle5
		case 681: // maggotegg1 (WSK)
			return false;
		}

		return true;
	};

	ClassAttack.checkCorpse = function (unit, revive) {
		if (unit.mode !== 12) {
			return false;
		}

		if (revive === undefined) {
			revive = false;
		}

		var baseId = getBaseStat("monstats", unit.classid, "baseid"),
			badList = [312, 571];

		if (revive && ((unit.spectype & 0x7) || badList.indexOf(baseId) > -1 || (Config.ReviveUnstackable && getBaseStat("monstats2", baseId, "sizex") === 3))) {
			return false;
		}

		if (!getBaseStat("monstats2", baseId, revive ? "revive" : "corpseSel")) {
			return false;
		}

		if (getDistance(me, unit) <= 25 && !checkCollision(me, unit, 0x4) &&
						!unit.getState(1) && // freeze
						!unit.getState(96) && // revive
						!unit.getState(99) && // redeemed
						!unit.getState(104) && // nodraw
						!unit.getState(107) && // shatter
						!unit.getState(172) && // rest in peace
						!unit.getState(118) // noselect
		) {
			return true;
		}

		return false;
	};

	ClassAttack.explodeCorpses = function (unit) {
		if (!me.getSkill(Config.ExplodeCorpses, 1) || Config.ExplodeCorpses === 0 || unit.mode === 0 || unit.mode === 12) {
			return false;
		}

		var i, corpseList = [], mark, mobList, range = Math.floor((me.getSkill(Config.ExplodeCorpses, 1) + 7) / 3), corpse = getUnit(1, -1, 12);

		if (corpse) {
			do {
				if (getDistance(unit, corpse) <= range && this.checkCorpse(corpse)) {
					corpseList.push(copyUnit(corpse));
				}
			} while (corpse.getNext());

			//Shuffle the corpseList so if running multiple necrobots they explode separate corpses not the same ones
			if (corpseList.length > 1) {
				corpseList = corpseList.shuffle();
			}

			if (Config.Skeletons + Config.SkeletonMages + Config.Revives === 0) {
				// We don't need corpses as we are not a Summoner Necro, Spam CE till monster dies or we run out of bodies.
				do {
					corpse = corpseList.shift();

					if (corpse) {
						if (!unit.dead && this.checkCorpse(corpse) && getDistance(corpse, unit) <= range) {
							mobList = Attack.getMonstersInRange(corpse, range);
							mark = Attack.getNearestMonster(corpse, range);

							if (mark && mobList > 0 && me.getSkill(66, 1) && !mark.getState(9)) {
								Skill.cast(66, 0, mark);
							}

							me.overhead("Exploding: " + corpse.classid + " " + corpse.name + " id:" + corpse.gid); // Added corpse ID so I can see when it blows another monster with the same ClassID and Name

							if (mobList > 0 && Skill.cast(Config.ExplodeCorpses, 0, corpse)) {
								delay(me.ping + 1);
							}
						}
					}
				} while (corpseList.length > 0);
			} else { // We are a Summoner Necro, we should conserve corpses, only blow 2 at a time so we can check for needed re-summons.
				for (i = 0; i <= 1; i += 1) {
					if (corpseList.length > 0) {
						corpse = corpseList.shift();

						if (corpse) {
							mobList = Attack.getMonstersInRange(corpse, range);
							mark = Attack.getNearestMonster(corpse, range);

							if (mark && mobList > 0 && me.getSkill(66, 1) && !mark.getState(9)) {
								Skill.cast(66, 0, mark);
							}

							me.overhead("Exploding: " + corpse.classid + " " + corpse.name);

							if (mobList > 0 && Skill.cast(Config.ExplodeCorpses, 0, corpse)) {
								delay(200);
							}
						}
					} else {
						break;
					}
				}
			}
		}

		return true;
	};

	ClassAttack.doAttack = function (unit, preattack) {
		var index, curseIndex, checkCurses = [], checkSkill, mark, markList, mobList, result, merc = Merc.getMercFix(), timedSkill = -1, untimedSkill = -1;

		if (Config.MercWatch && Town.needMerc()) {
			print("mercwatch");
			Town.visitTown();
		}

		if (me.getSkill(91, 0) && me.getSkill(77, 0) && me.getSkill(92, 0)) {
			if (Attack.getMonstersInRange(me, 10) > 4) {
				markList = [91, 92, 77]; // Lower Resists, Poison Nova, Terror
				mark = Attack.getNearestMonster(me, 10);

				for (let p = 0; p < markList.length; p++) {
					if (Math.round(me.mp * 100 / me.mpmax) > 30 && mark && !mark.getState(ClassAttack.returnCurseState(markList[p]))) {
						Skill.cast(markList[p], Skill.getHand(markList[p]), mark);
					}
				}
			}
		}

		if (!me.getState(14) && me.getSkill(68, 1)) { // add bone armor
			Skill.cast(68, 0);
		}

		if (me.getMinionCount(3) === 0) { // keep golem active
			switch (Config.Golem) {
			case 0:
			case "None":
				break;
			case 1:
			case "Clay":
				if (me.getSkill(75, 1)) {
					Precast.summon(75);
				}

				break;
			case 2:
			case "Blood":
				if (me.getSkill(85, 1)) {
					Precast.summon(85);
				}

				break;
			case 3:
			case "Fire":
				if (me.getSkill(94, 1)) {
					Precast.summon(94);
				}

				break;
			default:
				break;
			}
		}

		if (ClassAttack.getCustomCurse(unit) && (unit.spectype & 0x7)) {
			checkCurses[0] = ClassAttack.getCustomCurse(unit)[0];
		} else {
			checkCurses[0] = Config.Curse[0];
		}

		// Get custom normal monster curse
		if (ClassAttack.getCustomCurse(unit) && !(unit.spectype & 0x7)) {
			checkCurses[1] = ClassAttack.getCustomCurse(unit)[0];
		} else {
			checkCurses[1] = Config.Curse[1];
		}

		if (!this.cursesSet) {
			this.initCurses(checkCurses);
		}

		switch (typeof Config.AttackSkill[0]) {
		case "object":
			for (let i = 0; i < Config.AttackSkill[0].length; i++) {
				if (preattack && Config.AttackSkill[0][i] > 0 && Attack.checkResist(unit, Config.AttackSkill[0][i]) && (!me.getState(121) || !Skill.isTimed(Config.AttackSkill[0][i]))) {
					if (me.getSkill(Config.AttackSkill[0][i], 1)) {
						if (Math.round(getDistance(me, unit)) > Skill.getRange(Config.AttackSkill[0][i]) || checkCollision(me, unit, 0x4)) {
							if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0][i]), 0x4)) {
								if (i + 1 === Config.AttackSkill[0].length) {
									return false;
								}
							}
						}

						if (Math.round(me.mp * 100 / me.mpmax) > 30) {
							Skill.cast(Config.AttackSkill[0][i], Skill.getHand(Config.AttackSkill[0][i]), unit);
						}

						if (i + 1 === Config.AttackSkill[0].length) {
							return true;
						}
					}
				}
			}

			break;
		case "number":
		default:
			if (preattack && Config.AttackSkill[0] > 0 && Attack.checkResist(unit, Config.AttackSkill[0]) && (!me.getState(121) || !Skill.isTimed(Config.AttackSkill[0]))) {
				if (Math.round(getDistance(me, unit)) > Skill.getRange(Config.AttackSkill[0]) || checkCollision(me, unit, 0x4)) {
					if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0]), 0x4)) {
						return false;
					}
				}

				if (Math.round(me.mp * 100 / me.mpmax) > 30) {
					Skill.cast(Config.AttackSkill[0], Skill.getHand(Config.AttackSkill[0]), unit);
				}

				return true;
			}

			break;
		}

		index = ((unit.spectype & 0x7) || unit.type === 0) ? 1 : 3;
		curseIndex = ((unit.spectype & 0x7) || unit.type === 0) ? 0 : 1;

		switch (typeof checkCurses[curseIndex]) {
		case "object":
			for (let i = 0; i < checkCurses[curseIndex].length; i++) {
				if (this.isCursable(unit) && checkCurses[curseIndex][i] > 0 && !unit.getState(ClassAttack.returnCurseState(checkCurses[curseIndex][i]))) {
					switch (checkCurses[curseIndex][i]) {
					case 66: //amplify damage
						if (me.getSkill(checkCurses[curseIndex][i], 1) && (!Attack.checkResist(unit, "physical") || !Attack.checkResist(unit, "magic")) && merc && curseIndex === 1 || me.getSkill(checkCurses[curseIndex][i], 1) && curseIndex === 0 && !me.getSkill(87, 1) && !me.getSkill(91, 1)) {
							Skill.cast(checkCurses[curseIndex][i], 0, unit);
						}

						break;
					case 71: //dim vision
						if (me.getSkill(checkCurses[curseIndex][i], 1) && [312, 701, 702].indexOf(unit.classid) === -1) {
							Skill.cast(checkCurses[curseIndex][i], 0, unit); // cast on everything but oblivion knights or bosses
						}

						break;
					case 72: // Weaken
						break;
					case 76: //Iron Maiden
						break;
					case 77: //terror
						break;
					case 81: //confuse
						break;
					case 82: //life tap
						break;
					case 86: //attract
						break;
					case 87: //decrepify
						if (me.getSkill(checkCurses[curseIndex][i], 1) && me.getSkill(91, 0) < 2) {
							Skill.cast(checkCurses[curseIndex][i], 0, unit);
						}

						break;
					case 91: //lower resist
						if (me.getSkill(checkCurses[curseIndex][i], 1) && (me.getSkill(73, 0) > 1 || me.getSkill(83, 0) > 1 || me.getSkill(91, 0) > 1)) {
							Skill.cast(checkCurses[curseIndex][i], 0, unit);
						}

						break;
					default:
						if (me.getSkill(checkCurses[curseIndex][i], 1)) {
							Skill.cast(checkCurses[curseIndex][i], 0, unit);
						}

						break;
					}
				}
			}

			break;
		case "number":
		default:
			if (me.getSkill(checkCurses[curseIndex], 1) && checkCurses[curseIndex] > 0 && this.isCursable(unit) && !unit.getState(this.curseState[curseIndex])) {
				if (getDistance(me, unit) > 25 || checkCollision(me, unit, 0x4)) {
					if (!Attack.getIntoPosition(unit, 25, 0x4)) {
						return false;
					}
				}

				Skill.cast(checkCurses[curseIndex], 0, unit);

				break;
			}

			break;
		}

		// Get timed skill
		if (Attack.getCustomAttack(unit)) {
			checkSkill = Attack.getCustomAttack(unit)[0];
		} else {
			checkSkill = Config.AttackSkill[index];
		}

		if (Attack.checkResist(unit, checkSkill)) {
			timedSkill = checkSkill;
		} else if (Config.AttackSkill[5] > -1 && Attack.checkResist(unit, Config.AttackSkill[5]) && ([56, 59].indexOf(Config.AttackSkill[5]) === -1 || Attack.validSpot(unit.x, unit.y))) {
			timedSkill = Config.AttackSkill[5];
		}

		// Get untimed skill
		if (Attack.getCustomAttack(unit)) {
			checkSkill = Attack.getCustomAttack(unit)[1];
		} else {
			checkSkill = Config.AttackSkill[index + 1];
		}

		if (Attack.checkResist(unit, checkSkill)) {
			untimedSkill = checkSkill;
		} else if (Config.AttackSkill[6] > -1 && Attack.checkResist(unit, Config.AttackSkill[6]) && ([56, 59].indexOf(Config.AttackSkill[6]) === -1 || Attack.validSpot(unit.x, unit.y))) {
			untimedSkill = Config.AttackSkill[6];
		}

		// Low mana timed skill
		if (Config.LowManaSkill[0] > -1 && Skill.getManaCost(timedSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[0])) {
			timedSkill = Config.LowManaSkill[0];
		}

		// Low mana untimed skill
		if (Config.LowManaSkill[1] > -1 && Skill.getManaCost(untimedSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[1])) {
			untimedSkill = Config.LowManaSkill[1];
		}

		result = this.doCast(unit, timedSkill, untimedSkill);

		switch (result) {
		case 0: // Fail
			break;
		case 1: // SUccess
			if (Config.ActiveSummon) {
				this.raiseArmy();
			}

			this.explodeCorpses(unit);

			return true;
		case 2: // Try to telestomp
			if (Config.TeleStomp && Attack.checkResist(unit, "physical") && Config.UseMerc) {
				while (Attack.checkMonster(unit)) {
					Misc.townCheck();

					if (!merc) {
						Town.visitTown();
					}

					if (getDistance(me, unit) > 3) {
						Pather.moveToUnit(unit);
					}

					this.doCast(unit, Config.AttackSkill[1], Config.AttackSkill[2]);

					if (Config.ActiveSummon) {
						this.raiseArmy();
					}

					this.explodeCorpses(unit);
				}

				return true;
			}

			break;
		}

		return false;
	};

	break;
case 3: // Paladin
	if (!isIncluded("common/Attacks/Paladin.js")) {
		include("common/Attacks/Paladin.js");
	}

	ClassAttack.getHammerPosition = function (unit) {
		var i, x, y, positions, check,
			baseId = getBaseStat("monstats", unit.classid, "baseid"),
			size = getBaseStat("monstats2", baseId, "sizex");

		// in case base stat returns something outrageous
		if (typeof size !== "number" || size < 1 || size > 3) {
			size = 3;
		}

		switch (unit.type) {
		case 0: // Player
			x = unit.x;
			y = unit.y;
			positions = [[x + 2, y], [x + 2, y + 1]];

			break;
		case 1: // Monster
			x = (unit.mode === 2 || unit.mode === 15) && getDistance(me, unit) < 10 && getDistance(me, unit.targetx, unit.targety) > 5 ? unit.targetx : unit.x;
			y = (unit.mode === 2 || unit.mode === 15) && getDistance(me, unit) < 10 && getDistance(me, unit.targetx, unit.targety) > 5 ? unit.targety : unit.y;
			positions = [[x + 2, y + 1], [x, y + 3], [x + 2, y - 1], [x - 2, y + 2], [x - 5, y]];

			if (size === 3) {
				positions.unshift([x + 2, y + 2]);
			}

			break;
		}

		for (i = 0; i < positions.length; i += 1) {
			if (getDistance(me, positions[i][0], positions[i][1]) < 1) {
				return true;
			}
		}

		for (i = 0; i < positions.length; i += 1) {
			check = {
				x: positions[i][0],
				y: positions[i][1]
			};

			if (Attack.validSpot(check.x, check.y) && !CollMap.checkColl(unit, check, 0x4, 0) && (!checkCollision(me, unit, 0x1) || !me.getStat(97, 54))) {
				if (this.reposition(positions[i][0], positions[i][1])) {
					return true;
				}
			}
		}

		return false;
	};

	ClassAttack.doAttack = function (unit, preattack) {
		if (Config.MercWatch && Town.needMerc()) {
			print("mercwatch");
			Town.visitTown();
		}

		if (!me.getState(101) && me.getSkill(117, 1)) { // keep holy shield up
			Skill.cast(117, 0);
		}

		switch (typeof Config.AttackSkill[0]) {
		case "object":
			for (let i = 0; i < Config.AttackSkill[0].length; i++) {
				if (preattack && Config.AttackSkill[0][i] > 0 && Attack.checkResist(unit, Config.AttackSkill[0][i]) && (!me.getState(121) || !Skill.isTimed(Config.AttackSkill[0][i]))) {
					if (me.getSkill(Config.AttackSkill[0][i], 1)) {
						if (Math.round(getDistance(me, unit)) > Skill.getRange(Config.AttackSkill[0][i]) || checkCollision(me, unit, 0x4)) {
							if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0][i]), 0x4)) {
								if (i + 1 === Config.AttackSkill[0].length) {
									return false;
								}
							}
						}

						if (Math.round(me.mp * 100 / me.mpmax) > 30) {
							Skill.cast(Config.AttackSkill[0][i], Skill.getHand(Config.AttackSkill[0][i]), unit);
						}

						if (i + 1 === Config.AttackSkill[0].length) {
							return true;
						}
					}
				}
			}

			break;
		case "number":
		default:
			if (preattack && Config.AttackSkill[0] > 0 && Attack.checkResist(unit, Config.AttackSkill[0]) && (!me.getState(121) || !Skill.isTimed(Config.AttackSkill[0]))) {
				if (Math.round(getDistance(me, unit)) > Skill.getRange(Config.AttackSkill[0]) || checkCollision(me, unit, 0x4)) {
					if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0]), 0x4)) {
						return false;
					}
				}

				if (Math.round(me.mp * 100 / me.mpmax) > 30) {
					Skill.cast(Config.AttackSkill[0], Skill.getHand(Config.AttackSkill[0]), unit);
				}

				return true;
			}

			break;
		}

		var index, result, merc = Merc.getMercFix(), attackSkill = -1, aura = -1;

		index = ((unit.spectype & 0x7) || unit.type === 0) ? 1 : 3;

		if (Attack.getCustomAttack(unit)) {
			attackSkill = Attack.getCustomAttack(unit)[0];
			aura = Attack.getCustomAttack(unit)[1];
		} else {
			attackSkill = Config.AttackSkill[index];
			aura = Config.AttackSkill[index + 1];
		}

		// Monster immune to primary skill
		if (!Attack.checkResist(unit, attackSkill)) {
			// Reset skills
			attackSkill = -1;
			aura = -1;

			// Set to secondary if not immune
			if (Config.AttackSkill[5] > -1 && Attack.checkResist(unit, Config.AttackSkill[5])) {
				attackSkill = Config.AttackSkill[5];
				aura = Config.AttackSkill[6];
			}
		}

		// Low mana skill
		if (Config.LowManaSkill[0] > -1 && Skill.getManaCost(attackSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[0])) {
			attackSkill = Config.LowManaSkill[0];
			aura = Config.LowManaSkill[1];
		}

		result = this.doCast(unit, attackSkill, aura);

		switch (result) {
		case 0: // Fail
			break;
		case 1: // Success
			return true;
		case 2: // Try to telestomp
			if (Config.TeleStomp && Attack.checkResist(unit, "physical") && Config.UseMerc) {
				while (Attack.checkMonster(unit)) {
					Misc.townCheck();

					if (!merc) {
						Town.visitTown();
					}

					if (getDistance(me, unit) > 3) {
						Pather.moveToUnit(unit);
					}

					this.doCast(unit, Config.AttackSkill[1], Config.AttackSkill[2]);
				}

				return true;
			}

			break;
		}

		return false;
	};

	break;
case 4: // Barbarian
	if (!isIncluded("common/Attacks/Barbarian.js")) {
		include("common/Attacks/Barbarian.js");
	}

	ClassAttack.doAttack = function (unit, preattack) {
		var index, casterList, mobAura, mobList, attackSkill = -1, result, needRepair = Town.needRepair();

		if ((Config.MercWatch && Town.needMerc()) || needRepair.length > 0) {
			print("mercwatch");
			Town.visitTown(!!needRepair.length);
		}

		if (!me.getState(51) && me.getSkill(155, 1)) { // add battle command state
			Skill.cast(155, 0);
		}

		if (!me.getState(32) && me.getSkill(149, 1)) { // add battle orders state
			Skill.cast(149, 0);
		}

		if (!me.getState(26) && me.getSkill(138, 1)) { // add shout state
			Skill.cast(138, 0);
		}

		switch (typeof Config.AttackSkill[0]) {
		case "object":
			for (let i = 0; i < Config.AttackSkill[0].length; i++) {
				if (preattack && Config.AttackSkill[0][i] > 0 && Attack.checkResist(unit, Config.AttackSkill[0][i]) && (!me.getState(121) || !Skill.isTimed(Config.AttackSkill[0][i]))) {
					if (me.getSkill(Config.AttackSkill[0][i], 1)) {
						if (Math.round(getDistance(me, unit)) > Skill.getRange(Config.AttackSkill[0][i]) || checkCollision(me, unit, 0x4)) {
							if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0][i]), 0x4)) {
								if (i + 1 === Config.AttackSkill[0].length) {
									return false;
								}
							}
						}

						if (Math.round(me.mp * 100 / me.mpmax) > 30) {
							switch (Config.AttackSkill[0][i]) {
							case 130: // use Howl
								mobList = Attack.getMob(unit.classid, null, 8, unit);
								mobAura = mobList && mobList.filter(mob => mob.type === 1 && (mob.getState(28) || mob.getState(49) || mob.getState(43))) > 0 ? "true" : "false";

								if (mobList && mobList.length > 3 && (mobAura || Attack.getScarinessLevel(unit) > 3)) {
									Skill.cast(Config.AttackSkill[0][i], Skill.getHand(Config.AttackSkill[0][i]), unit);
								}

								break;
							case 137: // use Taunt
								casterList = [118, 119, 120, 121, 131, 132, 133, 134, 135, 160, 161, 162, 163, 164, 170, 171, 172, 173, 174, 274, 275, 276, 277, 373, 374, 375, 376, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 394, 395, 474, 475, 476, 477, 478, 575, 576, 577, 578, 579, 610, 611, 612, 613, 614, 620, 621, 622, 623, 624, 625, 626, 635, 636, 627, 638, 639, 640, 641, 692, 693, 694, 696, 697];

								if (casterList.indexOf(unit.classid) > -1) {
									Skill.cast(Config.AttackSkill[0][i], Skill.getHand(Config.AttackSkill[0][i]), unit);
								}

								break;
							default:
								Skill.cast(Config.AttackSkill[0][i], Skill.getHand(Config.AttackSkill[0][i]), unit);

								break;
							}
						}

						if (i + 1 === Config.AttackSkill[0].length) {
							return true;
						}
					}
				}
			}

			break;
		case "number":
		default:
			if (preattack && Config.AttackSkill[0] > 0 && Attack.checkResist(unit, Config.AttackSkill[0]) && (!me.getState(121) || !Skill.isTimed(Config.AttackSkill[0]))) {
				if (Math.round(getDistance(me, unit)) > Skill.getRange(Config.AttackSkill[0]) || checkCollision(me, unit, 0x4)) {
					if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0]), 0x4)) {
						return false;
					}
				}

				if (Math.round(me.mp * 100 / me.mpmax) > 30) {
					Skill.cast(Config.AttackSkill[0], Skill.getHand(Config.AttackSkill[0]), unit);
				}

				return true;
			}

			break;
		}

		if (!unit.getState(89) && me.getSkill(146, 1)) { // keep battle cry up on unit
			Skill.cast(146, Skill.getHand(146), unit);
		}

		index = ((unit.spectype & 0x7) || unit.type === 0) ? 1 : 3;

		if (Attack.getCustomAttack(unit)) {
			attackSkill = Attack.getCustomAttack(unit)[0];
		} else {
			attackSkill = Config.AttackSkill[index];
		}

		if (!Attack.checkResist(unit, attackSkill)) {
			attackSkill = -1;

			if (Config.AttackSkill[index + 1] > -1 && Attack.checkResist(unit, Config.AttackSkill[index + 1])) {
				attackSkill = Config.AttackSkill[index + 1];
			}
		}

		// Low mana skill
		if (Skill.getManaCost(attackSkill) > me.mp && Config.LowManaSkill[0] > -1 && Attack.checkResist(unit, Config.LowManaSkill[0])) {
			attackSkill = Config.LowManaSkill[0];
		}

		result = this.doCast(unit, attackSkill);

		switch (result) {
		case 0: // Fail
			break;
		case 1: // Success
			return true;
		case 2: // Trying to telestomp is pointless
			break;
		}

		return false;
	};

	break;
case 5: // Druid
	if (!isIncluded("common/Attacks/Druid.js")) {
		include("common/Attacks/Druid.js");
	}

	if (me.getSkill(223, 1) || me.getSkill(228, 1)) { // load wereform if have werewolf or werebear skill
		if (!isIncluded("common/Attacks/Wereform.js")) {
			include("common/Attacks/Wereform.js");
		}
	}

	ClassAttack.doAttack = function (unit, preattack) {
		var index, checkSkill, result, merc = Merc.getMercFix(), timedSkill = -1, untimedSkill = -1;

		if (Config.MercWatch && Town.needMerc()) {
			print("mercwatch");
			Town.visitTown();
		}

		if (me.getSkill(250, 1) && !me.getState(144)) { // Rebuff Hurricane
			Skill.cast(250, 0);
		}

		if (me.getSkill(235, 1) && !me.getState(151)) { // Rebuff Cyclone Armor
			Skill.cast(235, 0);
		}

		if (me.getSkill(232, 1) && me.getState(139) && !me.getState(120)) { // Start Feral Rage if WereWolf
			Skill.cast(232, 0);
		}

		switch (typeof Config.AttackSkill[0]) {
		case "object":
			for (let i = 0; i < Config.AttackSkill[0].length; i++) {
				if (preattack && Config.AttackSkill[0][i] > 0 && Attack.checkResist(unit, Config.AttackSkill[0][i]) && (!me.getState(121) || !Skill.isTimed(Config.AttackSkill[0][i]))) {
					if (me.getSkill(Config.AttackSkill[0][i], 1)) {
						if (Math.round(getDistance(me, unit)) > Skill.getRange(Config.AttackSkill[0][i]) || checkCollision(me, unit, 0x4)) {
							if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0][i]), 0x4)) {
								if (i + 1 === Config.AttackSkill[0].length) {
									return false;
								}
							}
						}

						Skill.cast(Config.AttackSkill[0][i], Skill.getHand(Config.AttackSkill[0][i]), unit);

						if (i + 1 === Config.AttackSkill[0].length) {
							return true;
						}
					}
				}
			}

			break;
		case "number":
		default:
			if (preattack && Config.AttackSkill[0] > 0 && Attack.checkResist(unit, Config.AttackSkill[0]) && (!me.getState(121) || !Skill.isTimed(Config.AttackSkill[0]))) {
				if (Math.round(getDistance(me, unit)) > Skill.getRange(Config.AttackSkill[0]) || checkCollision(me, unit, 0x4)) {
					if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0]), 0x4)) {
						return false;
					}
				}

				Skill.cast(Config.AttackSkill[0], Skill.getHand(Config.AttackSkill[0]), unit);

				return true;
			}

			break;
		}

		index = ((unit.spectype & 0x7) || unit.type === 0) ? 1 : 3;

		// Get timed skill
		if (Attack.getCustomAttack(unit)) {
			checkSkill = Attack.getCustomAttack(unit)[0];
		} else {
			checkSkill = Config.AttackSkill[index];
		}

		if (Attack.checkResist(unit, checkSkill)) {
			timedSkill = checkSkill;
		} else if (Config.AttackSkill[5] > -1 && Attack.checkResist(unit, Config.AttackSkill[5]) && ([56, 59].indexOf(Config.AttackSkill[5]) === -1 || Attack.validSpot(unit.x, unit.y))) {
			timedSkill = Config.AttackSkill[5];
		}

		// Get untimed skill
		if (Attack.getCustomAttack(unit)) {
			checkSkill = Attack.getCustomAttack(unit)[1];
		} else {
			checkSkill = Config.AttackSkill[index + 1];
		}

		if (Attack.checkResist(unit, checkSkill)) {
			untimedSkill = checkSkill;
		} else if (Config.AttackSkill[6] > -1 && Attack.checkResist(unit, Config.AttackSkill[6]) && ([56, 59].indexOf(Config.AttackSkill[6]) === -1 || Attack.validSpot(unit.x, unit.y))) {
			untimedSkill = Config.AttackSkill[6];
		}

		// Low mana timed skill
		if (Config.LowManaSkill[0] > -1 && Skill.getManaCost(timedSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[0])) {
			timedSkill = Config.LowManaSkill[0];
		}

		// Low mana untimed skill
		if (Config.LowManaSkill[1] > -1 && Skill.getManaCost(untimedSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[1])) {
			untimedSkill = Config.LowManaSkill[1];
		}

		result = this.doCast(unit, timedSkill, untimedSkill);

		switch (result) {
		case 0: // Fail
			break;
		case 1: // Success
			return true;
		case 2: // Try to telestomp
			if (Config.TeleStomp && Attack.checkResist(unit, "physical") && Config.UseMerc) {
				while (Attack.checkMonster(unit)) {
					Misc.townCheck();

					if (!merc) {
						Town.visitTown();
					}

					if (getDistance(me, unit) > 3) {
						Pather.moveToUnit(unit);
					}

					this.doCast(unit, Config.AttackSkill[1], Config.AttackSkill[2]);
				}

				return true;
			}

			break;
		}

		return false;
	};

	ClassAttack.doCast = function (unit, timedSkill, untimedSkill) {
		var i, walk;

		// No valid skills can be found
		if (timedSkill < 0 && untimedSkill < 0) {
			return 2;
		}

		if (me.getSkill(223, 1) || me.getSkill(228, 1)) {
			if (timedSkill > -1 && (!me.getState(121) || !Skill.isTimed(timedSkill))) {
				if (Skill.getRange(timedSkill) < 4 && !Attack.validSpot(unit.x, unit.y)) {
					return 0;
				}

				// Teleport closer
				if (Math.ceil(getDistance(me, unit)) > 10) {
					if (Pather.useTeleport()) {
						Misc.unShift();
					}

					if (!Attack.getIntoPosition(unit, 10, 0x4)) {
						return 0;
					}
				}

				Misc.shapeShift(Config.Wereform);

				if (Math.round(getDistance(me, unit)) > Skill.getRange(timedSkill) || checkCollision(me, unit, 0x4)) {
					if (!Attack.getIntoPosition(unit, Skill.getRange(timedSkill), 0x4, true)) {
						return 0;
					}
				}

				if (!unit.dead) {
					Skill.cast(timedSkill, Skill.getHand(timedSkill), unit);
				}

				if (untimedSkill > -1 && (untimedSkill === 232 || untimedSkill === 238)) {		//Feral rage or Rabies
					if (Math.round(getDistance(me, unit)) > Skill.getRange(untimedSkill) || checkCollision(me, unit, 0x4)) {
						if (!Attack.getIntoPosition(unit, Skill.getRange(untimedSkill), 0x4, true)) {
							return 0;
						}
					}

					if (!unit.dead) {
						Skill.cast(untimedSkill, Skill.getHand(untimedSkill), unit);
					}

					return 1;
				}

				return 1;
			}

			if (untimedSkill > -1) {
				if (Skill.getRange(untimedSkill) < 4 && !Attack.validSpot(unit.x, unit.y)) {
					return 0;
				}

				// Teleport closer
				if (Math.ceil(getDistance(me, unit)) > 10) {
					if (Pather.useTeleport()) {
						Misc.unShift();
					}

					if (!Attack.getIntoPosition(unit, 10, 0x4)) {
						return 0;
					}
				}

				Misc.shapeShift(Config.Wereform);

				if (Math.round(getDistance(me, unit)) > Skill.getRange(untimedSkill) || checkCollision(me, unit, 0x4)) {
					if (!Attack.getIntoPosition(unit, Skill.getRange(untimedSkill), 0x4, true)) {
						return 0;
					}
				}

				if (!unit.dead) {
					Skill.cast(untimedSkill, Skill.getHand(untimedSkill), unit);
				}

				return 1;
			}
		} else {
			if (timedSkill > -1 && (!me.getState(121) || !Skill.isTimed(timedSkill))) {
				switch (timedSkill) {
				case 245: // Tornado
					if (Math.ceil(getDistance(me, unit)) > (Skill.getRange(timedSkill)) || checkCollision(me, unit, 0x4)) {
						if (!Attack.getIntoPosition(unit, (Skill.getRange(timedSkill)), 0x4)) {
							return 0;
						}
					}

					// Randomized x coord changes tornado path and prevents constant missing
					if (!unit.dead) {
						Skill.cast(timedSkill, Skill.getHand(timedSkill), unit.x + rand(-1, 1), unit.y);
					}

					return 1;
				default:
					if (Skill.getRange(timedSkill) < 4 && !Attack.validSpot(unit.x, unit.y)) {
						return 0;
					}

					if (Math.ceil(getDistance(me, unit)) > (Skill.getRange(timedSkill)) || checkCollision(me, unit, 0x4)) {
						// Allow short-distance walking for melee skills
						walk = Skill.getRange(timedSkill) < 4 && getDistance(me, unit) < 10 && !checkCollision(me, unit, 0x1);

						if (!Attack.getIntoPosition(unit, (Skill.getRange(timedSkill)), 0x4, walk)) {
							return 0;
						}
					}

					if (!unit.dead) {
						Skill.cast(timedSkill, Skill.getHand(timedSkill), unit);
					}

					return 1;
				}
			}

			if (untimedSkill > -1) {
				if (Skill.getRange(untimedSkill) < 4 && !Attack.validSpot(unit.x, unit.y)) {
					return 0;
				}

				if (Math.ceil(getDistance(me, unit)) > (Skill.getRange(untimedSkill)) || checkCollision(me, unit, 0x4)) {
					// Allow short-distance walking for melee skills
					walk = Skill.getRange(untimedSkill) < 4 && getDistance(me, unit) < 10 && !checkCollision(me, unit, 0x1);

					if (!Attack.getIntoPosition(unit, (Skill.getRange(untimedSkill)), 0x4, walk)) {
						return 0;
					}
				}

				if (!unit.dead) {
					Skill.cast(untimedSkill, Skill.getHand(untimedSkill), unit);
				}

				return 1;
			}
		}

		for (i = 0; i < 25; i += 1) {
			if (!me.getState(121)) {
				break;
			}

			delay(40);
		}

		return 1;
	};

	ClassAttack.afterAttack = function () {
		if (Pather.useTeleport() && (me.getState(139) || me.getState(140))) {
			Misc.unShift();
		}

		Precast.doPrecast(false);
	};

	break;
case 6: // Assassin
	if (!isIncluded("common/Attacks/Assassin.js")) {
		include("common/Attacks/Assassin.js");
	}

	ClassAttack.doAttack = function (unit, preattack) {
		var index, checkTraps, checkSkill, result, merc = Merc.getMercFix(), timedSkill = -1, untimedSkill = -1;

		if (Config.MercWatch && Town.needMerc()) {
			print("mercwatch");
			Town.visitTown();
		}

		if (!me.getState(159) && me.getSkill(267, 1)) { // keep fade up
			Skill.cast(267, 0);
		}

		switch (typeof Config.AttackSkill[0]) {
		case "object":
			for (let i = 0; i < Config.AttackSkill[0].length; i++) {
				if (preattack && Config.AttackSkill[0][i] > 0 && Attack.checkResist(unit, Config.AttackSkill[0][i]) && (!me.getState(121) || !Skill.isTimed(Config.AttackSkill[0][i]))) {
					if (me.getSkill(Config.AttackSkill[0][i], 1)) {
						if (Math.round(getDistance(me, unit)) > Skill.getRange(Config.AttackSkill[0][i]) || checkCollision(me, unit, 0x4)) {
							if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0][i]), 0x4)) {
								if (i + 1 === Config.AttackSkill[0].length) {
									return false;
								}
							}
						}

						if (Math.round(me.mp * 100 / me.mpmax) > 30) {
							Skill.cast(Config.AttackSkill[0][i], Skill.getHand(Config.AttackSkill[0][i]), unit);
						}

						if (i + 1 === Config.AttackSkill[0].length) {
							return true;
						}
					}
				}
			}

			break;
		case "number":
		default:
			if (preattack && Config.AttackSkill[0] > 0 && Attack.checkResist(unit, Config.AttackSkill[0]) && (!me.getState(121) || !Skill.isTimed(Config.AttackSkill[0]))) {
				if (Math.round(getDistance(me, unit)) > Skill.getRange(Config.AttackSkill[0]) || checkCollision(me, unit, 0x4)) {
					if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0]), 0x4)) {
						return false;
					}
				}

				if (Math.round(me.mp * 100 / me.mpmax) > 30) {
					Skill.cast(Config.AttackSkill[0], Skill.getHand(Config.AttackSkill[0]), unit);
				}

				return true;
			}

			break;
		}

		index = ((unit.spectype & 0x7) || unit.type === 0) ? 1 : 3;

		// Cloak of Shadows (Aggressive) - can't be cast again until previous one runs out and next to useless if cast in precast sequence (won't blind anyone)
		if (Config.AggressiveCloak && Config.UseCloakofShadows && me.getSkill(264, 1) && !me.getState(121) && !me.getState(153)) {
			if (getDistance(me, unit) < 20) {
				Skill.cast(264, 0);
			} else if (!Attack.getIntoPosition(unit, 20, 0x4)) {
				return false;
			}
		}

		checkTraps = this.checkTraps(unit);

		if (checkTraps) {
			if (Math.round(getDistance(me, unit)) > this.trapRange || checkCollision(me, unit, 0x4)) {
				if (!Attack.getIntoPosition(unit, this.trapRange, 0x4) || (checkCollision(me, unit, 0x1) && (getCollision(unit.area, unit.x, unit.y) & 0x1))) {
					return false;
				}
			}

			this.placeTraps(unit, checkTraps);
		}

		// Cloak of Shadows (Defensive; default) - can't be cast again until previous one runs out and next to useless if cast in precast sequence (won't blind anyone)
		if (!Config.AggressiveCloak && Config.UseCloakofShadows && me.getSkill(264, 1) && getDistance(me, unit) < 20 && !me.getState(121) && !me.getState(153)) {
			Skill.cast(264, 0);
		}

		// Get timed skill
		if (Attack.getCustomAttack(unit)) {
			checkSkill = Attack.getCustomAttack(unit)[0];
		} else {
			checkSkill = Config.AttackSkill[index];
		}

		if (Attack.checkResist(unit, checkSkill)) {
			timedSkill = checkSkill;
		} else if (Config.AttackSkill[5] > -1 && Attack.checkResist(unit, Config.AttackSkill[5]) && ([56, 59].indexOf(Config.AttackSkill[5]) === -1 || Attack.validSpot(unit.x, unit.y))) {
			timedSkill = Config.AttackSkill[5];
		}

		// Get untimed skill
		if (Attack.getCustomAttack(unit)) {
			checkSkill = Attack.getCustomAttack(unit)[1];
		} else {
			checkSkill = Config.AttackSkill[index + 1];
		}

		if (Attack.checkResist(unit, checkSkill)) {
			untimedSkill = checkSkill;
		} else if (Config.AttackSkill[6] > -1 && Attack.checkResist(unit, Config.AttackSkill[6]) && ([56, 59].indexOf(Config.AttackSkill[6]) === -1 || Attack.validSpot(unit.x, unit.y))) {
			untimedSkill = Config.AttackSkill[6];
		}

		// Low mana timed skill
		if (Config.LowManaSkill[0] > -1 && Skill.getManaCost(timedSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[0])) {
			timedSkill = Config.LowManaSkill[0];
		}

		// Low mana untimed skill
		if (Config.LowManaSkill[1] > -1 && Skill.getManaCost(untimedSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[1])) {
			untimedSkill = Config.LowManaSkill[1];
		}

		result = this.doCast(unit, timedSkill, untimedSkill);

		switch (result) {
		case 0: // Fail
			break;
		case 1: // Success
			return true;
		case 2: // Try to telestomp
			if (Config.TeleStomp && Attack.checkResist(unit, "physical") && Config.UseMerc) {
				while (Attack.checkMonster(unit)) {
					Misc.townCheck();

					if (!merc) {
						Town.visitTown();
					}

					if (getDistance(me, unit) > 3) {
						Pather.moveToUnit(unit);
					}

					this.doCast(unit, Config.AttackSkill[1], Config.AttackSkill[2]);
				}

				return true;
			}

			break;
		}

		return false;
	};

	break;
}
