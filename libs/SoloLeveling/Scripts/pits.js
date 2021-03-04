/*
*	@filename	pits.js
*	@author		isid0re
*	@desc		pits A1 for MF and gold
*/

function pits () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting pits');
	me.overhead("pits");

	if (!Pather.checkWP(6)) {
		Pather.getWP(6, true);
	} else {
		Pather.useWaypoint(6);
	}

	Precast.doPrecast(true);

	Pather.clearToExit(6, 7, true);		//Black Marsh -> Tamoe Highland
	Pather.clearToExit(7, 12, true);	//Tamoe Highland -> Pit level 1

	Attack.clearLevel();

	if (!Pather.moveToExit(16, true)) {
		print("ÿc9SoloLevelingÿc0: Failed to move to Pit level 2");
	}

	Attack.clearLevel();
	Misc.openChestsInArea(16);

	return true;
}
