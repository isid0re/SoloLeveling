/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function den () {
	if (Misc.checkQuest(1, 0)) {
		return true;
	}

	print('ÿc9SoloLevelingÿc0: starting den');
	me.overhead("den");

	if (!Pather.checkWP(3)) {
		Pather.moveToExit([2, 8], false, true);

		if (!me.getItem(518)) {
			let tp = me.getItem(529);

			if (tp) {
				clickItem(1, tp);
			}
		} else {
			Pather.makePortal();
		}

		if (me.classid !== 3 && me.charlvl < 3) {
			Attack.clearLevel();
		}

		Pather.getWP(3);
		Pather.useWaypoint(1);
	}

	Town.doChores();

	if (!Pather.usePortal(2, me.name)) {
		Pather.moveToExit(2, true);
	}

	Precast.doPrecast(true);
	Pather.moveToExit(8, true);
	Attack.clearLevel();

	if (!me.getItem(518)) {
		Pather.moveToExit([2, 3], true);
		Pather.useWaypoint(1);
	} else {
		Town.goToTown();
	}

	Town.npcInteract("akara");

	return true;
};
