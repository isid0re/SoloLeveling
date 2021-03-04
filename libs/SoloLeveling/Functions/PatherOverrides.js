/*
*	@filename	PatherOverrides.js
*	@author		isid0re, theBGuy
*	@desc		Pather.js fixes to improve functionality
*/

if (!isIncluded("common/Pather.js")) {
	include("common/Pather.js");
}

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

		let well = getUnit(2, "Well", 0);

		if (well) {
			do {
				if (getDistance(me, well) <= 5 || Pather.moveToUnit(well, 3, 0)) {
					for (let w = 0; w < 3; w++) {
						Misc.click(0, 0, well);
						delay(25 + me.ping);
					}
				}
			} while (well.getNext());
		}
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

					if (i === 2) {
						Packet.flash(me.gid);
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

Pather.moveTo = function (x, y, retry, clearPath, pop) {
	if (me.dead) { // Abort if dead
		return false;
	}

	var i, path, adjustedNode, cleared, useTeleport,
		node = {x: x, y: y},
		fail = 0;

	for (i = 0; i < this.cancelFlags.length; i += 1) {
		if (getUIFlag(this.cancelFlags[i])) {
			me.cancel();
		}
	}

	if (getDistance(me, x, y) < 2) {
		return true;
	}

	if (x === undefined || y === undefined) {
		throw new Error("moveTo: Function must be called with at least 2 arguments.");
	}

	if (typeof x !== "number" || typeof y !== "number") {
		throw new Error("moveTo: Coords must be numbers");
	}

	if (retry === undefined) {
		retry = 15;
	}

	if (clearPath === undefined) {
		clearPath = false;
	}

	if (pop === undefined) {
		pop = false;
	}

	useTeleport = this.useTeleport();
	path = getPath(me.area, x, y, me.x, me.y, useTeleport ? 1 : 0, useTeleport ? ([62, 63, 64].indexOf(me.area) > -1 ? 30 : this.teleDistance) : this.walkDistance);

	if (!path) {
		throw new Error("moveTo: Failed to generate path.");
	}

	path.reverse();

	if (pop) {
		path.pop();
	}

	PathDebug.drawPath(path);

	if (useTeleport && Config.TeleSwitch && path.length > 5) {
		Attack.weaponSwitch(Attack.getPrimarySlot() ^ 1);
	}

	while (path.length > 0) {
		if (me.dead) { // Abort if dead
			return false;
		}

		for (i = 0; i < this.cancelFlags.length; i += 1) {
			if (getUIFlag(this.cancelFlags[i])) {
				me.cancel();
			}
		}

		node = path.shift();

		if (getDistance(me, node) > 2) {
			if ([62, 63, 64].indexOf(me.area) > -1) {
				adjustedNode = this.getNearestWalkable(node.x, node.y, 15, 3, 0x1 | 0x4 | 0x800 | 0x1000);

				if (adjustedNode) {
					node.x = adjustedNode[0];
					node.y = adjustedNode[1];
				}
			}

			if (useTeleport ? this.teleportTo(node.x, node.y) : this.walkTo(node.x, node.y, (fail > 0 || me.inTown) ? 2 : 4)) {
				if (!me.inTown) {
					if (this.recursion) {
						this.recursion = false;

						NodeAction.go({clearPath: clearPath});

						if (getDistance(me, node.x, node.y) > 5) {
							this.moveTo(node.x, node.y);
						}

						this.recursion = true;
					}

					Misc.townCheck();
				}
			} else {
				if (fail > 0 && !useTeleport && !me.inTown) {
					if (!cleared) {
						Attack.clear(5);

						cleared = true;
					}

					if (fail > 1 && me.getSkill(143, 1)) {
						Skill.cast(143, 0, node.x, node.y);
					}
				}

				path = getPath(me.area, x, y, me.x, me.y, useTeleport ? 1 : 0, useTeleport ? rand(25, 35) : rand(10, 15));
				fail += 1;

				if (!path) {
					throw new Error("moveTo: Failed to generate path.");
				}

				path.reverse();
				PathDebug.drawPath(path);

				if (pop) {
					path.pop();
				}

				print("move retry " + fail);

				if (fail > 0) {
					Packet.flash(me.gid);

					if (fail >= retry) {
						break;
					}
				}
			}
		}

		delay(5);
	}

	if (useTeleport && Config.TeleSwitch) {
		Attack.weaponSwitch(Attack.getPrimarySlot());
	}

	PathDebug.removeHooks();

	return getDistance(me, node.x, node.y) < 5;
};

Pather.makePortal = function (use) {
	if (me.inTown) {
		return true;
	}

	var i, portal, oldPortal, oldGid, tick, tpTome, tpScroll;

	for (i = 0; i < 5; i += 1) {
		if (me.dead) {
			break;
		}

		tpScroll = me.findItem("tsc", 0, 3);
		tpTome = me.findItem("tbk", 0, 3);

		if (!tpTome && !tpScroll) {
			return false;
		}

		if ((tpTome && !tpTome.getStat(70)) && !tpScroll) {
			return false;
		}

		oldPortal = getUnit(2, "portal");

		if (oldPortal) {
			do {
				if (oldPortal.getParent() === me.name) {
					oldGid = oldPortal.gid;

					break;
				}
			} while (oldPortal.getNext());
		}

		if (!tpTome) {
			tpScroll.interact();
		} else {
			tpTome.interact();
		}

		tick = getTickCount();

		MainLoop:
		while (getTickCount() - tick < Math.max(500 + i * 100, me.ping * 2 + 100)) {
			portal = getUnit(2, "portal");

			if (portal) {
				do {
					if (portal.getParent() === me.name && portal.gid !== oldGid) {
						if (use) {
							if (Pather.usePortal(null, null, copyUnit(portal))) {
								return true;
							}

							break MainLoop; // don't spam usePortal
						} else {
							return copyUnit(portal);
						}
					}
				} while (portal.getNext());
			}

			delay(10);
		}

		Packet.flash(me.gid);
		delay(200 + me.ping);
	}

	return false;
};

//No more failing to get some place
Pather.clearToExit = function (currentarea, targetarea, cleartype) { //Legacy Autosmurf
	print("Start clearToExit");

	print("Currently in: " + Pather.getAreaName(me.area));
	print("Currentarea arg: " + Pather.getAreaName(me.area));

	delay(250);
	print("Clearing to: " + Pather.getAreaName(targetarea));
	while (me.area == currentarea) {
		try {
			Pather.moveToExit(targetarea, true, cleartype);
		} catch (e) {
			print("Caught Error.");

			print(e);
		}

		Packet.flash(me.gid);

		delay(me.ping * 2 + 500);
	}

	print("End clearToExit");
};

//Added to try to attack if fail to move and not in town
Pather.walkTo = function (x, y, minDist) {
	while (!me.gameReady) {
		delay(100);
	}

	if (minDist === undefined) {
		minDist = me.inTown ? 2 : 4;
	}

	var i, angle, angles, nTimer, whereToClick, tick,
		nFail = 0,
		attemptCount = 0;

	// Stamina handler and Charge
	if (!me.inTown && !me.dead) {
		if (me.runwalk === 1 && me.stamina / me.staminamax * 100 <= 20) {
			me.runwalk = 0;
		}

		if (me.runwalk === 0 && me.stamina / me.staminamax * 100 >= 50) {
			me.runwalk = 1;
		}

		if (Config.Charge && me.classid === 3 && me.mp >= 9 && getDistance(me.x, me.y, x, y) > 8 && Skill.setSkill(107, 1)) {
			if (Config.Vigor) {
				Skill.setSkill(115, 0);
			}

			Misc.click(0, 1, x, y);

			while (me.mode !== 1 && me.mode !== 5 && !me.dead) {
				delay(40);
			}
		}
	}

	if (me.inTown && me.runwalk === 0) {
		me.runwalk = 1;
	}

	while (getDistance(me.x, me.y, x, y) > minDist && !me.dead) {
		if (me.classid === 3 && Config.Vigor) {
			Skill.setSkill(115, 0);
		}

		if (this.openDoors(x, y) && getDistance(me.x, me.y, x, y) <= minDist) {
			return true;
		}

		Misc.click(0, 0, x, y);

		attemptCount += 1;
		nTimer = getTickCount();

ModeLoop:
		while (me.mode !== 2 && me.mode !== 3 && me.mode !== 6) {
			if (me.dead) {
				return false;
			}

			if ((getTickCount() - nTimer) > 500) {
				nFail += 1;
					
				if (nFail >= 1 && !me.inTown) {
					Attack.clear(5)
				}					

				if (nFail >= 3) {
					return false;
				}

				angle = Math.atan2(me.y - y, me.x - x);
				angles = [Math.PI / 2, -Math.PI / 2];

				for (i = 0; i < angles.length; i += 1) {
					// TODO: might need rework into getnearestwalkable
					whereToClick = {
						x: Math.round(Math.cos(angle + angles[i]) * 5 + me.x),
						y: Math.round(Math.sin(angle + angles[i]) * 5 + me.y)
					};

					if (Attack.validSpot(whereToClick.x, whereToClick.y)) {
						Misc.click(0, 0, whereToClick.x, whereToClick.y);

						tick = getTickCount();

						while (getDistance(me, whereToClick) > 2 && getTickCount() - tick < 1000) {
							delay(40);
						}

						break;
					}
				}

				break ModeLoop;
			}

			delay(10);
		}

		// Wait until we're done walking - idle or dead
		while (getDistance(me.x, me.y, x, y) > minDist && me.mode !== 1 && me.mode !== 5 && !me.dead) {
			delay(10);
		}

		if (attemptCount >= 3) {
			return false;
		}
	}

	return !me.dead && getDistance(me.x, me.y, x, y) <= minDist;
};

//Added clearpath parameter
Pather.getWP = function (area, clearPath) {
	var i, j, wp, preset,
		wpIDs = [119, 145, 156, 157, 237, 238, 288, 323, 324, 398, 402, 429, 494, 496, 511, 539];

	if (area !== me.area) {
		this.journeyTo(area, clearPath);
	}

	for (i = 0; i < wpIDs.length; i += 1) {
		try { //Todo maybe check if the areas being checked are in current act, ignoring the error also works tho.
			preset = getPresetUnit(area, 2, wpIDs[i]);
		} catch (e) {
			preset = false;
		}
			
		if (preset) {
			this.moveToUnit(preset, 0, 0, clearPath);

			wp = getUnit(2, "waypoint");

			if (wp) {
				for (j = 0; j < 10; j += 1) {
					Misc.click(0, 0, wp);

					if (getUIFlag(0x14)) {
						delay(500);
						me.cancel();

						return true;
					}

					delay(500);
				}
			}
		}
	}

	return false;
};

//Added clearpath parameter
Pather.journeyTo = function (area, clearPath=false) {
	var i, special, unit, tick, target;

	target = this.plotCourse(area, me.area);

	print(target.course);

	if (target.useWP) {
		Town.goToTown();
	}

	// handle variable flayer jungle entrances
	if (target.course.indexOf(78) > -1) {
		Town.goToTown(3); // without initiated act, getArea().exits will crash

		special = getArea(78);

		if (special) {
			special = special.exits;

			for (i = 0; i < special.length; i += 1) {
				if (special[i].target === 77) {
					target.course.splice(target.course.indexOf(78), 0, 77); // add great marsh if needed

					break;
				}
			}
		}
	}

	while (target.course.length) {
		if (!me.inTown) {
			Precast.doPrecast(false);
		}

		if (this.wpAreas.indexOf(me.area) > -1 && !getWaypoint(this.wpAreas.indexOf(me.area))) {
			this.getWP(me.area, clearPath);
		}

		if (me.inTown && this.wpAreas.indexOf(target.course[0]) > -1 && getWaypoint(this.wpAreas.indexOf(target.course[0]))) {
			this.useWaypoint(target.course[0], !this.plotCourse_openedWpMenu);
			Precast.doPrecast(false);
		} else if ([null, 40, 75, 103, 109].indexOf(target.course[0]) > -1 && !getWaypoint(Pather.wpAreas.indexOf(target.course[0]))) { // It's a town but we dont have the wp yet - something happened between finishing acts and moving to the next act
			switch (target.course[0]) {
				case 40:
					if (Misc.checkQuest(6, 1) || Misc.checkQuest(6, 0)) {
						Town.npcInteract("warriv");
						Pather.changeAct(2);
					}
					break;
				case 75:
					break;   
				case 103:
					if (Misc.checkQuest(23, 0)) {
						Pather.useWaypoint(101);
						Pather.moveToExit(102, true);
						Pather.moveTo(17590, 8068);
						delay(1500);
						Pather.usePortal(null);
					}
					break;
				case 109:
					if (Misc.checkQuest(26, 0)) {
						Town.goToTown(4);
						Town.npcInteract("tyrael");
						Pather.changeAct(5);
					}
					break;        
			}				
		} else if (me.area === 109 && target.course[0] === 110) { // Harrogath -> Bloody Foothills
			this.moveTo(5026, 5095);

			unit = getUnit(2, 449); // Gate

			if (unit) {
				for (i = 0; i < 3; i += 1) {
					if (unit.mode) {
						break;
					}

					Misc.click(0, 0, unit);

					tick = getTickCount();

					while (getTickCount() - tick < 3000) {
						if (unit.mode) {
							delay(1000);

							break;
						}

						delay(10);
					}
				}
			}

			this.moveToExit(target.course[0], true, clearPath);
		} else if (me.area === 4 && target.course[0] === 38) { // Stony Field -> Tristram
			this.moveToPreset(me.area, 1, 737, 0, 0, false, true);

			for (i = 0; i < 5; i += 1) {
				if (this.usePortal(38)) {
					break;
				}

				delay(1000);
			}
		} else if (me.area === 40 && target.course[0] === 47) { // Lut Gholein -> Sewers Level 1 (use Trapdoor)
			this.moveToPreset(me.area, 5, 19);
			this.useUnit(2, 74, 47);
		} else if (me.area === 74 && target.course[0] === 46) { // Arcane Sanctuary -> Canyon of the Magi
			this.moveToPreset(me.area, 2, 357);

			for (i = 0; i < 5; i += 1) {
				unit = getUnit(2, 357);

				Misc.click(0, 0, unit);
				delay(1000);
				me.cancel();

				if (this.usePortal(46)) {
					break;
				}
			}
		} else if (me.area === 54 && target.course[0] === 74) { // Palace -> Arcane
			this.moveTo(10073, 8670, 5, clearPath);
			this.usePortal(null);
		} else if (me.area === 109 && target.course[0] === 121) { // Harrogath -> Nihlathak's Temple
			Town.move(NPC.Anya);
			this.usePortal(121);
		} else if (me.area === 111 && target.course[0] === 125) { // Abaddon
			this.moveToPreset(111, 2, 60);
			this.usePortal(125);
		} else if (me.area === 112 && target.course[0] === 126) { // Pits of Archeon
			this.moveToPreset(112, 2, 60);
			this.usePortal(126);
		} else if (me.area === 117 && target.course[0] === 127) { // Infernal Pit
			this.moveToPreset(117, 2, 60);
			this.usePortal(127);
		} else {
			this.moveToExit(target.course[0], true, clearPath);
		}

		target.course.shift();
	}

	return me.area === area;
};

//Add check in case "random" to return false if bot doesn't have cold plains wp yet
Pather.useWaypoint = function useWaypoint(targetArea, check) {
	switch (targetArea) {
	case undefined:
		throw new Error("useWaypoint: Invalid targetArea parameter: " + targetArea);
	case null:
	case "random":
		check = true;

		break;
	default:
		if (typeof targetArea !== "number") {
			throw new Error("useWaypoint: Invalid targetArea parameter");
		}

		if (this.wpAreas.indexOf(targetArea) < 0) {
			throw new Error("useWaypoint: Invalid area");
		}

		break;
	}

	var i, tick, wp, coord, retry, npc;

	for (i = 0; i < 12; i += 1) {
		if (me.area === targetArea || me.dead) {
			break;
		}

		if (me.inTown) {
			npc = getUnit(1, NPC.Warriv);

			if (me.area === 40 && npc && getDistance(me, npc) < 50) {
				if (npc && npc.openMenu()) {
					Misc.useMenu(0x0D37);

					if (!Misc.poll(function () {
						return me.area === 1;
					}, 2000, 100)) {
						throw new Error("Failed to go to act 1 using Warriv");
					}
				}
			}

			Town.move("waypoint");
		}

		wp = getUnit(2, "waypoint");

		if (wp && wp.area === me.area) {
			if (!me.inTown && getDistance(me, wp) > 7) {
				this.moveToUnit(wp);
			}

			if (check || Config.WaypointMenu) {
				if (getDistance(me, wp) > 5) {
					this.moveToUnit(wp);
				}

				Misc.click(0, 0, wp);

				tick = getTickCount();

				while (getTickCount() - tick < Math.max(Math.round((i + 1) * 1000 / (i / 5 + 1)), me.ping * 2)) {
					if (getUIFlag(0x14)) { // Waypoint screen is open
						delay(500);

						switch (targetArea) {
						case "random":
							if (!Pather.checkWP(3)) {
								return false;
							}

							while (true) {
								targetArea = this.wpAreas[rand(0, this.wpAreas.length - 1)];

								// get a valid wp, avoid towns
								if ([1, 40, 75, 103, 109].indexOf(targetArea) === -1 && getWaypoint(this.wpAreas.indexOf(targetArea))) {
										break;
								}

								delay(5);
							}

							break;
						case null:
							me.cancel();

							return true;
						}

						if (!getWaypoint(this.wpAreas.indexOf(targetArea))) {
							me.cancel();
							me.overhead("Trying to get the waypoint");

							if (this.getWP(targetArea)) {
								return true;
							}

							throw new Error("Pather.useWaypoint: Failed to go to waypoint");
						}

						break;
					}

					delay(10);
				}

				if (!getUIFlag(0x14)) {
					print("waypoint retry " + (i + 1));
					retry = Math.min(i + 1, 5)
					coord = CollMap.getRandCoordinate(me.x, -5 * retry, 5 * retry, me.y, -5 * retry, 5 * retry);
					this.moveTo(coord.x, coord.y);
					delay(200 + me.ping);

					Packet.flash(me.gid);

					continue;
				}
			}

			if (!check || getUIFlag(0x14)) {
				delay(200);
				wp.interact(targetArea);

				tick = getTickCount();

				while (getTickCount() - tick < Math.max(Math.round((i + 1) * 1000 / (i / 5 + 1)), me.ping * 2)) {
					if (me.area === targetArea) {
						delay(100);

						return true;
					}

					delay(10);
				}

				me.cancel(); // In case lag causes the wp menu to stay open
			}

			Packet.flash(me.gid);

			if (i > 1) { // Activate check if we fail direct interact twice
				check = true;
			}
		} else {
			Packet.flash(me.gid);
		}

		delay(200 + me.ping);
	}

	if (me.area === targetArea) {
		return true;
	}

	throw new Error("useWaypoint: Failed to use waypoint");
};

