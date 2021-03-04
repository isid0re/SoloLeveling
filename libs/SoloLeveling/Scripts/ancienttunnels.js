/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		ancient tunnel runs in act 2 for MF hunting and leveling.
*/

function ancienttunnels () {
	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting ancient tunnels');
	me.overhead("ancient tunnels");

	if (!Pather.checkWP(44)) {
		Pather.getWP(44, true);
	} else {
		Pather.useWaypoint(44);
	}

	Precast.doPrecast(true);

	if((finalBuild === "Javazon" && me.diff === 2 && !Attack.checkInfinity())) {	//Tunnels has a lot of light immunes. Clear Lost City
		Attack.clearLevel();
		return true;
	}

	if (Pather.moveToPreset(me.area, 2, 580) && Misc.openChests(5)) {
		Pickit.pickItems();
	}

	if (getPresetUnit(me.area, 1, 751) && Pather.moveToPreset(me.area, 1, 751)) {
		try {
			Attack.clear(15, 0, getLocaleString(2886));
		} catch (err) {
			print('ÿc9SoloLevelingÿc0: Failed to kill Dark Elder');
		}
	}

	if (!Pather.moveToExit(65, true)) {
		print("ÿc9SoloLevelingÿc0: Failed to move to Ancient Tunnels");

		return false;
	}

	Attack.clearLevel();

	return true;
}
