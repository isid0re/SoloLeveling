/*
*	@filename	ItemOverrides.js
*	@author		isid0re
*	@desc		Misc.js Item function fixes to improve functionality and Autoequip
*	@credits	dzik for the merc autoequip, kolton
*/

if (!isIncluded("common/Misc.js")) {
	include("common/Misc.js");
}

Item.getEquippedItem = function (bodyLoc) {
	var item = me.getItem();

	if (item) {
		do {
			if (item.bodylocation === bodyLoc) {
				return {
					itemType: item.itemType,
					classid: item.classid,
					name: item.fname,
					sockets: item.getStat(194),
					prefixnum: item.prefixnum,
					tier: NTIP.GetTier(item),
					swaptier: NTIP.GetSwapTier(item)
				};
			}
		} while (item.getNext());
	}

	return {
		itemType: -1,
		classid: -1,
		name: "none",
		sockets: 0,
		prefixnum: -1,
		tier: -1,
		swaptier: -1
	};
};

Item.equippedBodyLoc = null;

Item.getBodyLoc = function (item) {
	var bodyLoc;

	switch (item.itemType) {
	case 2: // Shield
	case 5: // Arrows
	case 6: // Bolts
	case 69: // Voodoo Heads
	case 70: // Auric Shields
		bodyLoc = [5, 12];

		break;
	case 3: // Armor
		bodyLoc = 3;

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
	case 68: //
	case 85: //
	case 86: //
	case 87: //
		if (me.barbarian) {
			bodyLoc = [4, 5];

			break;
		}

		bodyLoc = [4, 11];

		break;
	case 67: // Handtohand (Assasin Claw)
	case 88: //
		bodyLoc = [4, 5];

		break;
	default:
		return false;
	}

	if (typeof bodyLoc === "number") {
		bodyLoc = [bodyLoc];
	}

	return bodyLoc;
};

Item.autoEquipCheck = function (item) {
	if (!Config.AutoEquip) {
		return true;
	}

	var i,
		tier = NTIP.GetTier(item),
		bodyLoc = this.getBodyLoc(item);

	if (this.hasTier(item) && tier > 0 && bodyLoc) {
		for (i = 0; i < bodyLoc.length; i += 1) {
			this.equippedBodyLoc = bodyLoc[i];

			if (bodyLoc[i] < 11 && tier > this.getEquippedItem(bodyLoc[i]).tier) {
				this.equippedBodyLoc = null;

				return true;
			}
		}
	}

	return false;
};

Item.hasSwapTier = function (item) {
	return Config.AutoEquip && NTIP.GetSwapTier(item) > 0;
};

Item.autoEquipCheckSwap = function (item) {
	if (!Config.AutoEquip) {
		return true;
	}

	var i,
		swaptier = NTIP.GetSwapTier(item),
		bodyLoc = this.getBodyLoc(item);

	if (this.hasSwapTier(item) && swaptier > 0 && bodyLoc) {
		for (i = 0; i < bodyLoc.length; i += 1) {
			this.equippedBodyLoc = bodyLoc[i];

			if (bodyLoc[i] > 10 && swaptier > this.getEquippedItem(bodyLoc[i]).swaptier) {
				this.equippedBodyLoc = null;

				return true;
			}
		}
	}

	return false;
};

