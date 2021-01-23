/*
*	@filename	PatherOverrides.js
*	@author		isid0re
*	@desc		Pather.js fixes to improve functionality
*/

NodeAction.killMonsters = function (arg) {
	var monList;

	if (Config.Countess.KillGhosts && [21, 22, 23, 24, 25].indexOf(me.area) > -1) {
		monList = Attack.getMob(38, 0, 30);

		if (monList) {
			Attack.clearList(monList);
		}
	}

	if ([8, 3, 38, 6, 27, 28, 33, 56, 57, 60, 45, 58, 61, 66, 67, 68, 69, 70, 71, 72].indexOf(me.area) > -1) {
		monList = Attack.getMob([58, 59, 60, 61, 101, 102, 103, 104], 0, 30); // summoner targeting provided by penguins0690

		if (monList) {
			Attack.clearList(monList);
		}
	}

	if ([39].indexOf(me.area) > -1) {
		let king = getUnit(1, "The Cow King");
		let kingPreset = getPresetUnit(me.area, 1, 773);

		if (king) {
			do {
				if (getDistance(me.x, me.y, getRoom(kingPreset.roomx * 5 + kingPreset.x), getRoom(kingPreset.roomy * 5 + kingPreset.y)) <= 25) {
					Town.goToTown();
					print('ÿc9SoloLevelingÿc0: exit cows. Near the king');
					me.overhead('Exit cows. Near the king');
					D2Bot.printToConsole('SoloLeveling: exit cows. Near the king');
				}
			} while (king.getNext());
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

NodeAction.popChests = function () {
	if (Config.OpenChests) {
		Misc.openChests(Config.ClearPath.Range);
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
					Skill.cast(Config.AttackSkill[1], Skill.getHand(Config.AttackSkill[1]), monstadoor1);
				}

				me.overhead("Broke a barricaded door!");
			}
		} while (monstadoor1.getNext());
	}

	if (monstadoor2) {
		do {
			if ((getDistance(monstadoor2, x, y) < 4 && getDistance(me, monstadoor2) < 9) || getDistance(me, monstadoor2) < 4) {

				for (p = 0; p < 20 && monstadoor2.hp; p += 1) {
					Skill.cast(Config.AttackSkill[1], Skill.getHand(Config.AttackSkill[1]), monstadoor2);
				}

				me.overhead("Broke a barricaded door!");
			}
		} while (monstadoor2.getNext());
	}

	if (monstawall1) {
		do {
			if ((getDistance(monstawall1, x, y) < 4 && getDistance(me, monstawall1) < 9) || getDistance(me, monstawall1) < 4) {

				for (p = 0; p < 20 && monstawall1.hp; p += 1) {
					Skill.cast(Config.AttackSkill[1], Skill.getHand(Config.AttackSkill[1]), monstawall1);
				}

				me.overhead("Broke a barricaded wall!");
			}
		} while (monstawall1.getNext());
	}

	if (monstawall2) {
		do {
			if ((getDistance(monstawall2, x, y) < 4 && getDistance(me, monstawall2) < 9) || getDistance(me, monstawall2) < 4) {

				for (p = 0; p < 20 && monstawall2.hp; p += 1) {
					Skill.cast(Config.AttackSkill[1], Skill.getHand(Config.AttackSkill[1]), monstawall2);
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
	}

	let i, tick = getTickCount(), targetAct = prevAct + 1;

	for (i = 0; i < 12; i += 1) {
		while (getTickCount() - tick < Math.max(Math.round((i + 1) * 1000 / (i / 5 + 1)), me.ping * 2)) {
			if (me.act === targetAct) {
				delay(100);

				return true;
			}

			delay(10);
		}
	}

	return true;
};

Pather.useUnit = function (type, id, targetArea) {
	var i, tick, unit, coord,
		preArea = me.area;

	for (i = 0; i < 5; i += 1) {
		unit = getUnit(type, id);

		if (unit) {
			break;
		}

		delay(200);
	}

	if (!unit) {
		print("ÿc9SoloLevelingÿc0: Unit not found. Attempting portal trick");
		Town.goToTown();
		Pather.usePortal(null, me.name);

		for (i = 0; i < 5; i += 1) {
			unit = getUnit(type, id);

			if (unit) {
				break;
			}

			delay(200);
		}

		if (!unit) {
			throw new Error("useUnit: Unit not found. ID: " + id);
		}
	}

	for (i = 0; i < 3; i += 1) {
		if (getDistance(me, unit) > 5) {
			this.moveToUnit(unit);
		}

		if (type === 2 && unit.mode === 0) {
			if ((me.area === 83 && targetArea === 100 && me.getQuest(21, 0) !== 1) || (me.area === 120 && targetArea === 128 && me.getQuest(39, 0) !== 1)) {
				throw new Error("useUnit: Incomplete quest.");
			}

			if (me.area === 92) {
				this.openUnit(2, 367);
			} else {
				this.openUnit(2, id);
			}
		}

		delay(300);

		if (type === 5) {
			Misc.click(0, 0, unit);
		} else {
			sendPacket(1, 0x13, 4, unit.type, 4, unit.gid);
		}

		tick = getTickCount();

		while (getTickCount() - tick < 3000) {
			if ((!targetArea && me.area !== preArea) || me.area === targetArea) {
				delay(100);

				return true;
			}

			delay(10);
		}

		coord = CollMap.getRandCoordinate(me.x, -1, 1, me.y, -1, 1, 3);
		this.moveTo(coord.x, coord.y);
	}

	return targetArea ? me.area === targetArea : me.area !== preArea;
};
