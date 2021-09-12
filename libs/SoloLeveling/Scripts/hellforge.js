/*
*	@filename	hellforge.js
*	@author		isid0re
*	@desc		get the forge quest for rune drops for gear.
*/

function hellforge () {
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

	if (!Pather.moveToPreset(107, 2, 376)) {
		print("ÿc9SoloLevelingÿc0: Failed to move to Hephasto");
	}

	try {
		Attack.clear(20, 0, getLocaleString(1067)); // Hephasto The Armorer
		Pickit.pickItems();
	} catch (err) {
		print('ÿc9SoloLevelingÿc0: Failed to kill Hephasto');
	}

	if (!Pather.moveToPreset(107, 2, 376)) {
		print('ÿc9SoloLevelingÿc0: Failed to move to forge');
	}

	try {
		Attack.clear(15); // clear forge area
		Pather.moveToPreset(107, 2, 376);
	} catch (err) {
		print('ÿc9SoloLevelingÿc0: Failed to clear forge');
	}

	Town.doChores();

	if ([2, 69, 70].indexOf(Item.getEquippedItem(5).itemType) === -1) { //dual weild fix for assassin/barbarian
		let offhandCID = Item.getEquippedItem(5).classid;
		Item.removeItem(5);
		let offhandWPN = me.findItem(offhandCID, 0, 3);

		if (Storage.Stash.CanFit(offhandWPN)) {
			Storage.Stash.MoveTo(offhandWPN);
		}
	}

	Town.npcInteract("cain");

	if (me.getItem(90)) {
		Quest.equipItem(90, 4);
	}

	Pather.usePortal(null, me.name);

	if (!me.getItem(90)) {
		try {
			Pickit.pickItems();
			Quest.equipItem(90, 4);

			if (!Pather.moveToPreset(107, 2, 376)) {
				print('ÿc9SoloLevelingÿc0: Failed to move to forge');
			}
		} catch (err) {
			print('ÿc9SoloLevelingÿc0: Failed to pick and equip Hammer');
		}
	}

	let forge = getUnit(2, 376);
	Misc.openChest(forge);
	delay(250 + me.ping * 2);
	Quest.smashSomething(376);
	delay(4500 + me.ping);
	Pickit.pickItems();
	Item.autoEquip();

	if ([2, 69, 70].indexOf(Item.getEquippedItem(5).itemType) === -1) { //dual weild fix for assassin/barbarian
		Item.autoEquip();
	}

	Town.npcInteract("cain");

	return true;
}
