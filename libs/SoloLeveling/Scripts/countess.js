/*
*	@filename	countess.js
*	@author		isid0re
*	@desc		countess runs for rune based gear.
*/

function countess () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting countess');
	me.overhead("countess");

	if (!Pather.checkWP(6)) {
		Pather.getWP(6, true);
	} else {
		Pather.useWaypoint(6);
	}

	Precast.doPrecast(true);
	Pather.clearToExit(6, 20, true); //Black Marsh - > Forgotten Tower
	Pather.clearToExit(20, 21, true); //Forgotten Tower -> TCL1
	Pather.clearToExit(21, 22, true); //TCL1 -> TCL2
	Pather.clearToExit(22, 23, true); //TCL2 -> TCL3
	Pather.clearToExit(23, 24, true); //TCL3 -> TCL4
	Pather.clearToExit(24, 25, true); //TCL4 -> TCL5

	try {
		Pather.moveToPreset(me.area, 2, 580);
		Attack.clear(20, 0, getLocaleString(2875));		
	} catch (err) {
		print('ÿc9SoloLevelingÿc0: Failed to kill Countess');
	}

	Pickit.pickItems();

	return true;
}
