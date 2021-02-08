/*
*	@filename	TownOverrides.js
*	@author		isid0re
*	@desc		Town.js fixes and custom tasks to improve functionality
*/

Town.townTasks = function () {
	if (!me.inTown) {
		Town.goToTown();
	}

	let prevTown, i, cancelFlags = [0x01, 0x02, 0x04, 0x08, 0x14, 0x16, 0x0c, 0x0f, 0x19, 0x1a];

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
	Runewords.makeRunewords();
	Cubing.doCubing();
	Runewords.makeRunewords();
	this.heal();
	this.identify();
	this.clearInventory();
	this.buyBooks();
	this.buyPotions();
	this.fillTome(518);
	this.fillTome(519);
	this.shopItems();
	this.buyKeys();
	this.repair(true);
	this.shopItems();
	this.reviveMerc();
	Item.autoEquip();
	this.equipSWAP();
	Misc.hireMerc();
	Misc.equipMerc();
	this.clearInventory();
	this.gamble();
	Town.stash();
	this.clearJunk();
	this.organizeStash();
	Town.organizeInventory();
	this.characterRespec();

	for (i = 0; i < cancelFlags.length; i += 1) {
		if (getUIFlag(cancelFlags[i])) {
			delay(500);
			me.cancel();

			break;
		}
	}

	me.cancel();

	if ((me.classid !== 1 && !me.getSkill(115, 0) || me.classid === 1 && !me.getSkill(54, 0)) && (me.area === 40 || me.area === 75)) {
		Town.buyPots(8, "Stamina");
		Town.drinkPots();
	}

	if (me.inTown && prevTown && me.area !== prevTown) {
		Pather.useWaypoint(prevTown);
	}

	Config.NoTele = me.diff === 0 && me.gold < 10000 ? true : me.diff !== 0 && me.gold < 50000 ? true : false;
	Config.Dodge = me.getSkill(54, 0) && me.classid === 1 ? !Config.NoTele : false;

	return true;
};

Town.doChores = function (repair = false) {
	if (!me.inTown) {
		this.goToTown();
	}

	let prevTown, i, cancelFlags = [0x01, 0x02, 0x04, 0x08, 0x14, 0x16, 0x0c, 0x0f, 0x19, 0x1a];

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
	Runewords.makeRunewords();
	Cubing.doCubing();
	Runewords.makeRunewords();
	this.heal();
	this.identify();
	this.clearInventory();
	this.buyBooks();
	this.buyPotions();
	this.fillTome(518);
	this.fillTome(519);
	this.shopItems();
	this.buyKeys();
	this.repair(repair);
	this.shopItems();
	this.reviveMerc();
	Item.autoEquip();
	this.equipSWAP();
	Misc.hireMerc();
	Misc.equipMerc();
	this.clearInventory();
	this.gamble();
	this.stash();
	this.clearJunk();
	this.clearScrolls();
	Town.organizeInventory();
	this.characterRespec();

	for (i = 0; i < cancelFlags.length; i += 1) {
		if (getUIFlag(cancelFlags[i])) {
			delay(500);
			me.cancel();

			break;
		}
	}

	me.cancel();

	if (me.inTown && prevTown && me.area !== prevTown) {
		Pather.useWaypoint(prevTown);
	}

	Config.NoTele = me.diff === 0 && me.gold < 10000 ? true : me.diff !== 0 && me.gold < 50000 ? true : false;
	Config.Dodge = me.getSkill(54, 0) && me.classid === 1 ? !Config.NoTele : false;

	return true;
};

Town.heal = function () {
	if (!me.inTown) {
		this.goToTown();
	}

	if (!this.needHealing()) {
		return true;
	}

	if (!this.initNPC("Heal", "heal")) {
		return false;
	}

	return true;
};

