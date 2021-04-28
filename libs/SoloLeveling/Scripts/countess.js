/*
*	@filename	countess.js
*	@author		isid0re
*	@desc		countess runs for rune based gear.
*/

function countess () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting countess');
	me.overhead("countess");

	if (me.charlvl < 9) {
		if (!Pather.checkWP(4)) {
			Pather.getWP(4);
		} else {
			Pather.useWaypoint(4);
		}

		Precast.doPrecast(true);
		Pather.moveToPreset(4, 2, 17, 0, 0, false, true);
		Attack.clear(15, 0x7);
		Town.goToTown();
	}

	if (!Pather.checkWP(6)) {
		Pather.getWP(6);
	} else {
		Pather.useWaypoint(6);
	}

	Precast.doPrecast(true);
	let floors = [20, 21, 22, 23, 24, 25];

	try {
		if (me.charlvl < 15) {
			for (let i = 0; i < floors.length; i += 1) {
				Pather.moveToExit(floors[i], true);
				Attack.clear(0x7);
			}
		} else {
			Pather.moveToExit(floors, true);
		}

		Pather.moveToPreset(me.area, 2, 580);
		Attack.clear(20, 0, getLocaleString(2875));
	} catch (err) {
		print('ÿc9SoloLevelingÿc0: Failed to kill Countess');
	}

	Pickit.pickItems();

	return true;
}
