/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function hellforge () {
	if (!Pather.accessToAct(4) || Misc.checkQuest(27, 0)) {
		return true;
	}

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

	if (!Pather.moveToPreset(me.area, 2, 376)) {
		print("ÿc9SoloLevelingÿc0: Failed to move to Hephasto");
	}

	try {
		Attack.clear(20, 0, getLocaleString(1067)); // Hephasto The Armorer
	} catch (err) {
		print('ÿc9SoloLevelingÿc0: Failed to kill Hephasto');
	}

	if (!me.inTown) { // go to town
		Town.goToTown();
	}

	Town.doChores();
	Town.npcInteract("cain");

	if (me.getItem(90)) {
		Quest.equipItem(90, 4);
	}

	Pather.usePortal(null, me.name);

	if (!me.getItem(90)) {
		Pickit.pickItems();
		Quest.equipItem(90, 4);
	}

	if (!Pather.moveToPreset(me.area, 2, 376)) {
		print('ÿc9SoloLevelingÿc0: Failed to move to forge');
	}

	Attack.clear(15);
	let forge = getUnit(2, 376);
	Misc.openChest(forge);
	delay(250 + me.ping * 2);
	Quest.smashSomething(376);
	Item.autoEquip();
	delay(2500 + me.ping);
	Pickit.pickItems();

	if (!me.inTown) { // go to town
		Town.goToTown();
	}

	Town.npcInteract("cain");

	return true;
};