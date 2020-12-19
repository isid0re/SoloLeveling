/*
*	@filename	SoloLeveling.js
*	@author		isid0re
*	@desc		AutoPlay leveling for any class type. Just make a character and name it. Uses predefined buildtemplates.
*				Make sure kolbot difficulty is set to "highest"
*	@TODO		- dynamic tiers calibrate weights for mercscore and tierscore
*/

function ancienttunnels () {
	if (!Pather.accessToAct(2) || me.charlvl < respecTwo) {
		return true;
	}

	Town.townTasks();
	print('ÿc9SoloLevelingÿc0: starting ancient tunnels');
	me.overhead("ancient tunnels");

	if (!Pather.checkWP(44)) {
		Pather.getWP(44);
	} else {
		Pather.useWaypoint(44);
	}

	Precast.doPrecast(true);

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
};
