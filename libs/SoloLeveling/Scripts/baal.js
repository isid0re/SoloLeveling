/*
 *	@filename	baal.js
 *	@author		isid0re
 *	@credits	kolton, YGM
 *	@desc		clear Throne of Destruction and kill Baal with wave skips
 *	@credits	DarkHorseDre for dopplezon preattack solution https://github.com/kolton/d2bot-with-kolbot/issues/2777
 */

function baal () {
	var portal, tick;

	this.preattack = function () {
		var check;

		switch (me.classid) {
		case 0: // Amazon
			if (me.getSkill(28, 1) && me.getMinionCount(8) < 1) { // cast dopplezon
				Skill.cast(28, 0, 15094 + rand(-1, 1), 5028);
			}

			break;
		case 1: // Sorceress
			switch (Config.AttackSkill[3]) {
			case 49:
			case 53:
			case 56:
			case 59:
			case 64:
				if (me.getState(121)) {
					while (me.getState(121)) {
						delay(100);
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
				check = ClassAttack.checkTraps({x: 15094, y: 5028});

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
		var monster = getUnit(1);

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
		var i, monster,
			monList = [],
			pos = [15094, 5022, 15094, 5041, 15094, 5060, 15094, 5041, 15094, 5022];

		if (Config.AvoidDolls) {
			monster = getUnit(1, 691);

			if (monster) {
				do {
					if (monster.x >= 15072 && monster.x <= 15118 && monster.y >= 5002 && monster.y <= 5079 && Attack.checkMonster(monster) && Attack.skipCheck(monster)) {
						monList.push(copyUnit(monster));
					}
				} while (monster.getNext());
			}

			if (monList.length) {
				Attack.clearList(monList);
			}
		}

		for (i = 0; i < pos.length; i += 2) {
			Pather.moveTo(pos[i], pos[i + 1]);
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
						delay(500);

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
	Pather.moveTo(15093, 5079);
	Attack.clear(20);
	Pather.moveTo(15098, 5115);
	Town.doChores();
	Pather.usePortal(null, me.name);
	Precast.doPrecast(true);
	Attack.clear(20);
	Pather.moveTo(15098, 5029);

	if (me.hell) {
		if (getUnit(1, 691)) {
			print("ÿc9SoloLevelingÿc0: Dolls found! NG.");
			me.overhead("Dolls found! NG.");
		}

		if (Check.Resistance().LR < 75 + me.getStat(42) && getUnit(1, 641)) { // leave game if not max res
			print("ÿc9SoloLevelingÿc0: Souls found! NG.");
			me.overhead("Souls found! NG.");
		}

		return true;
	}

	this.clearThrone();
	tick = getTickCount();

	MainLoop:
	while (true) {
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
				delay(100);
			}

			break;
		}

		if (getDistance(me, 15094, me.classid === 3 ? 5029 : 5038) > 3) {
			Pather.moveTo(15094, me.classid === 3 ? 5029 : 5038);
		}

		delay(10);
	}

	if (SetUp.finalBuild !== "Bumper") {
		Pather.moveTo(15090, 5008);
		delay(5000);
		Precast.doPrecast(true);

		while (getUnit(1, 543)) {
			delay(500);
		}

		portal = getUnit(2, 563);

		if (portal) {
			Pather.usePortal(null, null, portal);
		} else {
			print("ÿc9SoloLevelingÿc0: Couldn't access portal.");
		}

		Pather.moveTo(15134, 5923);
		Attack.kill(544); // Baal
		Pickit.pickItems();
	} else {
		print("ÿc9SoloLevelingÿc0: Bumper check triggered");
	}

	return true;
}