Item.autoEquip = function () {
	if (!Config.AutoEquip) {
		return true;
	}

	var i, j, tier, bodyLoc, tome, gid, swaptier,
		items = me.findItems(-1, 0);

	if (!items) {
		return false;
	}

	function sortEq (a, b) {
		if (Item.canEquip(a)) {
			return -1;
		}

		if (Item.canEquip(b)) {
			return 1;
		}

		return 0;
	}

	me.cancel();

	// Remove items without tier
	for (i = 0; i < items.length; i += 1) {
		if (NTIP.GetTier(items[i]) === 0 && NTIP.GetSwapTier(items[i]) === 0) {
			items.splice(i, 1);

			i -= 1;
		}
	}

	while (items.length > 0) {
		items.sort(sortEq);

		bodyLoc = this.getBodyLoc(items[0]);
		tier = NTIP.GetTier(items[0]);
		swaptier = NTIP.GetSwapTier(items[0]);

		if (tier > 0 && bodyLoc) {
			for (j = 0; j < bodyLoc.length; j += 1) {
				if (bodyLoc[j] < 11 && [3, 7].indexOf(items[0].location) > -1 && tier > this.getEquippedItem(bodyLoc[j]).tier && this.getEquippedItem(bodyLoc[j]).classid !== 174) { // khalim's will adjustment
					if (!items[0].getFlag(0x10)) { // unid
						tome = me.findItem(519, 0, 3);

						if (tome && tome.getStat(70) > 0) {
							if (items[0].location === 7) {
								Town.openStash();
							}

							Town.identifyItem(items[0], tome);
						}
					}

					gid = items[0].gid;
					print(items[0].name);

					if (this.equip(items[0], bodyLoc[j])) {
						Misc.logItem("Equipped", me.getItem(-1, -1, gid));

						if (Developer.logEquipped) {
							MuleLogger.logEquippedItems();
						}
					}

					break;
				}
			}
		}

		if (swaptier > 0 && bodyLoc) {
			for (j = 0; j < bodyLoc.length; j += 1) {
				if (bodyLoc[j] > 10 && [3, 7].indexOf(items[0].location) > -1 && swaptier > this.getEquippedItem(bodyLoc[j]).swaptier && this.getEquippedItem(bodyLoc[j]).classid !== 174) { // khalim's will adjustment
					if (!items[0].getFlag(0x10)) { // unid
						tome = me.findItem(519, 0, 3);

						if (tome && tome.getStat(70) > 0) {
							if (items[0].location === 7) {
								Town.openStash();
							}

							Town.identifyItem(items[0], tome);
						}
					}

					gid = items[0].gid;
					print(items[0].name);
					Attack.weaponSwitch();

					if (this.equip(items[0], bodyLoc[j])) {
						Misc.logItem("Equipped", me.getItem(-1, -1, gid));

						if (Developer.logEquipped) {
							MuleLogger.logEquippedItems();
						}
					}

					Attack.weaponSwitch();

					break;
				}
			}
		}

		items.shift();
	}

	return true;
};