Town.buyBooks = function () {
	if (me.gold < 450) {
		return false;
	}

	if (me.findItem(518, 0, 3) && me.findItem(519, 0, 3)) {
		return true;
	}

	var tome1, tome2, npc;

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

	delay(500);

	if (!me.findItem(518, 0, 3)) {
		tome1 = npc.getItem(518);

		if (tome1 && Storage.Inventory.CanFit(tome1)) {
			try {
				if (tome1.buy()) {
					print('ÿc9SoloLevelingÿc0: bought Tome of Town Portal');
					this.fillTome(518);
				}
			} catch (e1) {
				print(e1);

				return false;
			}
		} else {
			return false;
		}
	}

	if (!me.findItem(519, 0, 3)) {
		tome2 = npc.getItem(519);

		if (tome2 && Storage.Inventory.CanFit(tome2)) {
			try {
				if (tome2.buy()) {
					print('ÿc9SoloLevelingÿc0: bought Tome of Identify');
				}
			} catch (e3) {
				print(e3);

				return false;
			}
		} else {
			return false;
		}
	}

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

Town.shopItems = function () {
	if (!Config.MiniShopBot) {
		return true;
	}

	var i, item, result,
		items = [],
		npc = getInteractedNPC();

	if (!npc || !npc.itemcount) {
		return false;
	}

	item = npc.getItem();

	if (!item) {
		return false;
	}

	print("ÿc4MiniShopBotÿc0: Scanning " + npc.itemcount + " items.");

	do {
		if (this.ignoredItemTypes.indexOf(item.itemType) === -1) {
			items.push(copyUnit(item));
		}
	} while (item.getNext());

	print("ÿc9SoloLevelingÿc0: Evaluating " + npc.itemcount + " items.");

	for (i = 0; i < items.length; i += 1) {
		result = Pickit.checkItem(items[i]);

		// no tier'ed items
		if (result.result === 1 && NTIP.CheckItem(items[i], NTIP_CheckListNoTier, true).result !== 0) {
			try {
				if (Storage.Inventory.CanFit(items[i]) && me.getStat(14) + me.getStat(15) >= items[i].getItemCost(0)) {
					Misc.itemLogger("Shopped", items[i]);
					Misc.logItem("Shopped", items[i], result.line);
					items[i].buy();
				}
			} catch (e) {
				print(e);
			}
		}

		// tier'ed items
		if (result.result === 1 && Item.autoEquipCheck(items[i])) {
			try {
				if (Storage.Inventory.CanFit(items[i]) && me.getStat(14) + me.getStat(15) >= items[i].getItemCost(0)) {
					if (Item.hasTier(items[i]) &&
					Item.getBodyLoc(items[i])[0] !== undefined &&
					Item.canEquip(items[i]) &&
					tierscore(items[i]) > Item.getEquippedItem(Item.getBodyLoc(items[i])[0]).tier) {
						Misc.itemLogger("AutoEquip Shopped", items[i]);
						Misc.logItem("AutoEquip Shopped", items[i], result.line);
						items[i].buy();
					}

					if (Item.hasMercTier(items[i]) &&
					Item.getBodyLocMerc(items[i])[0] !== undefined &&
					Item.canEquipMerc(items[i], Item.getBodyLocMerc(items[i])[0]) &&
					mercscore(items[i]) > Item.getEquippedItemMerc(Item.getBodyLocMerc(items[i])[0]).tier) {
						Misc.itemLogger("Merc Shopped", items[i]);
						Misc.logItem("Merc Shopped", items[i], result.line);
						items[i].buy();
					}
				}
			} catch (e) {
				print(e);
			}
		}

		delay(2);
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

		if (book.interact()) {
			print('ÿc9SoloLevelingÿc0: used Radament skill book');
		} else {
			clickItem(1, book);
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

		if (pol.interact()) {
			print('ÿc9SoloLevelingÿc0: used potion of life');
		} else {
			clickItem(1, pol);
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
			Quest.stashItem(174);
			print('ÿc9SoloLevelingÿc0: removed khalims will');
			Item.autoEquip();
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
	let sor = me.getItem(646);

	if (sor) {
		if (sor.location === 7) {
			this.openStash();
			delay(300 + me.ping);
		}

		if (sor.interact()) {
			print('ÿc9SoloLevelingÿc0: used scroll of resistance');
		} else {
			clickItem(1, sor);
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
				delay(10 + me.ping);
				chugs.interact();
			} while (chugs.getNext());
		}
	}

	print('ÿc9SoloLevelingÿc0: drank Special Potions');

	return true;
};

Town.stash = function (stashGold) {
	if (stashGold === undefined) {
		stashGold = true;
	}

	if (!this.needStash()) {
		return true;
	}

	me.cancel();

	var i, result, tier, bodyLoc,
		items = Storage.Inventory.Compare(Config.Inventory);

	if (items) {
		for (i = 0; i < items.length; i += 1) {
			if (this.canStash(items[i])) {
				result = (Pickit.checkItem(items[i]).result > 0 && Pickit.checkItem(items[i]).result < 4) || Cubing.keepItem(items[i]) || Runewords.keepItem(items[i]) || CraftingSystem.keepItem(items[i]);

				// Don't stash low tier autoequip items.
				if (Config.AutoEquip && Pickit.checkItem(items[i]).result === 1) {
					tier = NTIP.GetTier(items[i]);
					bodyLoc = Item.getBodyLoc(items[i]);

					if (tier > 0 && tier <= Item.getEquippedItem(bodyLoc).tier) {
						result = false;
					}
				}

				if (result) {
					Misc.itemLogger("Stashed", items[i]);
					Storage.Stash.MoveTo(items[i]);
				}
			}
		}
	}

	// Stash gold
	if (stashGold) {
		if (me.getStat(14) >= Config.StashGold && me.getStat(15) < 25e5 && this.openStash()) {
			gold(me.getStat(14), 3);
			delay(1000); // allow UI to initialize
			me.cancel();
		}
	}

	return true;
};

Town.organizeStash = function () {
	if (Storage.Stash.UsedSpacePercent() < 65) {
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
			movetoStash(items[sorted], true);
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
			movetoInventory(items[inv], true);
		}
	}

	return true;
};

Town.clearInventory = function () {
	var i, col, result, item, beltSize,
		items = [];

	// Return potions to belt
	item = me.getItem(-1, 0);

	if (item) {
		do {
			if (item.location === 3 && [76, 77, 78].indexOf(item.itemType) > -1) {
				items.push(copyUnit(item));
			}
		} while (item.getNext());

		beltSize = Storage.BeltSize();
		col = this.checkColumns(beltSize);

		// Sort from RV to HP
		items.sort(function (a, b) {
			return b.itemType - a.itemType;
		});

		while (items.length) {
			item = items.shift();

			for (i = 3; i > 0; i -= 1) {
				if (item.code.indexOf(Config.BeltColumn[i]) > -1 && col[i] > 0) {
					if (col[i] === beltSize) { // Pick up the potion and put it in belt if the column is empty
						if (item.toCursor()) {
							clickItem(0, i, 0, 2);
						}
					} else {
						clickItem(2, item.x, item.y, item.location); // Shift-click potion
					}

					delay(200 + me.ping);

					col = this.checkColumns(beltSize);
				}
			}
		}
	}

	// Cleanup remaining potions
	item = me.getItem(-1, 0);

	if (item) {
		items = [
			[], // array for hp
			[] // array for mp
		];

		do {
			if (item.itemType === 76) {
				items[0].push(copyUnit(item));
			}

			if (item.itemType === 77) {
				items[1].push(copyUnit(item));
			}
		} while (item.getNext());

		// Cleanup healing potions
		while (items[0].length > Config.HPBuffer) {
			items[0].shift().interact();
			delay(200 + me.ping);
		}

		// Cleanup mana potions
		while (items[1].length > Config.MPBuffer) {
			items[1].shift().interact();
			delay(200 + me.ping);
		}
	}

	// Any leftover items from a failed ID (crashed game, disconnect etc.)
	items = Storage.Inventory.Compare(Config.Inventory);

	for (i = 0; !!items && i < items.length; i += 1) {
		if ([18, 41, 76, 77, 78].indexOf(items[i].itemType) === -1 && // Don't drop tomes, keys or potions
			items[i].classid !== 524 && // Scroll of Inifuss
			items[i].classid !== 525 && // Key to Cairn Stones
			items[i].classid !== 549 && // Horadric Cube
			items[i].classid !== 92 && // Staff of Kings
			items[i].classid !== 521 && // Viper Amulet
			items[i].classid !== 91 && // Horadric Staff
			items[i].classid !== 552 && // Book of Skill
			items[i].classid !== 545 && // Potion of Life
			items[i].classid !== 546 && // A Jade Figurine
			items[i].classid !== 547 && // The Golden Bird
			items[i].classid !== 548 && // Lam Esen's Tome
			items[i].classid !== 553 && // Khalim's Eye
			items[i].classid !== 554 && // Khalim's Heart
			items[i].classid !== 555 && // Khalim's Brain
			items[i].classid !== 173 && // Khalim's Flail
			items[i].classid !== 174 && // Khalim's Will
			items[i].classid !== 644 && // Malah's Potion
			items[i].classid !== 646 && // Scroll of Resistance
			(items[i].code !== 529 || !!me.findItem(518, 0, 3)) && // Don't throw scrolls if no tome is found (obsolete code?)
			(items[i].code !== 530 || !!me.findItem(519, 0, 3)) && // Don't throw scrolls if no tome is found (obsolete code?)
			!Cubing.keepItem(items[i]) && // Don't throw cubing ingredients
			!Runewords.keepItem(items[i]) && // Don't throw runeword ingredients
			!CraftingSystem.keepItem(items[i]) // Don't throw crafting system ingredients
		) {
			result = Pickit.checkItem(items[i]).result;

			if (!Item.autoEquipCheck(items[i]) && !NTIP.CheckItem(items[i], NTIP_CheckListNoTier, true).result === 1) {
				result = 0;
			}

			if (!Item.autoEquipCheckMerc(items[i]) && !NTIP.CheckItem(items[i], NTIP_CheckListNoTier, true).result === 1) {
				result = 0;
			}

			switch (result) {
			case 0: // Drop item
				if ((getUIFlag(0x0C) || getUIFlag(0x08)) && (items[i].getItemCost(1) <= 1 || items[i].itemType === 39)) { // Quest items and such
					me.cancel();
					delay(200);
				}

				if (getUIFlag(0xC) || (Config.PacketShopping && getInteractedNPC() && getInteractedNPC().itemcount > 0)) { // Might as well sell the item if already in shop
					print("clearInventory sell " + items[i].name);
					Misc.itemLogger("Sold", items[i]);
					items[i].sell();
				} else {
					print("clearInventory dropped " + items[i].name);
					Misc.itemLogger("Dropped", items[i], "clearInventory");
					items[i].drop();
				}

				break;
			case 4: // Sell item
				try {
					print("LowGold sell " + items[i].name);
					this.initNPC("Shop", "clearInventory");
					Misc.itemLogger("Sold", items[i]);
					items[i].sell();
				} catch (e) {
					print(e);
				}

				break;
			}
		}
	}

	return true;
};

Town.clearJunk = function () {
	let junk = me.findItems(-1, 0);

	if (!junk) {
		return false;
	}

	while (junk.length > 0) {
		if ((junk[0].location === 7 || junk[0].location === 3) && // stash or inventory
			!Pickit.checkItem(junk[0]).result === 1 && // Don't throw pickit wanted items
			!Cubing.keepItem(junk[0]) && // Don't throw cubing ingredients
			!Runewords.keepItem(junk[0]) && // Don't throw runeword ingredients
			!CraftingSystem.keepItem(junk[0]) && // Don't throw crafting system ingredients
			(Pickit.checkItem(junk[0]).result === 0 || Pickit.checkItem(junk[0]).result === 4) // only drop unwanted
		) {
			if (junk[0].drop()) {
				me.overhead('cleared junk');
				print("ÿc9SoloLevelingÿc0: Cleared junk - " + junk[0].name);
				delay(50 + me.ping);
			}
		}

		let tier = NTIP.GetTier(junk[0]);
		let bodyLoc = Item.getBodyLoc(junk[0])[0];

		if (tier > 0 && bodyLoc) {
			if ((junk[0].location === 7 || junk[0].location === 3) &&
			(NTIP.CheckItem(junk[0], NTIP_CheckListNoTier, true).result === 0 ||
			(NTIP.CheckItem(junk[0], NTIP_CheckListNoTier, true).result === 1 && junk[0].getFlag(NTIPAliasFlag["runeword"]))) &&
			tier <= Item.getEquippedItem(bodyLoc).tier) {
				if (junk[0].drop()) {
					me.overhead('cleared autoequip junk');
					print("ÿc9SoloLevelingÿc0: Cleared autoequip junk - " + junk[0].name);
					delay(50 + me.ping);
				}
			}
		}

		let merctier = mercscore(junk[0]);
		let mercbodyLoc = Item.getBodyLocMerc(junk[0])[0];

		if (merctier > 0 && mercbodyLoc) {
			if ((junk[0].location === 7 || junk[0].location === 3) &&
			(NTIP.CheckItem(junk[0], NTIP_CheckListNoTier, true).result === 0 ||
			(NTIP.CheckItem(junk[0], NTIP_CheckListNoTier, true).result === 1 && junk[0].getFlag(NTIPAliasFlag["runeword"]))) &&
			merctier <= Item.getEquippedItemMerc(mercbodyLoc).tier) {
				if (junk[0].drop()) {
					me.overhead('cleared merc junk');
					print("ÿc9SoloLevelingÿc0: Cleared merc junk - " + junk[0].name);
					delay(50 + me.ping);
				}
			}
		}

		let rwBase = me.getItems()
			.filter(item =>
				item.itemType === junk[0].itemType// same item type as current
				&& !item.getFlag(NTIPAliasFlag["ethereal"]) // only noneth runeword bases
				&& item.getStat(194) === junk[0].getStat(194) // sockets match junk in review
				&& [3, 7].indexOf(item.location) > -1 // locations
			)
			.sort((a, b) => a.getStatEx(31) - b.getStatEx(31)) // Sort on defense, low to high.
			.last(); // select last

		if (junk[0].getStat(194) > 0) {
			if ((junk[0].location === 7 || junk[0].location === 3) &&
				!junk[0].getFlag(NTIPAliasFlag["ethereal"]) &&
				junk[0].itemType !== 30 && junk[0].getStatEx(31) < rwBase.getStatEx(31)) { // only drop noneth armors helms shields
				if (junk[0].drop()) {
					me.overhead('cleared runeword junk');
					print("ÿc9SoloLevelingÿc0: Cleared runeword junk - " + junk[0].name);
					delay(50 + me.ping);
				}
			}
		}

		junk.shift();
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
		me.overhead('time to respec');
		Town.npcInteract("akara");
		delay(10 + me.ping * 2);

		if (!Misc.useMenu(0x2ba0) || !Misc.useMenu(3401)) {
			return false;
		}

		delay(1000 + me.ping * 2);
		Town.clearBelt();
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

Town.visitTown = function (repair = false) {
	if (me.inTown) {
		this.doChores();
		this.move("stash");

		return true;
	}

	var preArea = me.area,
		preAct = me.act;

	this.doChores(repair);

	if (me.act !== preAct) {
		this.goToTown(preAct);
	}

	this.move("portalspot");

	if (!Pather.usePortal(preArea, me.name)) { // this part is essential
		Packet.flash(me.gid); // try resynch then use portal agian.

		if (!Pather.usePortal(preArea, me.name)) {
			throw new Error("Town.visitTown: Failed to go back from town");
		}
	}

	if (Config.PublicMode) {
		Pather.makePortal();
	}

	return true;
};

Town.goToTown = function (act, wpmenu) {
	var towns = [1, 40, 75, 103, 109];

	if (!me.inTown) {
		Packet.flash(me.gid);

		if (!Pather.makePortal()) {
			throw new Error("Town.goToTown: Failed to make TP");
		}

		if (!Pather.usePortal(null, me.name)) {
			Packet.flash(me.gid);

			if (!Pather.usePortal(null, me.name)) {
				throw new Error("Town.goToTown: Failed to take TP");
			}
		}
	}

	if (act === undefined) {
		return true;
	}

	if (act < 1 || act > 5) {
		throw new Error("Town.goToTown: Invalid act");
	}

	if (act !== me.act) {
		try {
			Pather.useWaypoint(towns[act - 1], wpmenu);
		} catch (WPError) {
			throw new Error("Town.goToTown: Failed use WP");
		}
	}

	return true;
};
