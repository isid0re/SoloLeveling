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
	Cubing.doCubing();
	Runewords.makeRunewords();
	this.equipSWAP();
	this.heal();
	this.identify();
	this.clearInventory();
	this.buyPotions();
	this.fillTome(518);
	this.shopItems();
	this.reviveMerc();
	this.buyKeys();
	this.repair(true);
	this.shopItems();
	Item.autoEquip();
	Misc.hireMerc();
	Misc.equipMerc();
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

	if (me.inTown && me.area !== prevTown) {
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
	Cubing.doCubing();
	Runewords.makeRunewords();
	this.equipSWAP();
	this.heal();
	this.identify();
	this.clearInventory();
	this.buyPotions();
	this.fillTome(518);

	if (Config.FieldID) {
		this.fillTome(519);
	}

	this.shopItems();
	this.reviveMerc();
	this.buyKeys();
	this.repair(repair);
	this.shopItems();
	Item.autoEquip();
	Misc.hireMerc();
	Misc.equipMerc();
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

	if (me.inTown && me.area !== prevTown) {
		Pather.useWaypoint(prevTown);
	}

	Config.NoTele = me.diff === 0 && me.gold < 10000 ? true : me.diff !== 0 && me.gold < 50000 ? true : false;
	Config.Dodge = me.getSkill(54, 0) && me.classid === 1 ? !Config.NoTele : false;

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

	function indexOfMax (arr) {
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
	}

	var i, item, result,
		items = [],
		tierscoreCheck = [],
		mercscoreCheck = [],
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
			tierscoreCheck.push(tierscore(item));
			mercscoreCheck.push(mercscore(item));
		}
	} while (item.getNext());

	let besttierIndex = indexOfMax(tierscoreCheck);
	let bestmercIndex = indexOfMax(mercscoreCheck);

	for (i = 0; i < items.length; i += 1) { // pickit wanted only
		if (Pickit.checkItem(items[i])) {
			result = Pickit.checkItem(items[i]);
		}

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

		if (Item.getBodyLoc(items[i])[0] !== undefined) {
			if (result.result === 1 && i === besttierIndex && Item.canEquip(items[i]) && tierscore(items[i]) > Item.getEquippedItem(Item.getBodyLoc(items[i])[0]).tier) {
				try {
					if (Storage.Inventory.CanFit(items[i]) && me.getStat(14) + me.getStat(15) >= items[i].getItemCost(0)) {
						Misc.itemLogger("AutoEquip Shopped", items[i]);
						Misc.logItem("AutoEquip Shopped", items[i], result.line);
						items[i].buy();
					}
				} catch (e) {
					print(e);
				}
			}
		}

		if (Item.getBodyLocMerc(items[i])[0] !== undefined) {
			if (result.result === 1 && i === bestmercIndex && Item.canEquipMerc(items[i], Item.getBodyLocMerc(items[i])[0]) && Item.autoEquipCheckMerc(items[i])) {
				try {
					if (Storage.Inventory.CanFit(items[i]) && me.getStat(14) + me.getStat(15) >= items[i].getItemCost(0)) {
						Misc.itemLogger("Merc Shopped", items[i]);
						Misc.logItem("Merc Shopped", items[i], result.line);
						items[i].buy();
					}
				} catch (e) {
					print(e);
				}
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
				delay(10 + me.ping);
				chugs.interact();
			} while (chugs.getNext());
		}
	}

	print('ÿc9SoloLevelingÿc0: drank Special Potions');

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

	this.checkQuestItems(); // only golden bird quest for now

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

		// Sort from HP to RV
		items.sort(function (a, b) {
			return a.itemType - b.itemType;
		});

		while (items.length) {
			item = items.shift();

			for (i = 0; i < 4; i += 1) {
				if (item.code.indexOf(Config.BeltColumn[i]) > -1 && col[i] > 0) {
					if (col[i] === beltSize) { // Pick up the potion and put it in belt if the column is empty
						if (item.toCursor()) {
							clickItem(0, i, 0, 2);
						}
					} else {
						clickItem(2, item.x, item.y, item.location); // Shift-click potion
					}

					delay(me.ping + 200);

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

			if (!Item.autoEquipCheck(items[i])) {
				result = 0;
			}

			if (NTIP.CheckItem(items[i], NTIP_CheckListNoTier, true).result === 1) { // don't throw pickit items if fails autoequip
				result = 1;
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
			NTIP.CheckItem(junk[0], NTIP_CheckListNoTier, true).result === 0 &&
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
				NTIP.CheckItem(junk[0], NTIP_CheckListNoTier, true).result === 0 &&
				merctier <= Item.getEquippedItemMerc(mercbodyLoc).tier) {
				if (junk[0].drop()) {
					me.overhead('cleared merc junk');
					print("ÿc9SoloLevelingÿc0: Cleared merc junk - " + junk[0].name);
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
