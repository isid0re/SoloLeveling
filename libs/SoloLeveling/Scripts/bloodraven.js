/*
*	@filename	bloodraven.js
*	@author		isid0re
*	@desc		kill bloodraven for free merc normal a1 and maus MF hunting for endgame
*/

function bloodraven () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting blood raven');

	if (!Pather.checkWP(3)) {
		Pather.getWP(3);
	} else {
		Pather.useWaypoint(3);
	}

	Precast.doPrecast(true);

	if (me.diff === 0) {
		me.overhead("blood raven");
		Attack.clearLevel(0x7);
		Pather.moveToExit(17, true);
		Pather.moveToPreset(17, 1, 805);
		Attack.killTarget("Blood Raven");
		Pickit.pickItems();
		Town.npcInteract("kashya");

		return true;
	}

	me.overhead("mausoleum");

	if (!Pather.moveToExit([17, 19], true)) {
		print("ÿc9SoloLevelingÿc0: Failed to move to Mausoleum");
	}

	Attack.clearLevel();

	return true;
}