Item.equip = function (item, bodyLoc) {
	if (!this.canEquip(item)) {
		return false;
	}

	// Already equipped in the right slot
	if (item.mode === 1 && item.bodylocation === bodyLoc) {
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
			clickItemAndWait(0, bodyLoc);

			if (item.bodylocation === bodyLoc) {
				if (getCursorType() === 3) {
					cursorItem = getUnit(100);

					if (cursorItem) {
						if (Pickit.checkItem(cursorItem).result === 1) { // only keep wanted items
							if (Storage.Inventory.CanFit(cursorItem)) {
								Storage.Inventory.MoveTo(cursorItem);
							}
						} else {
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

Item.removeItem = function (bodyLoc) {
	let cursorItem,
		removable = me.getItems()
			.filter(item =>
				item.location === 1 // Needs to be equipped
				&& item.bodylocation === bodyLoc
			)
			.first();

	if (removable) {
		removable.toCursor();
		cursorItem = getUnit(100);

		if (cursorItem) {
			if (Pickit.checkItem(cursorItem).result === 1) { // only keep wanted items
				if (Storage.Inventory.CanFit(cursorItem)) {
					Storage.Inventory.MoveTo(cursorItem);
				}
			} else {
				cursorItem.drop();
			}
		}

		return true;
	}

	return false;
};

Item.autoEquipSockets = function () {
	var equipped;

	if (me.getItem(617) && this.getEquippedItemMerc(1).name.includes("Andariel's") && this.getEquippedItemMerc(1).sockets > 0 && this.getEquippedItemMerc(1).description.includes("Fire Resist")) { // add ral to andy's visage
		this.removeItemsMerc(1);
		equipped = me.findItem(428, 0, 3);
		this.fillSockets(equipped, 617);
		this.equipMerc(equipped, 1);
	}

	if (me.getItem(586) && this.getEquippedItem(5).name.includes("Moser's")) { // add pdiamonds to Moser's Blessed Circle
		this.removeItem(5);
		equipped = me.findItem(375, 0, 3); //mosers's
		this.fillSockets(equipped, 586, 586);
		this.equip(equipped, 5);
	}

	if (me.getItem(631) && this.getEquippedItem(1).sockets > 0 && this.getEquippedItem(1).name.includes("Harlequin")) { // add Um to Shako
		this.removeItem(1);
		equipped = me.findItem(422, 0, 3); // shako Harlequin's Crest
		this.fillSockets(equipped, 631);
		this.equip(equipped, 1);
	}
};

Item.fillSockets = function (baseitem, ...insertables) {
	if (!baseitem || baseitem.getStat(194) === 0) { //no sockets or item
		return true;
	}

	if (!me.inTown) {
		Town.goToTown();
	}

	let	totalSockets = baseitem.getStat(194), usedSocketItems = Misc.getUsedSockets(baseitem).filter(classid => classid !== "gemsocket");

	for (let socket = 0; socket < totalSockets; socket++) {// check each socket for insertable
		let insertable = insertables[socket], usedInsertableType = usedSocketItems.filter(classid => classid === insertable), neededInsertableType = insertables.filter(classid => classid === insertable), socketItem = me.getItem(insertable);

		if (usedSocketItems.length < totalSockets && usedInsertableType.length < neededInsertableType.length && socketItem) {
			if (!getUIFlag(0x19)) {
				Town.move('stash');
				Town.openStash();
			}

			if (!Runewords.socketItem(baseitem, socketItem)) {
				print('ÿc9SoloLevelingÿc0: failed to socket ' + socketItem.name + ' into ' + baseitem.name);

				return false;
			}

			print('ÿc9SoloLevelingÿc0: socketed ' + socketItem.name + ' into ' + baseitem.name);
		}
	}

	me.cancel();

	return true;
};

Item.hasCharmTier = function (item) {
	return Config.AutoEquip && NTIP.GetCharmTier(item) > 0;
};

Item.canEquipCharm = function (item) {
	if ([603, 604, 605].indexOf(item.classid) < 0) { // Not a charm
		return false;
	}

	if (!item.getFlag(0x10)) { // Unid item
		return false;
	}

	if (item.getStat(92) > me.getStat(12)) { // Higher level requirement
		return false;
	}

	return true;
};

Item.equipCharm = function (item) {
	let cursorItem, charmID = [603, 604, 605].indexOf(item.classid), equipped = this.equippedCharms[charmID], lowestrank = equipped.first();

	if (!this.canEquipCharm(item)) {
		return false;
	}

	if (item.location === 7) {
		Town.openStash();

		if (Storage.Inventory.CanFit(item)) {
			Storage.Inventory.MoveTo(item);
		}

		me.cancel();
	}

	if (equipped.map(x => x.gid).indexOf(item.gid) !== -1 && equipped.length === this.getCharmLimit(item.classid)) {
		if (item.toCursor()) {
			clickItemAndWait(0, lowestrank.y, lowestrank.x, 3);

			if (item.location === 3 && item.x === lowestrank.x && item.y === lowestrank.y) {
				if (getCursorType() === 3) {
					cursorItem = getUnit(100);

					if (cursorItem) {
						if (Pickit.checkItem(lowestrank).result !== 1) {
							lowestrank.drop();
						}
					}
				}
			}
		}
	}

	this.updateEquippedCharms(item);

	return true;
};

Item.equippedCharms = [[], [], []];

Item.getCharmLimit = function (itemID) {
	var charmLimit;

	switch (itemID) {
	case 603: // small charms
		charmLimit = 7;

		break;
	case 604: // large charms
		charmLimit = 1;

		break;
	case 605: // grand charms
		charmLimit = 4;

		break;
	default:
		return false;
	}

	return charmLimit;
};

Item.autoEquipCheckCharm = function (item) {
	if (!Config.AutoEquip) {
		return true;
	}

	let charmID = [603, 604, 605].indexOf(item.classid);

	if (charmID < 0) { // not a charm
		return false;
	}

	let equipped = this.equippedCharms[charmID].first(),
		tier = NTIP.GetCharmTier(item),
		oldTier = this.equippedCharms[charmID].length < 1 ? -1 : NTIP.GetCharmTier(equipped);

	if (tier > oldTier && (this.canEquipCharm(item) || !item.getFlag(0x10)) || item.gid === equipped.gid) {
		return true;
	}

	return false;
};

Item.autoEquipCharm = function () {
	if (!Config.AutoEquip) {
		return true;
	}

	var charmID, equipped, logItem, tier, oldTier,
		items = me.getItems()
			.filter(item => this.canEquipCharm(item) && [3, 7].indexOf(item.location) > -1)
			.sort((a, b) => a.classid - b.classid);

	if (!items) {
		return false;
	}

	me.cancel();

	while (items.length > 0) {
		charmID = [603, 604, 605].indexOf(items[0].classid);
		tier = NTIP.GetCharmTier(items[0]);
		equipped = this.equippedCharms[charmID].first();
		oldTier = this.equippedCharms[charmID].length < 1 ? -1 : NTIP.GetCharmTier(equipped);
		logItem = items[0];

		if (tier > oldTier && this.equippedCharms[charmID].map(x => x.gid).indexOf(items[0].gid) === -1) {
			print(items[0].name);

			if (this.equipCharm(items[0])) {
				Misc.logItem("Equipped", me.getItem(-1, -1, logItem.gid));

				if (Developer.logEquipped) {
					MuleLogger.logEquippedItems();
				}
			}
		}

		items.shift();
	}

	return true;
};

Item.setupCharms = function () {
	let i, equipped, limit, type = [603, 604, 605],
		items = me.getItems()
			.filter(item => item.location === 3 && type.indexOf(item.classid) > -1)
			.sort((a, b) => a.classid - b.classid);

	for (i = 0; i < type.length; i++) {
		equipped = items.filter(item => this.canEquipCharm(item) && item.classid === type[i])
			.sort((a, b) => NTIP.GetCharmTier(a) - NTIP.GetCharmTier(b));

		limit = this.getCharmLimit(type[i]) * -1; // trim off lowest tier
		equipped = equipped.slice(limit);

		while (equipped.length > 0) {
			this.equippedCharms[i].push(copyUnit(equipped[0]));
			equipped.shift();
		}
	}

	return true;
};

Item.updateEquippedCharms = function (unit) {
	let limit, type = [603, 604, 605].indexOf(unit.classid),
		equipped = me.getItems()
			.filter(item => item.location === 3 && item.classid === unit.classid && this.canEquipCharm(item))
			.sort((a, b) => NTIP.GetCharmTier(a) - NTIP.GetCharmTier(b));
	limit = this.getCharmLimit(unit.classid) * -1; // trim off lowest tier
	equipped = equipped.slice(limit);
	this.equippedCharms[type] = []; // reset array

	while (equipped.length > 0) {
		this.equippedCharms[type].push(copyUnit(equipped[0]));
		equipped.shift();
	}

	return true;
};

Item.hasMercTier = function (item) {
	return Config.AutoEquip && NTIP.GetMercTier(item) > 0 && !me.classic;
};

Item.canEquipMerc = function (item, bodyLoc) {
	if (item.type !== 4 || me.classic) { // Not an item
		return false;
	}

	let mercenary = Merc.getMercFix();

	if (!mercenary) { // dont have merc or he is dead
		return false;
	}

	if (!item.getFlag(0x10)) { // Unid item
		return false;
	}

	let curr = this.getEquippedItemMerc(bodyLoc);

	if (item.getStat(92) > mercenary.getStat(12) || item.dexreq > mercenary.getStat(2) - curr.dex || item.strreq > mercenary.getStat(0) - curr.str) { // Higher requirements
		return false;
	}

	return true;
};

Item.equipMerc = function (item, bodyLoc) {
	var i, cursorItem, mercenary = Merc.getMercFix();

	if (!mercenary) { // dont have merc or he is dead
		return false;
	}

	if (!this.canEquipMerc(item, bodyLoc)) {
		return false;
	}

	if (item.mode === 1 && item.bodylocation === bodyLoc) { // Already equipped in the right slot
		return true;
	}

	if (item.location === 7) {
		if (!Town.openStash()) {
			return false;
		}
	}

	for (i = 0; i < 3; i += 1) {
		if (item.toCursor()) {
			if (clickItem(4, bodyLoc)) {
				delay(500 + me.ping * 2);
				Misc.logItem("Merc Equipped", mercenary.getItem(item.classid));
			}

			if (item.bodylocation === bodyLoc) {
				if (getCursorType() === 3) {
					cursorItem = getUnit(100);

					if (cursorItem) {
						if (Pickit.checkItem(cursorItem).result === 1) { // only keep wanted items
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

				if (Developer.logEquipped) {
					MuleLogger.logEquippedItems();
				}

				return true;
			}
		}
	}

	return false;
};

Item.getEquippedItemMerc = function (bodyLoc) {
	let mercenary = Merc.getMercFix();

	if (mercenary) {
		let item = mercenary.getItem();

		if (item) {
			do {
				if (item.bodylocation === bodyLoc && item.location === 1) {
					return {
						classid: item.classid,
						prefixnum: item.prefixnum,
						tier: NTIP.GetMercTier(item),
						name: item.fname,
						str: item.getStatEx(0),
						dex: item.getStatEx(2),
						sockets: item.getStat(194),
						description: item.description
					};
				}
			} while (item.getNext());
		}
	}

	return { // Don't have anything equipped in there
		classid: -1,
		prefixnum: -1,
		tier: -1,
		name: "none",
		str: 0,
		dex: 0,
		sockets: 0,
		description: "none"
	};
};

Item.getBodyLocMerc = function (item) {
	let bodyLoc = false, mercenary = Merc.getMercFix();

	if (!mercenary) { // dont have merc or he is dead
		return false;
	}

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

	if (Config.AutoEquip && !Merc.getMercFix()) {
		return false;
	}

	let i, tier = NTIP.GetMercTier(item), bodyLoc = this.getBodyLocMerc(item);

	if (tier > 0 && bodyLoc) {
		for (i = 0; i < bodyLoc.length; i += 1) {
			var oldTier = this.getEquippedItemMerc(bodyLoc[i]).tier; // Low tier items shouldn't be kept if they can't be equipped

			if (tier > oldTier && (this.canEquipMerc(item) || !item.getFlag(0x10))) {
				return true;
			}
		}
	}

	return false;
};

Item.autoEquipMerc = function () {
	if (!Config.AutoEquip || !Merc.getMercFix() || me.classic) {
		return true;
	}

	let i, j, tier, bodyLoc, tome, scroll, items = me.findItems(-1, 0);

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
		bodyLoc = this.getBodyLocMerc(items[0]);

		if (tier > 0 && bodyLoc) {
			for (j = 0; j < bodyLoc.length; j += 1) {
				if ([3, 7].indexOf(items[0].location) > -1 && tier > this.getEquippedItemMerc(bodyLoc[j]).tier) { // khalim's will adjustment
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

					print("Merc " + items[0].name);
					this.equipMerc(items[0], bodyLoc[j]);

					let cursorItem = getUnit(100);

					if (cursorItem) {
						if (Pickit.checkItem(cursorItem).result === 1) { // only keep wanted items
							if (Storage.Inventory.CanFit(cursorItem)) {
								Storage.Inventory.MoveTo(cursorItem);
							}
						}

						cursorItem = getUnit(100);

						if (cursorItem) {
							cursorItem.drop();
						}
					}

					break;
				}
			}
		}

		items.shift();
	}

	return true;
};

Item.removeItemsMerc = function (bodylocation = null) {
	let cursorItem, mercenary = Merc.getMercFix();

	if (!mercenary) {
		return true;
	}

	let items = mercenary.getItems();

	if (items) {
		if (bodylocation) {
			items = items.filter(item =>
				item.location === 1
				&& item.bodylocation === bodylocation
			);
		}

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
