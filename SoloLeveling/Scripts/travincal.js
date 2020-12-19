	/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function travincal () {
	if (!Pather.accessToAct(3) || me.diff === 0 && Misc.checkQuest(18, 0) || me.diff === 1 && Misc.checkQuest(18, 0)) {
		return true;
	}

	if (!me.getItem(553)) {
		this.eye();
	}

	if (!me.getItem(554)) {
		this.heart();
	}

	if (!me.getItem(555)) {
		this.brain();
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting travincal');
	me.overhead("travincal");

	if (!Pather.checkWP(83)) {
		Pather.getWP(83);
	} else {
		Pather.useWaypoint(83);
	}

	Precast.doPrecast(true);
	let council = {
		x: me.x + 76,
		y: me.y - 67
	};

	Pather.moveToUnit(council);
	Attack.killTarget("Ismail Vilehand");
	Pickit.pickItems();

	if (!Misc.checkQuest(18, 0)) { // khalim's will quest not complete
		Pather.moveToUnit(council);
		Pickit.pickItems();

		if (!Pather.moveToPreset(83, 2, 404)) { // go to orb
			print('ÿc9SoloLevelingÿc0: Failed to move to compelling orb');
		}

		Attack.clear(10); // clear area around orb

		if (!me.inTown) { // go to town
			Town.goToTown();
		}

		if (!me.getItem(174) && me.getItem(173)) { // cube flail to will
			Quest.cubeItems(174, 553, 554, 555, 173);
			delay(250 + me.ping);
		}

		Quest.equipItem(174, 4);
		delay(250 + me.ping);

		if (!Pather.usePortal(83, me.name)) { // return to Trav
			print("ÿc9SoloLevelingÿc0: Failed to go back to Travincal and smash orb");
		}

		Quest.smashSomething(404); // smash orb
		Item.autoEquip(); // equip previous weapon

		if (!me.inTown) { // go to town
			Town.goToTown();
		}

		Town.doChores();

		if (!Pather.usePortal(83, me.name)) { // return to Trav
			print("ÿc9SoloLevelingÿc0: Failed to go back to Travincal and take entrance");
		}

		if (!Pather.moveToExit(100, true)) {
			delay(250 + me.ping * 2);
			Pather.moveToExit(100, true);
		}

		if (!Pather.checkWP(101)) {
			Pather.getWP(101);
		}
	}

	return true;
};
