/*
*	@filename	den.js
*	@author		isid0re
*	@desc		den quest
*/

function den () {
	print('ÿc9SoloLevelingÿc0: starting den');
	me.overhead("den");

	if (!Pather.checkWP(3)) {
		Pather.moveToExit(2, true);

		if (me.charlvl < 3) {
			Attack.clearLevel();
		}

		Pather.moveToExit(8, false, true);
		Pather.makePortal();
		Pather.getWP(3, true);
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
		Pather.getWP(3, true);
		Pather.useWaypoint(1);
	} else {
		Town.goToTown();
	}

	Town.npcInteract("akara");

	return true;
}
