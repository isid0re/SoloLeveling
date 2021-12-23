/*
*	@filename	bloodraven.js
*	@author		isid0re
*	@desc		kill bloodraven for free merc normal a1 and maus MF hunting for endgame
*/

function bloodraven () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting blood raven');

	if (!Pather.checkWP(4)) {
		Pather.getWP(4);
		Attack.clear(50);
	} else {
		Pather.useWaypoint(3);
	}

	Precast.doPrecast(true);

	if (me.normal) {
		me.overhead("blood raven");
		Pather.moveToExit([3, 17], true);
		Pather.moveToPreset(17, 1, 805);

		try {
			Attack.kill("Blood Raven");
			Pickit.pickItems();
		} catch (err) {
			print('ÿc9SoloLevelingÿc0: Failed to kill Blood Raven');
		}

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
