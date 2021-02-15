/*
*	@filename	Quest.js
*	@author		isid0re
*	@desc		Miscellaneous quest tasks for leveling
*/
var Quest = {
	preReqs: function () {
		if (me.act === 2 && !Misc.checkQuest(10, 0) && !me.getItem(91)) { // horadric staff
			if (!me.getItem(521)) {
				if (!isIncluded("SoloLeveling/Scripts/amulet.js")) {
					include("SoloLeveling/Scripts/amulet.js");
				}

				for (let getAmmy = 0; getAmmy < 5; getAmmy++) {
					amulet();
				}
			}

			if (!me.getItem(92)) {
				if (!isIncluded("SoloLeveling/Scripts/staff.js")) {
					include("SoloLeveling/Scripts/staff.js");
				}

				for (let getStaff = 0; getStaff < 5; getStaff++) {
					staff();
				}
			}
		}

		if (me.act === 3 && !Misc.checkQuest(18, 0) && !me.getItem(174)) { // khalim's will
			if (!me.getItem(553)) {
				if (!isIncluded("SoloLeveling/Scripts/eye.js")) {
					include("SoloLeveling/Scripts/eye.js");
				}

				for (let getEye = 0; getEye < 5; getEye++) {
					eye();
				}
			}

			if (!me.getItem(554)) {
				if (!isIncluded("SoloLeveling/Scripts/heart.js")) {
					include("SoloLeveling/Scripts/heart.js");
				}

				for (let getHeart = 0; getHeart < 5; getHeart++) {
					heart();
				}
			}

			if (!me.getItem(555)) {
				if (!isIncluded("SoloLeveling/Scripts/brain.js")) {
					include("SoloLeveling/Scripts/brain.js");
				}

				for (let getBrain = 0; getBrain < 5; getBrain++) {
					brain();
				}
			}
		}
	},

	cubeItems: function (outcome, ...classids) {
		if (me.getItem(outcome) || outcome === 91 && Misc.checkQuest(10, 0) || outcome === 174 && Misc.checkQuest(18, 0)) {
			return true;
		}

		if (!me.inTown) {
			Town.goToTown();
		}

		if (outcome === 91) {
			me.overhead('cubing staff');
		} else if (outcome === 174) {
			me.overhead('cubing flail');
		}

		Town.doChores();
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
			if (Cubing.openCube()) {
				transmute();
				delay(750 + me.ping);

				wantedItem = me.getItem(outcome);

				if (wantedItem) {
					Storage.Inventory.MoveTo(wantedItem);
					me.cancel();

					break;
				}
			}
		}

		me.cancel();

		return me.getItem(outcome);
	},

	placeStaff: function () {
		let tick = getTickCount();
		let orifice = getUnit(2, 152);
		let hstaff = me.getItem(91);

		if (Misc.checkQuest(10, 0)) {
			return true;
		}

		if (!orifice) {
			return false;
		}

		if (!hstaff) {
			Quest.cubeItems(91, 92, 521);
		}

		if (hstaff) {
			if (hstaff.location !== 3) {
				if (!me.inTown) {
					Town.goToTown();
				}

				if (Storage.Inventory.CanFit(hstaff)) {
					if (hstaff.location === 6) {
						Cubing.openCube();
					}

					Storage.Inventory.MoveTo(hstaff);
				} else {
					Town.clearJunk();
					Town.organizeInventory();

					if (hstaff.location === 6) {
						Cubing.openCube();
					}

					Storage.Inventory.MoveTo(hstaff);
				}

				me.cancel();
				Pather.usePortal(null, me.name);
			}
		}

		Pather.moveToPreset(me.area, 2, 152);
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

		return true;
	},

	tyraelTomb: function () {
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

		if (!me.inTown) {
			Town.goToTown();
		}

		return true;
	},

	stashItem: function (classid) {
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
	},

	collectItem: function (classid, chestID) {
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

			delay(100 + me.ping);
		}

		if (Storage.Inventory.CanFit(questItem)) {
			Pickit.pickItem(questItem);
		} else {
			Town.clearJunk();
			Town.organizeInventory();
			Pickit.pickItem(questItem);
			Pickit.pickItems();
		}

		return me.getItem(classid);
	},

	equipItem: function (item, loc) {
		let newitem = me.getItem(item);
		me.cancel();

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
				print("ÿc9SoloLevelingÿc0: failed to equip item.(Quest.equipItem)");
			}
		} else {
			print("ÿc9SoloLevelingÿc0: Lost item before trying to equip it. (Quest.equipItem)");
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

		return true;
	},

	smashSomething: function (smashable) {
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

		if (Item.getEquippedItem(4).classid !== tool) {
			return false;
		}

		while (me.getItem(tool)) {
			Pather.moveToUnit(something, 0, 0, Config.ClearType, false);
			Skill.cast(0, 0, something);
			something.interact();

			delay(750 + me.ping);
		}

		return !me.getItem(tool);
	},
};
