/*
*	@filename	bloodraven.js
*	@author		isid0re
*	@desc		kill bloodraven for free merc normal a1 and maus MF hunting for endgame
*/

function bloodraven () {
	if (me.diff === 0 && Misc.checkQuest(2, 0) || me.diff !== 0 && me.charlvl < respecTwo) {
		return true;
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting blood raven');
	me.overhead("blood raven");

	if (!Pather.checkWP(3)) {
		Pather.getWP(3);
	} else {
		Pather.useWaypoint(3);
	}

	Precast.doPrecast(true);
	Pather.moveToExit(17, true);
	Pather.moveToPreset(17, 1, 805);
	Attack.killTarget("Blood Raven");
	Pickit.pickItems();

	if (me.diff === 0) {
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
