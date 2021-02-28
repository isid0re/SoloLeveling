/*
*	@filename	MiscOverrides.js
*	@author		isid0re
*	@desc		Misc.js fixes to improve functionality and Merc Hiring/Autoequip
*/

if (!isIncluded("common/Misc.js")) {
	include("common/Misc.js");
}

Misc.checkQuest = function (id, state) {
	sendPacket(1, 0x40);
	delay(500 + me.ping);

	return me.getQuest(id, state);
};

Misc.openChests = function (range) {
	var unit,
		unitList = [],
		containers = [ "loose rock", "hidden stash", "loose boulder", "chest", "chest3", "armorstand", "holeanim", "weaponrack"],
		pita = ["barrel", "largeurn", "jar3", "jar2", "jar1", "urn", "jug"]; // pain in the ass

	if (!range) {
		range = 15;
	}

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

// Cast a skill on self, Unit or coords. Always use packet casting for caster skills becasue it's more stable.
Skill.cast = function (skillId, hand, x, y, item) {
	var casterSkills = [36, 38, 39, 44, 45, 47, 48, 49, 53, 54, 55, 56, 59, 64, 67, 84, 87, 92, 93, 101, 112, 121, 130, 137, 138, 146, 149, 154, 155, 225, 229, 230, 234, 240, 244, 245, 249, 250, 251, 256, 261, 262, 271, 276];

	if (me.inTown && !this.townSkill(skillId)) {
		return false;
	}

	if (!item && !me.getSkill(skillId, 1)) {
		return false;
	}

	if (!this.wereFormCheck(skillId)) {
		return false;
	}

	// Check mana cost, charged skills don't use mana
	if (!item && this.getManaCost(skillId) > me.mp) {
		// Maybe delay on ALL skills that we don't have enough mana for?
		if (Config.AttackSkill.concat([42, 54]).concat(Config.LowManaSkill).indexOf(skillId) > -1) {
			delay(300);
		}

		return false;
	}

	if (skillId === undefined) {
		throw new Error("Skill.cast: Must supply a skill ID");
	}

	var i, n, clickType, shift;

	if (hand === undefined) {
		hand = 0;
	}

	if (x === undefined) {
		x = me.x;
	}

	if (y === undefined) {
		y = me.y;
	}

	if (!this.setSkill(skillId, hand, item)) {
		return false;
	}

	if ((casterSkills.indexOf(skillId) > -1) || Config.PacketCasting > 1) {
		if (SoloSettings.debugging.skillInfo) {
			me.overhead("Using skill: " + skillId + "| Current skill level: " + me.getSkill(skillId, 1));
		}
		
		switch (typeof x) {
		case "number":
			Packet.castSkill(hand, x, y);
			delay(250);

			break;
		case "object":
			Packet.unitCast(hand, x);
			delay(250);

			break;
		}
	} else {
		switch (hand) {
		case 0: // Right hand + No Shift
			clickType = 3;
			shift = 0;

			break;
		case 1: // Left hand + Shift
			clickType = 0;
			shift = 1;

			break;
		case 2: // Left hand + No Shift
			clickType = 0;
			shift = 0;

			break;
		case 3: // Right hand + Shift
			clickType = 3;
			shift = 1;

			break;
		}

MainLoop:
		for (n = 0; n < 3; n += 1) {
			if (typeof x === "object") {
				clickMap(clickType, shift, x);
			} else {
				clickMap(clickType, shift, x, y);
			}

			delay(20);

			if (typeof x === "object") {
				clickMap(clickType + 2, shift, x);
			} else {
				clickMap(clickType + 2, shift, x, y);
			}

			for (i = 0; i < 8; i += 1) {
				if (me.attacking) {
					break MainLoop;
				}

				delay(20);
			}
		}

		while (me.attacking) {
			delay(10);
		}
	}

	if (this.isTimed(skillId)) { // account for lag, state 121 doesn't kick in immediately
		for (i = 0; i < 10; i += 1) {
			if ([4, 9].indexOf(me.mode) > -1) {
				break;
			}

			if (me.getState(121)) {
				break;
			}

			delay(10);
		}
	}

	return true;
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
	case 68: //
	case 85: //
	case 86: //
	case 87: //
		bodyLoc = 4;

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

	if (tier > 0 && bodyLoc) {
		for (i = 0; i < bodyLoc.length; i += 1) {
			// Low tier items shouldn't be kept if they can't be equipped
			if (tier > this.getEquippedItem(bodyLoc[i]).tier && (this.canEquip(item) || !item.getFlag(0x10))) {
				return true;
			}

			// Sell/ignore low tier items, keep high tier
			if (tier > 0 && tier <= this.getEquippedItem(bodyLoc[i]).tier) {
				return false;
			}
		}
	}

	return true;
};

Item.autoEquip = function () {
	if (!Config.AutoEquip) {
		return true;
	}

	var i, j, tier, bodyLoc, tome, gid,
		items = me.findItems(-1, 0);

	if (!items) {
		return false;
	}

	function sortEq(a, b) {
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
		if (NTIP.GetTier(items[i]) === 0) {
			items.splice(i, 1);

			i -= 1;
		}
	}

	while (items.length > 0) {
		items.sort(sortEq);

		tier = NTIP.GetTier(items[0]);
		bodyLoc = this.getBodyLoc(items[0]);

		if (tier > 0 && bodyLoc) {
			for (j = 0; j < bodyLoc.length; j += 1) {
				if ([3, 7].indexOf(items[0].location) > -1 && tier > this.getEquippedItem(bodyLoc[j]).tier && this.getEquippedItem(bodyLoc[j]).classid !== 174) { // khalim's will adjustment
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
						
						if (SoloSettings.logEquipped) {
							MuleLogger.logEquippedItems();
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

//	Merc Hire and Setup
var merc, mercId = [];

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
				if (Storage.Inventory.CanFit(jadefigurine)) {
					Pickit.pickItem(jadefigurine);
				} else {
					Town.clearJunk();
					Town.organizeInventory();
					Pickit.pickItem(jadefigurine);
				}
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
	let tempMercAura = 99; //prayer only one not used -- replacing merc will bug out if changed.
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

	if (me.gametype === 0 || !Pather.accessToAct(2) || me.diff > mercDiff) { // don't hire if classic, no access to act 2, or passed merc hire difficulty
		return true;
	}

	let mercSelected = getmercAura();

	if (mercSelected === mercAuraWanted || me.diff !== mercDiff && mercSelected === tempMercAura) {
		return true;
	}

	if (me.diff === 0 && me.gold < 10000 || me.diff !== 0 && me.gold < 100000) {
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
		Town.organizeInventory();
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

	Misc.equipMerc();
	Pickit.pickItems(); // safetycheck for merc items on ground
	Misc.equipMerc();

	return true;
};

Misc.equipMerc = function () {
	if (me.gametype === 1) {
		Item.autoEquipMerc();
	}

	return true;
};

//AUTO EQUIP - modified from dzik's
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

	var i, cursorItem, mercenary = getMercFix();

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
						if (NTIP.CheckItem(cursorItem, NTIP_CheckListNoTier, true).result === 1) {
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

				if (SoloSettings.logEquipped) {
					MuleLogger.logEquippedItems();
				}

				return true;
			}
		}
	}

	return false;
};

Item.getEquippedItemMerc = function (bodyLoc) {
	let mercenary = getMercFix();

	if (!mercenary) { // dont have merc or he is dead
		return false;
	}

	let item = mercenary.getItem();

	if (item) {
		do {
			if (item.bodylocation === bodyLoc && item.location === 1) {
				return {
					classid: item.classid,
					tier: mercscore(item),
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
	let bodyLoc = false, mercenary = getMercFix();

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

	if (Config.AutoEquip && !getMercFix()) {
		return false;
	}

	let i, tier = NTIP.GetMercTier(item), bodyLoc = Item.getBodyLocMerc(item);

	if (tier > 0 && bodyLoc) {
		for (i = 0; i < bodyLoc.length; i += 1) {
			var oldTier = Math.max(Item.getEquippedItemMerc(bodyLoc[i]).tier, 0); // Low tier items shouldn't be kept if they can't be equipped

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

	let i, j, tier, bodyLoc, tome, scroll, gid, items = me.findItems(-1, 0);

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

					print(items[0].name);
					this.equipMerc(items[0], bodyLoc[j]);

					let cursorItem = getUnit(100);

					if (cursorItem) {
						cursorItem.drop();
						Misc.logItem("Merc Dropped", cursorItem);
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
	let cursorItem, mercenary = getMercFix();

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
